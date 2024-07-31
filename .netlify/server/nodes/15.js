export const index = 15
let component_cache
export const component = async () =>
  (component_cache ??= (
    await import('../entries/pages/home-2/completed/_page.svelte.js')
  ).default)
export const imports = [
  '_app/immutable/nodes/15.CzlrsQq8.js',
  '_app/immutable/chunks/scheduler.CFTFvQoe.js',
  '_app/immutable/chunks/index.C4bCY7rf.js',
  '_app/immutable/chunks/each.oMGbIa55.js',
  '_app/immutable/chunks/index.pqYKV8C3.js',
  '_app/immutable/chunks/index.D-fqwbAJ.js',
  '_app/immutable/chunks/index.KhpuoAmN.js',
  '_app/immutable/chunks/card-title.Dbv5r3kP.js',
  '_app/immutable/chunks/utils.DY1tV4AC.js',
  '_app/immutable/chunks/card-description.BcuorOrs.js',
]
export const stylesheets = []
export const fonts = []
