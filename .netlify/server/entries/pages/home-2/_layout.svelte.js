import {
  c as create_ssr_component,
  s as spread,
  b as escape_object,
  d as add_attribute,
  v as validate_component,
  a as escape_attribute_value,
  e as escape,
  f as each,
} from '../../../chunks/ssr.js'
import { g as getTranslationFunctions } from '../../../chunks/index4.js'
import '../../../chunks/index3.js'
import '../../../chunks/index2.js'
import {
  g as getCtx,
  s as sheetTransitions,
  d as sheetVariants,
  j as join_a_quiz,
  a as join_a_quiz_to_rank_higher_in_the_leaderboards,
  b as join,
  o as or,
  c as create,
  R as Root$1,
  T as Trigger$1,
} from '../../../chunks/index9.js'
import {
  R as Root,
  T as Trigger,
  D as Dropdown_menu_content,
  c as Dropdown_menu_label,
  d as Dropdown_menu_item,
} from '../../../chunks/index6.js'
import { B as Button } from '../../../chunks/button.js'
import { D as Dropdown_menu_separator } from '../../../chunks/dropdown-menu-separator.js'
import {
  C as Card,
  a as Card_header,
  b as Card_title,
  c as Card_content,
} from '../../../chunks/card-title.js'
import { C as Card_description } from '../../../chunks/card-description.js'
import 'clsx'
import { I as Input } from '../../../chunks/input.js'
import '../../../chunks/client.js'
import '../../../chunks/Toaster.svelte_svelte_type_style_lang.js'
import { f as fade, a as fly, B as Badge } from '../../../chunks/index7.js'
import {
  c as compute_rest_props,
  s as subscribe,
  g as getContext,
} from '../../../chunks/lifecycle.js'
import { c as cn, i as is_void } from '../../../chunks/utils.js'
import 'dequal'
import { a as createDispatcher } from '../../../chunks/events.js'
const Dialog_close = create_ssr_component(
  ($$result, $$props, $$bindings, slots) => {
    let builder
    let $$restProps = compute_rest_props($$props, ['asChild', 'el'])
    let $close, $$unsubscribe_close
    let { asChild = false } = $$props
    let { el = void 0 } = $$props
    const {
      elements: { close },
      getAttrs,
    } = getCtx()
    $$unsubscribe_close = subscribe(close, (value) => ($close = value))
    createDispatcher()
    const attrs = getAttrs('close')
    const paraglide_sveltekit_translate_attribute_pass_translationFunctions =
      getTranslationFunctions()
    const [
      paraglide_sveltekit_translate_attribute_pass_translateAttribute,
      paraglide_sveltekit_translate_attribute_pass_handle_attributes,
    ] = paraglide_sveltekit_translate_attribute_pass_translationFunctions
    if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0)
      $$bindings.asChild(asChild)
    if ($$props.el === void 0 && $$bindings.el && el !== void 0)
      $$bindings.el(el)
    builder = $close
    {
      Object.assign(builder, attrs)
    }
    $$unsubscribe_close()
    return `${
      asChild
        ? `${slots.default ? slots.default({ builder }) : ``}`
        : `<button${spread(
            [
              escape_object(
                paraglide_sveltekit_translate_attribute_pass_handle_attributes(
                  {
                    ...builder,
                    type: `button`,
                    ...$$restProps,
                  },
                  [{ attribute_name: 'formaction' }],
                ),
              ),
            ],
            {},
          )}${add_attribute('this', el, 0)}>${slots.default ? slots.default({ builder }) : ``}</button>`
    }`
  },
)
const Dialog_portal = create_ssr_component(
  ($$result, $$props, $$bindings, slots) => {
    let builder
    let $$restProps = compute_rest_props($$props, ['asChild', 'el'])
    let $portalled, $$unsubscribe_portalled
    let { asChild = false } = $$props
    let { el = void 0 } = $$props
    const {
      elements: { portalled },
      getAttrs,
    } = getCtx()
    $$unsubscribe_portalled = subscribe(
      portalled,
      (value) => ($portalled = value),
    )
    const attrs = getAttrs('portal')
    if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0)
      $$bindings.asChild(asChild)
    if ($$props.el === void 0 && $$bindings.el && el !== void 0)
      $$bindings.el(el)
    builder = $portalled
    {
      Object.assign(builder, attrs)
    }
    $$unsubscribe_portalled()
    return `${asChild ? `${slots.default ? slots.default({ builder }) : ``}` : `<div${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute('this', el, 0)}>${slots.default ? slots.default({ builder }) : ``}</div>`}`
  },
)
const Dialog_content = create_ssr_component(
  ($$result, $$props, $$bindings, slots) => {
    let builder
    let $$restProps = compute_rest_props($$props, [
      'transition',
      'transitionConfig',
      'inTransition',
      'inTransitionConfig',
      'outTransition',
      'outTransitionConfig',
      'asChild',
      'id',
      'el',
    ])
    let $content, $$unsubscribe_content
    let $open, $$unsubscribe_open
    let { transition = void 0 } = $$props
    let { transitionConfig = void 0 } = $$props
    let { inTransition = void 0 } = $$props
    let { inTransitionConfig = void 0 } = $$props
    let { outTransition = void 0 } = $$props
    let { outTransitionConfig = void 0 } = $$props
    let { asChild = false } = $$props
    let { id = void 0 } = $$props
    let { el = void 0 } = $$props
    const {
      elements: { content },
      states: { open },
      ids,
      getAttrs,
    } = getCtx()
    $$unsubscribe_content = subscribe(content, (value) => ($content = value))
    $$unsubscribe_open = subscribe(open, (value) => ($open = value))
    const attrs = getAttrs('content')
    if (
      $$props.transition === void 0 &&
      $$bindings.transition &&
      transition !== void 0
    )
      $$bindings.transition(transition)
    if (
      $$props.transitionConfig === void 0 &&
      $$bindings.transitionConfig &&
      transitionConfig !== void 0
    )
      $$bindings.transitionConfig(transitionConfig)
    if (
      $$props.inTransition === void 0 &&
      $$bindings.inTransition &&
      inTransition !== void 0
    )
      $$bindings.inTransition(inTransition)
    if (
      $$props.inTransitionConfig === void 0 &&
      $$bindings.inTransitionConfig &&
      inTransitionConfig !== void 0
    )
      $$bindings.inTransitionConfig(inTransitionConfig)
    if (
      $$props.outTransition === void 0 &&
      $$bindings.outTransition &&
      outTransition !== void 0
    )
      $$bindings.outTransition(outTransition)
    if (
      $$props.outTransitionConfig === void 0 &&
      $$bindings.outTransitionConfig &&
      outTransitionConfig !== void 0
    )
      $$bindings.outTransitionConfig(outTransitionConfig)
    if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0)
      $$bindings.asChild(asChild)
    if ($$props.id === void 0 && $$bindings.id && id !== void 0)
      $$bindings.id(id)
    if ($$props.el === void 0 && $$bindings.el && el !== void 0)
      $$bindings.el(el)
    {
      if (id) {
        ids.content.set(id)
      }
    }
    builder = $content
    {
      Object.assign(builder, attrs)
    }
    $$unsubscribe_content()
    $$unsubscribe_open()
    return `${asChild && $open ? `${slots.default ? slots.default({ builder }) : ``}` : `${transition && $open ? `<div${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute('this', el, 0)}>${slots.default ? slots.default({ builder }) : ``}</div>` : `${inTransition && outTransition && $open ? `<div${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute('this', el, 0)}>${slots.default ? slots.default({ builder }) : ``}</div>` : `${inTransition && $open ? `<div${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute('this', el, 0)}>${slots.default ? slots.default({ builder }) : ``}</div>` : `${outTransition && $open ? `<div${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute('this', el, 0)}>${slots.default ? slots.default({ builder }) : ``}</div>` : `${$open ? `<div${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute('this', el, 0)}>${slots.default ? slots.default({ builder }) : ``}</div>` : ``}`}`}`}`}`}`
  },
)
const Dialog_overlay = create_ssr_component(
  ($$result, $$props, $$bindings, slots) => {
    let builder
    let $$restProps = compute_rest_props($$props, [
      'transition',
      'transitionConfig',
      'inTransition',
      'inTransitionConfig',
      'outTransition',
      'outTransitionConfig',
      'asChild',
      'el',
    ])
    let $overlay, $$unsubscribe_overlay
    let $open, $$unsubscribe_open
    let { transition = void 0 } = $$props
    let { transitionConfig = void 0 } = $$props
    let { inTransition = void 0 } = $$props
    let { inTransitionConfig = void 0 } = $$props
    let { outTransition = void 0 } = $$props
    let { outTransitionConfig = void 0 } = $$props
    let { asChild = false } = $$props
    let { el = void 0 } = $$props
    const {
      elements: { overlay },
      states: { open },
      getAttrs,
    } = getCtx()
    $$unsubscribe_overlay = subscribe(overlay, (value) => ($overlay = value))
    $$unsubscribe_open = subscribe(open, (value) => ($open = value))
    const attrs = getAttrs('overlay')
    if (
      $$props.transition === void 0 &&
      $$bindings.transition &&
      transition !== void 0
    )
      $$bindings.transition(transition)
    if (
      $$props.transitionConfig === void 0 &&
      $$bindings.transitionConfig &&
      transitionConfig !== void 0
    )
      $$bindings.transitionConfig(transitionConfig)
    if (
      $$props.inTransition === void 0 &&
      $$bindings.inTransition &&
      inTransition !== void 0
    )
      $$bindings.inTransition(inTransition)
    if (
      $$props.inTransitionConfig === void 0 &&
      $$bindings.inTransitionConfig &&
      inTransitionConfig !== void 0
    )
      $$bindings.inTransitionConfig(inTransitionConfig)
    if (
      $$props.outTransition === void 0 &&
      $$bindings.outTransition &&
      outTransition !== void 0
    )
      $$bindings.outTransition(outTransition)
    if (
      $$props.outTransitionConfig === void 0 &&
      $$bindings.outTransitionConfig &&
      outTransitionConfig !== void 0
    )
      $$bindings.outTransitionConfig(outTransitionConfig)
    if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0)
      $$bindings.asChild(asChild)
    if ($$props.el === void 0 && $$bindings.el && el !== void 0)
      $$bindings.el(el)
    builder = $overlay
    {
      Object.assign(builder, attrs)
    }
    $$unsubscribe_overlay()
    $$unsubscribe_open()
    return `${asChild && $open ? `${slots.default ? slots.default({ builder }) : ``}` : `${transition && $open ? ` <div${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute('this', el, 0)}></div>` : `${inTransition && outTransition && $open ? ` <div${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute('this', el, 0)}></div>` : `${inTransition && $open ? ` <div${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute('this', el, 0)}></div>` : `${outTransition && $open ? ` <div${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute('this', el, 0)}></div>` : `${$open ? ` <div${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute('this', el, 0)}></div>` : ``}`}`}`}`}`}`
  },
)
const Sheet_portal = create_ssr_component(
  ($$result, $$props, $$bindings, slots) => {
    let $$restProps = compute_rest_props($$props, ['class'])
    let { class: className = void 0 } = $$props
    if ($$props.class === void 0 && $$bindings.class && className !== void 0)
      $$bindings.class(className)
    return `${validate_component(
      Dialog_portal,
      'SheetPrimitive.Portal',
    ).$$render(
      $$result,
      Object.assign({}, { class: cn(className) }, $$restProps),
      {},
      {
        default: () => {
          return `${slots.default ? slots.default({}) : ``}`
        },
      },
    )}`
  },
)
const Sheet_overlay = create_ssr_component(
  ($$result, $$props, $$bindings, slots) => {
    let $$restProps = compute_rest_props($$props, [
      'class',
      'transition',
      'transitionConfig',
    ])
    let { class: className = void 0 } = $$props
    let { transition = fade } = $$props
    let { transitionConfig = { duration: 150 } } = $$props
    if ($$props.class === void 0 && $$bindings.class && className !== void 0)
      $$bindings.class(className)
    if (
      $$props.transition === void 0 &&
      $$bindings.transition &&
      transition !== void 0
    )
      $$bindings.transition(transition)
    if (
      $$props.transitionConfig === void 0 &&
      $$bindings.transitionConfig &&
      transitionConfig !== void 0
    )
      $$bindings.transitionConfig(transitionConfig)
    return `${validate_component(
      Dialog_overlay,
      'SheetPrimitive.Overlay',
    ).$$render(
      $$result,
      Object.assign(
        {},
        { transition },
        { transitionConfig },
        {
          class: cn(
            'fixed inset-0 z-50 bg-background/80 backdrop-blur-sm',
            className,
          ),
        },
        $$restProps,
      ),
      {},
      {},
    )}`
  },
)
const Cross2 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, [
    'size',
    'role',
    'color',
    'ariaLabel',
    'withEvents',
  ])
  const ctx = getContext('iconCtx') ?? {}
  let { size = ctx.size || '24' } = $$props
  let { role = ctx.role || 'img' } = $$props
  let { color = ctx.color || 'currentColor' } = $$props
  let { ariaLabel = 'cross 2,' } = $$props
  let { withEvents = false } = $$props
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size)
  if ($$props.role === void 0 && $$bindings.role && role !== void 0)
    $$bindings.role(role)
  if ($$props.color === void 0 && $$bindings.color && color !== void 0)
    $$bindings.color(color)
  if (
    $$props.ariaLabel === void 0 &&
    $$bindings.ariaLabel &&
    ariaLabel !== void 0
  )
    $$bindings.ariaLabel(ariaLabel)
  if (
    $$props.withEvents === void 0 &&
    $$bindings.withEvents &&
    withEvents !== void 0
  )
    $$bindings.withEvents(withEvents)
  return `${
    withEvents
      ? `<svg${spread(
          [
            { width: escape_attribute_value(size) },
            { height: escape_attribute_value(size) },
            escape_object($$restProps),
            { role: escape_attribute_value(role) },
            {
              'aria-label': escape_attribute_value(ariaLabel),
            },
            { viewBox: '0 0 15 15' },
            { fill: escape_attribute_value(color) },
            { xmlns: 'http://www.w3.org/2000/svg' },
          ],
          {},
        )}><path fill-rule="evenodd" clip-rule="evenodd" d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z" fill="currentColor"></path></svg>`
      : `<svg${spread(
          [
            { width: escape_attribute_value(size) },
            { height: escape_attribute_value(size) },
            escape_object($$restProps),
            { role: escape_attribute_value(role) },
            {
              'aria-label': escape_attribute_value(ariaLabel),
            },
            { viewBox: '0 0 15 15' },
            { fill: escape_attribute_value(color) },
            { xmlns: 'http://www.w3.org/2000/svg' },
          ],
          {},
        )}><path fill-rule="evenodd" clip-rule="evenodd" d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z" fill="currentColor"></path></svg>`
  } `
})
const Sheet_content = create_ssr_component(
  ($$result, $$props, $$bindings, slots) => {
    let $$restProps = compute_rest_props($$props, [
      'class',
      'side',
      'inTransition',
      'inTransitionConfig',
      'outTransition',
      'outTransitionConfig',
    ])
    let { class: className = void 0 } = $$props
    let { side = 'right' } = $$props
    let { inTransition = fly } = $$props
    let { inTransitionConfig = sheetTransitions[side ?? 'right'].in } = $$props
    let { outTransition = fly } = $$props
    let { outTransitionConfig = sheetTransitions[side ?? 'right'].out } =
      $$props
    if ($$props.class === void 0 && $$bindings.class && className !== void 0)
      $$bindings.class(className)
    if ($$props.side === void 0 && $$bindings.side && side !== void 0)
      $$bindings.side(side)
    if (
      $$props.inTransition === void 0 &&
      $$bindings.inTransition &&
      inTransition !== void 0
    )
      $$bindings.inTransition(inTransition)
    if (
      $$props.inTransitionConfig === void 0 &&
      $$bindings.inTransitionConfig &&
      inTransitionConfig !== void 0
    )
      $$bindings.inTransitionConfig(inTransitionConfig)
    if (
      $$props.outTransition === void 0 &&
      $$bindings.outTransition &&
      outTransition !== void 0
    )
      $$bindings.outTransition(outTransition)
    if (
      $$props.outTransitionConfig === void 0 &&
      $$bindings.outTransitionConfig &&
      outTransitionConfig !== void 0
    )
      $$bindings.outTransitionConfig(outTransitionConfig)
    return `${validate_component(Sheet_portal, 'SheetPortal').$$render(
      $$result,
      {},
      {},
      {
        default: () => {
          return `${validate_component(Sheet_overlay, 'SheetOverlay').$$render($$result, {}, {}, {})} ${validate_component(
            Dialog_content,
            'SheetPrimitive.Content',
          ).$$render(
            $$result,
            Object.assign(
              {},
              { inTransition },
              { inTransitionConfig },
              { outTransition },
              { outTransitionConfig },
              {
                class: cn(sheetVariants({ side }), className),
              },
              $$restProps,
            ),
            {},
            {
              default: () => {
                return `${slots.default ? slots.default({}) : ``} ${validate_component(
                  Dialog_close,
                  'SheetPrimitive.Close',
                ).$$render(
                  $$result,
                  {
                    class:
                      'absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary',
                  },
                  {},
                  {
                    default: () => {
                      return `${validate_component(Cross2, 'Cross2').$$render($$result, { class: 'h-4 w-4' }, {}, {})} <span class="sr-only" data-svelte-h="svelte-1pewzs3">Close</span>`
                    },
                  },
                )}`
              },
            },
          )}`
        },
      },
    )}`
  },
)
const AccountDropdown = create_ssr_component(
  ($$result, $$props, $$bindings, slots) => {
    let { data } = $$props
    if ($$props.data === void 0 && $$bindings.data && data !== void 0)
      $$bindings.data(data)
    return `${validate_component(Root, 'DropdownMenu.Root').$$render(
      $$result,
      {},
      {},
      {
        default: () => {
          return `${validate_component(
            Trigger,
            'DropdownMenu.Trigger',
          ).$$render(
            $$result,
            { asChild: true },
            {},
            {
              default: ({ builder }) => {
                return `${validate_component(Button, 'Button').$$render(
                  $$result,
                  {
                    builders: [builder],
                    variant: 'secondary',
                    size: 'icon',
                    class: 'rounded-full overflow-hidden',
                  },
                  {},
                  {
                    default: () => {
                      return `<img alt="User Avatar" class="w-full h-full object-cover"${add_attribute('src', `https://kawaii-avatar.now.sh/api/avatar?username=${data?.user?.email}&mood=blissful,happy,excited&background=%2300000`, 0)}> <span class="sr-only" data-svelte-h="svelte-r9nh39">Toggle user menu</span>`
                    },
                  },
                )}`
              },
            },
          )} ${validate_component(
            Dropdown_menu_content,
            'DropdownMenu.Content',
          ).$$render(
            $$result,
            { align: 'end' },
            {},
            {
              default: () => {
                return `${validate_component(
                  Dropdown_menu_label,
                  'DropdownMenu.Label',
                ).$$render(
                  $$result,
                  {},
                  {},
                  {
                    default: () => {
                      return `<div class="flex flex-col font-normal"><p class="text-lg font-semibold" data-svelte-h="svelte-6plqge">Hello again!</p> <p class="text-primary/70">${escape(data?.user?.email)}</p></div>`
                    },
                  },
                )} ${validate_component(Dropdown_menu_separator, 'DropdownMenu.Separator').$$render($$result, {}, {}, {})} ${validate_component(
                  Dropdown_menu_item,
                  'DropdownMenu.Item',
                ).$$render(
                  $$result,
                  {
                    href: 'https://github.com/IoanCroitor',
                    target: '_blank',
                  },
                  {},
                  {
                    default: () => {
                      return `Support`
                    },
                  },
                )} ${validate_component(
                  Dropdown_menu_item,
                  'DropdownMenu.Item',
                ).$$render(
                  $$result,
                  { class: 'text-red-500', href: '/logout' },
                  {},
                  {
                    default: () => {
                      return `Logout`
                    },
                  },
                )}`
              },
            },
          )}`
        },
      },
    )}`
  },
)
const JoinCard = create_ssr_component(
  ($$result, $$props, $$bindings, slots) => {
    let redirect
    const paraglide_sveltekit_translate_attribute_pass_translationFunctions =
      getTranslationFunctions()
    const [
      paraglide_sveltekit_translate_attribute_pass_translateAttribute,
      paraglide_sveltekit_translate_attribute_pass_handle_attributes,
    ] = paraglide_sveltekit_translate_attribute_pass_translationFunctions
    let $$settled
    let $$rendered
    let previous_head = $$result.head
    do {
      $$settled = true
      $$result.head = previous_head
      $$rendered = `<div class="mt-auto">${validate_component(
        Card,
        'Card.Root',
      ).$$render(
        $$result,
        {},
        {},
        {
          default: () => {
            return `${validate_component(Card_header, 'Card.Header').$$render(
              $$result,
              {},
              {},
              {
                default: () => {
                  return `${validate_component(
                    Card_title,
                    'Card.Title',
                  ).$$render(
                    $$result,
                    {},
                    {},
                    {
                      default: () => {
                        return `${escape(join_a_quiz())}`
                      },
                    },
                  )} ${validate_component(
                    Card_description,
                    'Card.Description',
                  ).$$render(
                    $$result,
                    {},
                    {},
                    {
                      default: () => {
                        return `${escape(join_a_quiz_to_rank_higher_in_the_leaderboards())}`
                      },
                    },
                  )}`
                },
              },
            )} ${validate_component(Card_content, 'Card.Content').$$render(
              $$result,
              {},
              {},
              {
                default: () => {
                  return `<div class="flex flex-row gap-2">${validate_component(
                    Input,
                    'Input',
                  ).$$render(
                    $$result,
                    { type: 'text', value: redirect },
                    {
                      value: ($$value) => {
                        redirect = $$value
                        $$settled = false
                      },
                    },
                    {},
                  )} ${validate_component(Button, 'Button').$$render(
                    $$result,
                    { class: 'w-20' },
                    {},
                    {
                      default: () => {
                        return `${escape(join())}`
                      },
                    },
                  )}</div> <p class="flex justify-center text-muted-foreground text-xs my-1">${escape(or())}</p> <a${add_attribute('href', paraglide_sveltekit_translate_attribute_pass_translateAttribute(`/create`, void 0), 0)}>${validate_component(
                    Button,
                    'Button',
                  ).$$render(
                    $$result,
                    { variant: 'secondary', class: 'w-full' },
                    {},
                    {
                      default: () => {
                        return `${escape(create())}`
                      },
                    },
                  )}</a>`
                },
              },
            )}`
          },
        },
      )}</div>`
    } while (!$$settled)
    return $$rendered
  },
)
/**
 * @license lucide-svelte v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const defaultAttributes = {
  xmlns: 'http://www.w3.org/2000/svg',
  width: 24,
  height: 24,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  'stroke-width': 2,
  'stroke-linecap': 'round',
  'stroke-linejoin': 'round',
}
const Icon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, [
    'name',
    'color',
    'size',
    'strokeWidth',
    'absoluteStrokeWidth',
    'iconNode',
    'mergeClasses',
  ])
  let { name = void 0 } = $$props
  let { color = 'currentColor' } = $$props
  let { size = 24 } = $$props
  let { strokeWidth = 2 } = $$props
  let { absoluteStrokeWidth = false } = $$props
  let { iconNode } = $$props
  const mergeClasses = (...classes) =>
    classes
      .filter((className, index, array) => {
        return Boolean(className) && array.indexOf(className) === index
      })
      .join(' ')
  const paraglide_sveltekit_translate_attribute_pass_translationFunctions =
    getTranslationFunctions()
  const [
    paraglide_sveltekit_translate_attribute_pass_translateAttribute,
    paraglide_sveltekit_translate_attribute_pass_handle_attributes,
  ] = paraglide_sveltekit_translate_attribute_pass_translationFunctions
  if ($$props.name === void 0 && $$bindings.name && name !== void 0)
    $$bindings.name(name)
  if ($$props.color === void 0 && $$bindings.color && color !== void 0)
    $$bindings.color(color)
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size)
  if (
    $$props.strokeWidth === void 0 &&
    $$bindings.strokeWidth &&
    strokeWidth !== void 0
  )
    $$bindings.strokeWidth(strokeWidth)
  if (
    $$props.absoluteStrokeWidth === void 0 &&
    $$bindings.absoluteStrokeWidth &&
    absoluteStrokeWidth !== void 0
  )
    $$bindings.absoluteStrokeWidth(absoluteStrokeWidth)
  if ($$props.iconNode === void 0 && $$bindings.iconNode && iconNode !== void 0)
    $$bindings.iconNode(iconNode)
  if (
    $$props.mergeClasses === void 0 &&
    $$bindings.mergeClasses &&
    mergeClasses !== void 0
  )
    $$bindings.mergeClasses(mergeClasses)
  return `<svg${spread(
    [
      escape_object(defaultAttributes),
      escape_object($$restProps),
      { width: escape_attribute_value(size) },
      { height: escape_attribute_value(size) },
      { stroke: escape_attribute_value(color) },
      {
        'stroke-width': escape_attribute_value(
          absoluteStrokeWidth
            ? (Number(strokeWidth) * 24) / Number(size)
            : strokeWidth,
        ),
      },
      {
        class: escape_attribute_value(
          mergeClasses(
            'lucide-icon',
            'lucide',
            name ? `lucide-${name}` : '',
            $$props.class,
          ),
        ),
      },
    ],
    {},
  )}>${each(iconNode, ([tag, attrs]) => {
    return `${((tag$1) => {
      return tag$1
        ? `<${tag}${spread(
            [
              escape_object(
                `${tag}` === 'button'
                  ? paraglide_sveltekit_translate_attribute_pass_handle_attributes(
                      { ...attrs },
                      [{ attribute_name: 'formaction' }],
                    )
                  : `${tag}` === 'form'
                    ? paraglide_sveltekit_translate_attribute_pass_handle_attributes(
                        { ...attrs },
                        [{ attribute_name: 'action' }],
                      )
                    : `${tag}` === 'a'
                      ? paraglide_sveltekit_translate_attribute_pass_handle_attributes(
                          { ...attrs },
                          [
                            {
                              attribute_name: 'href',
                              lang_attribute_name: 'hreflang',
                            },
                          ],
                        )
                      : { ...attrs },
              ),
            ],
            {},
          )}>${is_void(tag$1) ? '' : ``}${is_void(tag$1) ? '' : `</${tag$1}>`}`
        : ''
    })(tag)}`
  })}${slots.default ? slots.default({}) : ``}</svg>`
})
const Menu = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      'line',
      {
        x1: '4',
        x2: '20',
        y1: '12',
        y2: '12',
      },
    ],
    [
      'line',
      {
        x1: '4',
        x2: '20',
        y1: '6',
        y2: '6',
      },
    ],
    [
      'line',
      {
        x1: '4',
        x2: '20',
        y1: '18',
        y2: '18',
      },
    ],
  ]
  return `${validate_component(Icon, 'Icon').$$render(
    $$result,
    Object.assign({}, { name: 'menu' }, $$props, { iconNode }),
    {},
    {
      default: () => {
        return `${slots.default ? slots.default({}) : ``}`
      },
    },
  )}`
})
let finished_quizzes_length = 0
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props
  const paraglide_sveltekit_translate_attribute_pass_translationFunctions =
    getTranslationFunctions()
  const [
    paraglide_sveltekit_translate_attribute_pass_translateAttribute,
    paraglide_sveltekit_translate_attribute_pass_handle_attributes,
  ] = paraglide_sveltekit_translate_attribute_pass_translationFunctions
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data)
  return `${(($$result.head += `<!-- HEAD_svelte-n3ior8_START -->${(($$result.title = `<title>Home</title>`), '')}<!-- HEAD_svelte-n3ior8_END -->`), '')} <div class="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]"><div class="hidden border-r bg-muted/40 md:block"><div class="flex h-full max-h-screen flex-col gap-2"><div class="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6"><a${add_attribute('href', paraglide_sveltekit_translate_attribute_pass_translateAttribute(`/`, void 0), 0)} class="flex items-center gap-2 font-semibold"><img src="/favicon.svg" alt="StarQA logo" class="h-6 w-6"> <span class="" data-svelte-h="svelte-hzdydz">StarQA</span></a></div> <div class="flex-1"><nav class="grid items-start px-2 text-sm font-medium lg:px-4"><a${add_attribute('href', paraglide_sveltekit_translate_attribute_pass_translateAttribute(`/home`, void 0), 0)} class="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">Quizzes</a> <a${add_attribute('href', paraglide_sveltekit_translate_attribute_pass_translateAttribute(`/home/completed`, void 0), 0)} class="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">Completed
            ${validate_component(Badge, 'Badge').$$render(
              $$result,
              {
                variant: 'outline',
                class:
                  'ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-primary/70',
              },
              {},
              {
                default: () => {
                  return `${escape(finished_quizzes_length)}`
                },
              },
            )}</a></nav></div> <div class="p-2">${validate_component(JoinCard, 'JoinCard').$$render($$result, {}, {}, {})}</div></div></div> <div class="flex flex-col"><header class="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">${validate_component(
              Root$1,
              'Sheet.Root',
            ).$$render(
              $$result,
              {},
              {},
              {
                default: () => {
                  return `${validate_component(
                    Trigger$1,
                    'Sheet.Trigger',
                  ).$$render(
                    $$result,
                    { asChild: true },
                    {},
                    {
                      default: ({ builder }) => {
                        return `${validate_component(Button, 'Button').$$render(
                          $$result,
                          {
                            variant: 'outline',
                            size: 'icon',
                            class: 'shrink-0 md:hidden',
                            builders: [builder],
                          },
                          {},
                          {
                            default: () => {
                              return `${validate_component(Menu, 'Menu').$$render($$result, { class: 'h-5 w-5' }, {}, {})} <span class="sr-only" data-svelte-h="svelte-9wqi12">Toggle navigation menu</span>`
                            },
                          },
                        )}`
                      },
                    },
                  )} ${validate_component(
                    Sheet_content,
                    'Sheet.Content',
                  ).$$render(
                    $$result,
                    { side: 'left', class: 'flex flex-col' },
                    {},
                    {
                      default: () => {
                        return `<nav class="grid gap-2 text-lg font-medium"><a${add_attribute('href', paraglide_sveltekit_translate_attribute_pass_translateAttribute(`/`, void 0), 0)} class="flex items-center gap-2 text-lg font-semibold"><span class="sr-only" data-svelte-h="svelte-nxnogh">StarQA</span></a> <a${add_attribute('href', paraglide_sveltekit_translate_attribute_pass_translateAttribute(`/home`, void 0), 0)} class="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground">Quizzes</a> <a${add_attribute('href', paraglide_sveltekit_translate_attribute_pass_translateAttribute(`/home/completed`, void 0), 0)} class="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground">Completed
              ${validate_component(Badge, 'Badge').$$render(
                $$result,
                {
                  class:
                    'ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full',
                },
                {},
                {
                  default: () => {
                    return `${escape(finished_quizzes_length)}`
                  },
                },
              )}</a></nav> ${validate_component(JoinCard, 'JoinCard').$$render($$result, {}, {}, {})}`
                      },
                    },
                  )}`
                },
              },
            )} <div class="w-full flex-1"></div> ${validate_component(AccountDropdown, 'AccountDropdown').$$render($$result, { data }, {}, {})}</header> <main class="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 h-full w-full"> ${slots.default ? slots.default({}) : ``}</main></div></div>`
})
export { Layout as default }
