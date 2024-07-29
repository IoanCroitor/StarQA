import type { PageLoad } from './$types'

export const load: PageLoad = async ({ parent }) => {
  const data = await parent()
  return {
    session: data.session,
    supabase: data.supabase,
    user: data.user,
  }
}
