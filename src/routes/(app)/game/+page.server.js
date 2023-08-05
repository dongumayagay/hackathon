import { addPlayer, db, drawCard, getOpponent, getPlayer } from '$lib/firebase/client';
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
		let uids = players_snapshot.docs.map((doc) => doc.data().uid);
		if (uids.includes(locals.user.uid)) return { game_id };

		// check if exist
		if (!game_snapshot.exists()) throw error(404, "Game Lobby doesn't exist");
		// check if lobby full
		if (players_snapshot.size >= 2) throw error(403, 'Lobby is full');

		const added = await addPlayer(locals.user, game_id);

		// setup game
		if (players_snapshot.size === 1 && added) {
			const snapshot = await getDocs(
				query(collection(db, 'players'), where('game_id', '==', game_id))
			);
			const ids = snapshot.docs.map((doc) => doc.id);
			const index = generateRandomBoolean(game_id) ? 0 : 1;

			await Promise.all([
				drawCard(game_id, uids[0], 5),
				drawCard(game_id, uids[1], 5),
				updateDoc(game_snapshot.ref, {
					start: true,
					turn: ids[index]
				})
			]);
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

		const opponent = await getOpponent(game_id, locals.claims.uid);
		const player = await getPlayer(game_id, locals.claims.uid);

		if (!player || !opponent) return;

		const player_ref = doc(db, `players/${player.id}`);
		const oppenent_ref = doc(db, `players/${opponent.id}`);

		const batch = writeBatch(db);

		batch.update(player_ref, { first: false });
		batch.update(doc(db, `game/${game_id}`), {
			turn: opponent.id
		});

		// @ts-ignore
		if (!opponent?.first) {
			// @ts-ignore
			const current_mp = opponent?.mp ?? 0;
			if (current_mp + 2 > 10) batch.update(oppenent_ref, { mp: 10 });
			else batch.update(oppenent_ref, { mp: increment(2) });
			// @ts-ignore
			await drawCard(game_id, opponent.id);
		}

		await batch.commit();
	},
	use_card: async ({ request, locals, cookies }) => {
		const data = await request.formData();

		const game_id = cookies.get('game_id');
		const uid = locals.claims?.uid;
		if (!game_id || !uid) return;

		const id = data.get('id')?.toString();
		const card_type = data.get('type')?.toString();
		const cost = parseInt(data.get('cost')?.toString() ?? '0');

		const game_snapshot = await getDoc(doc(db, `game/${game_id}`));
		const game = game_snapshot.data();
		const player = await getPlayer(game_id, uid);
		const opponent = await getOpponent(game_id, uid);

		if (!player || !opponent) return;

		const current_turn = game?.turn ?? null;
		if (current_turn !== player.id) return fail(400, { error: 'Not Your Turn Yet' });

		// @ts-ignore
		const current_mp = player?.mp ?? 0;
		if (cost > current_mp) return fail(422, { error: 'Not Enough CPU Power' });

		await updateDoc(doc(db, `players/${player.id}`), { mp: increment(cost * -1) });

		if (card_type === 'threat') {
			const threat = parseInt(data.get('threat')?.toString() ?? '0');
			await updateDoc(doc(db, `players/${opponent.id}`), {
				hp: increment(parseInt(threat.toString()) * -1)
			});
		}

		if (card_type === 'security') {
			const security = parseInt(data.get('security')?.toString() ?? '0');
			await updateDoc(doc(db, `players/${player.id}`), {
				hp: increment(parseInt(security.toString()))
			});
		}
		await deleteDoc(doc(db, `playerCards/${id}`));
	},
	cancel_lobby: async ({ cookies, locals }) => {
		const game_id = cookies.get('game_id');
		if (!game_id) return {};
		const player = await getPlayer(game_id, locals.claims?.uid ?? '');
		if (!player) return {};

		const batch = writeBatch(db);
		batch.delete(doc(db, `players/${player.id}`));
		batch.delete(doc(db, `game/${game_id}`));
		await batch.commit();

		cookies.delete('game_id');
		throw redirect(303, '/game');
	},
	forfeit: async ({ cookies, locals }) => {
		const game_id = cookies.get('game_id');
		if (!game_id || !locals.claims?.uid) return {};
		const opponent = await getOpponent(game_id, locals.claims.uid);
		if (!opponent) return;

		const batch = writeBatch(db);

		batch.update(doc(db, `game/${game_id}`), {
			winner: opponent.id
		});
		// batch.delete(doc(db, `players/${locals.claims?.uid}`));

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
