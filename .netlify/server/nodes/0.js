import * as universal from '../entries/pages/_layout.ts.js';
import * as server from '../entries/pages/_layout.server.ts.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.ts";
export { server };
export const server_id = "src/routes/+layout.server.ts";
export const imports = ["_app/immutable/nodes/0.DGqcZ-Xy.js","_app/immutable/chunks/_commonjsHelpers.BosuxZz1.js","_app/immutable/chunks/preload-helper.D6kgxu3v.js","_app/immutable/chunks/public.DjV4NXKc.js","_app/immutable/chunks/scheduler.BOvQPj6N.js","_app/immutable/chunks/index.VZ7RWaCg.js","_app/immutable/chunks/stores.BXFRNg-G.js","_app/immutable/chunks/entry.CyI56E3Q.js","_app/immutable/chunks/index.B38R3nTH.js","_app/immutable/chunks/i18n.BWa1exWY.js","_app/immutable/chunks/runtime.DPe9Nsby.js","_app/immutable/chunks/index.BztyV3az.js","_app/immutable/chunks/each.Dl0rx1ww.js","_app/immutable/chunks/Toaster.svelte_svelte_type_style_lang.Ddiw0CVb.js"];
export const stylesheets = ["_app/immutable/assets/0.D9N_yThG.css","_app/immutable/assets/Toaster.436keKGd.css"];
export const fonts = [];
