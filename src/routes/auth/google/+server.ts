// src/routes/auth/google/+server.ts
import { redirect } from '@sveltejs/kit'

export const GET = async (event: any) => {
  const {
    url,
    locals: { supabase },
  } = event

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
    throw redirect(303, data.url)
  }

  return new Response(
    JSON.stringify({ error: 'No URL returned from Supabase' }),
    {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    },
  )
}
