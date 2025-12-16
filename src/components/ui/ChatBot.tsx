'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp, X, Loader2, ChevronUp, ChevronDown, MessageCircle } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const DAILY_LIMIT = 5;

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false); // For mobile modal
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [questionsRemaining, setQuestionsRemaining] = useState(DAILY_LIMIT);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Fetch remaining questions from server on mount
  useEffect(() => {
    const fetchRemaining = async () => {
      try {
        const response = await fetch('/api/chat');
        const data = await response.json();
        if (typeof data.remaining === 'number') {
          setQuestionsRemaining(data.remaining);
        }
      } catch (error) {
        console.error('Failed to fetch remaining questions:', error);
      }
    };
    fetchRemaining();
  }, []);

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const scrollToBottom = useCallback(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  useEffect(() => {
    if ((isOpen || isExpanded) && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen, isExpanded]);

  // Prevent body scroll when mobile modal is open
  useEffect(() => {
    if (isMobile && isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobile, isOpen]);

  const sendMessage = async (messageText: string) => {
    if (!messageText.trim() || isLoading) return;

    // Check if already at limit (UI check, server will verify)
    if (questionsRemaining <= 0) {
      const limitMessage: Message = {
        id: Date.now().toString(),
        role: 'assistant',
        content: "You've reached your daily limit of 5 questions. Please come back tomorrow, or reach out to Nirmal directly at nb3964@nyu.edu.",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, limitMessage]);
      return;
    }

    if (!isExpanded && !isMobile) setIsExpanded(true);

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: messageText.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: messageText.trim(),
          history: messages.slice(-6).map(m => ({
            role: m.role,
            content: m.content
          }))
        }),
      });

      const data = await response.json();

      // Update remaining count from server
      if (typeof data.remaining === 'number') {
        setQuestionsRemaining(data.remaining);
      }

      // Handle rate limit error from server
      if (data.rateLimited) {
        setQuestionsRemaining(0);
        const limitMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: "You've reached your daily limit of 5 questions. Please come back tomorrow, or reach out to Nirmal directly at nb3964@nyu.edu.",
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, limitMessage]);
        return;
      }

      if (data.error) {
        throw new Error(data.error);
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.response,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "I apologize, but I'm having trouble connecting right now. Please try again or reach out to Nirmal directly at nb3964@nyu.edu.",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const formatMessage = (content: string) => {
    // Convert URLs and emails to clickable links
    const linkifyText = (text: string) => {
      // Combined regex that matches emails OR URLs, emails first to take priority
      const combinedRegex = /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})|(https?:\/\/[^\s<]+)|((?:www\.)?(?:github\.com|linkedin\.com|twitter\.com|x\.com|youtube\.com|medium\.com|dev\.to|stackoverflow\.com)[^\s<]*)|((?:www\.)?[a-zA-Z0-9-]+\.(?:com|org|net|io|co|ai|dev|app|edu|gov|me|info|xyz)(?:\/[^\s<]*)?)/gi;
      
      return text.replace(combinedRegex, (match) => {
        // Check if it's an email (contains @)
        if (match.includes('@')) {
          return `<a href="mailto:${match}" class="text-[#fec195] hover:text-[#f5b07a] underline underline-offset-2 transition-colors">${match}</a>`;
        }
        // It's a URL
        const href = match.startsWith('http') ? match : `https://${match}`;
        return `<a href="${href}" target="_blank" rel="noopener noreferrer" class="text-[#fec195] hover:text-[#f5b07a] underline underline-offset-2 transition-colors">${match}</a>`;
      });
    };

    return content.split('\n').map((line, i) => {
      if (line.startsWith('- ') || line.startsWith('• ')) {
        const linkedContent = linkifyText(line.slice(2));
        return (
          <li key={i} className="ml-4 list-disc text-white/70" dangerouslySetInnerHTML={{ __html: linkedContent }} />
        );
      }
      if (/^\d+\.\s/.test(line)) {
        const linkedContent = linkifyText(line.replace(/^\d+\.\s/, ''));
        return (
          <li key={i} className="ml-4 list-decimal text-white/70" dangerouslySetInnerHTML={{ __html: linkedContent }} />
        );
      }
      // Apply bold formatting and linkify
      let formatted = line.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white/90 font-medium">$1</strong>');
      formatted = linkifyText(formatted);
      return line ? (
        <p key={i} className="mb-1.5 text-white/70" dangerouslySetInnerHTML={{ __html: formatted }} />
      ) : <br key={i} />;
    });
  };

  const clearChat = () => {
    setMessages([]);
  };

  const closeChat = () => {
    setIsOpen(false);
    setIsExpanded(false);
  };

  // Mobile floating button
  if (isMobile) {
    return (
      <>
        {/* Floating Button */}
        <AnimatePresence>
          {!isOpen && (
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              whileTap={{ scale: 0.92 }}
              onClick={() => setIsOpen(true)}
              className="fixed bottom-5 right-5 z-50 flex items-center gap-2 px-4 py-3 rounded-full shadow-2xl"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.06) 100%)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                border: '1px solid rgba(255,255,255,0.18)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
              }}
            >
              <MessageCircle size={18} className="text-white/90" />
              <span className="text-xs font-medium text-white/80">Ask AI</span>
            </motion.button>
          )}
        </AnimatePresence>

        {/* Full Screen Modal */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex flex-col"
              style={{
                background: 'rgba(0,0,0,0.95)',
                backdropFilter: 'blur(40px)',
                WebkitBackdropFilter: 'blur(40px)',
              }}
              data-lenis-prevent
            >
              {/* Header */}
              <div 
                className="flex items-center justify-between px-4 py-4 border-b border-white/[0.08]"
                style={{
                  background: 'linear-gradient(180deg, rgba(255,255,255,0.03) 0%, transparent 100%)',
                }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/[0.08] border border-white/[0.1] flex items-center justify-center">
                    <span className="text-xs font-medium text-white/60">N</span>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-white/90">Ask about Nirmal</h3>
                    <p className="text-[10px] text-white/40">AI Assistant</p>
                  </div>
                </div>
                <button
                  onClick={closeChat}
                  className="p-2 text-white/40 hover:text-white/80 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Messages */}
              <div 
                ref={messagesContainerRef}
                className="flex-1 overflow-y-auto px-4 py-4 space-y-4"
                style={{
                  overscrollBehavior: 'contain',
                  WebkitOverflowScrolling: 'touch',
                }}
              >
                {messages.length === 0 && (
                  <div className="flex flex-col items-center justify-center h-full text-center px-4">
                    <div className="w-16 h-16 rounded-full bg-white/[0.05] border border-white/[0.08] flex items-center justify-center mb-4">
                      <MessageCircle size={28} className="text-white/30" />
                    </div>
                    <h4 className="text-white/70 font-medium mb-2">Ask me anything</h4>
                    <p className="text-white/40 text-sm">I can tell you about Nirmal's projects, skills, and experience</p>
                  </div>
                )}

                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {message.role === 'assistant' && (
                      <div className="flex-shrink-0 w-7 h-7 rounded-full bg-white/[0.06] border border-white/[0.08] flex items-center justify-center mt-0.5">
                        <span className="text-[10px] font-medium text-white/50">N</span>
                      </div>
                    )}
                    <div className={`max-w-[80%] ${message.role === 'user' ? 'order-first' : ''}`}>
                      <div
                        className={`text-sm leading-relaxed ${
                          message.role === 'user'
                            ? 'bg-white/[0.1] border border-white/[0.12] text-white/90 px-4 py-2.5 rounded-2xl rounded-br-sm'
                            : 'text-left'
                        }`}
                      >
                        {message.role === 'user' ? (
                          message.content
                        ) : (
                          <div className="prose prose-invert prose-sm max-w-none">
                            {formatMessage(message.content)}
                          </div>
                        )}
                      </div>
                      <div className={`text-[10px] text-white/20 mt-1 ${message.role === 'user' ? 'text-right' : ''}`}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                    {message.role === 'user' && (
                      <div className="flex-shrink-0 w-7 h-7 rounded-full bg-white/[0.08] border border-white/[0.1] flex items-center justify-center mt-0.5">
                        <span className="text-[9px] font-medium text-white/60">You</span>
                      </div>
                    )}
                  </motion.div>
                ))}

                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex gap-3"
                  >
                    <div className="flex-shrink-0 w-7 h-7 rounded-full bg-white/[0.06] border border-white/[0.08] flex items-center justify-center">
                      <span className="text-[10px] font-medium text-white/50">N</span>
                    </div>
                    <div className="flex items-center gap-2 text-white/40 text-sm py-2">
                      <Loader2 size={14} className="animate-spin" />
                      <span>Thinking</span>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div 
                className="px-4 py-4 border-t border-white/[0.08]"
                style={{
                  background: 'linear-gradient(0deg, rgba(255,255,255,0.03) 0%, transparent 100%)',
                }}
              >
                <form onSubmit={handleSubmit} className="flex gap-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={questionsRemaining === 0 ? "Daily limit reached" : "Ask anything..."}
                    disabled={isLoading || questionsRemaining === 0}
                    className="flex-1 bg-white/[0.05] border border-white/[0.1] rounded-xl px-4 py-3 text-sm text-white/90 placeholder-white/30 focus:outline-none focus:border-white/20 transition-all disabled:opacity-50"
                  />
                  <motion.button
                    type="submit"
                    disabled={!input.trim() || isLoading || questionsRemaining === 0}
                    whileTap={{ scale: 0.95 }}
                    className="w-12 h-12 rounded-xl bg-white/[0.1] border border-white/[0.12] text-white/60 flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed transition-all active:bg-white/[0.15]"
                  >
                    {isLoading ? (
                      <Loader2 size={18} className="animate-spin" />
                    ) : (
                      <ArrowUp size={18} />
                    )}
                  </motion.button>
                </form>
                <div className="flex items-center justify-center gap-2 mt-2">
                  <span className="text-[10px] text-white/20">AI-powered by Gemini</span>
                  <span className="text-[10px] text-white/20">•</span>
                  <span className={`text-[10px] ${questionsRemaining === 0 ? 'text-red-400/60' : 'text-white/30'}`}>
                    {questionsRemaining} left today
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </>
    );
  }

  // Desktop bottom bar
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50" data-lenis-prevent>
      {/* Conversation Panel */}
      <AnimatePresence>
        {isExpanded && messages.length > 0 && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div 
              className="border-t border-white/[0.08]"
              style={{
                background: 'linear-gradient(to top, rgba(255,255,255,0.03), rgba(255,255,255,0.01))',
                backdropFilter: 'blur(40px)',
                WebkitBackdropFilter: 'blur(40px)',
              }}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-3 border-b border-white/[0.06]">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-medium tracking-wider text-white/30 uppercase">
                    Conversation
                  </span>
                  <span className="text-xs text-white/20">
                    {messages.length} {messages.length === 1 ? 'message' : 'messages'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={clearChat}
                    className="text-xs text-white/30 hover:text-white/70 transition-colors px-2 py-1"
                  >
                    Clear
                  </button>
                  <button
                    onClick={() => setIsExpanded(false)}
                    className="p-1.5 text-white/30 hover:text-white/70 hover:bg-white/[0.05] rounded transition-colors"
                  >
                    <ChevronDown size={16} />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div 
                ref={messagesContainerRef}
                data-lenis-prevent
                className="max-h-[50vh] overflow-y-auto px-6 py-4 space-y-6"
                style={{
                  scrollbarWidth: 'thin',
                  scrollbarColor: 'rgba(255,255,255,0.1) transparent',
                  overscrollBehavior: 'contain',
                  WebkitOverflowScrolling: 'touch',
                }}
              >
                {messages.map((message, index) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: index === messages.length - 1 ? 0.1 : 0 }}
                    className={`max-w-3xl ${message.role === 'user' ? 'ml-auto' : 'mr-auto'}`}
                  >
                    <div className="flex items-start gap-3">
                      {message.role === 'assistant' && (
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-white/[0.06] border border-white/[0.08] flex items-center justify-center mt-0.5">
                          <span className="text-[10px] font-medium text-white/50">N</span>
                        </div>
                      )}
                      <div className={`flex-1 ${message.role === 'user' ? 'text-right' : ''}`}>
                        <div
                          className={`inline-block text-sm leading-relaxed ${
                            message.role === 'user'
                              ? 'bg-white/[0.08] border border-white/[0.1] text-white/90 px-4 py-2.5 rounded-2xl rounded-br-md'
                              : 'text-left'
                          }`}
                        >
                          {message.role === 'user' ? (
                            message.content
                          ) : (
                            <div className="prose prose-invert prose-sm max-w-none">
                              {formatMessage(message.content)}
                            </div>
                          )}
                        </div>
                        <div className={`text-[10px] text-white/20 mt-1.5 ${message.role === 'user' ? 'text-right' : ''}`}>
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                      {message.role === 'user' && (
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-white/[0.08] border border-white/[0.1] flex items-center justify-center mt-0.5">
                          <span className="text-[10px] font-medium text-white/60">You</span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}

                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-3xl"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-white/[0.06] border border-white/[0.08] flex items-center justify-center">
                        <span className="text-[10px] font-medium text-white/50">N</span>
                      </div>
                      <div className="flex items-center gap-2 text-white/40 text-sm">
                        <Loader2 size={14} className="animate-spin" />
                        <span>Thinking</span>
                      </div>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Input Bar */}
      <div 
        
        style={{
          background: 'linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.02) 100%)',
          backdropFilter: 'blur(0px)',
          WebkitBackdropFilter: 'blur(0px)',
          boxShadow: '0px 4px 12px 0px rgba(0, 0, 0, 0.15)',
        }}
      >
        <div className="max-w-4xl mx-auto px-4 py-4">
          {/* Main Input */}
          <form onSubmit={handleSubmit} className="relative">
            <div className="flex items-center gap-3">
              {/* Expand/Collapse Button */}
              {messages.length > 0 && (
                <button
                  type="button"
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="flex-shrink-0 p-2 text-white/30 hover:text-white/70 transition-colors"
                >
                  {isExpanded ? <ChevronDown size={18} /> : <ChevronUp size={18} />}
                </button>
              )}

              {/* Input Field */}
              <div className="flex-1 relative">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={questionsRemaining === 0 ? "Daily limit reached — come back tomorrow!" : "Ask anything about Nirmal..."}
                  disabled={isLoading || questionsRemaining === 0}
                  className="w-full bg-white/[0.05] border border-white/[0.08] rounded-xl px-4 py-3 pr-12 text-sm text-white placeholder-white/50 focus:outline-none focus:border-white/20 focus:bg-white/[0.05] transition-all disabled:opacity-50"
                  style={{
                    backdropFilter: 'blur(10px)',
                  }}
                />
                
                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={!input.trim() || isLoading || questionsRemaining === 0}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-white/[0.08] text-white/50 hover:text-white/90 hover:bg-white/[0.12] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  {isLoading ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    <ArrowUp size={16} />
                  )}
                </motion.button>
              </div>

              {/* Clear/Close when has messages */}
              {messages.length > 0 && (
                <button
                  type="button"
                  onClick={clearChat}
                  className="flex-shrink-0 p-2 text-white/20 hover:text-white/50 transition-colors"
                >
                  <X size={18} />
                </button>
              )}
            </div>
          </form>

          {/* Subtle Footer */}
          <div className="flex items-center justify-center gap-3 mt-2">
            <span className="text-[10px] text-white/15 tracking-wide">
              AI-powered by Gemini
            </span>
            <span className="text-[10px] text-white/25">•</span>
            <span className={`text-[10px] tracking-wide ${questionsRemaining === 0 ? 'text-red-400/60' : 'text-white/25'}`}>
              {questionsRemaining} question{questionsRemaining !== 1 ? 's' : ''} remaining today
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
