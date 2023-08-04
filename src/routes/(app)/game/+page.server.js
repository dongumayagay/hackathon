import { addPlayer, db } from '$lib/firebase/client';
import {
	collection,
	deleteDoc,
	doc,
	increment,
	setDoc,
	updateDoc,
	writeBatch
} from 'firebase/firestore';
import { error, redirect, fail } from '@sveltejs/kit';
import { getDoc, getDocs, query, where } from 'firebase/firestore';

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals, cookies, url }) {
	try {
		if (!locals.user) throw error(401, 'sign in required');

		const game_id = url.searchParams.get('game_id') ?? cookies.get('game_id') ?? null;

		if (!game_id) return {};

		const game_snapshot = await getDoc(doc(db, `game/${game_id}`));
		if (!game_snapshot.exists()) throw error(404, "Game Lobby doesn't exist");

		const players_snapshot = await getDocs(
			query(collection(db, 'players'), where('game_id', '==', game_id))
		);

		const uids = players_snapshot.docs.map((doc) => doc.id);
		if (!uids.some((uid) => uid === locals.user?.uid) && players_snapshot.size >= 2)
			throw error(403, 'Lobby is full');

		await addPlayer(locals.user, game_id);

		cookies.set('game_id', game_id);

		return {
			game_id,
			uids,
			opponent_uid: uids.filter((uid) => uid !== locals.user?.uid),
			enter_battle: players_snapshot.size === 2
		};
	} catch (e) {
		cookies.delete('game_id');
		throw e;
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

		const batch = writeBatch(db);

		batch.delete(doc(db, `players/${locals.claims?.uid}`));

		const cards_snapshot = await getDocs(
			query(collection(db, 'cards_on_hand'), where('uid', '==', locals.claims?.uid))
		);

		cards_snapshot.docs.forEach((doc) => {
			batch.delete(doc.ref);
		});

		const players_snapshot = await getDocs(
			query(collection(db, 'players'), where('game_id', '==', game_id))
		);
		if (players_snapshot.size === 0) batch.delete(doc(db, `game/${game_id}`));

		await batch.commit();

		cookies.delete('game_id');
		throw redirect(303, '/game');
	},
	// attack: async ({ request }) => {
	// 	try {
	// 		const data = await request.formData();
	// 		const { cost, from, damage, to } = Object.fromEntries(data);
	// 		const to_ref = doc(db, `players/${to}`);
	// 		const from_ref = doc(db, `players/${from}`);
	// 		await updateDoc(to_ref, { hp: increment(parseInt(damage.toString()) * -1) });
	// 		await updateDoc(from_ref, { mp: increment(parseInt(cost.toString()) * -1) });
	// 	} catch (e) {
	// 		console.log(e);
	// 	}
	// },
	next_turn: async ({ request }) => {
		const data = await request.formData();
		const { game_id, uid } = Object.fromEntries(data);
		await updateDoc(doc(db, `game/${game_id}`), {
			turn: uid
		});
	},
	use_card: async ({ request }) => {
		const data = await request.formData();

		const game_id = data.get('game_id')?.toString();
		const id = data.get('id')?.toString();
		const card_type = data.get('type')?.toString();
		const opponent_uid = data.get('opponent_uid')?.toString();
		const cost = parseInt(data.get('cost')?.toString() ?? '0');
		const uid = data.get('uid')?.toString();

		const current_turn = (await getDoc(doc(db, `games/${game_id}`))).data()?.turn ?? null;

		if (current_turn !== uid) return fail(400, { error: 'Not Your Turn Yet' });

		const player = await getDoc(doc(db, `players/${uid}`));
		const current_mp = player.data()?.mp ?? 0;
		if (cost > current_mp) return fail(422, { error: 'Not Enough CPU Power' });

		await updateDoc(doc(db, `players/${uid}`), { mp: increment(cost * -1) });

		if (card_type === 'threat') {
			const threat = parseInt(data.get('threat')?.toString() ?? '0');
			await updateDoc(doc(db, `players/${opponent_uid}`), {
				hp: increment(parseInt(threat.toString()) * -1)
			});
		}
		if (card_type === 'security') {
			const security = parseInt(data.get('security')?.toString() ?? '0');
			await updateDoc(doc(db, `players/${uid}`), {
				hp: increment(parseInt(security.toString()))
			});
		}
		await deleteDoc(doc(db, `cards_on_hand/${id}`));
	}
};
