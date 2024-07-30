import { s as subscribe } from "../../../../chunks/lifecycle.js";
import { c as create_ssr_component, v as validate_component, e as escape } from "../../../../chunks/ssr.js";
import "dequal";
import "../../../../chunks/index3.js";
import "clsx";
import "../../../../chunks/Toaster.svelte_svelte_type_style_lang.js";
import { C as Card, a as Card_header, b as Card_title, c as Card_content } from "../../../../chunks/card-title.js";
import { C as Card_description } from "../../../../chunks/card-description.js";
import "../../../../chunks/functions.js";
import { p as page } from "../../../../chunks/stores.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let { data } = $$props;
  let currentQuestionIndex = 0;
  let quizId = Number($page.url.pathname.split("/").filter(Boolean).pop());
  let responses = {};
  let score = 0;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  {
    console.log("score", score);
  }
  {
    console.log("quizId:", quizId);
  }
  {
    console.log(responses);
  }
  $$unsubscribe_page();
  return `${`<div class="py-2">${validate_component(Card, "Card.Root").$$render($$result, {}, {}, {
    default: () => {
      return `${validate_component(Card_header, "Card.Header").$$render($$result, { class: "border-b" }, {}, {
        default: () => {
          return `<div class="flex flex-row gap-2 items-center">${validate_component(Card_title, "Card.Title").$$render($$result, { class: "bg-secondary p-2 rounded-lg" }, {}, {
            default: () => {
              return `Question ${escape(currentQuestionIndex + 1)}`;
            }
          })} ${validate_component(Card_description, "Card.Description").$$render($$result, { class: "text-muted-foreground/50" }, {}, {
            default: () => {
              return `Carefully read the description and answer the question.`;
            }
          })}</div>`;
        }
      })} ${validate_component(Card_content, "Card.Content").$$render($$result, {}, {}, {
        default: () => {
          return `${`<p data-svelte-h="svelte-ypm6p2">Loading question...</p>`}`;
        }
      })} `;
    }
  })}</div>`}`;
});
export {
  Page as default
};
