import { f as fail, r as redirect } from '../../../../chunks/index.js'
import '../../../../chunks/client.js'
import 'just-clone'
import 'ts-deepmerge'
import { z as zod, l as loginSchema } from '../../../../chunks/zod-schema.js'
import 'devalue'
import {
  s as superValidate,
  m as message,
} from '../../../../chunks/superValidate.js'
import 'memoize-weak'
const load = async () => {
  return {
    form: await superValidate(zod(loginSchema)),
  }
}
const actions = {
  formSubmit: async (event) => {
    const supabase = event.locals.supabase
    const form = await superValidate(event, zod(loginSchema))
    if (!form.valid) {
      return fail(400, {
        form,
      })
    }
    const email = form.data.email
    const password = form.data.password
    const { error: supabaseError, data } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      })
    if (supabaseError) {
      console.log(supabaseError)
      const status = supabaseError.status
      return message(form, { status, message: supabaseError.message })
    } else {
      throw redirect(303, '/home')
    }
  },
}
export { actions, load }
