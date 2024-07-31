import { carta } from '@/Carta'
import type { RequestHandler } from '@sveltejs/kit'

export const POST: RequestHandler = async ({ request }) => {
  try {
    const markdown = await request.text()

    if (typeof markdown !== 'string') {
      return new Response('Invalid markdown input', { status: 400 })
    }

    // Convert Markdown to HTML using Carta
    const html = await carta.render(markdown)

    return new Response(JSON.stringify({ html }), {
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Error converting Markdown:', error)
    return new Response('Internal Server Error', { status: 500 })
  }
}
