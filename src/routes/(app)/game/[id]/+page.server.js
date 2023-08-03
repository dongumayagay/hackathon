import { db } from '$lib/firebase/client';
import { error } from '@sveltejs/kit';
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
	const doc_snapshot = await getDoc(doc(db, `game`, params.id));
	if (!doc_snapshot.exists()) throw error(404, "Game Lobby doesn't exist");
	const players_snapshot = await getDocs(query(collection(db, 'players'), where("game_id", "==", params.id)));
	const players = players_snapshot.docs;

	if (players.length >= 2) throw error(403, 'Lobby is full');
	return {};

	// const doc_snapshot = 
	// console.log(doc_snapshot.docs.length);
	// if(doc_snapshot.docs.length == 0) throw error(404, "Game Lobby does not exist");
	// const data = doc_snapshot.docs;
	// if(data.length >= 2) throw error(403, "Lobby is full");

}
