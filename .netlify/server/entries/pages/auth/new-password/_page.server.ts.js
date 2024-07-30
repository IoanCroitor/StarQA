import { f as fail, r as redirect } from "../../../../chunks/index.js";
import "../../../../chunks/client.js";
import "just-clone";
import "ts-deepmerge";
import { z as zod, p as passwordConfirmSchema } from "../../../../chunks/zod-schema.js";
import "devalue";
import { s as superValidate, m as message } from "../../../../chunks/superValidate.js";
import "memoize-weak";
const load = async () => {
  return {
    form: await superValidate(zod(passwordConfirmSchema))
  };
};
const actions = {
  formSubmit: async (event) => {
    const supabase = event.locals.supabase;
    const form = await superValidate(event, zod(passwordConfirmSchema));
    if (!form.valid) {
      return fail(400, {
        form
      });
    }
    const password = form.data.password;
    const { error: supabaseError } = await supabase.auth.updateUser({
      password
    });
    if (supabaseError) {
      console.log(supabaseError);
      const status = supabaseError.status;
      return message(form, { status, message: supabaseError.message });
    } else {
      throw redirect(303, "/auth/login");
    }
  }
};
export {
  actions,
  load
};
