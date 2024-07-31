import { l as languageTag } from './runtime.js'
import 'dequal'
import {
  o as omit,
  w as withGet,
  m as makeElement,
  g as executeCallbacks,
  c as addMeltEventListener,
  k as kbd,
  s as styleToString,
  u as useEscapeKeydown,
  e as effect,
  p as portalAttr,
  d as createElHelpers,
  a as isHTMLElement,
  n as noop,
  f as isBrowser,
} from './index2.js'
import {
  d as setContext,
  g as getContext,
  s as subscribe,
  c as compute_rest_props,
} from './lifecycle.js'
import {
  c as create_ssr_component,
  s as spread,
  b as escape_object,
  d as add_attribute,
} from './ssr.js'
import { d as derived, w as writable } from './index5.js'
import { t as tick } from './scheduler.js'
import {
  t as toWritableStores,
  o as overridable,
  r as removeUndefined,
  g as getOptionUpdater,
} from './updater.js'
import {
  g as generateIds,
  a as useModal,
  c as createFocusTrap,
  b as getPortalDestination,
  u as usePortal,
  r as removeScroll,
} from './action.js'
import { h as handleFocus } from './focus.js'
import { c as createBitAttrs, a as createDispatcher } from './events.js'
import { g as getTranslationFunctions } from './index4.js'
import { tv } from 'tailwind-variants'
import 'clsx'
const { name } = createElHelpers('dialog')
const defaults = {
  preventScroll: true,
  closeOnEscape: true,
  closeOnOutsideClick: true,
  role: 'dialog',
  defaultOpen: false,
  portal: void 0,
  forceVisible: false,
  openFocus: void 0,
  closeFocus: void 0,
  onOutsideClick: void 0,
}
const dialogIdParts = ['content', 'title', 'description']
function createDialog(props) {
  const withDefaults = { ...defaults, ...props }
  const options = toWritableStores(omit(withDefaults, 'ids'))
  const {
    preventScroll,
    closeOnEscape,
    closeOnOutsideClick,
    role,
    portal,
    forceVisible,
    openFocus,
    closeFocus,
    onOutsideClick,
  } = options
  const activeTrigger = withGet.writable(null)
  const ids = toWritableStores({
    ...generateIds(dialogIdParts),
    ...withDefaults.ids,
  })
  const openWritable = withDefaults.open ?? writable(withDefaults.defaultOpen)
  const open = overridable(openWritable, withDefaults?.onOpenChange)
  const isVisible = derived([open, forceVisible], ([$open, $forceVisible]) => {
    return $open || $forceVisible
  })
  let unsubScroll = noop
  function handleOpen(e) {
    const el = e.currentTarget
    const triggerEl = e.currentTarget
    if (!isHTMLElement(el) || !isHTMLElement(triggerEl)) return
    open.set(true)
    activeTrigger.set(triggerEl)
  }
  function handleClose() {
    open.set(false)
    handleFocus({
      prop: closeFocus.get(),
      defaultEl: activeTrigger.get(),
    })
  }
  const trigger = makeElement(name('trigger'), {
    stores: [open],
    returned: ([$open]) => {
      return {
        'aria-haspopup': 'dialog',
        'aria-expanded': $open,
        type: 'button',
      }
    },
    action: (node) => {
      const unsub = executeCallbacks(
        addMeltEventListener(node, 'click', (e) => {
          handleOpen(e)
        }),
        addMeltEventListener(node, 'keydown', (e) => {
          if (e.key !== kbd.ENTER && e.key !== kbd.SPACE) return
          e.preventDefault()
          handleOpen(e)
        }),
      )
      return {
        destroy: unsub,
      }
    },
  })
  const overlay = makeElement(name('overlay'), {
    stores: [isVisible, open],
    returned: ([$isVisible, $open]) => {
      return {
        hidden: $isVisible ? void 0 : true,
        tabindex: -1,
        style: styleToString({
          display: $isVisible ? void 0 : 'none',
        }),
        'aria-hidden': true,
        'data-state': $open ? 'open' : 'closed',
      }
    },
    action: (node) => {
      let unsubEscapeKeydown = noop
      if (closeOnEscape.get()) {
        const escapeKeydown = useEscapeKeydown(node, {
          handler: () => {
            handleClose()
          },
        })
        if (escapeKeydown && escapeKeydown.destroy) {
          unsubEscapeKeydown = escapeKeydown.destroy
        }
      }
      return {
        destroy() {
          unsubEscapeKeydown()
        },
      }
    },
  })
  const content = makeElement(name('content'), {
    stores: [isVisible, ids.content, ids.description, ids.title, open],
    returned: ([$isVisible, $contentId, $descriptionId, $titleId, $open]) => {
      return {
        id: $contentId,
        role: role.get(),
        'aria-describedby': $descriptionId,
        'aria-labelledby': $titleId,
        'aria-modal': $isVisible ? 'true' : void 0,
        'data-state': $open ? 'open' : 'closed',
        tabindex: -1,
        hidden: $isVisible ? void 0 : true,
        style: styleToString({
          display: $isVisible ? void 0 : 'none',
        }),
      }
    },
    action: (node) => {
      let activate = noop
      let deactivate = noop
      const destroy = executeCallbacks(
        effect(
          [open, closeOnOutsideClick, closeOnEscape],
          ([$open, $closeOnOutsideClick, $closeOnEscape]) => {
            if (!$open) return
            const focusTrap = createFocusTrap({
              immediate: false,
              escapeDeactivates: $closeOnEscape,
              clickOutsideDeactivates: $closeOnOutsideClick,
              allowOutsideClick: true,
              returnFocusOnDeactivate: false,
              fallbackFocus: node,
            })
            activate = focusTrap.activate
            deactivate = focusTrap.deactivate
            const ac = focusTrap.useFocusTrap(node)
            if (ac && ac.destroy) {
              return ac.destroy
            } else {
              return focusTrap.deactivate
            }
          },
        ),
        effect([closeOnOutsideClick, open], ([$closeOnOutsideClick, $open]) => {
          return useModal(node, {
            open: $open,
            closeOnInteractOutside: $closeOnOutsideClick,
            onClose() {
              handleClose()
            },
            shouldCloseOnInteractOutside(e) {
              onOutsideClick.get()?.(e)
              if (e.defaultPrevented) return false
              return true
            },
          }).destroy
        }),
        effect([closeOnEscape], ([$closeOnEscape]) => {
          if (!$closeOnEscape) return noop
          return useEscapeKeydown(node, { handler: handleClose }).destroy
        }),
        effect([isVisible], ([$isVisible]) => {
          tick().then(() => {
            if (!$isVisible) {
              deactivate()
            } else {
              activate()
            }
          })
        }),
      )
      return {
        destroy: () => {
          unsubScroll()
          destroy()
        },
      }
    },
  })
  const portalled = makeElement(name('portalled'), {
    stores: portal,
    returned: ($portal) => ({
      'data-portal': portalAttr($portal),
    }),
    action: (node) => {
      const unsubPortal = effect([portal], ([$portal]) => {
        if ($portal === null) return noop
        const portalDestination = getPortalDestination(node, $portal)
        if (portalDestination === null) return noop
        return usePortal(node, portalDestination).destroy
      })
      return {
        destroy() {
          unsubPortal()
        },
      }
    },
  })
  const title = makeElement(name('title'), {
    stores: [ids.title],
    returned: ([$titleId]) => ({
      id: $titleId,
    }),
  })
  const description = makeElement(name('description'), {
    stores: [ids.description],
    returned: ([$descriptionId]) => ({
      id: $descriptionId,
    }),
  })
  const close = makeElement(name('close'), {
    returned: () => ({
      type: 'button',
    }),
    action: (node) => {
      const unsub = executeCallbacks(
        addMeltEventListener(node, 'click', () => {
          handleClose()
        }),
        addMeltEventListener(node, 'keydown', (e) => {
          if (e.key !== kbd.SPACE && e.key !== kbd.ENTER) return
          e.preventDefault()
          handleClose()
        }),
      )
      return {
        destroy: unsub,
      }
    },
  })
  effect([open, preventScroll], ([$open, $preventScroll]) => {
    if (!isBrowser) return
    if ($preventScroll && $open) unsubScroll = removeScroll()
    if ($open) {
      const contentEl = document.getElementById(ids.content.get())
      handleFocus({ prop: openFocus.get(), defaultEl: contentEl })
    }
    return () => {
      if (!forceVisible.get()) {
        unsubScroll()
      }
    }
  })
  return {
    ids,
    elements: {
      content,
      trigger,
      title,
      description,
      overlay,
      close,
      portalled,
    },
    states: {
      open,
    },
    options,
  }
}
function getDialogData() {
  const NAME = 'dialog'
  const PARTS = [
    'close',
    'content',
    'description',
    'overlay',
    'portal',
    'title',
    'trigger',
  ]
  return {
    NAME,
    PARTS,
  }
}
function setCtx(props) {
  const { NAME, PARTS } = getDialogData()
  const getAttrs = createBitAttrs(NAME, PARTS)
  const dialog = {
    ...createDialog({
      ...removeUndefined(props),
      role: 'dialog',
      forceVisible: true,
    }),
    getAttrs,
  }
  setContext(NAME, dialog)
  return {
    ...dialog,
    updateOption: getOptionUpdater(dialog.options),
  }
}
function getCtx() {
  const { NAME } = getDialogData()
  return getContext(NAME)
}
const Dialog = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $idValues, $$unsubscribe_idValues
  let { preventScroll = void 0 } = $$props
  let { closeOnEscape = void 0 } = $$props
  let { closeOnOutsideClick = void 0 } = $$props
  let { portal = void 0 } = $$props
  let { open = void 0 } = $$props
  let { onOpenChange = void 0 } = $$props
  let { openFocus = void 0 } = $$props
  let { closeFocus = void 0 } = $$props
  let { onOutsideClick = void 0 } = $$props
  const {
    states: { open: localOpen },
    updateOption,
    ids,
  } = setCtx({
    closeOnEscape,
    preventScroll,
    closeOnOutsideClick,
    portal,
    forceVisible: true,
    defaultOpen: open,
    openFocus,
    closeFocus,
    onOutsideClick,
    onOpenChange: ({ next }) => {
      if (open !== next) {
        onOpenChange?.(next)
        open = next
      }
      return next
    },
  })
  const idValues = derived(
    [ids.content, ids.description, ids.title],
    ([$contentId, $descriptionId, $titleId]) => ({
      content: $contentId,
      description: $descriptionId,
      title: $titleId,
    }),
  )
  $$unsubscribe_idValues = subscribe(idValues, (value) => ($idValues = value))
  if (
    $$props.preventScroll === void 0 &&
    $$bindings.preventScroll &&
    preventScroll !== void 0
  )
    $$bindings.preventScroll(preventScroll)
  if (
    $$props.closeOnEscape === void 0 &&
    $$bindings.closeOnEscape &&
    closeOnEscape !== void 0
  )
    $$bindings.closeOnEscape(closeOnEscape)
  if (
    $$props.closeOnOutsideClick === void 0 &&
    $$bindings.closeOnOutsideClick &&
    closeOnOutsideClick !== void 0
  )
    $$bindings.closeOnOutsideClick(closeOnOutsideClick)
  if ($$props.portal === void 0 && $$bindings.portal && portal !== void 0)
    $$bindings.portal(portal)
  if ($$props.open === void 0 && $$bindings.open && open !== void 0)
    $$bindings.open(open)
  if (
    $$props.onOpenChange === void 0 &&
    $$bindings.onOpenChange &&
    onOpenChange !== void 0
  )
    $$bindings.onOpenChange(onOpenChange)
  if (
    $$props.openFocus === void 0 &&
    $$bindings.openFocus &&
    openFocus !== void 0
  )
    $$bindings.openFocus(openFocus)
  if (
    $$props.closeFocus === void 0 &&
    $$bindings.closeFocus &&
    closeFocus !== void 0
  )
    $$bindings.closeFocus(closeFocus)
  if (
    $$props.onOutsideClick === void 0 &&
    $$bindings.onOutsideClick &&
    onOutsideClick !== void 0
  )
    $$bindings.onOutsideClick(onOutsideClick)
  open !== void 0 && localOpen.set(open)
  {
    updateOption('preventScroll', preventScroll)
  }
  {
    updateOption('closeOnEscape', closeOnEscape)
  }
  {
    updateOption('closeOnOutsideClick', closeOnOutsideClick)
  }
  {
    updateOption('portal', portal)
  }
  {
    updateOption('openFocus', openFocus)
  }
  {
    updateOption('closeFocus', closeFocus)
  }
  {
    updateOption('onOutsideClick', onOutsideClick)
  }
  $$unsubscribe_idValues()
  return `${slots.default ? slots.default({ ids: $idValues }) : ``}`
})
const Dialog_trigger = create_ssr_component(
  ($$result, $$props, $$bindings, slots) => {
    let builder
    let $$restProps = compute_rest_props($$props, ['asChild', 'el'])
    let $trigger, $$unsubscribe_trigger
    let { asChild = false } = $$props
    let { el = void 0 } = $$props
    const {
      elements: { trigger },
      getAttrs,
    } = getCtx()
    $$unsubscribe_trigger = subscribe(trigger, (value) => ($trigger = value))
    createDispatcher()
    const attrs = getAttrs('trigger')
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
    builder = $trigger
    {
      Object.assign(builder, attrs)
    }
    $$unsubscribe_trigger()
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
const join_a_quiz_to_rank_higher_in_the_leaderboards$1 =
  /* @__NO_SIDE_EFFECTS__ */ () =>
    `Join a quiz to test your knowledge and rank higher in the leaderboards`
const join_a_quiz$1 = /* @__NO_SIDE_EFFECTS__ */ () => `Join a quiz!`
const join$1 = /* @__NO_SIDE_EFFECTS__ */ () => `Join`
const create$1 = /* @__NO_SIDE_EFFECTS__ */ () => `Create`
const or$1 = /* @__NO_SIDE_EFFECTS__ */ () => `or`
const join_a_quiz_to_rank_higher_in_the_leaderboards =
  /* @__NO_SIDE_EFFECTS__ */ (params = {}, options = {}) => {
    return {
      en: join_a_quiz_to_rank_higher_in_the_leaderboards$1,
      fr: join_a_quiz_to_rank_higher_in_the_leaderboards$1,
      ro: join_a_quiz_to_rank_higher_in_the_leaderboards$1,
    }[options.languageTag ?? languageTag()]()
  }
const join_a_quiz = /* @__NO_SIDE_EFFECTS__ */ (params = {}, options = {}) => {
  return {
    en: join_a_quiz$1,
    fr: join_a_quiz$1,
    ro: join_a_quiz$1,
  }[options.languageTag ?? languageTag()]()
}
const join = /* @__NO_SIDE_EFFECTS__ */ (params = {}, options = {}) => {
  return {
    en: join$1,
    fr: join$1,
    ro: join$1,
  }[options.languageTag ?? languageTag()]()
}
const create = /* @__NO_SIDE_EFFECTS__ */ (params = {}, options = {}) => {
  return {
    en: create$1,
    fr: create$1,
    ro: create$1,
  }[options.languageTag ?? languageTag()]()
}
const or = /* @__NO_SIDE_EFFECTS__ */ (params = {}, options = {}) => {
  return {
    en: or$1,
    fr: or$1,
    ro: or$1,
  }[options.languageTag ?? languageTag()]()
}
const Root = Dialog
const Trigger = Dialog_trigger
const sheetVariants = tv({
  base: 'fixed z-50 gap-4 bg-background p-6 shadow-lg',
  variants: {
    side: {
      top: 'inset-x-0 top-0 border-b ',
      bottom: 'inset-x-0 bottom-0 border-t',
      left: 'inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm',
      right: 'inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm',
    },
  },
  defaultVariants: {
    side: 'right',
  },
})
const sheetTransitions = {
  top: {
    in: {
      y: '-100%',
      duration: 500,
      opacity: 1,
    },
    out: {
      y: '-100%',
      duration: 300,
      opacity: 1,
    },
  },
  bottom: {
    in: {
      y: '100%',
      duration: 500,
      opacity: 1,
    },
    out: {
      y: '100%',
      duration: 300,
      opacity: 1,
    },
  },
  left: {
    in: {
      x: '-100%',
      duration: 500,
      opacity: 1,
    },
    out: {
      x: '-100%',
      duration: 300,
      opacity: 1,
    },
  },
  right: {
    in: {
      x: '100%',
      duration: 500,
      opacity: 1,
    },
    out: {
      x: '100%',
      duration: 300,
      opacity: 1,
    },
  },
}
export {
  Root as R,
  Trigger as T,
  join_a_quiz_to_rank_higher_in_the_leaderboards as a,
  join as b,
  create as c,
  sheetVariants as d,
  getCtx as g,
  join_a_quiz as j,
  or as o,
  sheetTransitions as s,
}
