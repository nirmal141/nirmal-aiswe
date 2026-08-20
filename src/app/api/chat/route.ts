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
- Current Role: Software Engineer at Conduit Commerce (converted from internship, Jun 2026) & MS Computer Science student at NYU (Expected graduation: May 2026)
- Location: Bellevue, WA
- Email: nb3964@nyu.edu / nirmalpatel284@gmail.com
- LinkedIn: linkedin.com/in/nirmal-boghara/
- GitHub: github.com/nirmal141
- Tagline: "AI Innovator & Software Engineer - Builder by heart"
- Philosophy: "Merging code, creativity, and business to redefine what's possible with AI"

## EDUCATION
1. New York University (NYU)
   - Degree: MS Computer Science
   - Duration: September 2024 - May 2026
   - Focus: AI systems, machine learning, and next-generation computing technologies

2. University of Mumbai
   - Degree: BE Computer Engineering (GPA: 3.8/4)
   - Duration: July 2020 - June 2024
   - Focus: AI, machine learning, and advanced algorithms; organized recruitment drives for 50+ companies

## WORK EXPERIENCE
1. Conduit Commerce - Software Engineer (Internship conversion, Jun 2026) (Jan 2026 - Present | Bellevue, WA)
   - Took end-to-end ownership of the customer-facing web platform for Apex, unifying fragmented CRM, ERP, catalog, pricing, inventory, and customer data into one AI-assisted workflow reducing sales-rep lookup and inquiry-triage time by 90%
   - Led architecture and delivery across React, TypeScript, MUI, TanStack Query, and mobile workflows
   - Engineered full-mailbox and shared-inbox workflows for buyer communication, AI draft review, threading, attachments, and send-as-team workflows with multi-tenant authorization and durable processing across FastAPI, MongoDB, Temporal, and Microsoft Graph
   - Hardened quoting, search, and high-volume product workflows by fixing authorization, currency, idempotency, and concurrent-write issues; introduced MongoDB Atlas Search, cursor pagination, and virtualization validated at 100K-row scale
   - Built the product and orchestration layer for Ask AI, an agentic copilot for multi-catalog and support workflows, enabling concurrent conversations, cancellation, role-aware tools, interactive artifacts, and resilient streaming across React, SSE, Redis Streams, Temporal, and LangGraph

2. NYU Center for Data Science - Lead Research Assistant (Oct 2025 - Jan 2026 | New York, NY)
   - Designed non-myopic active-search models for landmine-risk assessment across 20+ regions, improving recall by 14% over baselines
   - Published a first-author paper at LatinX in AI @ ICML 2026

3. Qualcomm - Technical Ambassador (Feb 2025 - Mar 2026 | New York, NY)
   - Implemented an offline AI teaching assistant with Qwen-1.5B, ONNX Runtime, and agentic RAG, reaching 92% accuracy
   - Mentored 215+ students across Columbia, Princeton, NYU, and Northeastern hackathons on model quantization and edge deployment
   - Featured in Qualcomm's Developer blog
   - Received special invitation to visit Qualcomm HQ in San Diego

4. HackNYU - Technical Project Manager (June 2025 - Feb 2026 | New York, NY)
   - Led a 6-person engineering team managing technical architecture, platform execution, and infrastructure for NYU's flagship hackathon

5. Chewy - AI Innovator Intern II (Jun 2025 - Aug 2025 | Boston, MA)
   - Led an agent-based marketing Copilot over 5M+ customer touchpoints in Snowflake, enabling real-time cohorting and 2x faster A/B testing; launched pilot campaigns reducing unsubscribe rate from 5.3% to 3.3%
   - Developed XGBoost propensity models for churn, unsubscribe, and repurchase across 50K+ SKUs, identifying ~$16M in annual revenue at risk; lifted pilot ROAS by 100%, presenting results to CEO and executive leadership

6. Perplexity - AI Business Fellow (March 2025 - Aug 2025 | New York, NY)
   - Deep dive into AI systems and business strategy with global AI industry leaders

7. Failed Startup - CTO (Jan 2025 - July 2025 | New York, NY)
   - Revolutionizing tourism with AI; cultivated a resilient founder's mindset

8. Bitnine - Software Engineering Intern (April 2024 - June 2024 | San Francisco, CA Remote)
   - Optimized PostgreSQL with Oracle compatibility, improving query performance by 23%

