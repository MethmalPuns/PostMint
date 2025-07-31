import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { businessDescription } = await req.json()

const prompt = `Generate 5 short, unique, SEO-optimized social media posts for this business:

"${businessDescription}"

- Each post should be on its own line.
- Use relevant hashtags and emojis.
- No titles, introductions, or summaries. Just the 5 posts.`


  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
   model: "deepseek/deepseek-chat-v3-0324:free",
       messages: [{ role: 'user', content: prompt }]
    })
  })

  const result = await response.json();
  console.log("OpenRouter raw result:", JSON.stringify(result, null, 2)) // <- Add this line

  const text = result.choices?.[0]?.message?.content || ''
  const posts = text.split('\n').filter((p: string) => p.trim() !== '')

  return NextResponse.json({ posts })
}
