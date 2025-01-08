'use client';

import { useChat } from '@/lib/useChat';

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat();

  return (
    <div className="flex flex-col h-full">
      {/* Messages area */}
      <div className="flex-grow overflow-y-auto p-6 space-y-6">
        {messages.map(m => (
          <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}>
            <div 
              className={`p-6 rounded-2xl max-w-[85%] whitespace-pre-wrap ${
                m.role === 'user' 
                  ? 'bg-gradient-to-r from-violet-500 to-purple-500 text-white shadow-purple-100' 
                  : 'bg-gradient-to-r from-gray-50 to-gray-100 text-gray-800 shadow-gray-100'
              } shadow-lg`}
            >
              {m.content}
            </div>
          </div>
        ))}
      </div>

      {/* Input form - fixed at bottom */}
      <div className="border-t border-gray-100 p-6 bg-white/80 backdrop-blur-sm">
        <form onSubmit={handleSubmit} className="flex space-x-4">
          <input
            value={input}
            onChange={handleInputChange}
            placeholder="Type 'Hit Me' for viral TikTok ideas! ✨"
            className="flex-grow p-4 rounded-xl border-2 border-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-700 bg-white/50 backdrop-blur-sm"
            disabled={isLoading}
          />
          <button 
            type="submit"
            className={`px-8 py-4 rounded-xl font-medium transition-all duration-200 ${
              isLoading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600'
            } text-white shadow-lg shadow-purple-100 hover:shadow-purple-200 hover:-translate-y-0.5`}
            disabled={isLoading}
          >
            {isLoading ? '✨ Creating...' : 'Send'}
          </button>
        </form>
      </div>
    </div>
  );
} 