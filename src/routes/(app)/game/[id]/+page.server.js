import { db } from '$lib/firebase/client';
import { error } from '@sveltejs/kit';
import { doc, getDoc } from 'firebase/firestore';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
	const doc_snapshot = await getDoc(doc(db, `game/${params.id}`));
	if (!doc_snapshot.exists()) throw error(404, "Game Lobby doesn't exist");
	const data = doc_snapshot.data();
	if (data.players.length >= 2) throw error(403, 'Lobby is full');
	return {};
}
