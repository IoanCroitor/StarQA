import { c as create_ssr_component, a as add_attribute, e as escape, v as validate_component } from "../../chunks/ssr.js";
import { g as getTranslationFunctions } from "../../chunks/index2.js";
import "../../chunks/index3.js";
import { l as languageTag } from "../../chunks/runtime.js";
import { l as login } from "../../chunks/login.js";
import { r as register } from "../../chunks/register.js";
import { B as Button } from "../../chunks/button.js";
const tailored_just_for_you$3 = /* @__NO_SIDE_EFFECTS__ */ () => `Tailored Just for You`;
const tailored_just_for_you$2 = /* @__NO_SIDE_EFFECTS__ */ () => `Personalizat doar pentru tine`;
const tailored_just_for_you$1 = /* @__NO_SIDE_EFFECTS__ */ () => `Conçu juste pour vous`;
const tailored_just_for_you = /* @__NO_SIDE_EFFECTS__ */ (params = {}, options = {}) => {
  return {
    en: tailored_just_for_you$3,
    fr: tailored_just_for_you$1,
    ro: tailored_just_for_you$2
  }[options.languageTag ?? languageTag()]();
};
const crafting_stellar_quizzes$3 = /* @__NO_SIDE_EFFECTS__ */ () => `Crafting Stellar Quizzes`;
const crafting_stellar_quizzes$2 = /* @__NO_SIDE_EFFECTS__ */ () => `Creaza chestionare stelare`;
const crafting_stellar_quizzes$1 = /* @__NO_SIDE_EFFECTS__ */ () => `Créer des quiz stellaires`;
const crafting_stellar_quizzes = /* @__NO_SIDE_EFFECTS__ */ (params = {}, options = {}) => {
  return {
    en: crafting_stellar_quizzes$3,
    fr: crafting_stellar_quizzes$1,
    ro: crafting_stellar_quizzes$2
  }[options.languageTag ?? languageTag()]();
};
const css = {
  code: `.b.svelte-1m2thue{background-color:transparent;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.4'%3E%3Cpath opacity='.5' d='M96 95h4v1h-4v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9zm-1 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9z'/%3E%3Cpath d='M6 5V0H5v5H0v1h5v94h1V6h94V5H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")}`,
  map: `{"version":3,"file":"+page.svelte","sources":["+page.svelte"],"sourcesContent":["<script lang=\\"ts\\">\\nimport { getTranslationFunctions as paraglide_sveltekit_translate_attribute_pass_getTranslationFunctions } from '@inlang/paraglide-sveltekit/internal';\\nimport { Button } from \\"$lib/components/ui/button/index.js\\";\\nimport * as m from \\"$lib/paraglide/messages\\";\\n\\nconst paraglide_sveltekit_translate_attribute_pass_translationFunctions = paraglide_sveltekit_translate_attribute_pass_getTranslationFunctions();\\nconst [ paraglide_sveltekit_translate_attribute_pass_translateAttribute, paraglide_sveltekit_translate_attribute_pass_handle_attributes ] = paraglide_sveltekit_translate_attribute_pass_translationFunctions;\\n<\/script>\\n\\n<svelte:head>\\n  <title>StarQA</title>\\n</svelte:head>\\n<div class=\\"w-full min-h-screen relative b\\">\\n  <nav class=\\"absolute top=0 h-16 w-full flex flex-row items-center\\">\\n    <a href={paraglide_sveltekit_translate_attribute_pass_translateAttribute(\\n                                            \`/\`,\\n                                            undefined\\n                                        )} class=\\"text-lg font-semibold ml-6\\">StarQA</a>\\n  </nav>\\n  <article class=\\"flex flex-col justify-center items-center h-screen mx-4\\">\\n    <h1 class=\\"text-3xl text-center font-semibold\\">\\n      <span class=\\"font-bold\\">StarQA⭐:</span>{m.crafting_stellar_quizzes()}\\n    </h1>\\n    <h1 class=\\"text-3xl text-center text-primary/80\\">\\n      {m.tailored_just_for_you()}\\n    </h1>\\n    <div class=\\"flex flex-row gap-2 pt-2\\">\\n      <Button variant=\\"outline\\" href=\\"auth/login\\">{m.login()}</Button>\\n      <Button variant=\\"default\\" href=\\"auth/register\\">{m.register()}</Button>\\n    </div>\\n  </article>\\n</div>\\n\\n<style>\\n  .b {\\n    background-color: transparent;\\n    background-image: url(\\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.4'%3E%3Cpath opacity='.5' d='M96 95h4v1h-4v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9zm-1 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9z'/%3E%3Cpath d='M6 5V0H5v5H0v1h5v94h1V6h94V5H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\\");\\n  }\\n</style>\\n"],"names":[],"mappings":"AAkCE,iBAAG,CACD,gBAAgB,CAAE,WAAW,CAC7B,gBAAgB,CAAE,sqDACpB"}`
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const paraglide_sveltekit_translate_attribute_pass_translationFunctions = getTranslationFunctions();
  const [
    paraglide_sveltekit_translate_attribute_pass_translateAttribute,
    paraglide_sveltekit_translate_attribute_pass_handle_attributes
  ] = paraglide_sveltekit_translate_attribute_pass_translationFunctions;
  $$result.css.add(css);
  return `${$$result.head += `<!-- HEAD_svelte-168wlsn_START -->${$$result.title = `<title>StarQA</title>`, ""}<!-- HEAD_svelte-168wlsn_END -->`, ""} <div class="w-full min-h-screen relative b svelte-1m2thue"><nav class="absolute top=0 h-16 w-full flex flex-row items-center"><a${add_attribute("href", paraglide_sveltekit_translate_attribute_pass_translateAttribute(`/`, void 0), 0)} class="text-lg font-semibold ml-6">StarQA</a></nav> <article class="flex flex-col justify-center items-center h-screen mx-4"><h1 class="text-3xl text-center font-semibold"><span class="font-bold" data-svelte-h="svelte-1d71m7q">StarQA⭐:</span>${escape(/* @__PURE__ */ crafting_stellar_quizzes())}</h1> <h1 class="text-3xl text-center text-primary/80">${escape(/* @__PURE__ */ tailored_just_for_you())}</h1> <div class="flex flex-row gap-2 pt-2">${validate_component(Button, "Button").$$render($$result, { variant: "outline", href: "auth/login" }, {}, {
    default: () => {
      return `${escape(login())}`;
    }
  })} ${validate_component(Button, "Button").$$render(
    $$result,
    {
      variant: "default",
      href: "auth/register"
    },
    {},
    {
      default: () => {
        return `${escape(register())}`;
      }
    }
  )}</div></article> </div>`;
});
export {
  Page as default
};
