import * as server from '../entries/pages/home/_quizID_/_page.server.ts.js'

export const index = 13
let component_cache
export const component = async () =>
  (component_cache ??= (
    await import('../entries/pages/home/_quizID_/_page.svelte.js')
  ).default)
export { server }
export const server_id = 'src/routes/home/[quizID]/+page.server.ts'
export const imports = [
  '_app/immutable/nodes/13.BaOTIUNU.js',
  '_app/immutable/chunks/scheduler.CFTFvQoe.js',
  '_app/immutable/chunks/index.C4bCY7rf.js',
  '_app/immutable/chunks/each.oMGbIa55.js',
  '_app/immutable/chunks/index.KhpuoAmN.js',
  '_app/immutable/chunks/index.pqYKV8C3.js',
  '_app/immutable/chunks/index.D-fqwbAJ.js',
  '_app/immutable/chunks/updater.B_lI8cRh.js',
  '_app/immutable/chunks/id.BBZXwu3r.js',
  '_app/immutable/chunks/events.BLkMk6Qu.js',
  '_app/immutable/chunks/utils.DY1tV4AC.js',
  '_app/immutable/chunks/button.6DIwQgEB.js',
  '_app/immutable/chunks/preload-helper.D6kgxu3v.js',
  '_app/immutable/chunks/public.C7M8Jfgl.js',
  '_app/immutable/chunks/handleToast.DNLPj5G2.js',
  '_app/immutable/chunks/Toaster.svelte_svelte_type_style_lang.DaP4h670.js',
  '_app/immutable/chunks/runtime.DPe9Nsby.js',
  '_app/immutable/chunks/MarkdownWYSIWYG.svelte_svelte_type_style_lang.D562W-3Z.js',
  '_app/immutable/chunks/_commonjsHelpers.BosuxZz1.js',
  '_app/immutable/chunks/card-title.Dbv5r3kP.js',
  '_app/immutable/chunks/card-description.BcuorOrs.js',
  '_app/immutable/chunks/stores.W0R6u13N.js',
  '_app/immutable/chunks/entry.C6af1f7V.js',
]
export const stylesheets = [
  '_app/immutable/assets/13.DnberQuA.css',
  '_app/immutable/assets/Toaster.436keKGd.css',
  '_app/immutable/assets/MarkdownWYSIWYG.B3dFyEWs.css',
]
export const fonts = []
