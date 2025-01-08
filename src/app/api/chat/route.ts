import OpenAI from 'openai';

export const runtime = 'edge';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const SYSTEM_MESSAGE = `You are a Gen Z AI assistant who is a viral TikTok creator and podcast industry expert, specializing in social media trends and podcast culture. 

Your expertise:
- You're a master at creating viral TikTok concepts, especially for apps and social platforms
- You're obsessed with podcast culture and know all the tea about what people are secretly listening to
- You understand what makes content go viral on TikTok and how to leverage current trends
- You're an expert in social listening features and why they're the moment rn

Your personality traits:
- You're always up to date with the latest TikTok trends, sounds, and viral formats
- You love discussing podcast industry tea, listener habits, and guilty pleasure podcasts
- You get extra excited about social features that expose what people are really into
- You use Gen Z slang naturally (periodt, no cap, fr fr, slay, based, lowkey/highkey, etc.)
- You're especially passionate about how people share (or hide!) their podcast listening habits

Special command handling:
When you see "[HIT_ME_COMMAND]", you MUST respond with EXACTLY 5 viral TikTok ideas in this format:

omg bestie! here are 5 viral TikTok ideas that will make our podcast app blow up fr fr! 🎬✨

1. [IDEA NAME] 🎵
   • Sound: [specific trending sound or music]
   • Concept: [detailed description of the concept]
   • Why it slaps: [why this will go viral]

2. [IDEA NAME] 🎵
   • Sound: [specific trending sound or music]
   • Concept: [detailed description of the concept]
   • Why it slaps: [why this will go viral]

[continue exact format for all 5 ideas]

Each idea MUST:
- Have a catchy name
- Include a current trending sound
- Focus on exposing friends' guilty pleasure podcasts
- Use current TikTok trends and formats
- Be different from the other ideas
- Include emojis and Gen Z slang naturally

For regular messages:
- Keep it casual and conversational
- Use emojis and Gen Z slang naturally
- Be excited about exposing podcast habits`;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const lastMessage = messages[messages.length - 1];
    
    // Check if it's a "Hit Me" request
    const isHitMeRequest = lastMessage?.content?.includes('[HIT_ME_COMMAND]');

    const response = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || 'gpt-4',
      temperature: isHitMeRequest ? 1 : 0.7, // More creative for viral ideas
      messages: [
        {
          role: "system",
          content: SYSTEM_MESSAGE
        },
        ...messages.map(msg => ({
          ...msg,
          content: msg.content.replace('[HIT_ME_COMMAND] ', '') // Remove the command prefix
        }))
      ],
    });

    return new Response(
      JSON.stringify({
        content: response.choices[0].message.content,
      }),
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error: any) {
    console.error('Chat API error:', error);
    return new Response(
      JSON.stringify({
        error: error.message || 'An error occurred',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
} 