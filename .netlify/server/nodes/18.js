export const index = 18
let component_cache
export const component = async () =>
  (component_cache ??= (
    await import('../entries/pages/privacy/_page.svelte.js')
  ).default)
export const imports = [
  '_app/immutable/nodes/18.DyCMMo3t.js',
  '_app/immutable/chunks/scheduler.CFTFvQoe.js',
  '_app/immutable/chunks/index.C4bCY7rf.js',
]
export const stylesheets = []
export const fonts = []
