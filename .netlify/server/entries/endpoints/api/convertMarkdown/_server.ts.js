import { c as carta } from '../../../../chunks/Carta.js'
const POST = async ({ request }) => {
  try {
    const markdown = await request.text()
    if (typeof markdown !== 'string') {
      return new Response('Invalid markdown input', { status: 400 })
    }
    const html = await carta.render(markdown)
    return new Response(JSON.stringify({ html }), {
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Error converting Markdown:', error)
    return new Response('Internal Server Error', { status: 500 })
  }
}
export { POST }
