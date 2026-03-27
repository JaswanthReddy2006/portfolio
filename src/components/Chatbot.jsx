import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, User, Bot, Loader2 } from 'lucide-react';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', message: "Yo! 👋 I'm Jaswanth's AI assistant. Ask me anything about his projects, skills, or just vibe with me! 🚀" }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage = { role: 'user', message: inputValue };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // In development, we might need the full URL if not proxied
      // Ideal for Vite: use relative path in prod, localhost in dev if not proxied
      const API_URL = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? '' : 'http://localhost:5000');
      
      const response = await fetch(`${API_URL}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage.message,
          history: messages.slice(1).map(m => ({ role: m.role, message: m.message })) // Send history excluding welcome message
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch response');
      }

      const data = await response.json();
      setMessages(prev => [...prev, { role: 'assistant', message: data.reply }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { role: 'assistant', message: "Sorry, I'm having trouble connecting to the server. Please try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">
      <div className="pointer-events-auto">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="mb-4 w-[350px] sm:w-[380px] h-[500px] bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col"
            >
              {/* Header */}
              <div className="p-4 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 flex justify-between items-center text-white shrink-0 shadow-lg relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
                <div className="flex items-center gap-3 relative z-10">
                  <div className="p-2.5 bg-white/20 backdrop-blur-md rounded-2xl shadow-inner border border-white/20 rotate-3">
                    <Bot size={24} className="text-white drop-shadow-md" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-lg tracking-tight text-white drop-shadow-md">Portfolio AI ✨</h3>
                    <div className="flex items-center gap-1.5 opacity-90">
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-400 shadow-[0_0_10px_rgba(74,222,128,0.8)]"></span>
                      </span>
                      <span className="text-xs font-bold text-purple-100 tracking-wide">Vibing ⚡</span>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-white/20 rounded-xl transition-all hover:rotate-90 duration-300 relative z-10"
                >
                  <X size={20} className="text-white drop-shadow-sm" />
                </button>
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-slate-50 scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent">
                {messages.map((msg, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    className={`flex items-end gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                  >
                    <div className={`shrink-0 w-9 h-9 rounded-2xl flex items-center justify-center shadow-lg border-2 transform transition-transform hover:scale-110 ${
                      msg.role === 'user' 
                        ? 'bg-gradient-to-br from-fuchsia-500 to-purple-600 border-white rotate-3' 
                        : 'bg-white border-blue-100 -rotate-3'
                    }`}>
                      {msg.role === 'user' ? <User size={18} className="text-white" /> : <span className="text-xl">🤖</span>}
                    </div>
                    
                    <div className={`max-w-[80%] p-4 rounded-3xl text-sm leading-relaxed shadow-sm font-medium ${
                      msg.role === 'user' 
                        ? 'bg-gradient-to-br from-fuchsia-600 to-purple-600 text-white rounded-tr-none shadow-purple-500/20' 
                        : 'bg-white text-slate-800 border border-slate-200/60 rounded-tl-none shadow-slate-200/50'
                    }`}>
                      {msg.role === 'assistant' ? (
                          <div className="prose prose-sm max-w-none text-slate-700">
                             {/* Simple markdown rendering can be added here if needed, or just plain text */}
                             {msg.message.split('\n').map((line, i) => (
                                <p key={i} className="mb-1 last:mb-0">{line}</p>
                             ))}
                          </div>
                      ) : (
                          <span className="tracking-wide">{msg.message}</span>
                      )}
                    </div>
                  </motion.div>
                ))}
                
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-end gap-3"
                  >
                    <div className="shrink-0 w-9 h-9 rounded-2xl bg-white border-2 border-blue-100 flex items-center justify-center shadow-lg -rotate-3">
                      <span className="text-xl">🤖</span>
                    </div>
                    <div className="p-4 bg-white border border-slate-100 rounded-3xl rounded-tl-none shadow-md flex items-center gap-1.5">
                       <span className="w-2.5 h-2.5 bg-fuchsia-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
                       <span className="w-2.5 h-2.5 bg-purple-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
                       <span className="w-2.5 h-2.5 bg-indigo-500 rounded-full animate-bounce" />
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-3 bg-white border-t border-slate-100 shrink-0">
                <form onSubmit={handleSendMessage} className="relative flex items-center gap-2">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Drop a question... ✨"
                    className="w-full pl-5 pr-14 py-3.5 bg-slate-100 border-2 border-transparent rounded-2xl focus:border-purple-500/30 focus:bg-white focus:outline-none text-sm font-bold text-slate-700 placeholder:text-slate-400 placeholder:font-medium transition-all shadow-inner"
                    disabled={isLoading}
                  />
                  <button
                    type="submit"
                    disabled={!inputValue.trim() || isLoading}
                    className="absolute right-2 p-2.5 bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white rounded-xl hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100 transition-all shadow-lg shadow-purple-500/30"
                  >
                    {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                  </button>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div className="flex items-center gap-4">
             {/* Text Label Hook */}
             {!isOpen && (
               <motion.div
                 initial={{ opacity: 0, x: 20, scale: 0.5 }}
                 animate={{ opacity: 1, x: 0, scale: 1 }}
                 className="flex bg-white py-2.5 px-4 rounded-2xl shadow-xl shadow-fuchsia-500/20 border border-fuchsia-100 items-center gap-3 mr-4"
               >
                  <span className="text-sm font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-600 to-purple-600">Got Questions? 💬</span>
                  <div className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-fuchsia-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-fuchsia-500"></span>
                  </div>
                  {/* Speech bubble arrow */}
                  <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-4 h-4 bg-white rotate-45 border-t border-r border-fuchsia-100 rounded-tr-sm" />
               </motion.div>
             )}

            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              className={`p-4 rounded-3xl shadow-[0_10px_40px_-10px_rgba(168,85,247,0.6)] transition-all duration-300 relative group flex items-center justify-center w-16 h-16 border-[3px] border-white ${isOpen ? 'bg-slate-100 text-slate-800 rotate-90 shadow-none' : 'bg-gradient-to-tr from-fuchsia-600 via-purple-600 to-indigo-600 text-white'}`}
            >
              {isOpen ? <X size={28} /> : <span className="text-3xl">🤖</span>}
              
              {/* Pulse Effect when closed */}
              {!isOpen && (
                <>
                  <span className="absolute inset-0 rounded-3xl border-2 border-white/30 animate-[ping_2s_infinite]" />
                  <span className="absolute inset-0 rounded-3xl border border-white/50 animate-[ping_2s_infinite_0.5s]" />
                </>
              )}
            </motion.button>
        </motion.div>
      </div>
    </div>
  );
}