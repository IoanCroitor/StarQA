import { c as create_ssr_component, b as compute_rest_props, d as spread, f as escape_attribute_value, h as escape_object, v as validate_component, e as escape, i as add_attribute } from "../../../chunks/ssr.js";
import { c as cn } from "../../../chunks/utils.js";
import "../../../chunks/index3.js";
import "../../../chunks/index.js";
import PocketBase from "pocketbase";
import { B as Button } from "../../../chunks/button.js";
import "../../../chunks/pocketbase.js";
import "../../../chunks/client.js";
const Skeleton = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class"]);
  let { class: className = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
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
const Google = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, []);
  return `<svg${spread([{ role: "img" }, { viewBox: "0 0 24 24" }, escape_object($$restProps)], {})}><path fill="currentColor" d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"></path></svg>`;
});
let isLoading = false;
const ContinueWithGoogle = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  new PocketBase("https://starqa.pockethost.io");
  return `<div class="relative" data-svelte-h="svelte-1i6huj5"><div class="absolute inset-0 flex items-center"><span class="w-full border-t"></span></div> <div class="relative flex justify-center text-xs uppercase"><span class="bg-background px-2 text-muted-foreground">Or continue with</span></div></div> ${validate_component(Button, "Button").$$render(
    $$result,
    {
      variant: "outline",
      type: "button",
      disabled: isLoading
    },
    {},
    {
      default: () => {
        return `${`${validate_component(Google, "Google").$$render($$result, { class: "mr-2 h-4 w-4" }, {}, {})}`}
  Google`;
      }
    }
  )}`;
});
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
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
  let route = "login";
  let buttontext = "Register";
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
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
  )} <div class="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">${photo ? `<img${add_attribute("src", photo.image_url, 0)}${add_attribute("alt", photo.image_description, 0)} class="absolute inset-0 h-full w-full object-cover text-transparent">` : `${validate_component(Skeleton, "Skeleton").$$render($$result, { class: "absolute inset-0 h-full w-full" }, {}, {})}`} <div class="absolute inset-0 bottom-0 w-full h-full bg-gradient-to-t from-background via-transparent to-background/50"></div> <div class="relative z-20 flex items-center text-lg font-medium" data-svelte-h="svelte-om933n">StarQA</div> <div class="relative flex z-20 mt-auto justify-between"><blockquote class=""><p class="text-xl">“${escape(randomQuote.text)}”</p> <footer class="text-sm">${escape(randomQuote.author)}</footer></blockquote> <blockquote class="text-primary/70 text-right">${photo ? `<p class="text-sm truncate"><span class="text-right">${escape(photo.image_author)} </span><a class=""${add_attribute("href", photo.image_url, 0)}>on Unsplash</a></p> <footer class="text-xs truncate max-w-40">${escape(photo.image_description)}</footer>` : `<p class="text-sm truncate" data-svelte-h="svelte-1ljj6nd"><span class="">Error loading image from </span><a class="" href="unsplash.com">Unsplash</a></p> <footer class="text-xs truncate max-w-40" data-svelte-h="svelte-1v40op0">Error fetching author</footer>`}</blockquote></div></div> <div class="p-4 mx:p-8"><div class="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]"><h1 class="text-4xl font-bold tracking-tight capitalize">${escape(route)}</h1> ${slots.default ? slots.default({}) : ``} ${validate_component(ContinueWithGoogle, "ContinueWithGoogle").$$render($$result, {}, {}, {})} <p class="px-8 text-center text-sm text-muted-foreground" data-svelte-h="svelte-v0f4iv">By clicking continue, you agree to our
        <a href="/terms" class="underline underline-offset-4 hover:text-primary">Terms of Service</a>
        and
        <a href="/privacy" class="underline underline-offset-4 hover:text-primary">Privacy Policy</a>
        .</p></div></div></div>`;
});
export {
  Layout as default
};
