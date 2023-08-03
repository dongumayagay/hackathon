<script>
	import { page } from '$app/stores';
	import { db } from '$lib/firebase/client';
	import { doc, setDoc, deleteDoc, onSnapshot, query, collection, where } from 'firebase/firestore';
	import { onMount } from 'svelte';
	import Player from './Player.svelte';

	/** @type {import('./$types').PageData} */
	export let data;

	async function leave_game() {
		await deleteDoc(doc(db, `players/${$page.data.user.uid}`));
	}

	onMount(() => {
		/** @type {import('firebase/firestore').Unsubscribe}*/
		let unsub;

		async function game_set() {
			unsub = onSnapshot(
				query(collection(db, 'players'), where('game_id', '==', $page.params.game_id)),
				(docs_snapshot) => {
					data.players = docs_snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
				}
			);
		}

		game_set();

		return () => {
			unsub();
			leave_game();
		};
	});
</script>

<svelte:window
	on:beforeunload={async (e) => {
		await leave_game();
		e.preventDefault();
		e.returnValue = '';
		return '...';
	}}
/>

<h1 class="text-center py-4">
	Game ID: {$page.params.game_id}
</h1>

{#if data.players}
	<main class="flex items-center justify-center gap-8">
		<Player player={data.players[0]} />
		<section class="text-5xl font-bold">VS</section>
		<Player player={data.players[1]} />
	</main>
{/if}
