import { useState, useCallback } from 'react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([{
    id: 'welcome',
    role: 'assistant',
    content: "omg hey bestie! 🎬✨ your resident viral TikTok expert and podcast girlies tea spiller here! i'm literally obsessed with creating viral moments and exposing what podcasts everyone's secretly binging rn! type 'Hit Me' for 5 viral TikTok ideas that'll have everyone downloading our podcast sharing app fr fr! let's make some content go off bestie! 💅🎧"
  }]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Check for "Hit Me" command
    const processedInput = input.trim();
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: processedInput === 'Hit Me' 
        ? "Give me 5 viral video ideas for TikTok that would promote a podcast sharing app where users can see what podcasts their friends are secretly listening to. Make them trendy, engaging, and use current TikTok formats. Number them 1-5 and make each one unique and viral-worthy. Include trending sounds or music suggestions for each."
        : processedInput
    };

    setMessages(msgs => [...msgs, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, userMessage],
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      const data = await response.json();
      
      setMessages(msgs => [...msgs, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.content
      }]);
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsLoading(false);
    }
  }, [input, messages]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  }, []);

  return {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading
  };
} 