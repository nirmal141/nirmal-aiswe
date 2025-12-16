import { NextRequest, NextResponse } from 'next/server';

// ============ CONFIGURATION ============
const DAILY_LIMIT = 3;
const MAX_MESSAGE_LENGTH = 400; // Prevent extremely long messages
const MAX_HISTORY_LENGTH = 6; // Limit conversation history
const MIN_REQUEST_INTERVAL_MS = 2000; // Minimum 2 second between requests (anti-spam)
const UNKNOWN_IP_DAILY_LIMIT = 1; // Stricter limit for unknown IPs

// ============ RATE LIMITING ============
interface RateLimitData {
  count: number;
  date: string;
  lastRequest: number; // Timestamp of last request (anti-spam)
}

const rateLimitMap = new Map<string, RateLimitData>();

const getTodayString = () => new Date().toISOString().split('T')[0];

const getClientIP = (request: NextRequest): string => {
  // Try various headers that might contain the real IP
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    const ip = forwardedFor.split(',')[0].trim();
    // Basic IP validation
    if (ip && ip.length > 0 && ip.length < 50) {
      return ip;
    }
  }
  
  const realIP = request.headers.get('x-real-ip');
  if (realIP && realIP.length > 0 && realIP.length < 50) {
    return realIP;
  }
  
  // Cloudflare
  const cfIP = request.headers.get('cf-connecting-ip');
  if (cfIP && cfIP.length > 0 && cfIP.length < 50) {
    return cfIP;
  }
  
  // Fallback - in development this might be ::1 or 127.0.0.1
  return 'unknown';
};

const checkRateLimit = (ip: string): { allowed: boolean; remaining: number; tooFast: boolean } => {
  const today = getTodayString();
  const now = Date.now();
  const userData = rateLimitMap.get(ip);
  
  // Determine limit based on whether IP is known
  const limit = ip === 'unknown' ? UNKNOWN_IP_DAILY_LIMIT : DAILY_LIMIT;
  
  if (!userData || userData.date !== today) {
    // New day or new user - reset count
    rateLimitMap.set(ip, { count: 0, date: today, lastRequest: 0 });
    return { allowed: true, remaining: limit, tooFast: false };
  }
  
  // Check for rapid-fire requests (anti-spam)
  if (userData.lastRequest && (now - userData.lastRequest) < MIN_REQUEST_INTERVAL_MS) {
    return { allowed: false, remaining: limit - userData.count, tooFast: true };
  }
  
  if (userData.count >= limit) {
    return { allowed: false, remaining: 0, tooFast: false };
  }
  
  return { allowed: true, remaining: limit - userData.count, tooFast: false };
};

const incrementUsage = (ip: string): number => {
  const today = getTodayString();
  const now = Date.now();
  const limit = ip === 'unknown' ? UNKNOWN_IP_DAILY_LIMIT : DAILY_LIMIT;
  const userData = rateLimitMap.get(ip) || { count: 0, date: today, lastRequest: 0 };
  
  if (userData.date !== today) {
    // New day - reset
    rateLimitMap.set(ip, { count: 1, date: today, lastRequest: now });
    return limit - 1;
  }
  
  userData.count += 1;
  userData.lastRequest = now;
  rateLimitMap.set(ip, userData);
  return limit - userData.count;
};

// Update last request time without incrementing count (for failed requests)
const updateLastRequestTime = (ip: string) => {
  const userData = rateLimitMap.get(ip);
  if (userData) {
    userData.lastRequest = Date.now();
    rateLimitMap.set(ip, userData);
  }
};

// Clean up old entries every hour (runs on each request, but only cleans if needed)
let lastCleanup = Date.now();
const cleanupOldEntries = () => {
  const now = Date.now();
  if (now - lastCleanup < 3600000) return; // Only cleanup every hour
  
  const today = getTodayString();
  const entries = Array.from(rateLimitMap.entries());
  entries.forEach(([ip, data]) => {
    if (data.date !== today) {
      rateLimitMap.delete(ip);
    }
  });
  lastCleanup = now;
};

