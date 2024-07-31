import { c as compute_rest_props, s as subscribe } from './lifecycle.js'
import {
  c as create_ssr_component,
  s as spread,
  b as escape_object,
  d as add_attribute,
  v as validate_component,
} from './ssr.js'
import 'dequal'
import { m as makeElement, c as addMeltEventListener } from './index2.js'
import { c as createBitAttrs, a as createDispatcher } from './events.js'
import { c as cn } from './utils.js'
function createLabel() {
  const root = makeElement('label', {
    action: (node) => {
      const mouseDown = addMeltEventListener(node, 'mousedown', (e) => {
        if (!e.defaultPrevented && e.detail > 1) {
          e.preventDefault()
        }
      })
      return {
        destroy: mouseDown,
      }
    },
  })
  return {
    elements: {
      root,
    },
  }
}
function getLabelData() {
  const NAME = 'label'
  const PARTS = ['root']
  const getAttrs = createBitAttrs(NAME, PARTS)
  return {
    NAME,
    getAttrs,
  }
}
const Label$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let builder
  let $$restProps = compute_rest_props($$props, ['asChild', 'el'])
  let $root, $$unsubscribe_root
  let { asChild = false } = $$props
  let { el = void 0 } = $$props
  const {
    elements: { root },
  } = createLabel()
  $$unsubscribe_root = subscribe(root, (value) => ($root = value))
  createDispatcher()
  const { getAttrs } = getLabelData()
  const attrs = getAttrs('root')
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0)
    $$bindings.asChild(asChild)
  if ($$props.el === void 0 && $$bindings.el && el !== void 0) $$bindings.el(el)
  builder = $root
  {
    Object.assign(builder, attrs)
  }
  $$unsubscribe_root()
  return `${asChild ? `${slots.default ? slots.default({ builder }) : ``}` : `<label${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute('this', el, 0)}>${slots.default ? slots.default({ builder }) : ``}</label>`}`
})
const Label = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ['class'])
  let { class: className = void 0 } = $$props
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className)
  return `${validate_component(Label$1, 'LabelPrimitive.Root').$$render(
    $$result,
    Object.assign(
      {},
      {
        class: cn(
          'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
          className,
        ),
      },
      $$restProps,
    ),
    {},
    {
      default: () => {
        return `${slots.default ? slots.default({}) : ``}`
      },
    },
  )}`
})
export { Label as L, createLabel as c }
