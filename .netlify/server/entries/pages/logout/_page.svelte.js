import { c as create_ssr_component } from '../../../chunks/ssr.js'
import '../../../chunks/client.js'
import '../../../chunks/Toaster.svelte_svelte_type_style_lang.js'
import '../../../chunks/index.js'
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data)
  return ``
})
export { Page as default }
