

export const index = 10;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/home/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/10.CIQ2W81D.js","_app/immutable/chunks/scheduler.Dm3-vn-c.js","_app/immutable/chunks/index.BE9acq9p.js"];
export const stylesheets = [];
export const fonts = [];
