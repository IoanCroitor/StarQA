

export const index = 20;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/terms/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/20.B4P1KJMb.js","_app/immutable/chunks/scheduler.BOvQPj6N.js","_app/immutable/chunks/index.VZ7RWaCg.js"];
export const stylesheets = [];
export const fonts = [];
