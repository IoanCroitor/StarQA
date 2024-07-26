import * as universal from '../entries/pages/_layout.ts.js';
import * as server from '../entries/pages/_layout.server.ts.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.ts";
export { server };
export const server_id = "src/routes/+layout.server.ts";
export const imports = ["_app/immutable/nodes/0.a5XHD4g9.js","_app/immutable/chunks/_commonjsHelpers.BosuxZz1.js","_app/immutable/chunks/i18n.BYdAbb9s.js","_app/immutable/chunks/index.Bwt966Rt.js","_app/immutable/chunks/scheduler.mFZ6drCs.js","_app/immutable/chunks/12.BfKC9a_a.js","_app/immutable/chunks/index.lObsX47n.js","_app/immutable/chunks/stores.C_ozZbQ-.js","_app/immutable/chunks/runtime.DPe9Nsby.js","_app/immutable/chunks/index.z9jyRYvW.js","_app/immutable/chunks/each.CfWMxmkq.js","_app/immutable/chunks/Toaster.svelte_svelte_type_style_lang.DabrnpyT.js"];
export const stylesheets = ["_app/immutable/assets/0.BmaNwi-e.css","_app/immutable/assets/Toaster.436keKGd.css"];
export const fonts = [];
