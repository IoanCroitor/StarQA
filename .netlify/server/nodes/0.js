import * as universal from '../entries/pages/_layout.ts.js'
import * as server from '../entries/pages/_layout.server.ts.js'

export const index = 0
let component_cache
export const component = async () =>
  (component_cache ??= (await import('../entries/pages/_layout.svelte.js'))
    .default)
export { universal }
export const universal_id = 'src/routes/+layout.ts'
export { server }
export const server_id = 'src/routes/+layout.server.ts'
export const imports = [
  '_app/immutable/nodes/0.DDhXNRI3.js',
  '_app/immutable/chunks/_commonjsHelpers.BosuxZz1.js',
  '_app/immutable/chunks/preload-helper.D6kgxu3v.js',
  '_app/immutable/chunks/public.C7M8Jfgl.js',
  '_app/immutable/chunks/scheduler.CFTFvQoe.js',
  '_app/immutable/chunks/index.C4bCY7rf.js',
  '_app/immutable/chunks/stores.W0R6u13N.js',
  '_app/immutable/chunks/entry.C6af1f7V.js',
  '_app/immutable/chunks/index.D-fqwbAJ.js',
  '_app/immutable/chunks/i18n.OSVnkU-P.js',
  '_app/immutable/chunks/runtime.DPe9Nsby.js',
  '_app/immutable/chunks/index.KhpuoAmN.js',
  '_app/immutable/chunks/each.oMGbIa55.js',
  '_app/immutable/chunks/Toaster.svelte_svelte_type_style_lang.DaP4h670.js',
]
export const stylesheets = [
  '_app/immutable/assets/0.C9z9XY7s.css',
  '_app/immutable/assets/Toaster.436keKGd.css',
]
export const fonts = []
