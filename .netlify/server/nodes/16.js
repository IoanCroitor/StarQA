export const index = 16
let component_cache
export const component = async () =>
  (component_cache ??= (
    await import('../entries/pages/home-2/create/_page.svelte.js')
  ).default)
export const imports = [
  '_app/immutable/nodes/16.BEtgRe5l.js',
  '_app/immutable/chunks/scheduler.CFTFvQoe.js',
  '_app/immutable/chunks/index.C4bCY7rf.js',
]
export const stylesheets = []
export const fonts = []