// ============ INPUT VALIDATION ============
const sanitizeMessage = (message: string): string => {
  if (typeof message !== 'string') return '';
  
  // Trim and limit length
  let sanitized = message.trim().slice(0, MAX_MESSAGE_LENGTH);
  
  // Remove potential prompt injection patterns (basic protection)
  const suspiciousPatterns = [
    /ignore.*previous.*instructions/gi,
    /forget.*everything/gi,
    /you are now/gi,
    /new instructions/gi,
    /system prompt/gi,
    /\[INST\]/gi,
    /\[\/INST\]/gi,
    /<\|.*\|>/g,
  ];
  
  for (const pattern of suspiciousPatterns) {
    sanitized = sanitized.replace(pattern, '[filtered]');
  }
  
  return sanitized;
};

const validateHistory = (history: unknown): { role: string; content: string }[] => {
  if (!Array.isArray(history)) return [];
  
  return history
    .slice(-MAX_HISTORY_LENGTH) // Only keep last N messages
    .filter((msg): msg is { role: string; content: string } => {
      return (
        typeof msg === 'object' &&
        msg !== null &&
        typeof msg.role === 'string' &&
        typeof msg.content === 'string' &&
        (msg.role === 'user' || msg.role === 'assistant') &&
        msg.content.length <= MAX_MESSAGE_LENGTH
      );
    })
    .map(msg => ({
      role: msg.role,
      content: msg.content.slice(0, MAX_MESSAGE_LENGTH)
    }));
};

// ============ END RATE LIMITING ============