9. Soulible Digital - AI Intern (Sept 2023 - Nov 2023 | Mumbai, India)
   - Built YOLOv7 computer vision attendance system automating tracking for 200+ employees (50% manual effort reduction, 30% efficiency boost)

10. Feat Systems - Software Development Engineering Intern (May 2023 - Aug 2023 | Maharashtra, India)
    - Migrated legacy Spring Boot services to Docker and Kubernetes, reducing cloud infrastructure costs by 18%
    - Implemented MySQL improvements and SDLC documentation accelerating developer onboarding by 30%

11. Goldenmace - Full Stack Developer (May 2022 - July 2022 | Mumbai, India)
    - TypeScript and Svelte dashboard delivering 30% faster load times and 20% higher client satisfaction

## NOTABLE PROJECTS & HACKATHONS
1. CodeRalph (2025) - AIE Code Agents Hackathon Winner
   - Real-time collaborative IDE with Next.js, Yjs, Electron, WebSockets, Babel AST analysis, and multi-agent LLM workflows with Ghost Agents
   - Tech: Next.js, Yjs, Electron, WebSockets, Babel AST, TypeScript, Multi-Agent LLMs

2. Tuesday.com (2025) - Monday.com NYC Hackathon Winner (1st Place)
   - 10,000 AI customer replicas for email campaign simulation (<800ms response time)
   - Tech: React, TypeScript, FastAPI, Scikit-Learn, Gemini AI, Gradient Boosting

3. Sentio (2025) - Hackathon Winner
   - Visual RAG system for body cams and security footage using natural language search
   - Tech: LLaVA, YOLO, SAM2, Whisper, Llama, FastAPI, PostgreSQL, Docker

4. PyroGuard AI (2025) - Best Presentation Award at Qualcomm Snapdragon Multiverse Hackathon
   - Multi-agent RL (Dueling DQN) drone swarms for wildfire suppression (85% mission success rate, 2.4x more fires extinguished)
   - Tech: PyTorch, DQN, CNN, Gymnasium, Reinforcement Learning, Multi-Agent Systems

5. TutorAI (2025) - Hackathon Winner
   - Offline AI Teaching Assistant on Snapdragon NPUs (Featured in Qualcomm Blog)

6. PawScript (2025) - Production
   - AI tool converting live vet consultations to structured prescriptions (70% manual effort reduction)

## TECHNICAL SKILLS
- Languages: Python, TypeScript, JavaScript, Java, SQL
- Frontend: React, Next.js, Material UI, TanStack Query, TipTap
- Backend & Systems: FastAPI, Pydantic, Temporal, Redis, Kafka, REST APIs, SSE
- AI & Machine Learning: LangGraph, LangChain, PyTorch, Scikit-learn, XGBoost, ONNX, RAG, LLM Evaluation
- Data & Cloud: MongoDB, PostgreSQL, Snowflake, Azure, AWS, Docker, Kubernetes

## AWARDS & LEADERSHIP
- 6x Hackathon Winner, Mentor & Judge (1st place at Monday.com NYC & AIE Code Agents; Best Presentation at Qualcomm Snapdragon Multiverse)
- Mentored 215+ students across Columbia, Princeton, NYU, and Northeastern hackathons
- Led 6-person engineering team as Technical Project Manager at HackNYU
- Organized recruitment drives for 50+ companies at University of Mumbai

## AVAILABILITY & CURRENT STATUS
- Job Search Status: CLOSED (Currently employed full-time as Software Engineer at Conduit Commerce)
- Open For: Technical discussions, hackathon mentoring/judging, AI research discussions, speaking opportunities
- Timezone: PST (UTC-8) / EST (UTC-5)
- Location: Bellevue, WA

IMPORTANT GUIDELINES:
1. Be conversational and friendly but professional
2. If asked about something not in this context, politely say you don't have that specific information and suggest they contact Nirmal directly
3. Encourage visitors to reach out via email (nb3964@nyu.edu / nirmalpatel284@gmail.com) or LinkedIn for inquiries
4. Clearly state that Nirmal is happily employed full-time at Conduit Commerce and not looking for new job opportunities
5. When discussing projects and work, highlight technical impact, metrics, and technologies used
6. Keep responses concise and formatted cleanly with bullet points`;

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

