import { f as fail } from "../../../../chunks/index.js";
import "../../../../chunks/client.js";
import "just-clone";
import "ts-deepmerge";
import { z as zod, c as passwordResetSchema } from "../../../../chunks/zod-schema.js";
import "devalue";
import { s as superValidate, m as message } from "../../../../chunks/superValidate.js";
import "memoize-weak";
import { l as languageTag } from "../../../../chunks/runtime.js";
const we_have_sent_you_an_email_to_reset_your_password$1 = /* @__NO_SIDE_EFFECTS__ */ () => `We have sent you an email with a link to reset your password`;
const we_have_sent_you_an_email_to_reset_your_password = /* @__NO_SIDE_EFFECTS__ */ (params = {}, options = {}) => {
  return {
    en: we_have_sent_you_an_email_to_reset_your_password$1,
    fr: we_have_sent_you_an_email_to_reset_your_password$1,
    ro: we_have_sent_you_an_email_to_reset_your_password$1
  }[options.languageTag ?? languageTag()]();
};
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
        redirectTo: "https://starqa.org/auth/new-password"
      }
    );
    if (supabaseError) {
      console.log(supabaseError);
      const status = supabaseError.status;
      return message(form, { status, message: supabaseError.message });
    } else {
      return message(form, {
        status: 200,
        message: /* @__PURE__ */ we_have_sent_you_an_email_to_reset_your_password()
      });
    }
  }
};
export {
  actions,
  load
};
