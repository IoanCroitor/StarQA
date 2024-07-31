import type { RequestHandler } from './$types'

export const GET: RequestHandler = async ({ url, locals: { supabase } }) => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${url.origin}/auth/callback`,
    },
  })

  if (error) {
    console.error('Supabase OAuth error:', error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  if (data.url) {
    return new Response(null, {
      status: 303,
      headers: { Location: data.url },
    })
  }

  return new Response(
    JSON.stringify({ error: 'No URL returned from Supabase' }),
    {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    },
  )
}
