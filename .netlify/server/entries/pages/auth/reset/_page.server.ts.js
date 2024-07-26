import { f as fail } from "../../../../chunks/index.js";
import "../../../../chunks/client.js";
import "just-clone";
import "ts-deepmerge";
import { z as zod, a as passwordResetSchema } from "../../../../chunks/zod-schema.js";
import "devalue";
import { s as superValidate, m as message } from "../../../../chunks/superValidate.js";
import "memoize-weak";
const load = async () => {
  return {
    form: await superValidate(zod(passwordResetSchema))
  };
};
const actions = {
  formSubmit: async (event) => {
    const supabase = event.locals.supabase;
    const form = await superValidate(event, zod(passwordResetSchema));
    if (!form.valid) {
      return fail(400, {
        form
      });
    }
    const email = form.data.email;
    const { error: supabaseError } = await supabase.auth.resetPasswordForEmail(
      email,
      {
        redirectTo: "http://localhost:5173/auth/new-password"
      }
    );
    if (supabaseError) {
      console.log(supabaseError);
      const status = supabaseError.status;
      return message(form, { status, message: supabaseError.message });
    } else {
      return message(form, {
        status: 200,
        message: "We've sent you an email to reset your password"
      });
    }
  }
};
export {
  actions,
  load
};
