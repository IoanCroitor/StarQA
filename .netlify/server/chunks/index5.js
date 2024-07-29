import { c as compute_rest_props, h as split_css_unit, j as identity } from "./lifecycle.js";
import { c as create_ssr_component, s as spread, b as escape_object } from "./ssr.js";
import { c as cn, i as is_void, a as cubicOut } from "./utils.js";
import { g as getTranslationFunctions } from "./index3.js";
import { tv } from "tailwind-variants";
import "clsx";
const Badge = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class", "href", "variant"]);
  let { class: className = void 0 } = $$props;
  let { href = void 0 } = $$props;
  let { variant = "default" } = $$props;
  const paraglide_sveltekit_translate_attribute_pass_translationFunctions = getTranslationFunctions();
  const [
    paraglide_sveltekit_translate_attribute_pass_translateAttribute,
    paraglide_sveltekit_translate_attribute_pass_handle_attributes
  ] = paraglide_sveltekit_translate_attribute_pass_translationFunctions;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0) $$bindings.class(className);
  if ($$props.href === void 0 && $$bindings.href && href !== void 0) $$bindings.href(href);
  if ($$props.variant === void 0 && $$bindings.variant && variant !== void 0) $$bindings.variant(variant);
  return `${((tag) => {
    return tag ? `<${href ? "a" : "span"}${spread(
      [
        escape_object(`${href ? "a" : "span"}` === "button" ? paraglide_sveltekit_translate_attribute_pass_handle_attributes(
          {
            href,
            "class": cn(badgeVariants({ variant, className })),
            ...$$restProps
          },
          [{ attribute_name: "formaction" }]
        ) : `${href ? "a" : "span"}` === "form" ? paraglide_sveltekit_translate_attribute_pass_handle_attributes(
          {
            href,
            "class": cn(badgeVariants({ variant, className })),
            ...$$restProps
          },
          [{ attribute_name: "action" }]
        ) : `${href ? "a" : "span"}` === "a" ? paraglide_sveltekit_translate_attribute_pass_handle_attributes(
          {
            href,
            "class": cn(badgeVariants({ variant, className })),
            ...$$restProps
          },
          [
            {
              attribute_name: "href",
              lang_attribute_name: "hreflang"
            }
          ]
        ) : {
          href,
          "class": cn(badgeVariants({ variant, className })),
          ...$$restProps
        })
      ],
      {}
    )}>${is_void(tag) ? "" : `${slots.default ? slots.default({}) : ``}`}${is_void(tag) ? "" : `</${tag}>`}` : "";
  })(href ? "a" : "span")}`;
});
const badgeVariants = tv({
  base: "inline-flex select-none items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  variants: {
    variant: {
      default: "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
      secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
      destructive: "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
      outline: "text-foreground"
    }
  },
  defaultVariants: {
    variant: "default"
  }
});
function fade(node, { delay = 0, duration = 400, easing = identity } = {}) {
  const o = +getComputedStyle(node).opacity;
  return {
    delay,
    duration,
    easing,
    css: (t) => `opacity: ${t * o}`
  };
}
function fly(node, { delay = 0, duration = 400, easing = cubicOut, x = 0, y = 0, opacity = 0 } = {}) {
  const style = getComputedStyle(node);
  const target_opacity = +style.opacity;
  const transform = style.transform === "none" ? "" : style.transform;
  const od = target_opacity * (1 - opacity);
  const [xValue, xUnit] = split_css_unit(x);
  const [yValue, yUnit] = split_css_unit(y);
  return {
    delay,
    duration,
    easing,
    css: (t, u) => `
			transform: ${transform} translate(${(1 - t) * xValue}${xUnit}, ${(1 - t) * yValue}${yUnit});
			opacity: ${target_opacity - od * u}`
  };
}
function scale(node, { delay = 0, duration = 400, easing = cubicOut, start = 0, opacity = 0 } = {}) {
  const style = getComputedStyle(node);
  const target_opacity = +style.opacity;
  const transform = style.transform === "none" ? "" : style.transform;
  const sd = 1 - start;
  const od = target_opacity * (1 - opacity);
  return {
    delay,
    duration,
    easing,
    css: (_t, u) => `
			transform: ${transform} scale(${1 - sd * u});
			opacity: ${target_opacity - od * u}
		`
  };
}
export {
  Badge as B,
  fly as a,
  fade as f,
  scale as s
};
