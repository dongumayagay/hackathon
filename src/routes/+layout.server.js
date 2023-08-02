import { auth_admin } from '$lib/firebase/admin.server';

/** @type {import('./$types').LayoutServerLoad} */
export async function load({ locals }) {
	if (!locals.claims?.uid) return {};
	return {
		user: (await auth_admin.getUser(locals.claims.uid)).toJSON()
	};
}
