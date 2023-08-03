import { addPlayer, db } from '$lib/firebase/client';
import { error } from '@sveltejs/kit';
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params, locals }) {
	if (!locals.user) throw error(401, 'sign in required');
	const { game_id } = params;
	const game_snapshot = await getDoc(doc(db, `game/${game_id}`));
	if (!game_snapshot.exists()) throw error(404, "Game Lobby doesn't exist");

	const players_snapshot = await getDocs(
		query(collection(db, 'players'), where('game_id', '==', game_id))
	);
	if (players_snapshot.size >= 2) throw error(403, 'Lobby is full');

	const players = players_snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

	await addPlayer(locals.user, game_id);
	return { players };
}
