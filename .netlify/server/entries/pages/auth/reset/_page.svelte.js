import { c as create_ssr_component, d as add_attribute, v as validate_component } from "../../../../chunks/ssr.js";
import { s as subscribe } from "../../../../chunks/lifecycle.js";
import { g as getTranslationFunctions } from "../../../../chunks/index2.js";
import { F as Form_field, C as Control, a as Form_label, b as Form_field_errors, c as Form_button, S as Spinner } from "../../../../chunks/index5.js";
import { I as Input } from "../../../../chunks/input.js";
import { t as toast } from "../../../../chunks/Toaster.svelte_svelte_type_style_lang.js";
import "../../../../chunks/client.js";
import "just-clone";
import "ts-deepmerge";
import { s as superForm, e as zodClient, a as passwordResetSchema } from "../../../../chunks/zod-schema.js";
import "../../../../chunks/index.js";
import "devalue";
import "memoize-weak";
const Password_reset_form = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $delayed, $$unsubscribe_delayed;
  let $formData, $$unsubscribe_formData;
  function handleErrorToast(status, error) {
    toast.error(error, {
      description: "Code: " + status,
      action: {
        label: "Close",
        onClick: () => console.info("Closed message: " + error + " with the status: " + status)
      }
    });
  }
  let { data } = $$props;
  const form = superForm(data, {
    validators: zodClient(passwordResetSchema)
  });
  const { form: formData, enhance, delayed, message } = form;
  $$unsubscribe_formData = subscribe(formData, (value) => $formData = value);
  $$unsubscribe_delayed = subscribe(delayed, (value) => $delayed = value);
  message.subscribe((value) => {
    if (value) {
      handleErrorToast(value.status, value.message);
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
    $$rendered = `<div class="grid gap-2"><form method="POST"${add_attribute("action", paraglide_sveltekit_translate_attribute_pass_translateAttribute(`?/formSubmit`, void 0), 0)} class="w-full grid gap-1"> ${validate_component(Form_field, "Form.Field").$$render($$result, { form, name: "email" }, {}, {
      default: () => {
        return `${validate_component(Control, "Form.Control").$$render($$result, {}, {}, {
          default: ({ attrs }) => {
            return `${validate_component(Form_label, "Form.Label").$$render($$result, { class: "font-semibold" }, {}, {
              default: () => {
                return `Email`;
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
    })} ${validate_component(Form_button, "Form.Button").$$render(
      $$result,
      {
        class: "self-start mt-1",
        size: "sm",
        disabled: $delayed
      },
      {},
      {
        default: () => {
          return `${$delayed ? `${validate_component(Spinner, "Spinner").$$render($$result, {}, {}, {})}` : `Reset Password`}`;
        }
      }
    )}</form></div>`;
  } while (!$$settled);
  $$unsubscribe_delayed();
  $$unsubscribe_formData();
  return $$rendered;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  return `${$$result.head += `<!-- HEAD_svelte-1szam7g_START -->Reset Password<!-- HEAD_svelte-1szam7g_END -->`, ""} ${validate_component(Password_reset_form, "SettingsForm").$$render($$result, { data: data.form }, {}, {})}`;
});
export {
  Page as default
};
