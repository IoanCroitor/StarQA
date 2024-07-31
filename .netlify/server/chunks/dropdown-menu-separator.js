import { c as compute_rest_props, s as subscribe } from './lifecycle.js'
import {
  c as create_ssr_component,
  s as spread,
  b as escape_object,
  d as add_attribute,
  v as validate_component,
} from './ssr.js'
import 'dequal'
import './index2.js'
import { g as getCtx } from './index6.js'
import { c as cn } from './utils.js'
const Menu_separator = create_ssr_component(
  ($$result, $$props, $$bindings, slots) => {
    let builder
    let $$restProps = compute_rest_props($$props, ['asChild', 'el'])
    let $separator, $$unsubscribe_separator
    let { asChild = false } = $$props
    let { el = void 0 } = $$props
    const {
      elements: { separator },
      getAttrs,
    } = getCtx()
    $$unsubscribe_separator = subscribe(
      separator,
      (value) => ($separator = value),
    )
    const attrs = getAttrs('separator')
    if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0)
      $$bindings.asChild(asChild)
    if ($$props.el === void 0 && $$bindings.el && el !== void 0)
      $$bindings.el(el)
    builder = $separator
    {
      Object.assign(builder, attrs)
    }
    $$unsubscribe_separator()
    return `${asChild ? `${slots.default ? slots.default({ builder }) : ``}` : `<div${spread([escape_object($separator), escape_object($$restProps)], {})}${add_attribute('this', el, 0)}></div>`}`
  },
)
const Dropdown_menu_separator = create_ssr_component(
  ($$result, $$props, $$bindings, slots) => {
    let $$restProps = compute_rest_props($$props, ['class'])
    let { class: className = void 0 } = $$props
    if ($$props.class === void 0 && $$bindings.class && className !== void 0)
      $$bindings.class(className)
    return `${validate_component(
      Menu_separator,
      'DropdownMenuPrimitive.Separator',
    ).$$render(
      $$result,
      Object.assign(
        {},
        {
          class: cn('bg-muted -mx-1 my-1 h-px', className),
        },
        $$restProps,
      ),
      {},
      {},
    )}`
  },
)
export { Dropdown_menu_separator as D }
