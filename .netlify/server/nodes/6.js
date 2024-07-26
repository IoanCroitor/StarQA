import * as server from '../entries/pages/auth/new-password/_page.server.ts.js';

export const index = 6;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/auth/new-password/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/auth/new-password/+page.server.ts";
export const imports = ["_app/immutable/nodes/6.CJQUDX2Q.js","_app/immutable/chunks/scheduler.H8C8Yai3.js","_app/immutable/chunks/index.BbNrxEni.js","_app/immutable/chunks/spread.CgU5AtxT.js","_app/immutable/chunks/zod-schema.DCzFgcXQ.js","_app/immutable/chunks/index.CCpc_m7T.js","_app/immutable/chunks/index.D2rdY0B7.js","_app/immutable/chunks/input.DdDMmxPW.js","_app/immutable/chunks/each.28UgxMpn.js","_app/immutable/chunks/button.B2sDTI7s.js","_app/immutable/chunks/stores.BDg8ckWQ.js","_app/immutable/chunks/entry.CqZ3_l39.js","_app/immutable/chunks/_commonjsHelpers.BosuxZz1.js","_app/immutable/chunks/Toaster.svelte_svelte_type_style_lang.CGjAor0U.js","_app/immutable/chunks/passwordComplexity.C7i6DAKJ.js","_app/immutable/chunks/updater.DiBoY_Fr.js"];
export const stylesheets = ["_app/immutable/assets/Toaster.436keKGd.css"];
export const fonts = [];
