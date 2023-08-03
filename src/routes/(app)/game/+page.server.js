import { addPlayer, db } from '$lib/firebase/client';
import { collection, deleteDoc, doc, setDoc } from 'firebase/firestore';
import { error, redirect } from '@sveltejs/kit';
import { getDoc, getDocs, query, where } from 'firebase/firestore';

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals, cookies, url }) {
	if (!locals.user) throw error(401, 'sign in required');

	let game_id = url.searchParams.get('game_id');
	game_id = cookies.get('game_id') ?? null;

	if (!game_id) return {};

	const game_snapshot = await getDoc(doc(db, `game/${game_id}`));
	if (!game_snapshot.exists()) throw error(404, "Game Lobby doesn't exist");

	const players_snapshot = await getDocs(
		query(collection(db, 'players'), where('game_id', '==', game_id))
	);
	if (players_snapshot.size >= 2) throw error(403, 'Lobby is full');

	const players = players_snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

	await addPlayer(locals.user, game_id);
	return { game_id, players };
}

/** @type {import('./$types').Actions} */
export const actions = {
	create: async ({ cookies, locals }) => {
		if (!locals.user) return;
		try {
			const game_id = doc(collection(db, 'id')).id;

			await Promise.all([
				setDoc(doc(db, `game/${game_id}`), {
					which_player_turn: null,
					winner: null
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
		cookies.set('game_id', game_id);
		throw redirect(303, '/game');
	},
	quit: async ({ cookies, locals }) => {
		const game_id = cookies.get('game_id');

		if (!game_id) return {};

		const doc_ref = doc(db, `players/${locals.claims?.uid}`);
		await deleteDoc(doc_ref);

		const players_snapshot = await getDocs(
			query(collection(db, 'players'), where('game_id', '==', game_id))
		);
		if (players_snapshot.size === 0) await deleteDoc(doc(db, `game/${game_id}`));

		cookies.delete('game_id');
		throw redirect(303, '/game');
	}
};
