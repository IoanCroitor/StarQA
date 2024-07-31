export const index = 1
let component_cache
export const component = async () =>
  (component_cache ??= (await import('../entries/fallbacks/error.svelte.js'))
    .default)
export const imports = [
  '_app/immutable/nodes/1.jFf49Kgk.js',
  '_app/immutable/chunks/scheduler.CFTFvQoe.js',
  '_app/immutable/chunks/index.C4bCY7rf.js',
  '_app/immutable/chunks/stores.W0R6u13N.js',
  '_app/immutable/chunks/entry.C6af1f7V.js',
  '_app/immutable/chunks/index.D-fqwbAJ.js',
]
export const stylesheets = []
export const fonts = []
