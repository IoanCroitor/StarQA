import { c as create_ssr_component, v as validate_component } from "../../../../chunks/ssr.js";
import "../../../../chunks/index3.js";
import { C as Card, a as Card_header, b as Card_title, c as Card_content } from "../../../../chunks/card-title.js";
import { C as Card_description } from "../../../../chunks/card-description.js";
import { C as Card_footer } from "../../../../chunks/card-footer.js";
import { I as Input } from "../../../../chunks/input.js";
import { L as Label } from "../../../../chunks/label.js";
import "../../../../chunks/Toaster.svelte_svelte_type_style_lang.js";
import { B as Button } from "../../../../chunks/button.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  const { supabase, user } = data;
  let name = "";
  let username = "";
  user?.id;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `${validate_component(Card, "Card.Root").$$render($$result, { class: "w-[350px]" }, {}, {
      default: () => {
        return `${validate_component(Card_header, "Card.Header").$$render($$result, {}, {}, {
          default: () => {
            return `${validate_component(Card_title, "Card.Title").$$render($$result, {}, {}, {
              default: () => {
                return `Edit Profile`;
              }
            })} ${validate_component(Card_description, "Card.Description").$$render($$result, {}, {}, {
              default: () => {
                return `Update your profile information`;
              }
            })}`;
          }
        })} ${validate_component(Card_content, "Card.Content").$$render($$result, {}, {}, {
          default: () => {
            return `<form><div class="grid w-full items-center gap-4"><div class="flex flex-col space-y-1.5">${validate_component(Label, "Label").$$render($$result, { for: "profile-picture" }, {}, {
              default: () => {
                return `Profile Picture`;
              }
            })} ${validate_component(Input, "Input").$$render(
              $$result,
              {
                id: "profile-picture",
                type: "file",
                accept: "image/*"
              },
              {},
              {}
            )}</div> <div class="flex flex-col space-y-1.5">${validate_component(Label, "Label").$$render($$result, { for: "name" }, {}, {
              default: () => {
                return `Name`;
              }
            })} ${validate_component(Input, "Input").$$render(
              $$result,
              {
                id: "name",
                placeholder: "Enter your name",
                value: name
              },
              {
                value: ($$value) => {
                  name = $$value;
                  $$settled = false;
                }
              },
              {}
            )}</div> <div class="flex flex-col space-y-1.5">${validate_component(Label, "Label").$$render($$result, { for: "username" }, {}, {
              default: () => {
                return `Username`;
              }
            })} ${validate_component(Input, "Input").$$render(
              $$result,
              {
                id: "username",
                placeholder: "Enter your username",
                value: username
              },
              {
                value: ($$value) => {
                  username = $$value;
                  $$settled = false;
                }
              },
              {}
            )}</div></div> ${validate_component(Card_footer, "Card.Footer").$$render($$result, { class: "flex justify-between mt-4" }, {}, {
              default: () => {
                return `${validate_component(Button, "Button").$$render($$result, { variant: "outline", type: "button" }, {}, {
                  default: () => {
                    return `Cancel`;
                  }
                })} ${validate_component(Button, "Button").$$render($$result, { type: "submit" }, {}, {
                  default: () => {
                    return `Save`;
                  }
                })}`;
              }
            })}</form>`;
          }
        })}`;
      }
    })}`;
  } while (!$$settled);
  return $$rendered;
});
export {
  Page as default
};
