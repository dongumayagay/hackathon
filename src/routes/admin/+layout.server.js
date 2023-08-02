import { error } from '@sveltejs/kit';

/** @type {import('./$types').LayoutServerLoad} */
export async function load({ locals }) {
	if (!locals.user_id) throw error(403, 'Forbidden');
	return {};
}
