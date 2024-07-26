import { e as compute_rest_props } from "./lifecycle.js";
import { c as create_ssr_component, s as spread, a as escape_attribute_value, b as escape_object } from "./ssr.js";
import { c as cn, i as is_void } from "./index4.js";
import { g as getTranslationFunctions } from "./index2.js";
const Card_description = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class"]);
  let { class: className = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0) $$bindings.class(className);
  return `<p${spread(
    [
      {
        class: escape_attribute_value(cn("text-sm text-muted-foreground", className))
      },
      escape_object($$restProps)
    ],
    {}
  )}>${slots.default ? slots.default({}) : ``}</p>`;
});
const Card_header = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class"]);
  let { class: className = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0) $$bindings.class(className);
  return `<div${spread(
    [
      {
        class: escape_attribute_value(cn("flex flex-col space-y-1.5 p-6", className))
      },
      escape_object($$restProps)
    ],
    {}
  )}>${slots.default ? slots.default({}) : ``}</div>`;
});
const Card_title = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class", "tag"]);
  let { class: className = void 0 } = $$props;
  let { tag = "h3" } = $$props;
  const paraglide_sveltekit_translate_attribute_pass_translationFunctions = getTranslationFunctions();
  const [
    paraglide_sveltekit_translate_attribute_pass_translateAttribute,
    paraglide_sveltekit_translate_attribute_pass_handle_attributes
  ] = paraglide_sveltekit_translate_attribute_pass_translationFunctions;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0) $$bindings.class(className);
  if ($$props.tag === void 0 && $$bindings.tag && tag !== void 0) $$bindings.tag(tag);
  return `${((tag$1) => {
    return tag$1 ? `<${tag}${spread(
      [
        escape_object(`${tag}` === "button" ? paraglide_sveltekit_translate_attribute_pass_handle_attributes(
          {
            "class": cn("font-semibold leading-none tracking-tight", className),
            ...$$restProps
          },
          [{ attribute_name: "formaction" }]
        ) : `${tag}` === "form" ? paraglide_sveltekit_translate_attribute_pass_handle_attributes(
          {
            "class": cn("font-semibold leading-none tracking-tight", className),
            ...$$restProps
          },
          [{ attribute_name: "action" }]
        ) : `${tag}` === "a" ? paraglide_sveltekit_translate_attribute_pass_handle_attributes(
          {
            "class": cn("font-semibold leading-none tracking-tight", className),
            ...$$restProps
          },
          [
            {
              attribute_name: "href",
              lang_attribute_name: "hreflang"
            }
          ]
        ) : {
          "class": cn("font-semibold leading-none tracking-tight", className),
          ...$$restProps
        })
      ],
      {}
    )}>${is_void(tag$1) ? "" : `${slots.default ? slots.default({}) : ``}`}${is_void(tag$1) ? "" : `</${tag$1}>`}` : "";
  })(tag)}`;
});
export {
  Card_header as C,
  Card_title as a,
  Card_description as b
};
