import React, { useState, useEffect, useRef } from 'react';
import { Icons } from './Icons';
import { ChatMessage, TripContext } from '../types';
import { generateAIResponse } from '../services/geminiService';

interface ChatAgentProps {
  tripContext: TripContext;
  itineraryItems: any[];
}

const ChatAgent: React.FC<ChatAgentProps> = ({ tripContext, itineraryItems }) => {
  console.log('Trip Context in ChatAgent:', tripContext);
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'model',
      text: `Hi! I'm your Lion Smart Assistant. I can help you plan your trip to ${tripContext.destination}. Ask me about weather, food, or packing!`,
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    // Call Gemini Service
    const contextData = {
      destination: tripContext.destination,
      startDate: tripContext.startDate,
      endDate: tripContext.endDate,
      items: itineraryItems
    };

    const responseText = await generateAIResponse(messages, userMsg.text, contextData);

    const botMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'model',
      text: responseText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, botMsg]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-24 right-4 z-50" id="chat-agent-container">
      {isOpen && (
        <div className="bg-white rounded-2xl shadow-2xl w-80 sm:w-96 mb-4 flex flex-col border border-gray-200 overflow-hidden" style={{ height: '500px' }}>
          {/* Header */}
          <div className="bg-red-600 p-4 text-white flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Icons.Bot className="w-6 h-6" />
              <span className="font-bold">Lion AI Assistant</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-red-100 hover:text-white">
               &times;
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
            {messages.map(msg => (
              <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] rounded-lg p-3 text-sm ${msg.role === 'user' ? 'bg-red-600 text-white' : 'bg-white text-gray-800 border border-gray-200 shadow-sm'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
               <div className="flex justify-start">
                <div className="bg-white text-gray-500 border border-gray-200 rounded-lg p-3 text-sm shadow-sm">
                  Thinking...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form className="p-3 bg-white border-t border-gray-100 flex gap-2" onSubmit={(e) => { e.preventDefault(); handleSend(); }}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              // onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask me anything..."
              className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <button
              type="submit" 
              onClick={handleSend}
              disabled={isLoading}
              className="bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition disabled:opacity-50"
            >
              <Icons.Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      {!isOpen && (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-red-600 hover:bg-red-700 text-white p-4 rounded-full shadow-lg transition-transform transform hover:scale-105 flex items-center justify-center"
        >
          <Icons.Bot className="w-6 h-6" />
        </button>
      )}
    </div>
  );
};

export default ChatAgent;
