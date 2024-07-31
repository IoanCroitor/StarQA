export const index = 5
let component_cache
export const component = async () =>
  (component_cache ??= (await import('../entries/pages/_page.svelte.js'))
    .default)
export const imports = [
  '_app/immutable/nodes/5.D_Qb3B7d.js',
  '_app/immutable/chunks/scheduler.CFTFvQoe.js',
  '_app/immutable/chunks/index.C4bCY7rf.js',
  '_app/immutable/chunks/index.KhpuoAmN.js',
  '_app/immutable/chunks/index.pqYKV8C3.js',
  '_app/immutable/chunks/index.D-fqwbAJ.js',
  '_app/immutable/chunks/runtime.DPe9Nsby.js',
  '_app/immutable/chunks/login.CaLW5k7s.js',
  '_app/immutable/chunks/register.LUFgAvaX.js',
  '_app/immutable/chunks/button.6DIwQgEB.js',
  '_app/immutable/chunks/utils.DY1tV4AC.js',
]
export const stylesheets = ['_app/immutable/assets/5.DR_iaUrK.css']
export const fonts = []
