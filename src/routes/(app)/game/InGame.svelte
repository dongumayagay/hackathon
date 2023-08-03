<script>
	import { page } from '$app/stores';
	import { db } from '$lib/firebase/client';
	import { doc, setDoc, deleteDoc, onSnapshot, query, collection, where } from 'firebase/firestore';
	import { onMount } from 'svelte';
	import QuitGame from './QuitGame.svelte';
	import GameId from './GameId.svelte';

	$: players = $page.data.players;

	async function leave_game() {
		await deleteDoc(doc(db, `players/${$page.data.user.uid}`));
	}

	onMount(() => {
		/** @type {import('firebase/firestore').Unsubscribe}*/
		let unsub;

		async function game_set() {
			unsub = onSnapshot(
				query(collection(db, 'players'), where('game_id', '==', $page.data.game_id)),
				(docs_snapshot) => {
					players = docs_snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
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

<div style="height:100dvh;" class=" ">
	<header class="flex p-4 justify-between w-full">
		<GameId />
		<QuitGame />
	</header>
	<!-- {#if players.length === 1}
		<div class="fixed h-screen bg-white" />
	{/if} -->
	<pre>
		
		{JSON.stringify(players, null, 2)}
	</pre>
</div>
