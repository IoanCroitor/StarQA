import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
const void_element_names =
  /^(?:area|base|br|col|command|embed|hr|img|input|keygen|link|meta|param|source|track|wbr)$/
function is_void(name) {
  return void_element_names.test(name) || name.toLowerCase() === '!doctype'
}
function cubicOut(t) {
  const f = t - 1
  return f * f * f + 1
}
function cn(...inputs) {
  return twMerge(clsx(inputs))
}
const flyAndScale = (
  node,
  params = { y: -8, x: 0, start: 0.95, duration: 150 },
) => {
  const style = getComputedStyle(node)
  const transform = style.transform === 'none' ? '' : style.transform
  const scaleConversion = (valueA, scaleA, scaleB) => {
    const [minA, maxA] = scaleA
    const [minB, maxB] = scaleB
    const percentage = (valueA - minA) / (maxA - minA)
    const valueB = percentage * (maxB - minB) + minB
    return valueB
  }
  const styleToString = (style2) => {
    return Object.keys(style2).reduce((str, key) => {
      if (style2[key] === void 0) return str
      return str + `${key}:${style2[key]};`
    }, '')
  }
  return {
    duration: params.duration ?? 200,
    delay: 0,
    css: (t) => {
      const y = scaleConversion(t, [0, 1], [params.y ?? 5, 0])
      const x = scaleConversion(t, [0, 1], [params.x ?? 0, 0])
      const scale = scaleConversion(t, [0, 1], [params.start ?? 0.95, 1])
      return styleToString({
        transform: `${transform} translate3d(${x}px, ${y}px, 0) scale(${scale})`,
        opacity: t,
      })
    },
    easing: cubicOut,
  }
}
function splitBySpaces(input) {
  return input.split(' ').filter((word) => word.length > 0)
}
function getAcceptType(type) {
  switch (type) {
    case 'image':
      return 'image/*'
    case 'model':
      return '.obj,.fbx,.dae'
    case 'video':
      return 'video/*'
    case 'music':
      return 'audio/*'
    default:
      return ''
  }
}
function generate8DigitCode() {
  let code = ''
  for (let i = 0; i < 8; i++) {
    code += Math.floor(Math.random() * 10)
  }
  return code
}
export {
  cubicOut as a,
  generate8DigitCode as b,
  cn as c,
  flyAndScale as f,
  getAcceptType as g,
  is_void as i,
  splitBySpaces as s,
}
