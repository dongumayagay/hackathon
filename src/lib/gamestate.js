import { browser } from '$app/environment';
import { db } from '$lib/firebase/client';
import { collection, doc, limit, onSnapshot, query, where } from 'firebase/firestore';
import { derived, writable } from 'svelte/store';

export const gameIdStore = writable(null);
export const userIdStore = writable(null);

/** @type {import('svelte/store').Writable<any>} */
// @ts-ignore
export const gameStore = derived(
	gameIdStore,
	($gameIdStore, set) => {
		if (!browser && $gameIdStore) return;
		const unsub = onSnapshot(doc(db, `game/${$gameIdStore}`), (snapshot) => {
			if (!snapshot.exists()) return;

			// @ts-ignore
			set({ id: snapshot.id, ...snapshot.data() });
		});
		return () => unsub();
	},
	null
);

/** @type {import('svelte/store').Writable<any>} */
// @ts-ignore
export const playerStore = derived(
	[gameIdStore, userIdStore],
	([$gameIdStore, $userIdStore], set) => {
		if (!browser && !$gameIdStore && !$userIdStore) return;
		const unsub = onSnapshot(
			query(
				collection(db, 'players'),
				where('game_id', '==', $gameIdStore),
				where('uid', '==', $userIdStore),
				limit(1)
			),
			(snapshot) => {
				const doc = snapshot.docs[0];
				// @ts-ignore
				set({ id: doc.id, ...doc.data() });
			}
		);
		return () => unsub();
	},
	null
);

/** @type {import('svelte/store').Writable<any>} */
// @ts-ignore
export const opponentStore = derived(
	[gameIdStore, userIdStore],
	([$gameIdStore, $userIdStore], set) => {
		if (!browser && !$gameIdStore && !$userIdStore) return;
		const unsub = onSnapshot(
			query(
				collection(db, 'players'),
				where('game_id', '==', $gameIdStore),
				where('uid', '!=', $userIdStore),
				limit(1)
			),
			(snapshot) => {
				if (snapshot.size === 0) return;
				const doc = snapshot.docs[0];
				// @ts-ignore
				set({ id: doc.id, ...doc.data() });
			}
		);
		return () => unsub();
	},
	null
);

/** @type {import('svelte/store').Writable<any>} */
// @ts-ignore
export const playerCardsStore = derived(
	[gameIdStore, userIdStore],
	([$gameIdStore, $userIdStore], set) => {
		if (!browser && !$gameIdStore && !$userIdStore) return;
		const unsub = onSnapshot(
			query(
				collection(db, 'playerCards'),
				where('game_id', '==', $gameIdStore),
				where('uid', '==', $userIdStore)
			),
			async (snapshot) => {
				// @ts-ignore
				set(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
			}
		);
		return () => unsub();
	},
	[]
);
