import * as server from '../entries/pages/_layout.server.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { server };
export const server_id = "src/routes/+layout.server.js";
export const imports = ["_app/immutable/nodes/0.S4T25_3j.js","_app/immutable/chunks/scheduler.DZ5r-1Ap.js","_app/immutable/chunks/index.CRpXCw9X.js"];
export const stylesheets = ["_app/immutable/assets/0.BSnj7yoo.css"];
export const fonts = [];
