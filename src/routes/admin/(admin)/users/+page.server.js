import { auth_admin } from '$lib/firebase/admin.server';
import { fail } from '@sveltejs/kit';
/** @type {import('./$types').PageServerLoad} */
export async function load() {
	async function getUsers() {
		const { users, pageToken } = await auth_admin.listUsers();

		return {
			users: users.map((v) => v.toJSON()),
			pageToken
		};
	}

	return {
		streamed: getUsers()
	};
}

/** @type {import('./$types').Actions} */
export const actions = {
	make_admin: async ({ request }) => {
		const data = await request.formData();
		const uid = data.get('uid')?.toString();
		if (!uid) return fail(400, { message: 'no uid' });
		auth_admin.setCustomUserClaims(uid, { admin: true });
		return { success: true, message: 'Success: Making Admin' };
	},
	revoke_admin: async ({ request }) => {
		const data = await request.formData();
		const uid = data.get('uid')?.toString();
		if (!uid) return fail(400, { message: 'no uid' });
		auth_admin.setCustomUserClaims(uid, { admin: false });
		return { success: true, message: 'Success: Revoking Admin' };
	}
};
