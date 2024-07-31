export const index = 14
let component_cache
export const component = async () =>
  (component_cache ??= (await import('../entries/pages/home-2/_page.svelte.js'))
    .default)
export const imports = [
  '_app/immutable/nodes/14.LMRSrFqc.js',
  '_app/immutable/chunks/scheduler.CFTFvQoe.js',
  '_app/immutable/chunks/index.C4bCY7rf.js',
  '_app/immutable/chunks/index.pqYKV8C3.js',
  '_app/immutable/chunks/index.D-fqwbAJ.js',
]
export const stylesheets = []
export const fonts = []
