

export const index = 12;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/home/my-quizzes/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/12.DTbk1WsT.js","_app/immutable/chunks/scheduler.Dm3-vn-c.js","_app/immutable/chunks/index.BE9acq9p.js"];
export const stylesheets = [];
export const fonts = [];
