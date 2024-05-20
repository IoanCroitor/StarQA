import * as server from '../entries/pages/auth/_layout.server.ts.js';

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/auth/_layout.svelte.js')).default;
export { server };
export const server_id = "src/routes/auth/+layout.server.ts";
export const imports = ["_app/immutable/nodes/2.NlbAABVG.js","_app/immutable/chunks/scheduler.DZ5r-1Ap.js","_app/immutable/chunks/index.CRpXCw9X.js","_app/immutable/chunks/index.BPcClc_Z.js","_app/immutable/chunks/index.KLNdFgfl.js","_app/immutable/chunks/10.BuEL0oyd.js","_app/immutable/chunks/button.Dcrhp4XC.js","_app/immutable/chunks/loader-circle.ClikfAh6.js","_app/immutable/chunks/Icon.B8vtKlbD.js","_app/immutable/chunks/each.D6YF6ztN.js","_app/immutable/chunks/pocketbase.BCEyItAg.js","_app/immutable/chunks/entry.DOBhUn-1.js"];
export const stylesheets = [];
export const fonts = [];
