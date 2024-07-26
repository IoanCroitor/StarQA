import { e as compute_rest_props } from "./lifecycle.js";
import { c as create_ssr_component, s as spread, b as escape_object, d as add_attribute, v as validate_component } from "./ssr.js";
import "dequal";
import { i as is_void, c as cn, b as buttonVariants } from "./index4.js";
import { g as getTranslationFunctions } from "./index2.js";
function getAttrs(builders) {
  const attrs = {};
  builders.forEach((builder) => {
    Object.keys(builder).forEach((key) => {
      if (key !== "action") {
        attrs[key] = builder[key];
      }
    });
  });
  return attrs;
}
const Button$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["href", "type", "builders", "el"]);
  let { href = void 0 } = $$props;
  let { type = void 0 } = $$props;
  let { builders = [] } = $$props;
  let { el = void 0 } = $$props;
  const attrs = { "data-button-root": "" };
  const paraglide_sveltekit_translate_attribute_pass_translationFunctions = getTranslationFunctions();
  const [
    paraglide_sveltekit_translate_attribute_pass_translateAttribute,
    paraglide_sveltekit_translate_attribute_pass_handle_attributes
  ] = paraglide_sveltekit_translate_attribute_pass_translationFunctions;
  if ($$props.href === void 0 && $$bindings.href && href !== void 0) $$bindings.href(href);
  if ($$props.type === void 0 && $$bindings.type && type !== void 0) $$bindings.type(type);
  if ($$props.builders === void 0 && $$bindings.builders && builders !== void 0) $$bindings.builders(builders);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0) $$bindings.el(el);
  return `${builders && builders.length ? ` ${((tag) => {
    return tag ? `<${href ? "a" : "button"}${spread(
      [
        escape_object(`${href ? "a" : "button"}` === "button" ? paraglide_sveltekit_translate_attribute_pass_handle_attributes(
          {
            "type": href ? void 0 : type,
            href,
            "tabindex": `0`,
            ...getAttrs(builders),
            ...$$restProps,
            ...attrs
          },
          [{ attribute_name: "formaction" }]
        ) : `${href ? "a" : "button"}` === "form" ? paraglide_sveltekit_translate_attribute_pass_handle_attributes(
          {
            "type": href ? void 0 : type,
            href,
            "tabindex": `0`,
            ...getAttrs(builders),
            ...$$restProps,
            ...attrs
          },
          [{ attribute_name: "action" }]
        ) : `${href ? "a" : "button"}` === "a" ? paraglide_sveltekit_translate_attribute_pass_handle_attributes(
          {
            "type": href ? void 0 : type,
            href,
            "tabindex": `0`,
            ...getAttrs(builders),
            ...$$restProps,
            ...attrs
          },
          [
            {
              attribute_name: "href",
              lang_attribute_name: "hreflang"
            }
          ]
        ) : {
          "type": href ? void 0 : type,
          href,
          "tabindex": `0`,
          ...getAttrs(builders),
          ...$$restProps,
          ...attrs
        })
      ],
      {}
    )}${add_attribute("this", el, 0)}>${is_void(tag) ? "" : `${slots.default ? slots.default({}) : ``}`}${is_void(tag) ? "" : `</${tag}>`}` : "";
  })(href ? "a" : "button")}` : ` ${((tag) => {
    return tag ? `<${href ? "a" : "button"}${spread(
      [
        escape_object(`${href ? "a" : "button"}` === "button" ? paraglide_sveltekit_translate_attribute_pass_handle_attributes(
          {
            "type": href ? void 0 : type,
            href,
            "tabindex": `0`,
            ...$$restProps,
            ...attrs
          },
          [{ attribute_name: "formaction" }]
        ) : `${href ? "a" : "button"}` === "form" ? paraglide_sveltekit_translate_attribute_pass_handle_attributes(
          {
            "type": href ? void 0 : type,
            href,
            "tabindex": `0`,
            ...$$restProps,
            ...attrs
          },
          [{ attribute_name: "action" }]
        ) : `${href ? "a" : "button"}` === "a" ? paraglide_sveltekit_translate_attribute_pass_handle_attributes(
          {
            "type": href ? void 0 : type,
            href,
            "tabindex": `0`,
            ...$$restProps,
            ...attrs
          },
          [
            {
              attribute_name: "href",
              lang_attribute_name: "hreflang"
            }
          ]
        ) : {
          "type": href ? void 0 : type,
          href,
          "tabindex": `0`,
          ...$$restProps,
          ...attrs
        })
      ],
      {}
    )}${add_attribute("this", el, 0)}>${is_void(tag) ? "" : `${slots.default ? slots.default({}) : ``}`}${is_void(tag) ? "" : `</${tag}>`}` : "";
  })(href ? "a" : "button")}`}`;
});
const Button = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class", "variant", "size", "builders"]);
  let { class: className = void 0 } = $$props;
  let { variant = "default" } = $$props;
  let { size = "default" } = $$props;
  let { builders = [] } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0) $$bindings.class(className);
  if ($$props.variant === void 0 && $$bindings.variant && variant !== void 0) $$bindings.variant(variant);
  if ($$props.size === void 0 && $$bindings.size && size !== void 0) $$bindings.size(size);
  if ($$props.builders === void 0 && $$bindings.builders && builders !== void 0) $$bindings.builders(builders);
  return `${validate_component(Button$1, "ButtonPrimitive.Root").$$render(
    $$result,
    Object.assign(
      {},
      { builders },
      {
        class: cn(buttonVariants({ variant, size, className }))
      },
      { type: "button" },
      $$restProps
    ),
    {},
    {
      default: () => {
        return `${slots.default ? slots.default({}) : ``}`;
      }
    }
  )}`;
});
export {
  Button as B
};
