/** @type {import('./$types').LayoutServerLoad} */
export async function load({ locals }) {
	if (!locals.claims?.uid) return {};
	return {
		user: locals.user?.toJSON() ?? null
	};
}
