import { init } from '../serverless.js';

export const handler = init((() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.svg"]),
	mimeTypes: {".svg":"image/svg+xml"},
	_: {
		client: {"start":"_app/immutable/entry/start.D_myBCQL.js","app":"_app/immutable/entry/app.DXuDU1Pm.js","imports":["_app/immutable/entry/start.D_myBCQL.js","_app/immutable/chunks/entry.CyI56E3Q.js","_app/immutable/chunks/scheduler.BOvQPj6N.js","_app/immutable/chunks/index.B38R3nTH.js","_app/immutable/entry/app.DXuDU1Pm.js","_app/immutable/chunks/preload-helper.D6kgxu3v.js","_app/immutable/chunks/i18n.BWa1exWY.js","_app/immutable/chunks/index.VZ7RWaCg.js","_app/immutable/chunks/scheduler.BOvQPj6N.js","_app/immutable/chunks/entry.CyI56E3Q.js","_app/immutable/chunks/index.B38R3nTH.js","_app/immutable/chunks/stores.BXFRNg-G.js","_app/immutable/chunks/runtime.DPe9Nsby.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('../server/nodes/0.js')),
			__memo(() => import('../server/nodes/1.js')),
			__memo(() => import('../server/nodes/2.js')),
			__memo(() => import('../server/nodes/3.js')),
			__memo(() => import('../server/nodes/4.js')),
			__memo(() => import('../server/nodes/5.js')),
			__memo(() => import('../server/nodes/6.js')),
			__memo(() => import('../server/nodes/7.js')),
			__memo(() => import('../server/nodes/8.js')),
			__memo(() => import('../server/nodes/9.js')),
			__memo(() => import('../server/nodes/10.js')),
			__memo(() => import('../server/nodes/11.js')),
			__memo(() => import('../server/nodes/12.js')),
			__memo(() => import('../server/nodes/13.js')),
			__memo(() => import('../server/nodes/14.js')),
			__memo(() => import('../server/nodes/15.js')),
			__memo(() => import('../server/nodes/16.js')),
			__memo(() => import('../server/nodes/17.js')),
			__memo(() => import('../server/nodes/18.js')),
			__memo(() => import('../server/nodes/19.js')),
			__memo(() => import('../server/nodes/20.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/api/convertMarkdown",
				pattern: /^\/api\/convertMarkdown\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../server/entries/endpoints/api/convertMarkdown/_server.ts.js'))
			},
			{
				id: "/auth/callback",
				pattern: /^\/auth\/callback\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../server/entries/endpoints/auth/callback/_server.ts.js'))
			},
			{
				id: "/auth/confirm",
				pattern: /^\/auth\/confirm\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../server/entries/endpoints/auth/confirm/_server.ts.js'))
			},
			{
				id: "/auth/google",
				pattern: /^\/auth\/google\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../server/entries/endpoints/auth/google/_server.ts.js'))
			},
			{
				id: "/auth/login",
				pattern: /^\/auth\/login\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/auth/new-password",
				pattern: /^\/auth\/new-password\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 7 },
				endpoint: null
			},
			{
				id: "/auth/register",
				pattern: /^\/auth\/register\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 8 },
				endpoint: null
			},
			{
				id: "/auth/reset",
				pattern: /^\/auth\/reset\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 9 },
				endpoint: null
			},
			{
				id: "/home-2",
				pattern: /^\/home-2\/?$/,
				params: [],
				page: { layouts: [0,4,], errors: [1,,], leaf: 14 },
				endpoint: null
			},
			{
				id: "/home-2/completed",
				pattern: /^\/home-2\/completed\/?$/,
				params: [],
				page: { layouts: [0,4,], errors: [1,,], leaf: 15 },
				endpoint: null
			},
			{
				id: "/home-2/create",
				pattern: /^\/home-2\/create\/?$/,
				params: [],
				page: { layouts: [0,4,], errors: [1,,], leaf: 16 },
				endpoint: null
			},
			{
				id: "/home",
				pattern: /^\/home\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,,], leaf: 10 },
				endpoint: null
			},
			{
				id: "/home/create",
				pattern: /^\/home\/create\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,,], leaf: 11 },
				endpoint: null
			},
			{
				id: "/home/my-quizzes",
				pattern: /^\/home\/my-quizzes\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,,], leaf: 12 },
				endpoint: null
			},
			{
				id: "/home/[quizID]",
				pattern: /^\/home\/([^/]+?)\/?$/,
				params: [{"name":"quizID","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,3,], errors: [1,,], leaf: 13 },
				endpoint: null
			},
			{
				id: "/logout",
				pattern: /^\/logout\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 17 },
				endpoint: null
			},
			{
				id: "/privacy",
				pattern: /^\/privacy\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 18 },
				endpoint: null
			},
			{
				id: "/profile",
				pattern: /^\/profile\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 19 },
				endpoint: null
			},
			{
				id: "/terms",
				pattern: /^\/terms\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 20 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})());
