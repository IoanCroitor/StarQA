import { c as create_ssr_component } from "../../../chunks/ssr.js";
import { tv } from "tailwind-variants";
import "clsx";
import "../../../chunks/index3.js";
import "../../../chunks/index4.js";
import "../../../chunks/client.js";
import "dequal";
import "../../../chunks/pocketbase.js";
tv({
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
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${$$result.head += `<!-- HEAD_svelte-n3ior8_START -->${$$result.title = `<title>Home</title>`, ""}<!-- HEAD_svelte-n3ior8_END -->`, ""} ${``}`;
});
export {
  Layout as default
};
