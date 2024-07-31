export const index = 12
let component_cache
export const component = async () =>
  (component_cache ??= (
    await import('../entries/pages/home/my-quizzes/_page.svelte.js')
  ).default)
export const imports = [
  '_app/immutable/nodes/12.fBXJ2bVy.js',
  '_app/immutable/chunks/scheduler.CFTFvQoe.js',
  '_app/immutable/chunks/index.C4bCY7rf.js',
  '_app/immutable/chunks/each.oMGbIa55.js',
  '_app/immutable/chunks/public.C7M8Jfgl.js',
  '_app/immutable/chunks/index.ClVjawHC.js',
  '_app/immutable/chunks/index.pqYKV8C3.js',
  '_app/immutable/chunks/index.D-fqwbAJ.js',
  '_app/immutable/chunks/card-title.Dbv5r3kP.js',
  '_app/immutable/chunks/index.KhpuoAmN.js',
  '_app/immutable/chunks/utils.DY1tV4AC.js',
  '_app/immutable/chunks/card-description.BcuorOrs.js',
  '_app/immutable/chunks/index.CRjLki-9.js',
  '_app/immutable/chunks/events.BLkMk6Qu.js',
  '_app/immutable/chunks/updater.B_lI8cRh.js',
  '_app/immutable/chunks/helpers.9wwLQSe1.js',
  '_app/immutable/chunks/action.DvEf4wxP.js',
  '_app/immutable/chunks/id.BBZXwu3r.js',
  '_app/immutable/chunks/focus.BRe4WApZ.js',
  '_app/immutable/chunks/handleToast.DNLPj5G2.js',
  '_app/immutable/chunks/Toaster.svelte_svelte_type_style_lang.DaP4h670.js',
  '_app/immutable/chunks/runtime.DPe9Nsby.js',
  '_app/immutable/chunks/Icon.Bn4rGhEj.js',
  '_app/immutable/chunks/button.6DIwQgEB.js',
]
export const stylesheets = ['_app/immutable/assets/Toaster.436keKGd.css']
export const fonts = []
