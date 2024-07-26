import * as universal from '../entries/pages/_layout.ts.js';
import * as server from '../entries/pages/_layout.server.ts.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.ts";
export { server };
export const server_id = "src/routes/+layout.server.ts";
export const imports = ["_app/immutable/nodes/0.sNj6d8Zq.js","_app/immutable/chunks/_commonjsHelpers.BosuxZz1.js","_app/immutable/chunks/12.-LS5Hydt.js","_app/immutable/chunks/scheduler.H8C8Yai3.js","_app/immutable/chunks/index.BbNrxEni.js","_app/immutable/chunks/spread.CgU5AtxT.js","_app/immutable/chunks/each.28UgxMpn.js","_app/immutable/chunks/Toaster.svelte_svelte_type_style_lang.CGjAor0U.js","_app/immutable/chunks/index.D2rdY0B7.js","_app/immutable/chunks/entry.CqZ3_l39.js"];
export const stylesheets = ["_app/immutable/assets/0.CAakaOs9.css","_app/immutable/assets/Toaster.436keKGd.css"];
export const fonts = [];
