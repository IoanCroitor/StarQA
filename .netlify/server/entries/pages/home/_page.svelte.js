import { c as create_ssr_component, v as validate_component, e as escape, a as add_attribute } from "../../../chunks/ssr.js";
import { g as getTranslationFunctions } from "../../../chunks/index2.js";
import "../../../chunks/client.js";
import "../../../chunks/index3.js";
import { I as Input } from "../../../chunks/input.js";
import { C as Card, a as Card_header, b as Card_title, c as Card_content } from "../../../chunks/card-title.js";
import { C as Card_description } from "../../../chunks/card-description.js";
import { C as Card_footer } from "../../../chunks/card-footer.js";
import { j as join_a_quiz, a as join_a_quiz_to_rank_higher_in_the_leaderboards, b as join, o as or, c as create } from "../../../chunks/or.js";
import { B as Button } from "../../../chunks/button.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let redirect;
  const paraglide_sveltekit_translate_attribute_pass_translationFunctions = getTranslationFunctions();
  const [
    paraglide_sveltekit_translate_attribute_pass_translateAttribute,
    paraglide_sveltekit_translate_attribute_pass_handle_attributes
  ] = paraglide_sveltekit_translate_attribute_pass_translationFunctions;
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `${validate_component(Card, "Card.Root").$$render($$result, { class: "sm:col-span-2" }, {}, {
      default: () => {
        return `${validate_component(Card_header, "Card.Header").$$render($$result, { class: "pb-3" }, {}, {
          default: () => {
            return `${validate_component(Card_title, "Card.Title").$$render($$result, {}, {}, {
              default: () => {
                return `Account Stas`;
              }
            })} ${validate_component(Card_description, "Card.Description").$$render(
              $$result,
              {
                class: "max-w-lg text-balance leading-relaxed"
              },
              {},
              {
                default: () => {
                  return `Introducing Our Dynamic Orders Dashboard for Seamless Management and
      Insightful Analysis.`;
                }
              }
            )}`;
          }
        })} ${validate_component(Card_footer, "Card.Footer").$$render($$result, {}, {}, {
          default: () => {
            return `${validate_component(Button, "Button").$$render($$result, {}, {}, {
              default: () => {
                return `Create New Order`;
              }
            })}`;
          }
        })}`;
      }
    })} <div class="grid grid-cols-2 grid-rows-1 grid-flow-col gap-2 flex-col sm:flex-row mt-3"><div class="mt-auto">${validate_component(Card, "Card.Root").$$render($$result, {}, {}, {
      default: () => {
        return `${validate_component(Card_header, "Card.Header").$$render($$result, {}, {}, {
          default: () => {
            return `${validate_component(Card_title, "Card.Title").$$render($$result, {}, {}, {
              default: () => {
                return `${escape(join_a_quiz())}`;
              }
            })} ${validate_component(Card_description, "Card.Description").$$render($$result, {}, {}, {
              default: () => {
                return `${escape(join_a_quiz_to_rank_higher_in_the_leaderboards())}`;
              }
            })}`;
          }
        })} ${validate_component(Card_content, "Card.Content").$$render($$result, {}, {}, {
          default: () => {
            return `<div class="flex flex-row gap-2">${validate_component(Input, "Input").$$render(
              $$result,
              { type: "text", value: redirect },
              {
                value: ($$value) => {
                  redirect = $$value;
                  $$settled = false;
                }
              },
              {}
            )} ${validate_component(Button, "Button").$$render($$result, { class: "w-20" }, {}, {
              default: () => {
                return `${escape(join())}`;
              }
            })}</div> <p class="flex justify-center text-muted-foreground text-xs my-1">${escape(or())}</p> <a${add_attribute("href", paraglide_sveltekit_translate_attribute_pass_translateAttribute(`/create`, void 0), 0)}>${validate_component(Button, "Button").$$render($$result, { variant: "secondary", class: "w-full" }, {}, {
              default: () => {
                return `${escape(create())}`;
              }
            })}</a>`;
          }
        })}`;
      }
    })}</div> ${validate_component(Card, "Card.Root").$$render($$result, {}, {}, {
      default: () => {
        return `${validate_component(Card_header, "Card.Header").$$render(
          $$result,
          {
            class: "flex flex-col items-start gap-4 space-y-0"
          },
          {},
          {
            default: () => {
              return `<div class="space-y-4"><div class="w-full h-24 rounded-lg overflow-hidden mx-auto" data-svelte-h="svelte-1hrbagy"><img class="object-cover w-full h-full" alt="Space Race" src="https://cdn.mos.cms.futurecdn.net/iBN6fuoeYTJmqb7y4fjzDn-1200-80.jpg.webp"></div> <div class="px-1"><a${add_attribute("href", paraglide_sveltekit_translate_attribute_pass_translateAttribute(`https://printrestele.netlify.app/`, void 0), 0)} target="_blank" class="space-y-1">${validate_component(Card_title, "Card.Title").$$render($$result, {}, {}, {
                default: () => {
                  return `Razboiul Rece Printre Stele`;
                }
              })} ${validate_component(Card_description, "Card.Description").$$render($$result, {}, {}, {
                default: () => {
                  return `Un site interactiv si educativ in care explorezi subiectul &quot;The
              Space Race&quot;`;
                }
              })}</a></div></div>`;
            }
          }
        )} ${validate_component(Card_content, "Card.Content").$$render($$result, {}, {}, {
          default: () => {
            return `<div class="flex space-x-4 text-sm text-muted-foreground" data-svelte-h="svelte-1kwae4v"><div class="ml-auto">Updated April 2024</div></div>`;
          }
        })}`;
      }
    })}</div>`;
  } while (!$$settled);
  return $$rendered;
});
export {
  Page as default
};
