import { OpenAIStream, StreamingTextResponse } from 'ai';
import OpenAI from 'openai';

// IMPORTANT! Set the runtime to edge
export const runtime = 'edge';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  const { messages } = await req.json();

  const response = await openai.chat.completions.create({
    model: process.env.OPENAI_MODEL || 'gpt-4',
    stream: true,
    messages: [
      {
        role: "system",
        content: "You are a helpful Gen Z assistant who loves podcasts and keeps up with the latest TikTok trends. You speak casually but are still professional and accurate."
      },
      ...messages
    ],
  });

  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
} 