import { addPlayer, db } from '$lib/firebase/client';
import { fail, redirect } from '@sveltejs/kit';
import { collection, doc, getDoc, setDoc } from 'firebase/firestore';

/** @type {import('./$types').PageServerLoad} */
export async function load({ url, cookies, locals }) {
	// if there is existing game and logged in
	const cookie_game_id = cookies.get('game_id');
	if (cookie_game_id && locals.claims?.uid) {
		// check if game do exist
		const snapshot = await getDoc(doc(db, `game/${cookie_game_id}`));

		// if yes redirect
		if (snapshot.exists()) throw redirect(300, '/game');
		// if not delete cookie
		cookies.delete('game_id');
	}

	// if there is join url
	const join_game_id = url.searchParams.get('join');
	if (join_game_id && locals.user) {
		// redirect if good
		cookies.set('game_id', join_game_id);
		throw redirect(300, '/game');
	}
}

/** @type {import('./$types').Actions} */
export const actions = {
	create: async ({ cookies, locals }) => {
		if (!locals.user) return;
		try {
			const game_id = doc(collection(db, 'id')).id;

			await Promise.all([
				setDoc(doc(db, `game/${game_id}`), {
					turn: null,
					winner: null,
					full: false,
					phase: 'wait'
				}),
				addPlayer(locals.user, game_id)
			]);
			cookies.set('game_id', game_id);
		} catch (e) {
			console.error(e);
			return e;
		}
		throw redirect(303, '/game');
	},
	join: async ({ cookies, request }) => {
		const game_id = (await (await request.formData()).get('game_id')?.toString()) ?? '';
		const snapshot = await getDoc(doc(db, `game/${game_id}`));
		if (!snapshot.exists()) return fail(404, { error: "Game doesn't exist" });
		cookies.set('game_id', game_id);
		throw redirect(303, '/game');
	}
};
