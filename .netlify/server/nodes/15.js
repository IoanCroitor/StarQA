

export const index = 15;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/terms/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/15.8iAr1lrW.js","_app/immutable/chunks/scheduler.mFZ6drCs.js","_app/immutable/chunks/index.Bwt966Rt.js"];
export const stylesheets = [];
export const fonts = [];
