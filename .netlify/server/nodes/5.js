

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/auth/error/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/5.BeJIqNmx.js","_app/immutable/chunks/scheduler.C2zK6cyP.js","_app/immutable/chunks/index.BacDW4kl.js"];
export const stylesheets = [];
export const fonts = [];
