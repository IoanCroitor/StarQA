import { s as subscribe } from "../../../../chunks/lifecycle.js";
import { c as create_ssr_component, v as validate_component, d as add_attribute, e as escape, f as each } from "../../../../chunks/ssr.js";
import "../../../../chunks/index2.js";
import { C as Card, a as Card_content } from "../../../../chunks/card-content.js";
import { C as Card_header, a as Card_title, b as Card_description } from "../../../../chunks/card-title.js";
import "clsx";
import { w as writable } from "../../../../chunks/index3.js";
const Card_1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { id } = $$props;
  let { title } = $$props;
  let { description } = $$props;
  let { cover_image } = $$props;
  console.log(`https://starqa.pockethost.io/api/files/collections/quizzes/${id}/${cover_image}`);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0) $$bindings.id(id);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0) $$bindings.title(title);
  if ($$props.description === void 0 && $$bindings.description && description !== void 0) $$bindings.description(description);
  if ($$props.cover_image === void 0 && $$bindings.cover_image && cover_image !== void 0) $$bindings.cover_image(cover_image);
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
            return `<div class="space-y-4"><div class="h-24 rounded-lg overflow-hidden w-full"><img class="object-cover" alt="Space Race"${add_attribute("src", `https://starqa.pockethost.io/api/files/quizzes/${id}/${cover_image}`, 0)}></div> <div class="px-1"><a${add_attribute("href", `/home/${id}`, 0)} target="_blank" class="space-y-1">${validate_component(Card_title, "Card.Title").$$render($$result, {}, {}, {
              default: () => {
                return `${escape(title)}`;
              }
            })} ${validate_component(Card_description, "Card.Description").$$render($$result, {}, {}, {
              default: () => {
                return `${escape(description)}`;
              }
            })}</a></div></div>`;
          }
        }
      )} ${validate_component(Card_content, "Card.Content").$$render($$result, {}, {}, {
        default: () => {
          return `<div class="flex space-x-4 text-sm text-muted-foreground" data-svelte-h="svelte-16tngdo"><div class="ml-auto">Updated May 2024</div></div>`;
        }
      })}`;
    }
  })}`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $records, $$unsubscribe_records;
  const records = writable([]);
  $$unsubscribe_records = subscribe(records, (value) => $records = value);
  $$unsubscribe_records();
  return `${$records && $records.length > 0 ? `<div class="flex items-center" data-svelte-h="svelte-1r7sclb"><h2 class="text-lg font-semibold md:text-2xl">Completed Quizzes</h2></div> <div class="flex flex-1 rounded-lg border border-dashed shadow-sm p-4"><div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-5 gap-2 w-full h-min">${each($records, (quiz) => {
    return `${validate_component(Card_1, "Card").$$render(
      $$result,
      {
        id: quiz.id,
        title: quiz.title,
        description: quiz.description,
        cover_image: quiz.cover_image
      },
      {},
      {}
    )}`;
  })}</div></div>` : `<div class="flex items-center" data-svelte-h="svelte-pepqq2"><h2 class="text-lg font-semibold md:text-2xl">Searching🔎</h2></div>`}`;
});
export {
  Page as default
};
