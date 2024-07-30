import { c as compute_rest_props, s as subscribe } from "../../../chunks/lifecycle.js";
import { c as create_ssr_component, s as spread, b as escape_attribute_value, d as escape_object, v as validate_component, e as escape, a as add_attribute } from "../../../chunks/ssr.js";
import { g as getTranslationFunctions } from "../../../chunks/index2.js";
import { c as cn } from "../../../chunks/utils.js";
import "../../../chunks/index3.js";
import "../../../chunks/client.js";
import "../../../chunks/Toaster.svelte_svelte_type_style_lang.js";
import { l as languageTag } from "../../../chunks/runtime.js";
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
const by_continuing_you_agree_to_the$1 = /* @__NO_SIDE_EFFECTS__ */ () => `By continuing, you agree to the`;
const terms_of_service$1 = /* @__NO_SIDE_EFFECTS__ */ () => `Terms of Service`;
const and$1 = /* @__NO_SIDE_EFFECTS__ */ () => `and`;
const privacy_policy$1 = /* @__NO_SIDE_EFFECTS__ */ () => `Privacy Policy`;
const error_fetching_author$1 = /* @__NO_SIDE_EFFECTS__ */ () => `Error fetching author`;
const error_loading_image_from$3 = /* @__NO_SIDE_EFFECTS__ */ (params) => `Error loading image from ${params.author}`;
const on$3 = /* @__NO_SIDE_EFFECTS__ */ (params) => `on ${params.name}`;
const by_continuing_you_agree_to_the = /* @__NO_SIDE_EFFECTS__ */ (params = {}, options = {}) => {
  return {
    en: by_continuing_you_agree_to_the$1,
    fr: by_continuing_you_agree_to_the$1,
    ro: by_continuing_you_agree_to_the$1
  }[options.languageTag ?? languageTag()]();
};
const terms_of_service = /* @__NO_SIDE_EFFECTS__ */ (params = {}, options = {}) => {
  return {
    en: terms_of_service$1,
    fr: terms_of_service$1,
    ro: terms_of_service$1
  }[options.languageTag ?? languageTag()]();
};
const and = /* @__NO_SIDE_EFFECTS__ */ (params = {}, options = {}) => {
  return {
    en: and$1,
    fr: and$1,
    ro: and$1
  }[options.languageTag ?? languageTag()]();
};
const privacy_policy = /* @__NO_SIDE_EFFECTS__ */ (params = {}, options = {}) => {
  return {
    en: privacy_policy$1,
    fr: privacy_policy$1,
    ro: privacy_policy$1
  }[options.languageTag ?? languageTag()]();
};
const error_fetching_author = /* @__NO_SIDE_EFFECTS__ */ (params = {}, options = {}) => {
  return {
    en: error_fetching_author$1,
    fr: error_fetching_author$1,
    ro: error_fetching_author$1
  }[options.languageTag ?? languageTag()]();
};
const error_loading_image_from$2 = /* @__NO_SIDE_EFFECTS__ */ (params) => `Eroare la încărcarea imaginii de la ${params.author}`;
const error_loading_image_from$1 = /* @__NO_SIDE_EFFECTS__ */ (params) => `Erreur de chargement de l'image depuis ${params.author}`;
const error_loading_image_from = /* @__NO_SIDE_EFFECTS__ */ (params, options = {}) => {
  return {
    en: error_loading_image_from$3,
    fr: error_loading_image_from$1,
    ro: error_loading_image_from$2
  }[options.languageTag ?? languageTag()](params);
};
const on$2 = /* @__NO_SIDE_EFFECTS__ */ (params) => `pe ${params.name}`;
const on$1 = /* @__NO_SIDE_EFFECTS__ */ (params) => `sur ${params.name}`;
const on = /* @__NO_SIDE_EFFECTS__ */ (params, options = {}) => {
  return {
    en: on$3,
    fr: on$1,
    ro: on$2
  }[options.languageTag ?? languageTag()](params);
};
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
  const paraglide_sveltekit_translate_attribute_pass_translationFunctions = getTranslationFunctions();
  const [
    paraglide_sveltekit_translate_attribute_pass_translateAttribute,
    paraglide_sveltekit_translate_attribute_pass_handle_attributes
  ] = paraglide_sveltekit_translate_attribute_pass_translationFunctions;
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
  )} <div class="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">${photo ? `<img${add_attribute("src", photo.image_url, 0)}${add_attribute("alt", photo.image_description, 0)} class="absolute inset-0 h-full w-full object-cover text-transparent">` : `${validate_component(Skeleton, "Skeleton").$$render($$result, { class: "absolute inset-0 h-full w-full" }, {}, {})}`} <div class="absolute inset-0 bottom-0 w-full h-full bg-gradient-to-t from-background via-transparent to-background/50"></div> <div class="relative z-20 flex items-center text-lg font-medium" data-svelte-h="svelte-om933n">StarQA</div> <div class="relative flex z-20 mt-auto justify-between"><blockquote class=""><p class="text-xl">“${escape(randomQuote?.text)}”</p> <footer class="text-sm">${escape(randomQuote?.author)}</footer></blockquote> <blockquote class="text-primary/70 text-right">${photo ? `<p class="text-sm truncate"><span class="text-right">${escape(photo.image_author)} </span><a class=""${add_attribute("href", paraglide_sveltekit_translate_attribute_pass_translateAttribute(photo.image_url, void 0), 0)}>${escape(/* @__PURE__ */ on({ name: "Unsplash" }))}</a></p> <footer class="text-xs truncate max-w-40">${escape(photo.image_description)}</footer>` : `<p class="text-sm truncate"><span class="" data-svelte-h="svelte-1hxmpbm">Error loading image from </span><a${add_attribute("href", paraglide_sveltekit_translate_attribute_pass_translateAttribute(`unsplash.com`, void 0), 0)}>Unsplash</a> ${escape(/* @__PURE__ */ error_loading_image_from({ author: "Unsplash" }))}</p> <footer class="text-xs truncate max-w-40">${escape(/* @__PURE__ */ error_fetching_author())}</footer>`}</blockquote></div></div> <div class="p-4 mx:p-8"><div class="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">${slots.default ? slots.default({}) : ``}   <p class="px-8 text-center text-sm text-muted-foreground">${escape(/* @__PURE__ */ by_continuing_you_agree_to_the())} <a${add_attribute("href", paraglide_sveltekit_translate_attribute_pass_translateAttribute(`/terms`, void 0), 0)} class="underline underline-offset-4 hover:text-primary">${escape(/* @__PURE__ */ terms_of_service())}</a> ${escape(/* @__PURE__ */ and())} <a${add_attribute("href", paraglide_sveltekit_translate_attribute_pass_translateAttribute(`/privacy`, void 0), 0)} class="underline underline-offset-4 hover:text-primary">${escape(/* @__PURE__ */ privacy_policy())}</a>
        .</p></div></div></div>`;
});
export {
  Layout as default
};
