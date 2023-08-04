import { browser } from '$app/environment';
import { db } from '$lib/firebase/client';
import { playersSnapshotParser } from '$lib/utils';
import { collection, doc, limit, onSnapshot, query, where } from 'firebase/firestore';
import { derived, writable } from 'svelte/store';

export const gameIdStore = writable(null);
export const userIdStore = writable(null);

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

export const playerStore = derived(
	[gameIdStore, userIdStore],
	($gameIdStore, $userIdStore, set) => {
		if (!browser && !$gameIdStore && !$userIdStore) return;
		const unsub = onSnapshot(
			query(
				collection(db, 'players'),
				where('game_id', '==', $gameIdStore),
				where('uid', '==', $userIdStore),
				limit(1)
			),
			(snapshot) => {
				if (snapshot.size === 0) return;
				set(playersSnapshotParser(snapshot));
			}
		);
		return () => unsub();
	},
	null
);
export const opponentStore = derived(
	[gameIdStore, userIdStore],
	($gameIdStore, $userIdStore, set) => {
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
				set(playersSnapshotParser(snapshot));
			}
		);
		return () => unsub();
	},
	null
);