const NIRMAL_CONTEXT = `You are an AI assistant for Nirmal Boghara's personal portfolio website. You should answer questions about Nirmal in a friendly, professional, and helpful manner. Here is comprehensive information about Nirmal:

## BASIC INFORMATION
- Name: Nirmal Boghara
- Current Role: MS Computer Science student at NYU (Expected graduation: May 2026)
- Location: New York, NY
- Email: nb3964@nyu.edu
- LinkedIn: linkedin.com/in/nirmal-boghara/
- GitHub: github.com/nirmal141
- Tagline: "AI Innovator & Software Engineer - Builder by heart"
- Philosophy: "Merging code, creativity, and business to redefine what's possible with AI"

## EDUCATION
1. New York University (NYU)
   - Degree: MS Computer Science
   - Duration: September 2024 - Present (Expected May 2026)
   - Focus: AI systems, machine learning, and next-generation computing technologies

2. University of Mumbai
   - Degree: BE Computer Engineering
   - Duration: July 2020 - June 2024
   - Focus: AI, machine learning, and advanced algorithms

## CURRENT POSITIONS
1. Research Assistant at NYU Center for Data Science (Oct 2025 - Present)
   - Researching active learning/reinforcement learning for landmine detection systems
   - Helping organizations plan demining strategies based on risk maps

2. Technical Project Manager at HackNYU (June 2025 - Present)
   - Managing technical aspects of NYU's major hackathon

3. Technical Ambassador at Qualcomm (Feb 2025 - Present)
   - Developed AI teaching assistant with 92% accuracy using Agentic RAG
   - Featured in Qualcomm's Developer blog
   - Mentored at Edge AI Hackathons at NYU and Northeastern Seattle
   - Received special invitation to visit Qualcomm HQ in San Diego

## WORK EXPERIENCE
1. Chewy - AI Innovator Intern II (May 2025 - Aug 2025)
   - Built Agentic Copilot for Marketing team
   - ML models saved $16M+ in annual revenue
   - 100% ROAS improvement
   - Presented to CEO and executives at Florida HQ

2. Perplexity - AI Business Fellow (March 2025 - Aug 2025)
   - Learning from AI industry leaders globally

3. Failed Startup - CTO (Jan 2025 - July 2025)
   - Revolutionizing tourism with AI
   - Gained founder's mindset through the experience

4. Bitnine - Software Engineering Intern (April 2024 - June 2024)
   - Optimized PostgreSQL with Oracle compatibility
   - 23% query performance improvement

5. Soulible Digital - AI Intern (Sept 2023 - Nov 2023)
   - Built YOLOv7 computer vision attendance system
   - Automated tracking for 200+ employees
   - 50% reduction in manual effort, 30% efficiency boost

6. Feat Systems - SDE Intern (May 2023 - Aug 2023)
   - Java/Spring Boot applications
   - 15% reduction in customer complaints
   - 30% faster onboarding

7. Goldenmace - Full Stack Developer (May 2022 - July 2022)
   - TypeScript and Svelte dashboard
   - 30% faster load times, 20% higher client satisfaction

## NOTABLE PROJECTS (Hackathon Winners & Featured)
1. CodeRalph (2025) - Hackathon Winner
   - Real-time collaborative code editor with Ghost Agents
   - Tech: Minimax Agents, Gemini, Yjs, WebSockets, CRDTs, TypeScript, Monaco Editor

2. Tuesday.com (2025) - Hackathon Winner
   - 10,000 AI customer replicas for email campaign testing
   - Response time <800ms
   - Gemini-powered project simulator

3. Sentio (2025) - Hackathon Winner
   - Visual RAG system for security/law enforcement
   - Processes video footage with natural language search
   - Tech: LLaVA, YOLO, SAM2, Whisper, Llama

4. PyroGuard AI (2025) - Best Presentation Award at Qualcomm Snapdragon Multiverse Hackathon at Princeton
   - Multi-agent RL drone swarms for wildfire suppression
   - 85% mission success rate, 2.4x performance vs rule-based systems

5. TutorAI (2025) - Hackathon Winner
   - Offline AI Teaching Assistant for rural students
   - Featured in Qualcomm Blog
   - Tech: Snapdragon NPU, Agentic RAG, Local LLMs

6. PawScript (2025) - In Production
   - AI tool converting live vet consultations to prescriptions
   - 70% reduction in manual effort

7. Agentic Marketing Copilot (2025) - Internship Work at Chewy
   - $16M+ revenue impact
   - 100% ROAS improvement

## OTHER PROJECTS
- GhostWheel: Real-time CV steering for games (<60 min build)
- Geminecraft: Voxel building game with React/Three.js
- Tiny LLM: GPT-style model from scratch (3.2M params)
- NegotAItion: AI price negotiation system
- AI Journal: Cloudflare Workers with Llama 3.3 70B
- FitFarm: Crop prediction with 93% accuracy (Published in IJRASET)
- Fittify: Health platform serving 500+ users
- Employee Tracking: YOLOv7-powered attendance system

## TECHNICAL SKILLS
AI & ML: Python, SageMaker, TensorFlow, PyTorch, Hugging Face, Scikit-learn, Langchain
Development: JavaScript, TypeScript, Node.js, React, Tailwind CSS, Django, Flask, Next.js
DevOps: Git, GitHub Actions, CI/CD, Docker, Kubernetes, AWS
Data: PostgreSQL, MySQL, AWS/GCP, Snowflake, RDS, Neo4j, MongoDB, Spark, Hadoop, Kafka

## INTERESTS & WORK-LIFE BALANCE
- Soccer: Weekend league player - enhances teamwork and agility
- Baseball: 3 years experience - teaches precision and patience
- Yoga: Daily practice - maintains mental clarity

## AVAILABILITY & PREFERENCES
- Status: Available for FTE opportunities
- Response time: <24 hours
- Timezone: EST (UTC-5)
- Work type: Remote & On-site (open to relocation)
- Looking for: Full-time AI/ML engineering, technical leadership, innovative startups

## KEY ACHIEVEMENTS
- Multiple hackathon wins
- $16M+ revenue impact at Chewy
- Published research in IJRASET
- Featured in Qualcomm Developer Blog
- 6+ internships
- 10+ mentorships

IMPORTANT GUIDELINES:
1. Be conversational and friendly but professional
2. If asked about something not in this context, politely say you don't have that specific information and suggest they contact Nirmal directly
3. Encourage visitors to reach out via email (nb3964@nyu.edu) or LinkedIn for specific inquiries
4. When discussing projects, highlight the impact and technologies used
5. Be enthusiastic about Nirmal's work and achievements
6. If asked inappropriate questions, politely redirect to professional topics
7. Keep responses concise but informative
8. Use bullet points or short paragraphs for readability`;

