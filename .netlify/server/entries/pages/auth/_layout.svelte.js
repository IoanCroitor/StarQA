import { d as compute_rest_props, s as subscribe } from "../../../chunks/lifecycle.js";
import { c as create_ssr_component, s as spread, a as escape_attribute_value, b as escape_object, v as validate_component, e as escape, d as add_attribute } from "../../../chunks/ssr.js";
import { c as cn } from "../../../chunks/index2.js";
import "../../../chunks/client.js";
import "../../../chunks/Toaster.svelte_svelte_type_style_lang.js";
import { p as page } from "../../../chunks/stores.js";
import { B as Button } from "../../../chunks/button.js";
const Skeleton = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class"]);
  let { class: className = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0) $$bindings.class(className);
  return `<div${spread(
    [
      {
        class: escape_attribute_value(cn("animate-pulse rounded-md bg-primary/10", className))
      },
      escape_object($$restProps)
    ],
    {}
  )}></div>`;
});
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let { data } = $$props;
  let photo = data.photo;
  const quotes = [
    {
      text: "This project has a lot of potential to become something awesome!",
      author: "Reddit comment"
    },
    {
      text: "Foarte frumos, bravo!",
      author: "Diaconu Maria - profesoara de istorie"
    },
    {
      text: "Misto",
      author: "Simeon, fatele meu"
    }
  ];
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  let fullRoute = $page.url.pathname;
  let route = fullRoute.split("/").pop();
  let buttontext = route === "login" ? "Register" : "Sign in";
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  $$unsubscribe_page();
  return `<div class="container relative h-screen flex-col items-center justify-center grid max-w-none lg:grid-cols-2 lg:px-0">${validate_component(Button, "Button").$$render(
    $$result,
    {
      href: route,
      class: "absolute right-4 top-4 md:right-8 md:top-8"
    },
    {},
    {
      default: () => {
        return `${escape(buttontext)}`;
      }
    }
  )} <div class="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">${photo ? `<img${add_attribute("src", photo.image_url, 0)}${add_attribute("alt", photo.image_description, 0)} class="absolute inset-0 h-full w-full object-cover text-transparent">` : `${validate_component(Skeleton, "Skeleton").$$render($$result, { class: "absolute inset-0 h-full w-full" }, {}, {})}`} <div class="absolute inset-0 bottom-0 w-full h-full bg-gradient-to-t from-background via-transparent to-background/50"></div> <div class="relative z-20 flex items-center text-lg font-medium" data-svelte-h="svelte-om933n">StarQA</div> <div class="relative flex z-20 mt-auto justify-between"><blockquote class=""><p class="text-xl">“${escape(randomQuote?.text)}”</p> <footer class="text-sm">${escape(randomQuote?.author)}</footer></blockquote> <blockquote class="text-primary/70 text-right">${photo ? `<p class="text-sm truncate"><span class="text-right">${escape(photo.image_author)} </span><a class=""${add_attribute("href", photo.image_url, 0)}>on Unsplash</a></p> <footer class="text-xs truncate max-w-40">${escape(photo.image_description)}</footer>` : `<p class="text-sm truncate" data-svelte-h="svelte-1ljj6nd"><span class="">Error loading image from </span><a class="" href="unsplash.com">Unsplash</a></p> <footer class="text-xs truncate max-w-40" data-svelte-h="svelte-1v40op0">Error fetching author</footer>`}</blockquote></div></div> <div class="p-4 mx:p-8"><div class="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">${slots.default ? slots.default({}) : ``}   <p class="px-8 text-center text-sm text-muted-foreground" data-svelte-h="svelte-v0f4iv">By clicking continue, you agree to our
        <a href="/terms" class="underline underline-offset-4 hover:text-primary">Terms of Service</a>
        and
        <a href="/privacy" class="underline underline-offset-4 hover:text-primary">Privacy Policy</a>
        .</p></div></div></div>`;
});
export {
  Layout as default
};
