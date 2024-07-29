import { c as create_ssr_component, e as escape, d as add_attribute, v as validate_component } from "../../../../chunks/ssr.js";
import { s as subscribe } from "../../../../chunks/lifecycle.js";
import { g as getTranslationFunctions } from "../../../../chunks/index3.js";
import { F as Form_field, C as Control, a as Form_label, b as Form_field_errors, c as Form_button, S as Spinner } from "../../../../chunks/index6.js";
import { I as Input } from "../../../../chunks/input.js";
import "../../../../chunks/Toaster.svelte_svelte_type_style_lang.js";
import "../../../../chunks/client.js";
import "just-clone";
import "ts-deepmerge";
import { s as superForm, e as zodClient, l as loginSchema } from "../../../../chunks/zod-schema.js";
import "../../../../chunks/index.js";
import "devalue";
import "memoize-weak";
import { l as login } from "../../../../chunks/login.js";
import { l as languageTag } from "../../../../chunks/runtime.js";
import { h as handleToast, p as password, e as enter_your_password } from "../../../../chunks/handleToast.js";
import { e as email } from "../../../../chunks/email.js";
const forgot_password$1 = /* @__NO_SIDE_EFFECTS__ */ () => `Forgot Password?`;
const login_portal$1 = /* @__NO_SIDE_EFFECTS__ */ () => `Login Portal`;
const forgot_password = /* @__NO_SIDE_EFFECTS__ */ (params = {}, options = {}) => {
  return {
    en: forgot_password$1,
    fr: forgot_password$1,
    ro: forgot_password$1
  }[options.languageTag ?? languageTag()]();
};
const login_portal = /* @__NO_SIDE_EFFECTS__ */ (params = {}, options = {}) => {
  return {
    en: login_portal$1,
    fr: login_portal$1,
    ro: login_portal$1
  }[options.languageTag ?? languageTag()]();
};
const Login_form = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $delayed, $$unsubscribe_delayed;
  let $formData, $$unsubscribe_formData;
  let { data } = $$props;
  const form = superForm(data, { validators: zodClient(loginSchema) });
  const { form: formData, enhance, delayed, message } = form;
  $$unsubscribe_formData = subscribe(formData, (value) => $formData = value);
  $$unsubscribe_delayed = subscribe(delayed, (value) => $delayed = value);
  message.subscribe((value) => {
    if (value) {
      handleToast("error", value.status, value.message);
    }
  });
  const paraglide_sveltekit_translate_attribute_pass_translationFunctions = getTranslationFunctions();
  const [
    paraglide_sveltekit_translate_attribute_pass_translateAttribute,
    paraglide_sveltekit_translate_attribute_pass_handle_attributes
  ] = paraglide_sveltekit_translate_attribute_pass_translationFunctions;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `${$$result.head += `<!-- HEAD_svelte-44y8bp_START -->${$$result.title = `<title>${escape(/* @__PURE__ */ login_portal())}</title>`, ""}<!-- HEAD_svelte-44y8bp_END -->`, ""} <div class="grid gap-2"><form method="POST"${add_attribute("action", paraglide_sveltekit_translate_attribute_pass_translateAttribute(`?/formSubmit`, void 0), 0)} class="w-full grid gap-1"> ${validate_component(Form_field, "Form.Field").$$render($$result, { form, name: "email" }, {}, {
      default: () => {
        return `${validate_component(Control, "Form.Control").$$render($$result, {}, {}, {
          default: ({ attrs }) => {
            return `${validate_component(Form_label, "Form.Label").$$render($$result, { class: "font-semibold" }, {}, {
              default: () => {
                return `${escape(email())}`;
              }
            })} ${validate_component(Input, "Input").$$render(
              $$result,
              Object.assign({}, { disabled: $delayed }, { autocapitalize: "none" }, { autocomplete: "email" }, { autocorrect: "off" }, attrs, { type: "email" }, { placeholder: "Enter your email" }, { value: $formData.email }),
              {
                value: ($$value) => {
                  $formData.email = $$value;
                  $$settled = false;
                }
              },
              {}
            )}`;
          }
        })} ${validate_component(Form_field_errors, "Form.FieldErrors").$$render($$result, {}, {}, {})}`;
      }
    })}  ${validate_component(Form_field, "Form.Field").$$render($$result, { form, name: "password" }, {}, {
      default: () => {
        return `${validate_component(Control, "Form.Control").$$render($$result, {}, {}, {
          default: ({ attrs }) => {
            return `${validate_component(Form_label, "Form.Label").$$render($$result, { class: "font-semibold" }, {}, {
              default: () => {
                return `${escape(password())}`;
              }
            })} ${validate_component(Input, "Input").$$render(
              $$result,
              Object.assign({}, attrs, { type: "password" }, { disabled: $delayed }, { placeholder: enter_your_password() }, { value: $formData.password }),
              {
                value: ($$value) => {
                  $formData.password = $$value;
                  $$settled = false;
                }
              },
              {}
            )}`;
          }
        })} ${validate_component(Form_field_errors, "Form.FieldErrors").$$render($$result, {}, {}, {})}`;
      }
    })}  ${validate_component(Form_button, "Form.Button").$$render(
      $$result,
      {
        class: "self-start mt-1",
        size: "sm",
        disabled: $delayed
      },
      {},
      {
        default: () => {
          return `${$delayed ? `${validate_component(Spinner, "Spinner").$$render($$result, {}, {}, {})}` : `${escape(login())}`}`;
        }
      }
    )}</form> <a${add_attribute("href", paraglide_sveltekit_translate_attribute_pass_translateAttribute(`/auth/reset`, void 0), 0)} class="mx-auto text-sm underline text-foreground">${escape(/* @__PURE__ */ forgot_password())}</a></div>`;
  } while (!$$settled);
  $$unsubscribe_delayed();
  $$unsubscribe_formData();
  return $$rendered;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  return `<h1 class="text-4xl font-bold tracking-tight capitalize">${escape(login())}</h1> ${validate_component(Login_form, "SettingsForm").$$render($$result, { data: data.form }, {}, {})}`;
});
export {
  Page as default
};