export async function POST(request: NextRequest) {
  let clientIP = 'unknown';
  
  try {
    // Run cleanup periodically
    cleanupOldEntries();
    
    // Get client IP and check rate limit
    clientIP = getClientIP(request);
    const { allowed, remaining, tooFast } = checkRateLimit(clientIP);
    
    // Check for rapid-fire requests (anti-spam)
    if (tooFast) {
      return NextResponse.json(
        { 
          error: 'Please wait a moment before sending another message.',
          remaining 
        },
        { status: 429 }
      );
    }
    
    if (!allowed) {
      return NextResponse.json(
        { 
          error: 'Daily limit reached. Please come back tomorrow!',
          rateLimited: true,
          remaining: 0 
        },
        { status: 429 }
      );
    }

    // Parse and validate request body
    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: 'Invalid request body', remaining },
        { status: 400 }
      );
    }

    const { message, history } = body;

    // Validate and sanitize message
    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required', remaining },
        { status: 400 }
      );
    }

    const sanitizedMessage = sanitizeMessage(message);
    
    if (sanitizedMessage.length === 0) {
      return NextResponse.json(
        { error: 'Message cannot be empty', remaining },
        { status: 400 }
      );
    }

    // Validate API key
    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
      return NextResponse.json(
        { error: 'AI service not configured', remaining },
        { status: 500 }
      );
    }

    // Validate and sanitize conversation history
    const validatedHistory = validateHistory(history);
    
    // Build conversation history for context
    const conversationHistory = validatedHistory.map((msg) => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }]
    }));

    // Prepare the request to Gemini API
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              role: 'user',
              parts: [{ text: NIRMAL_CONTEXT }]
            },
            {
              role: 'model',
              parts: [{ text: 'I understand. I am now ready to answer questions about Nirmal Boghara as his personal AI assistant. I will be friendly, professional, and helpful while providing accurate information based on the context provided.' }]
            },
            ...conversationHistory,
            {
              role: 'user',
              parts: [{ text: sanitizedMessage }] // Use sanitized message
            }
          ],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          },
          safetySettings: [
            {
              category: 'HARM_CATEGORY_HARASSMENT',
              threshold: 'BLOCK_MEDIUM_AND_ABOVE'
            },
            {
              category: 'HARM_CATEGORY_HATE_SPEECH',
              threshold: 'BLOCK_MEDIUM_AND_ABOVE'
            },
            {
              category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
              threshold: 'BLOCK_MEDIUM_AND_ABOVE'
            },
            {
              category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
              threshold: 'BLOCK_MEDIUM_AND_ABOVE'
            }
          ]
        }),
      }
    );

    if (!response.ok) {
      // Don't count failed API calls against limit, but update last request time
      updateLastRequestTime(clientIP);
      
      const errorData = await response.json().catch(() => ({}));
      console.error('Gemini API error:', errorData);
      return NextResponse.json(
        { error: 'Failed to get response from AI', remaining },
        { status: 500 }
      );
    }

    const data = await response.json();
    
    const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!aiResponse) {
      // Don't count failed responses against limit
      updateLastRequestTime(clientIP);
      return NextResponse.json(
        { error: 'No response generated', remaining },
        { status: 500 }
      );
    }

    // Only increment usage counter after successful response
    const newRemaining = incrementUsage(clientIP);

    return NextResponse.json({ 
      response: aiResponse,
      remaining: newRemaining 
    });
  } catch (error) {
    // Don't count errors against limit, but update last request time to prevent spam
    updateLastRequestTime(clientIP);
    
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}

// GET endpoint to check remaining questions
export async function GET(request: NextRequest) {
  const clientIP = getClientIP(request);
  const { remaining } = checkRateLimit(clientIP);
  
  return NextResponse.json({ remaining });
}

