import { nanoid } from 'nanoid/non-secure'
import {
  n as noop,
  a as isHTMLElement,
  h as isElement,
  g as executeCallbacks,
  j as addEventListener,
} from './index2.js'
import { r as readonly, w as writable } from './index5.js'
import { createFocusTrap as createFocusTrap$1 } from 'focus-trap'
import { dequal } from 'dequal'
import { t as tick } from './scheduler.js'
function back(array, index, increment, loop = true) {
  const previousIndex = index - increment
  if (previousIndex <= 0) {
    return loop ? array[array.length - 1] : array[0]
  }
  return array[previousIndex]
}
function forward(array, index, increment, loop = true) {
  const nextIndex = index + increment
  if (nextIndex > array.length - 1) {
    return loop ? array[0] : array[array.length - 1]
  }
  return array[nextIndex]
}
function next(array, index, loop = true) {
  if (index === array.length - 1) {
    return loop ? array[0] : array[index]
  }
  return array[index + 1]
}
function prev(array, currentIndex, loop = true) {
  if (currentIndex <= 0) {
    return loop ? array[array.length - 1] : array[0]
  }
  return array[currentIndex - 1]
}
function last(array) {
  return array[array.length - 1]
}
function wrapArray(array, startIndex) {
  return array.map((_, index) => array[(startIndex + index) % array.length])
}
function toggle(item, array, compare = dequal) {
  const itemIdx = array.findIndex((innerItem) => compare(innerItem, item))
  if (itemIdx !== -1) {
    array.splice(itemIdx, 1)
  } else {
    array.push(item)
  }
  return array
}
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
function generateId() {
  return nanoid(10)
}
function generateIds(args) {
  return args.reduce((acc, curr) => {
    acc[curr] = generateId()
    return acc
  }, {})
}
const isDom = () => typeof window !== 'undefined'
function getPlatform() {
  const agent = navigator.userAgentData
  return agent?.platform ?? navigator.platform
}
const pt = (v) => isDom() && v.test(getPlatform().toLowerCase())
const isTouchDevice = () => isDom() && !!navigator.maxTouchPoints
const isMac = () => pt(/^mac/) && !isTouchDevice()
const isApple = () => pt(/mac|iphone|ipad|ipod/i)
const isIos = () => isApple() && !isMac()
const LOCK_CLASSNAME = 'data-melt-scroll-lock'
function assignStyle(el, style) {
  if (!el) return
  const previousStyle = el.style.cssText
  Object.assign(el.style, style)
  return () => {
    el.style.cssText = previousStyle
  }
}
function setCSSProperty(el, property, value) {
  if (!el) return
  const previousValue = el.style.getPropertyValue(property)
  el.style.setProperty(property, value)
  return () => {
    if (previousValue) {
      el.style.setProperty(property, previousValue)
    } else {
      el.style.removeProperty(property)
    }
  }
}
function getPaddingProperty(documentElement) {
  const documentLeft = documentElement.getBoundingClientRect().left
  const scrollbarX = Math.round(documentLeft) + documentElement.scrollLeft
  return scrollbarX ? 'paddingLeft' : 'paddingRight'
}
function removeScroll(_document) {
  const doc = document
  const win = doc.defaultView ?? window
  const { documentElement, body } = doc
  const locked = body.hasAttribute(LOCK_CLASSNAME)
  if (locked) return noop
  body.setAttribute(LOCK_CLASSNAME, '')
  const scrollbarWidth = win.innerWidth - documentElement.clientWidth
  const setScrollbarWidthProperty = () =>
    setCSSProperty(documentElement, '--scrollbar-width', `${scrollbarWidth}px`)
  const paddingProperty = getPaddingProperty(documentElement)
  const scrollbarSidePadding = win.getComputedStyle(body)[paddingProperty]
  const setStyle = () =>
    assignStyle(body, {
      overflow: 'hidden',
      [paddingProperty]: `calc(${scrollbarSidePadding} + ${scrollbarWidth}px)`,
    })
  const setIOSStyle = () => {
    const { scrollX, scrollY, visualViewport } = win
    const offsetLeft = visualViewport?.offsetLeft ?? 0
    const offsetTop = visualViewport?.offsetTop ?? 0
    const restoreStyle = assignStyle(body, {
      position: 'fixed',
      overflow: 'hidden',
      top: `${-(scrollY - Math.floor(offsetTop))}px`,
      left: `${-(scrollX - Math.floor(offsetLeft))}px`,
      right: '0',
      [paddingProperty]: `calc(${scrollbarSidePadding} + ${scrollbarWidth}px)`,
    })
    return () => {
      restoreStyle?.()
      win.scrollTo(scrollX, scrollY)
    }
  }
  const cleanups = [
    setScrollbarWidthProperty(),
    isIos() ? setIOSStyle() : setStyle(),
  ]
  return () => {
    cleanups.forEach((fn) => fn?.())
    body.removeAttribute(LOCK_CLASSNAME)
  }
}
function getPortalParent(node) {
  let parent = node.parentElement
  while (isHTMLElement(parent) && !parent.hasAttribute('data-portal')) {
    parent = parent.parentElement
  }
  return parent || 'body'
}
function getPortalDestination(node, portalProp) {
  if (portalProp !== void 0) return portalProp
  const portalParent = getPortalParent(node)
  if (portalParent === 'body') return document.body
  return null
}
function createFocusTrap(config = {}) {
  let trap
  const { immediate, ...focusTrapOptions } = config
  const hasFocus = writable(false)
  const isPaused = writable(false)
  const activate = (opts) => trap?.activate(opts)
  const deactivate = (opts) => {
    trap?.deactivate(opts)
  }
  const pause = () => {
    if (trap) {
      trap.pause()
      isPaused.set(true)
    }
  }
  const unpause = () => {
    if (trap) {
      trap.unpause()
      isPaused.set(false)
    }
  }
  const useFocusTrap = (node) => {
    trap = createFocusTrap$1(node, {
      ...focusTrapOptions,
      onActivate() {
        hasFocus.set(true)
        config.onActivate?.()
      },
      onDeactivate() {
        hasFocus.set(false)
        config.onDeactivate?.()
      },
    })
    if (immediate) {
      activate()
    }
    return {
      destroy() {
        deactivate()
        trap = void 0
      },
    }
  }
  return {
    useFocusTrap,
    hasFocus: readonly(hasFocus),
    isPaused: readonly(isPaused),
    activate,
    deactivate,
    pause,
    unpause,
  }
}
const visibleModals = []
const useModal = (node, config) => {
  let unsubInteractOutside = noop
  function removeNodeFromVisibleModals() {
    const index = visibleModals.indexOf(node)
    if (index >= 0) {
      visibleModals.splice(index, 1)
    }
  }
  function update(config2) {
    unsubInteractOutside()
    const {
      open,
      onClose,
      shouldCloseOnInteractOutside,
      closeOnInteractOutside,
    } = config2
    sleep(100).then(() => {
      if (open) {
        visibleModals.push(node)
      } else {
        removeNodeFromVisibleModals()
      }
    })
    function isLastModal() {
      return last(visibleModals) === node
    }
    function closeModal() {
      if (isLastModal() && onClose) {
        onClose()
        removeNodeFromVisibleModals()
      }
    }
    function onInteractOutsideStart(e) {
      const target = e.target
      if (!isElement(target)) return
      if (target && isLastModal()) {
        e.preventDefault()
        e.stopPropagation()
        e.stopImmediatePropagation()
      }
    }
    function onInteractOutside(e) {
      if (shouldCloseOnInteractOutside?.(e) && isLastModal()) {
        e.preventDefault()
        e.stopPropagation()
        e.stopImmediatePropagation()
        closeModal()
      }
    }
    unsubInteractOutside = useInteractOutside(node, {
      onInteractOutsideStart,
      onInteractOutside: closeOnInteractOutside ? onInteractOutside : void 0,
      enabled: open,
    }).destroy
  }
  update(config)
  return {
    update,
    destroy() {
      removeNodeFromVisibleModals()
      unsubInteractOutside()
    },
  }
}
const usePortal = (el, target = 'body') => {
  let targetEl
  if (!isHTMLElement(target) && typeof target !== 'string') {
    return {
      destroy: noop,
    }
  }
  async function update(newTarget) {
    target = newTarget
    if (typeof target === 'string') {
      targetEl = document.querySelector(target)
      if (targetEl === null) {
        await tick()
        targetEl = document.querySelector(target)
      }
      if (targetEl === null) {
        throw new Error(`No element found matching css selector: "${target}"`)
      }
    } else if (target instanceof HTMLElement) {
      targetEl = target
    } else {
      throw new TypeError(
        `Unknown portal target type: ${target === null ? 'null' : typeof target}. Allowed types: string (CSS selector) or HTMLElement.`,
      )
    }
    el.dataset.portal = ''
    targetEl.appendChild(el)
    el.hidden = false
  }
  function destroy() {
    el.remove()
  }
  update(target)
  return {
    update,
    destroy,
  }
}
const useInteractOutside = (node, config) => {
  let unsub = noop
  let unsubClick = noop
  let isPointerDown = false
  let isPointerDownInside = false
  let ignoreEmulatedMouseEvents = false
  function update(config2) {
    unsub()
    unsubClick()
    const { onInteractOutside, onInteractOutsideStart, enabled } = config2
    if (!enabled) return
    function onPointerDown(e) {
      if (onInteractOutside && isValidEvent(e, node)) {
        onInteractOutsideStart?.(e)
      }
      const target = e.target
      if (isElement(target) && isOrContainsTarget(node, target)) {
        isPointerDownInside = true
      }
      isPointerDown = true
    }
    function triggerInteractOutside(e) {
      onInteractOutside?.(e)
    }
    const documentObj = getOwnerDocument(node)
    if (typeof PointerEvent !== 'undefined') {
      const onPointerUp = (e) => {
        unsubClick()
        const handler = (e2) => {
          if (shouldTriggerInteractOutside(e2)) {
            triggerInteractOutside(e2)
          }
          resetPointerState()
        }
        if (e.pointerType === 'touch') {
          unsubClick = addEventListener(documentObj, 'click', handler, {
            capture: true,
            once: true,
          })
          return
        }
        handler(e)
      }
      unsub = executeCallbacks(
        addEventListener(documentObj, 'pointerdown', onPointerDown, true),
        addEventListener(documentObj, 'pointerup', onPointerUp, true),
      )
    } else {
      const onMouseUp = (e) => {
        if (ignoreEmulatedMouseEvents) {
          ignoreEmulatedMouseEvents = false
        } else if (shouldTriggerInteractOutside(e)) {
          triggerInteractOutside(e)
        }
        resetPointerState()
      }
      const onTouchEnd = (e) => {
        ignoreEmulatedMouseEvents = true
        if (shouldTriggerInteractOutside(e)) {
          triggerInteractOutside(e)
        }
        resetPointerState()
      }
      unsub = executeCallbacks(
        addEventListener(documentObj, 'mousedown', onPointerDown, true),
        addEventListener(documentObj, 'mouseup', onMouseUp, true),
        addEventListener(documentObj, 'touchstart', onPointerDown, true),
        addEventListener(documentObj, 'touchend', onTouchEnd, true),
      )
    }
  }
  function shouldTriggerInteractOutside(e) {
    if (isPointerDown && !isPointerDownInside && isValidEvent(e, node)) {
      return true
    }
    return false
  }
  function resetPointerState() {
    isPointerDown = false
    isPointerDownInside = false
  }
  update(config)
  return {
    update,
    destroy() {
      unsub()
      unsubClick()
    },
  }
}
function isValidEvent(e, node) {
  if ('button' in e && e.button > 0) return false
  const target = e.target
  if (!isElement(target)) return false
  const ownerDocument = target.ownerDocument
  if (!ownerDocument || !ownerDocument.documentElement.contains(target)) {
    return false
  }
  return node && !isOrContainsTarget(node, target)
}
function isOrContainsTarget(node, target) {
  return node === target || node.contains(target)
}
function getOwnerDocument(el) {
  return el?.ownerDocument ?? document
}
export {
  useModal as a,
  getPortalDestination as b,
  createFocusTrap as c,
  back as d,
  generateId as e,
  forward as f,
  generateIds as g,
  last as l,
  next as n,
  prev as p,
  removeScroll as r,
  sleep as s,
  toggle as t,
  usePortal as u,
  wrapArray as w,
}
