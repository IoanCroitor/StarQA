import * as server from '../entries/pages/home/_quizID_/_page.server.ts.js';

export const index = 13;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/home/_quizID_/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/home/[quizID]/+page.server.ts";
export const imports = ["_app/immutable/nodes/13.BRDgRn8f.js","_app/immutable/chunks/scheduler.BOvQPj6N.js","_app/immutable/chunks/index.VZ7RWaCg.js","_app/immutable/chunks/each.Dl0rx1ww.js","_app/immutable/chunks/index.BztyV3az.js","_app/immutable/chunks/index.CEiWyn8D.js","_app/immutable/chunks/index.B38R3nTH.js","_app/immutable/chunks/updater.Bd8xcbRt.js","_app/immutable/chunks/id.DTuhMOSg.js","_app/immutable/chunks/events.3SThSF8Z.js","_app/immutable/chunks/utils.CZzckr2q.js","_app/immutable/chunks/button.BlscxRNY.js","_app/immutable/chunks/preload-helper.D6kgxu3v.js","_app/immutable/chunks/public.DjV4NXKc.js","_app/immutable/chunks/handleToast.DBet29Io.js","_app/immutable/chunks/Toaster.svelte_svelte_type_style_lang.Ddiw0CVb.js","_app/immutable/chunks/runtime.DPe9Nsby.js","_app/immutable/chunks/card-title.Wls8-bD3.js","_app/immutable/chunks/card-description.DzAyCZal.js","_app/immutable/chunks/functions.7WSLLGk3.js","_app/immutable/chunks/stores.BXFRNg-G.js","_app/immutable/chunks/entry.CyI56E3Q.js"];
export const stylesheets = ["_app/immutable/assets/13.DnberQuA.css","_app/immutable/assets/Toaster.436keKGd.css"];
export const fonts = [];
