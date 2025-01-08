'use client';

import { useChat } from '@/lib/useChat';

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat();

  return (
    <div className="flex flex-col h-[600px]">
      {/* Messages area */}
      <div className="flex-grow overflow-y-auto p-6 space-y-4">
        {messages.map(m => (
          <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div 
              className={`p-4 rounded-2xl max-w-[80%] whitespace-pre-wrap shadow-sm ${
                m.role === 'user' 
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              {m.content}
            </div>
          </div>
        ))}
      </div>

      {/* Input form - fixed at bottom */}
      <div className="border-t border-gray-100 p-4 bg-white">
        <form onSubmit={handleSubmit} className="flex space-x-4">
          <input
            value={input}
            onChange={handleInputChange}
            placeholder="Type 'Hit Me' for viral TikTok ideas! ✨"
            className="flex-grow p-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={isLoading}
          />
          <button 
            type="submit"
            className={`px-8 py-4 rounded-xl font-medium transition-all duration-200 ${
              isLoading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700'
            } text-white shadow-sm hover:shadow-md`}
            disabled={isLoading}
          >
            {isLoading ? '✨ Creating...' : 'Send'}
          </button>
        </form>
      </div>
    </div>
  );
} 