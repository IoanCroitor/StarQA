

export const index = 20;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/terms/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/20.Co-_SEUL.js","_app/immutable/chunks/scheduler.Dm3-vn-c.js","_app/immutable/chunks/index.BE9acq9p.js"];
export const stylesheets = [];
export const fonts = [];
