

export const index = 12;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/profile/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/12.DJ6k_6bB.js","_app/immutable/chunks/scheduler.DZ5r-1Ap.js","_app/immutable/chunks/index.CRpXCw9X.js"];
export const stylesheets = [];
export const fonts = [];
