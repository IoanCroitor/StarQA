import { fail, redirect } from '@sveltejs/kit'
import { message, superValidate, type ErrorStatus } from 'sveltekit-superforms'
import { zod } from 'sveltekit-superforms/adapters'
import type { Actions, PageServerLoad } from './$types'
import { loginSchema } from '$lib/config/zod-schema'

export const load: PageServerLoad = async () => {
  return {
    form: await superValidate(zod(loginSchema)),
  }
}

export const actions: Actions = {
  formSubmit: async (event) => {
    const supabase = event.locals.supabase
    const form = await superValidate(event, zod(loginSchema))
    if (!form.valid) {
      return fail(400, {
        form,
      })
    }
    const email = form.data.email as string
    const password = form.data.password as string
    const { error: supabaseError, data } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      })

    if (supabaseError) {
      console.log(supabaseError)
      const status = supabaseError.status as number
      return message(form, { status, message: supabaseError.message })
    } else {
      throw redirect(303, '/home')
    }
  },
}
