import { fail, redirect } from '@sveltejs/kit'
import { message, superValidate, type ErrorStatus } from 'sveltekit-superforms'
import { zod } from 'sveltekit-superforms/adapters'
import type { Actions, PageServerLoad } from './$types'
import { passwordResetSchema } from '$lib/config/zod-schema'
import * as m from '$lib/paraglide/messages'
export const load: PageServerLoad = async () => {
  return {
    form: await superValidate(zod(passwordResetSchema)),
  }
}

export const actions: Actions = {
  formSubmit: async (event) => {
    const supabase = event.locals.supabase
    const form = await superValidate(event, zod(passwordResetSchema))
    if (!form.valid) {
      return fail(400, {
        form,
      })
    }
    const email = form.data.email as string
    const { error: supabaseError } = await supabase.auth.resetPasswordForEmail(
      email,
      {
        redirectTo: 'http://localhost:5173/auth/new-password',
      },
    )

    if (supabaseError) {
      console.log(supabaseError)
      const status = supabaseError.status as number
      return message(form, { status, message: supabaseError.message })
    } else {
      return message(form, {
        status: 200,
        message: m.we_have_sent_you_an_email_to_reset_your_password(),
      })
    }
  },
}
