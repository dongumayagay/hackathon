import { browser } from '$app/environment';
import { db } from '$lib/firebase/client';
import { playersSnapshotParser } from '$lib/utils';
import { collection, doc, onSnapshot, query, where } from 'firebase/firestore';
import { derived, writable } from 'svelte/store';

export const gameIdStore = writable(null);

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

export const playersStore = derived(
	gameIdStore,
	($gameIdStore, set) => {
		if (!browser && $gameIdStore) return;
		const unsub = onSnapshot(
			query(collection(db, 'players'), where('game_id', '==', $gameIdStore)),
			(snapshots) => {
				if (snapshots.size === 0) return;
				set(playersSnapshotParser(snapshots));
			}
		);
		return () => unsub();
	},
	[]
);

export const game = derived(
	[gameStore, playersStore],
	([$gameStore, $playersStore], set) => {
		set({
			// @ts-ignore
			...$gameStore,
			players: $playersStore
		});
	},
	null
);
