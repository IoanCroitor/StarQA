export const index = 10
let component_cache
export const component = async () =>
  (component_cache ??= (await import('../entries/pages/home/_page.svelte.js'))
    .default)
export const imports = [
  '_app/immutable/nodes/10.CuTVyDOD.js',
  '_app/immutable/chunks/scheduler.CFTFvQoe.js',
  '_app/immutable/chunks/index.C4bCY7rf.js',
  '_app/immutable/chunks/Icon.Bn4rGhEj.js',
  '_app/immutable/chunks/index.KhpuoAmN.js',
  '_app/immutable/chunks/card-title.Dbv5r3kP.js',
  '_app/immutable/chunks/utils.DY1tV4AC.js',
  '_app/immutable/chunks/index.pqYKV8C3.js',
  '_app/immutable/chunks/index.D-fqwbAJ.js',
  '_app/immutable/chunks/card-description.BcuorOrs.js',
  '_app/immutable/chunks/entry.C6af1f7V.js',
  '_app/immutable/chunks/input.DYV1u9nS.js',
  '_app/immutable/chunks/index.DciPiubG.js',
  '_app/immutable/chunks/runtime.DPe9Nsby.js',
  '_app/immutable/chunks/updater.B_lI8cRh.js',
  '_app/immutable/chunks/id.BBZXwu3r.js',
  '_app/immutable/chunks/events.BLkMk6Qu.js',
  '_app/immutable/chunks/action.DvEf4wxP.js',
  '_app/immutable/chunks/focus.BRe4WApZ.js',
  '_app/immutable/chunks/button.6DIwQgEB.js',
  '_app/immutable/chunks/avatar-fallback.DcrPEsUc.js',
]
export const stylesheets = []
export const fonts = []
