import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { cubicOut } from 'svelte/easing'
import type { TransitionConfig } from 'svelte/transition'
import type { MediaType } from '../routes/home/create/types'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

type FlyAndScaleParams = {
  y?: number
  x?: number
  start?: number
  duration?: number
}

export const flyAndScale = (
  node: Element,
  params: FlyAndScaleParams = { y: -8, x: 0, start: 0.95, duration: 150 },
): TransitionConfig => {
  const style = getComputedStyle(node)
  const transform = style.transform === 'none' ? '' : style.transform

  const scaleConversion = (
    valueA: number,
    scaleA: [number, number],
    scaleB: [number, number],
  ) => {
    const [minA, maxA] = scaleA
    const [minB, maxB] = scaleB

    const percentage = (valueA - minA) / (maxA - minA)
    const valueB = percentage * (maxB - minB) + minB

    return valueB
  }

  const styleToString = (
    style: Record<string, number | string | undefined>,
  ): string => {
    return Object.keys(style).reduce((str, key) => {
      if (style[key] === undefined) return str
      return str + `${key}:${style[key]};`
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

export const serializeNonPOJOs = (obj: any) => {
  return structuredClone(obj)
}

export function splitBySpaces(input: string): string[] {
  return input.split(' ').filter((word) => word.length > 0)
}

export function getAcceptType(type: MediaType): string {
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

export function generate8DigitCode(): string {
  let code = ''
  for (let i = 0; i < 8; i++) {
    code += Math.floor(Math.random() * 10)
  }
  return code
}

export function getSubstringAfterLastDot(str: string) {
  const lastDotIndex = str.lastIndexOf('.')
  if (lastDotIndex === -1) {
    return ''
  }
  return str.substring(lastDotIndex + 1)
}

export function removeTrailingSlashAsterisk(str: string) {
  if (str.endsWith('/*')) {
    return str.slice(0, -2)
  }
  return str
}

export function generateRandomBinary(): number {
  return Math.floor(Math.random() * 2)
}

export function swapElements(
  arr: string[],
  index1: number,
  index2: number,
): void {
  if (
    index1 < 0 ||
    index1 >= arr.length ||
    index2 < 0 ||
    index2 >= arr.length
  ) {
    throw new Error('Index out of bounds')
  }
  const temp = String(arr[index1])
  arr[index1] = String(arr[index2])
  arr[index2] = String(temp)
}


 export function formatDate(dateString: string) {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    }
    return new Date(dateString).toLocaleString('en-US', options)
  }