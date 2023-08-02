import { auth_admin } from '$lib/firebase/admin.server';

/** @type {import('./$types').LayoutServerLoad} */
export async function load({ locals }) {
	if (!locals.user_id) return {};
	return {
		user: (await auth_admin.getUser(locals.user_id)).toJSON()
	};
}
