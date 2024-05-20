import { c as create_ssr_component, v as validate_component } from "../../../../chunks/ssr.js";
import "../../../../chunks/client.js";
import "../../../../chunks/index3.js";
import { L as Label, I as Input } from "../../../../chunks/label.js";
import "../../../../chunks/index4.js";
import "../../../../chunks/pocketbase.js";
import { B as Button } from "../../../../chunks/button.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let isLoading = false;
  let email = "";
  let password = "";
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `${$$result.head += `<!-- HEAD_svelte-13cjioy_START -->${$$result.title = `<title>Login Portal</title>`, ""}<!-- HEAD_svelte-13cjioy_END -->`, ""} <div class="grid gap-2"><div class="grid gap-1">${``} <div class="grid gap-2">${validate_component(Label, "Label").$$render($$result, { for: "email" }, {}, {
      default: () => {
        return `Email`;
      }
    })} ${validate_component(Input, "Input").$$render(
      $$result,
      {
        id: "email",
        placeholder: "ioan@example.com",
        type: "email",
        autocapitalize: "none",
        autocomplete: "email",
        autocorrect: "off",
        disabled: isLoading,
        value: email
      },
      {
        value: ($$value) => {
          email = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div> <div class="grid gap-2 pt-2">${validate_component(Label, "Label").$$render($$result, { for: "password" }, {}, {
      default: () => {
        return `Password`;
      }
    })} ${validate_component(Input, "Input").$$render(
      $$result,
      {
        id: "password",
        type: "password",
        value: password
      },
      {
        value: ($$value) => {
          password = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div></div> ${validate_component(Button, "Button").$$render($$result, { type: "submit", disabled: isLoading }, {}, {
      default: () => {
        return `${``}
    Sign In with Email`;
      }
    })}</div>`;
  } while (!$$settled);
  return $$rendered;
});
export {
  Page as default
};
