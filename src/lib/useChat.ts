'use client';

import { useState, useCallback } from 'react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

const WELCOME_MESSAGE = "omg hey bestie! 🎬✨ your resident viral TikTok expert and podcast girlies tea spiller here! type 'Hit Me' for 5 viral TikTok ideas that'll make our podcast app blow up fr fr! let's make some content go off bestie! 💅🎧";

const VIRAL_IDEAS_PROMPT = "COMMAND: HIT_ME";

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([{
    id: 'welcome',
    role: 'assistant',
    content: WELCOME_MESSAGE
  }]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Check for "Hit Me" command (case insensitive)
    const processedInput = input.trim().toLowerCase();
    const isHitMeCommand = processedInput === 'hit me';
    
    // Create the message to display to the user
    const displayMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input // Show original input to user
    };

    // Create the message to send to the API
    const apiMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: isHitMeCommand ? VIRAL_IDEAS_PROMPT : input
    };

    // Add user's message to the chat
    setMessages(prevMessages => [...prevMessages, displayMessage]);
    
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, apiMessage],
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }
      
      setMessages(prevMessages => [...prevMessages, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.content
      }]);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prevMessages => [...prevMessages, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "omg bestie, something went wrong! try again in a sec? 🙈"
      }]);
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