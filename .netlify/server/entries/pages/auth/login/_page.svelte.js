import { c as create_ssr_component, v as validate_component } from "../../../../chunks/ssr.js";
import { s as subscribe } from "../../../../chunks/lifecycle.js";
import { F as Form_field, C as Control, a as Form_label, b as Form_field_errors, c as Form_button, S as Spinner } from "../../../../chunks/index4.js";
import { I as Input } from "../../../../chunks/input.js";
import { t as toast } from "../../../../chunks/Toaster.svelte_svelte_type_style_lang.js";
import "../../../../chunks/client.js";
import "just-clone";
import "ts-deepmerge";
import { s as superForm, e as zodClient, l as loginSchema } from "../../../../chunks/zod-schema.js";
import "../../../../chunks/index.js";
import "devalue";
import "memoize-weak";
const Login_form = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $delayed, $$unsubscribe_delayed;
  let $formData, $$unsubscribe_formData;
  function handleErrorToast(status, error) {
    toast.error(error, {
      description: "Error Code: " + status,
      action: {
        label: "Close",
        onClick: () => console.info("Closed error message: " + error + " with the status: " + status)
      }
    });
  }
  let { data } = $$props;
  const form = superForm(data, { validators: zodClient(loginSchema) });
  const { form: formData, enhance, delayed, message } = form;
  $$unsubscribe_formData = subscribe(formData, (value) => $formData = value);
  $$unsubscribe_delayed = subscribe(delayed, (value) => $delayed = value);
  message.subscribe((value) => {
    if (value) {
      handleErrorToast(value.status, value.message);
    }
  });
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `${$$result.head += `<!-- HEAD_svelte-13cjioy_START -->${$$result.title = `<title>Login Portal</title>`, ""}<!-- HEAD_svelte-13cjioy_END -->`, ""} <div class="grid gap-2"><form method="POST" action="?/formSubmit" class="w-full grid gap-1"> ${validate_component(Form_field, "Form.Field").$$render($$result, { form, name: "email" }, {}, {
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
    })}  ${validate_component(Form_field, "Form.Field").$$render($$result, { form, name: "password" }, {}, {
      default: () => {
        return `${validate_component(Control, "Form.Control").$$render($$result, {}, {}, {
          default: ({ attrs }) => {
            return `${validate_component(Form_label, "Form.Label").$$render($$result, { class: "font-semibold" }, {}, {
              default: () => {
                return `Password`;
              }
            })} ${validate_component(Input, "Input").$$render(
              $$result,
              Object.assign({}, attrs, { type: "password" }, { disabled: $delayed }, { placeholder: "Enter your password" }, { value: $formData.password }),
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
          return `${$delayed ? `${validate_component(Spinner, "Spinner").$$render($$result, {}, {}, {})}` : `Login`}`;
        }
      }
    )}</form> <a href="/auth/reset" class="mx-auto text-sm underline text-foreground" data-svelte-h="svelte-1hz1ouz">Forgot password?</a></div>`;
  } while (!$$settled);
  $$unsubscribe_delayed();
  $$unsubscribe_formData();
  return $$rendered;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  return `<h1 class="text-4xl font-bold tracking-tight capitalize" data-svelte-h="svelte-9uincb">Login</h1> ${validate_component(Login_form, "SettingsForm").$$render($$result, { data: data.form }, {}, {})}`;
});
export {
  Page as default
};
