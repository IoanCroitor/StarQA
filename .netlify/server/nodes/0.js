import * as universal from '../entries/pages/_layout.ts.js';
import * as server from '../entries/pages/_layout.server.ts.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.ts";
export { server };
export const server_id = "src/routes/+layout.server.ts";
export const imports = ["_app/immutable/nodes/0.B5NR6Cvp.js","_app/immutable/chunks/index.B7TqhTnX.js","_app/immutable/chunks/_commonjsHelpers.BosuxZz1.js","_app/immutable/chunks/preload-helper.D6kgxu3v.js","_app/immutable/chunks/public.Dgr1JkLZ.js","_app/immutable/chunks/scheduler.C2zK6cyP.js","_app/immutable/chunks/index.BacDW4kl.js","_app/immutable/chunks/stores.BF2jT3Cu.js","_app/immutable/chunks/entry.dddDV_vx.js","_app/immutable/chunks/index.CD4FHOst.js","_app/immutable/chunks/i18n.Cq0X8vff.js","_app/immutable/chunks/runtime.DPe9Nsby.js","_app/immutable/chunks/index.D-BixVEQ.js","_app/immutable/chunks/each.Bn5s5tn8.js","_app/immutable/chunks/spread.CgU5AtxT.js","_app/immutable/chunks/Toaster.svelte_svelte_type_style_lang.BJlT1v0b.js"];
export const stylesheets = ["_app/immutable/assets/0.Dter4vf6.css","_app/immutable/assets/Toaster.436keKGd.css"];
export const fonts = [];
