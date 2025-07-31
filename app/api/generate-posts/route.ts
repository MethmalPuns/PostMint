import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { businessDescription } = await req.json()

const prompt = `Generate 5 short, unique, SEO-optimized, and X algorithm-friendly marketing posts for this business:

"${businessDescription}"

Each post should:
- Be on its own line with no bold text, bullet numbers, titles, or summaries.
- Use 1–3 relevant, trending hashtags naturally (avoid generic or spammy ones).
- Include emojis to enhance engagement but keep it professional and relevant.
- Feel authentic, conversational, and non-promotional to avoid algorithm penalties.
- Encourage engagement (e.g., ask a question, spark curiosity, or invite replies) to boost likes, replies, or reposts within the first hour.
- Be 100–200 characters for readability and impact.
- Incorporate high-quality visual suggestions (e.g., image, GIF, or video) described in brackets at the end of each post.
- Avoid excessive links (use only 1 link sparingly, e.g., to bio or profile, if needed).
- Use natural keywords related to the business for SEO without keyword stuffing.
- Drive subtle conversions (e.g., profile visits, replies, or user actions) without hard selling.

Example output format:
Ever wondered how [product] can save you time? Share your thoughts! #ProductivityHacks 😎 [Image: person using product]`


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

  const text = result.choices?.[0]?.message?.content || ''
  const posts = text.split('\n').filter((p: string) => p.trim() !== '')

  return NextResponse.json({ posts })
}
