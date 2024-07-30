import {
  createBrowserClient,
  createServerClient,
  isBrowser,
} from '@supabase/ssr'
import {
  PUBLIC_SUPABASE_ANON_KEY,
  PUBLIC_SUPABASE_URL,
} from '$env/static/public'
import type { LayoutLoad } from './$types'

// 
// Any secure authentification concerns in the console log should be ignored
// Authentification is handled serverside, the client is only concerned with loading that
// 

export const load: LayoutLoad = async ({ data, depends, fetch }) => {
  /**
   * Declare a dependency so the layout can be invalidated, for example, on
   * session refresh.
   */
  depends('supabase:auth')

  const supabase = isBrowser()
    ? createBrowserClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
        global: {
          fetch,
        },
      })
    : createServerClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
        global: {
          fetch,
        },
        cookies: {
          getAll() {
            return data.cookies
          },
        },
      })

  /**
   * It's fine to use `getSession` here, because on the client, `getSession` is
   * safe, and on the server, it reads `session` from the `LayoutData`, which
   * safely checked the session using `safeGetSession`.
   */
  const {
    data: { session },
  } = await supabase.auth.getSession()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return { session, supabase, user }
}
