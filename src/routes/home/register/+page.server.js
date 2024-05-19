import { error, redirect } from '@sveltejs/kit';

import { generateUsername } from '$lib/utils_server';

export const actions = {
	// @ts-ignore
	register: async ({ locals, request }) => {
		console.log('hellow from server');
		const body = Object.fromEntries(await request.formData());

		let username = generateUsername(body.name.split(' ').join('')).toLowerCase();
		console.log(username, body);
		try {
			await locals.pb.collection('users').create({ username, ...body });
			await locals.pb.collection('users').requestVerification(body.email);
		} catch (err) {
			console.log('Error: ', err);
			throw error(500, 'Something went wrong');
		}

		throw redirect(303, '/login');
	}
};
