import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { businessDescription } = await req.json()

const prompt = `Generate 5 short, unique, SEO-optimized social media posts for this business:

"${businessDescription}"

- Each post should be on its own line.
- Use relevant hashtags and emojis.
- No titles, introductions, or summaries. Just the 5 posts.`
console.log('API Key present:', !!process.env.OPENROUTER_API_KEY)

 const apiKey = process.env.OPENROUTER_API_KEY
  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      preset: "@preset/postmint-ai", 
      messages: [{ role: 'user', content: prompt }]
    })
  })

  const result = await response.json()
  const text = result.choices?.[0]?.message?.content || ''
  const posts = text.split('\n').filter((p: string) => p.trim() !== '')

  return NextResponse.json({ posts })
}
