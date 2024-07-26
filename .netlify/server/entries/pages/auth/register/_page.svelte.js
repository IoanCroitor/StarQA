import { c as create_ssr_component, v as validate_component } from "../../../../chunks/ssr.js";
import { s as subscribe } from "../../../../chunks/lifecycle.js";
import { F as Form_field, C as Control, a as Form_label, b as Form_field_errors, c as Form_button, S as Spinner } from "../../../../chunks/index4.js";
import { I as Input } from "../../../../chunks/input.js";
import { t as toast } from "../../../../chunks/Toaster.svelte_svelte_type_style_lang.js";
import "../../../../chunks/client.js";
import "just-clone";
import "ts-deepmerge";
import { s as superForm, e as zodClient, r as registerSchema } from "../../../../chunks/zod-schema.js";
import "../../../../chunks/index.js";
import "devalue";
import "memoize-weak";
import { c as calculateStrength, p as progressColorFunction, P as Progress } from "../../../../chunks/passwordComplexity.js";
import "dequal";
import "../../../../chunks/index2.js";
const Register_form = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let arePasswordsMathing;
  let strength;
  let progressColor;
  let $formData, $$unsubscribe_formData;
  let $delayed, $$unsubscribe_delayed;
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
  const form = superForm(data, { validators: zodClient(registerSchema) });
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
    arePasswordsMathing = $formData.password === $formData.confirmPassword;
    strength = calculateStrength($formData.password);
    progressColor = progressColorFunction(arePasswordsMathing, $formData.confirmPassword, strength);
    $$rendered = `${$$result.head += `<!-- HEAD_svelte-1hsbyuy_START -->${$$result.title = `<title>Register an account</title>`, ""}<!-- HEAD_svelte-1hsbyuy_END -->`, ""} <div class="grid gap-2"><form method="POST" action="?/formSubmit" class="w-full grid gap-1"> ${validate_component(Form_field, "Form.Field").$$render($$result, { form, name: "email" }, {}, {
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
        })} ${validate_component(Form_field_errors, "Form.FieldErrors").$$render($$result, {}, {}, {})} `;
      }
    })} ${validate_component(Form_field, "Form.Field").$$render($$result, { form, name: "password" }, {}, {
      default: () => {
        return `${validate_component(Control, "Form.Control").$$render($$result, {}, {}, {
          default: ({ attrs }) => {
            return `${validate_component(Form_label, "Form.Label").$$render($$result, { class: "font-semibold" }, {}, {
              default: () => {
                return `Confirm password`;
              }
            })} ${validate_component(Input, "Input").$$render(
              $$result,
              Object.assign({}, attrs, { type: "password" }, { disabled: $delayed }, { placeholder: "Enter your password" }, { value: $formData.confirmPassword }),
              {
                value: ($$value) => {
                  $formData.confirmPassword = $$value;
                  $$settled = false;
                }
              },
              {}
            )}`;
          }
        })}`;
      }
    })} <div class="w-full px-1 my-1">${validate_component(Progress, "Progress").$$render(
      $$result,
      {
        value: strength,
        max: 100,
        class: ` ${progressColor} `
      },
      {},
      {}
    )}</div>  ${validate_component(Form_button, "Form.Button").$$render(
      $$result,
      {
        class: "self-start mt-1",
        size: "sm",
        disabled: !arePasswordsMathing
      },
      {},
      {
        default: () => {
          return `${$delayed ? `${validate_component(Spinner, "Spinner").$$render($$result, {}, {}, {})}` : `Register an account`}`;
        }
      }
    )}</form>  </div>`;
  } while (!$$settled);
  $$unsubscribe_formData();
  $$unsubscribe_delayed();
  return $$rendered;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  return `<h1 class="text-4xl font-bold tracking-tight capitalize" data-svelte-h="svelte-1hc0y5v">Register</h1> ${validate_component(Register_form, "SettingsForm").$$render($$result, { data: data.form }, {}, {})}`;
});
export {
  Page as default
};
