import { addPlayer, db, drawCard, getOpponentUID } from '$lib/firebase/client';
import { collection, deleteDoc, doc, increment, updateDoc, writeBatch } from 'firebase/firestore';
import { error, redirect, fail } from '@sveltejs/kit';
import { getDoc, getDocs, query, where } from 'firebase/firestore';
import { generateRandomBoolean } from '$lib/utils';

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals, cookies }) {
	try {
		// check game id and user
		const game_id = cookies.get('game_id') ?? null;
		if (!locals.user || !game_id) throw redirect(303, '/');

		// get game and player snapshots
		const game_snapshot = await getDoc(doc(db, `game/${game_id}`));
		const players_snapshot = await getDocs(
			query(collection(db, 'players'), where('game_id', '==', game_id))
		);

		// if user is already in game
		const ids = players_snapshot.docs.map((doc) => doc.id);
		if (ids.includes(locals.user.uid)) return { game_id };

		// check if exist
		if (!game_snapshot.exists()) throw error(404, "Game Lobby doesn't exist");
		// check if lobby full
		if (players_snapshot.size >= 2) throw error(403, 'Lobby is full');

		const added = await addPlayer(locals.user, game_id);

		// setup game
		if (players_snapshot.size === 1 && added) {
			const index = generateRandomBoolean(game_id) ? 0 : 1;
			// await Promise.all([
			// 	drawCard(game_id, ids[0]),
			// 	drawCard(game_id, ids[1]),
			// 	updateDoc(game_snapshot.ref, {
			// 		start: true,
			// 		turn: ids[index]
			// 	})
			// ]);
			await updateDoc(game_snapshot.ref, {
				start: true,
				turn: ids[index]
			});
			await drawCard(game_id, ids[0]);
			await drawCard(game_id, ids[1]);
		}

		cookies.set('game_id', game_id);

		return {
			game_id
		};
	} catch (e) {
		cookies.delete('game_id');
		throw e;
	}
}

/** @type {import('./$types').Actions} */
export const actions = {
	next_turn: async ({ cookies, locals }) => {
		const game_id = cookies.get('game_id');
		if (!game_id || !locals.claims?.uid) return {};
		const opponent_uid = await getOpponentUID(game_id, locals.claims.uid);

		await updateDoc(doc(db, `game/${game_id}`), {
			turn: opponent_uid
		});

		const oppenent_ref = doc(db, `players/${opponent_uid}`);
		const opponent_snapshot = await getDoc(oppenent_ref);
		const opponent = opponent_snapshot.data();

		if (opponent?.first) return;

		await drawCard(game_id, opponent_uid);
		const current_mp = opponent?.mp ?? 0;
		if (current_mp + 2 > 10) await updateDoc(oppenent_ref, { mp: 10 });
		else await updateDoc(oppenent_ref, { mp: increment(2) });
	},
	use_card: async ({ request }) => {
		const data = await request.formData();

		const game_id = data.get('game_id')?.toString();
		const id = data.get('id')?.toString();
		const card_type = data.get('type')?.toString();
		const opponent_uid = data.get('opponent_uid')?.toString();
		const cost = parseInt(data.get('cost')?.toString() ?? '0');
		const uid = data.get('uid')?.toString();

		const current_turn = (await getDoc(doc(db, `game/${game_id}`))).data()?.turn ?? null;
		if (current_turn != uid) return fail(400, { error: 'Not Your Turn Yet' });

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
		await deleteDoc(doc(db, `playerCards/${id}`));
	},
	cancel_lobby: async ({ cookies, locals }) => {
		const game_id = cookies.get('game_id');

		if (!game_id) return {};

		const batch = writeBatch(db);

		batch.delete(doc(db, `players/${locals.claims?.uid}`));

		const players_snapshot = await getDocs(
			query(collection(db, 'players'), where('game_id', '==', game_id))
		);
		if (players_snapshot.size === 0) batch.delete(doc(db, `game/${game_id}`));

		await batch.commit();

		cookies.delete('game_id');
		throw redirect(303, '/game');
	},
	forfeit: async ({ cookies, locals }) => {
		const game_id = cookies.get('game_id');
		if (!game_id || !locals.claims?.uid) return {};
		const opponent_uid = await getOpponentUID(game_id, locals.claims.uid);

		const batch = writeBatch(db);

		batch.update(doc(db, `game/${game_id}`), {
			winner: opponent_uid
		});
		batch.delete(doc(db, `players/${locals.claims?.uid}`));

		const cards_snapshot = await getDocs(
			query(collection(db, 'playerCards'), where('uid', '==', locals.claims?.uid))
		);
		cards_snapshot.docs.forEach((doc) => {
			batch.delete(doc.ref);
		});

		await batch.commit();

		cookies.delete('game_id');

		throw redirect(303, '/game');
	}
};
