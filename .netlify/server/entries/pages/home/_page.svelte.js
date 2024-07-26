import { c as create_ssr_component, v as validate_component, d as add_attribute } from "../../../chunks/ssr.js";
import "../../../chunks/index4.js";
import { g as getTranslationFunctions } from "../../../chunks/index2.js";
import { C as Card, a as Card_content } from "../../../chunks/card-content.js";
import { C as Card_header, a as Card_title, b as Card_description } from "../../../chunks/card-title.js";
import "clsx";
const PromotedWebsite = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const paraglide_sveltekit_translate_attribute_pass_translationFunctions = getTranslationFunctions();
  const [
    paraglide_sveltekit_translate_attribute_pass_translateAttribute,
    paraglide_sveltekit_translate_attribute_pass_handle_attributes
  ] = paraglide_sveltekit_translate_attribute_pass_translationFunctions;
  return `${validate_component(Card, "Card.Root").$$render($$result, {}, {}, {
    default: () => {
      return `${validate_component(Card_header, "Card.Header").$$render(
        $$result,
        {
          class: "flex flex-col items-start gap-4 space-y-0"
        },
        {},
        {
          default: () => {
            return `<div class="space-y-4"><div class="w-full h-24 rounded-lg overflow-hidden" data-svelte-h="svelte-16t4if9"><img class="object-cover w-full h-full" alt="Space Race" src="https://cdn.mos.cms.futurecdn.net/iBN6fuoeYTJmqb7y4fjzDn-1200-80.jpg.webp"></div> <div class="px-1"><a${add_attribute("href", paraglide_sveltekit_translate_attribute_pass_translateAttribute(`https://printrestele.netlify.app/`, void 0), 0)} target="_blank" class="space-y-1">${validate_component(Card_title, "Card.Title").$$render($$result, {}, {}, {
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
          return `<div class="flex space-x-4 text-sm text-muted-foreground" data-svelte-h="svelte-1v2gqof"><div class="ml-auto">Updated April 2024</div></div>`;
        }
      })}`;
    }
  })}`;
});
const Content = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="flex items-center" data-svelte-h="svelte-1e4g018"><h2 class="text-lg font-semibold md:text-2xl">Quizzes</h2></div> <div class="flex flex-1 rounded-lg border border-dashed shadow-sm p-4"><div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-5 gap-2 w-full h-min">${validate_component(PromotedWebsite, "PromotedWebsite").$$render($$result, {}, {}, {})} </div></div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(Content, "Content").$$render($$result, {}, {}, {})}`;
});
export {
  Page as default
};
