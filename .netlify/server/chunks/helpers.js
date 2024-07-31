import { d as derived, w as writable } from './index5.js'
import {
  s as sleep,
  w as wrapArray,
  u as usePortal,
  c as createFocusTrap,
  a as useModal,
} from './action.js'
import {
  f as isBrowser,
  a as isHTMLElement,
  w as withGet,
  n as noop,
  u as useEscapeKeydown,
  g as executeCallbacks,
} from './index2.js'
import { l as get_store_value } from './lifecycle.js'
import {
  flip,
  offset,
  shift,
  arrow,
  size,
  autoUpdate,
  computePosition,
} from '@floating-ui/dom'
import 'dequal'
import { nanoid } from 'nanoid/non-secure'
function addHighlight(element) {
  element.setAttribute('data-highlighted', '')
}
function removeHighlight(element) {
  element.removeAttribute('data-highlighted')
}
function debounce(fn, wait = 500) {
  let timeout = null
  return function (...args) {
    const later = () => {
      timeout = null
      fn(...args)
    }
    timeout && clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}
function derivedVisible(obj) {
  const { open, forceVisible, activeTrigger } = obj
  return derived(
    [open, forceVisible, activeTrigger],
    ([$open, $forceVisible, $activeTrigger]) =>
      ($open || $forceVisible) && $activeTrigger !== null,
  )
}
function handleRovingFocus(nextElement) {
  if (!isBrowser) return
  sleep(1).then(() => {
    const currentFocusedElement = document.activeElement
    if (
      !isHTMLElement(currentFocusedElement) ||
      currentFocusedElement === nextElement
    )
      return
    currentFocusedElement.tabIndex = -1
    if (nextElement) {
      nextElement.tabIndex = 0
      nextElement.focus()
    }
  })
}
function getFocusableElements() {
  return Array.from(
    document.querySelectorAll(
      'a[href]:not([tabindex="-1"]), button:not([disabled]):not([tabindex="-1"]), input:not([disabled]):not([tabindex="-1"]), select:not([disabled]):not([tabindex="-1"]), textarea:not([disabled]):not([tabindex="-1"]), [tabindex]:not([tabindex="-1"])',
    ),
  )
}
function getNextFocusable(currentElement) {
  const focusableElements = getFocusableElements()
  const currentIndex = focusableElements.indexOf(currentElement)
  const nextIndex = currentIndex + 1
  const nextElement = focusableElements[nextIndex]
  if (nextIndex < focusableElements.length && isHTMLElement(nextElement)) {
    return nextElement
  }
  return null
}
function getPreviousFocusable(currentElement) {
  const focusableElements = getFocusableElements()
  const currentIndex = focusableElements.indexOf(currentElement)
  const previousIndex = currentIndex - 1
  const prevElement = focusableElements[previousIndex]
  if (previousIndex >= 0 && isHTMLElement(prevElement)) {
    return prevElement
  }
  return null
}
const ignoredKeys = /* @__PURE__ */ new Set([
  'Shift',
  'Control',
  'Alt',
  'Meta',
  'CapsLock',
  'NumLock',
])
const defaults = {
  onMatch: handleRovingFocus,
  getCurrentItem: () => document.activeElement,
}
function createTypeaheadSearch(args = {}) {
  const withDefaults = { ...defaults, ...args }
  const typed = withGet(writable([]))
  const resetTyped = debounce(() => {
    typed.update(() => [])
  })
  const handleTypeaheadSearch = (key, items) => {
    if (ignoredKeys.has(key)) return
    const currentItem = withDefaults.getCurrentItem()
    const $typed = get_store_value(typed)
    if (!Array.isArray($typed)) {
      return
    }
    $typed.push(key.toLowerCase())
    typed.set($typed)
    const candidateItems = items.filter((item) => {
      if (
        item.getAttribute('disabled') === 'true' ||
        item.getAttribute('aria-disabled') === 'true' ||
        item.hasAttribute('data-disabled')
      ) {
        return false
      }
      return true
    })
    const isRepeated =
      $typed.length > 1 && $typed.every((char) => char === $typed[0])
    const normalizeSearch = isRepeated ? $typed[0] : $typed.join('')
    const currentItemIndex = isHTMLElement(currentItem)
      ? candidateItems.indexOf(currentItem)
      : -1
    let wrappedItems = wrapArray(candidateItems, Math.max(currentItemIndex, 0))
    const excludeCurrentItem = normalizeSearch.length === 1
    if (excludeCurrentItem) {
      wrappedItems = wrappedItems.filter((v) => v !== currentItem)
    }
    const nextItem = wrappedItems.find(
      (item) =>
        item?.innerText &&
        item.innerText.toLowerCase().startsWith(normalizeSearch.toLowerCase()),
    )
    if (isHTMLElement(nextItem) && nextItem !== currentItem) {
      withDefaults.onMatch(nextItem)
    }
    resetTyped()
  }
  return {
    typed,
    resetTyped,
    handleTypeaheadSearch,
  }
}
const defaultConfig$1 = {
  strategy: 'absolute',
  placement: 'top',
  gutter: 5,
  flip: true,
  sameWidth: false,
  overflowPadding: 8,
}
const ARROW_TRANSFORM = {
  bottom: 'rotate(45deg)',
  left: 'rotate(135deg)',
  top: 'rotate(225deg)',
  right: 'rotate(315deg)',
}
function useFloating(reference, floating, opts = {}) {
  if (!floating || !reference || opts === null)
    return {
      destroy: noop,
    }
  const options = { ...defaultConfig$1, ...opts }
  const arrowEl = floating.querySelector('[data-arrow=true]')
  const middleware = []
  if (options.flip) {
    middleware.push(
      flip({
        boundary: options.boundary,
        padding: options.overflowPadding,
      }),
    )
  }
  const arrowOffset = isHTMLElement(arrowEl) ? arrowEl.offsetHeight / 2 : 0
  if (options.gutter || options.offset) {
    const data = options.gutter ? { mainAxis: options.gutter } : options.offset
    if (data?.mainAxis != null) {
      data.mainAxis += arrowOffset
    }
    middleware.push(offset(data))
  }
  middleware.push(
    shift({
      boundary: options.boundary,
      crossAxis: options.overlap,
      padding: options.overflowPadding,
    }),
  )
  if (arrowEl) {
    middleware.push(arrow({ element: arrowEl, padding: 8 }))
  }
  middleware.push(
    size({
      padding: options.overflowPadding,
      apply({ rects, availableHeight, availableWidth }) {
        if (options.sameWidth) {
          Object.assign(floating.style, {
            width: `${Math.round(rects.reference.width)}px`,
            minWidth: 'unset',
          })
        }
        if (options.fitViewport) {
          Object.assign(floating.style, {
            maxWidth: `${availableWidth}px`,
            maxHeight: `${availableHeight}px`,
          })
        }
      },
    }),
  )
  function compute() {
    if (!reference || !floating) return
    if (
      isHTMLElement(reference) &&
      !reference.ownerDocument.documentElement.contains(reference)
    )
      return
    const { placement, strategy } = options
    computePosition(reference, floating, {
      placement,
      middleware,
      strategy,
    }).then((data) => {
      const x = Math.round(data.x)
      const y = Math.round(data.y)
      const [side, align] = getSideAndAlignFromPlacement(data.placement)
      floating.setAttribute('data-side', side)
      floating.setAttribute('data-align', align)
      Object.assign(floating.style, {
        position: options.strategy,
        top: `${y}px`,
        left: `${x}px`,
      })
      if (isHTMLElement(arrowEl) && data.middlewareData.arrow) {
        const { x: x2, y: y2 } = data.middlewareData.arrow
        const dir = data.placement.split('-')[0]
        arrowEl.setAttribute('data-side', dir)
        Object.assign(arrowEl.style, {
          position: 'absolute',
          left: x2 != null ? `${x2}px` : '',
          top: y2 != null ? `${y2}px` : '',
          [dir]: `calc(100% - ${arrowOffset}px)`,
          transform: ARROW_TRANSFORM[dir],
          backgroundColor: 'inherit',
          zIndex: 'inherit',
        })
      }
      return data
    })
  }
  Object.assign(floating.style, {
    position: options.strategy,
  })
  return {
    destroy: autoUpdate(reference, floating, compute),
  }
}
function getSideAndAlignFromPlacement(placement) {
  const [side, align = 'center'] = placement.split('-')
  return [side, align]
}
const defaultConfig = {
  floating: {},
  focusTrap: {},
  modal: {},
  escapeKeydown: {},
  portal: 'body',
}
const usePopper = (popperElement, args) => {
  popperElement.dataset.escapee = ''
  const { anchorElement, open, options } = args
  if (!anchorElement || !open || !options) {
    return { destroy: noop }
  }
  const opts = { ...defaultConfig, ...options }
  const callbacks = []
  if (opts.portal !== null) {
    callbacks.push(usePortal(popperElement, opts.portal).destroy)
  }
  callbacks.push(
    useFloating(anchorElement, popperElement, opts.floating).destroy,
  )
  if (opts.focusTrap !== null) {
    const { useFocusTrap } = createFocusTrap({
      immediate: true,
      escapeDeactivates: false,
      allowOutsideClick: true,
      returnFocusOnDeactivate: false,
      fallbackFocus: popperElement,
      ...opts.focusTrap,
    })
    callbacks.push(useFocusTrap(popperElement).destroy)
  }
  if (opts.modal !== null) {
    callbacks.push(
      useModal(popperElement, {
        onClose: () => {
          if (isHTMLElement(anchorElement)) {
            open.set(false)
            anchorElement.focus()
          }
        },
        shouldCloseOnInteractOutside: (e) => {
          if (e.defaultPrevented) return false
          if (
            isHTMLElement(anchorElement) &&
            anchorElement.contains(e.target)
          ) {
            return false
          }
          return true
        },
        ...opts.modal,
      }).destroy,
    )
  }
  if (opts.escapeKeydown !== null) {
    callbacks.push(
      useEscapeKeydown(popperElement, {
        enabled: open,
        handler: () => {
          open.set(false)
        },
        ...opts.escapeKeydown,
      }).destroy,
    )
  }
  const unsubscribe = executeCallbacks(...callbacks)
  return {
    destroy() {
      unsubscribe()
    },
  }
}
function generateId() {
  return nanoid(10)
}
function getPositioningUpdater(store) {
  return (props = {}) => {
    return updatePositioning(store, props)
  }
}
function updatePositioning(store, props) {
  const defaultPositioningProps = {
    side: 'bottom',
    align: 'center',
    sideOffset: 0,
    alignOffset: 0,
    sameWidth: false,
    avoidCollisions: true,
    collisionPadding: 8,
    fitViewport: false,
    strategy: 'absolute',
    overlap: false,
  }
  const withDefaults = { ...defaultPositioningProps, ...props }
  store.update((prev) => {
    return {
      ...prev,
      placement: joinPlacement(withDefaults.side, withDefaults.align),
      offset: {
        ...prev.offset,
        mainAxis: withDefaults.sideOffset,
        crossAxis: withDefaults.alignOffset,
      },
      gutter: 0,
      sameWidth: withDefaults.sameWidth,
      flip: withDefaults.avoidCollisions,
      overflowPadding: withDefaults.collisionPadding,
      boundary: withDefaults.collisionBoundary,
      fitViewport: withDefaults.fitViewport,
      strategy: withDefaults.strategy,
      overlap: withDefaults.overlap,
    }
  })
}
function joinPlacement(side, align) {
  if (align === 'center') return side
  return `${side}-${align}`
}
export {
  getPreviousFocusable as a,
  addHighlight as b,
  createTypeaheadSearch as c,
  derivedVisible as d,
  generateId as e,
  getPositioningUpdater as f,
  getNextFocusable as g,
  handleRovingFocus as h,
  removeHighlight as r,
  usePopper as u,
}
