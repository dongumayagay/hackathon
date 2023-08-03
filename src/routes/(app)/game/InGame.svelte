<script>
	import { page } from '$app/stores';
	import { db } from '$lib/firebase/client';
	import { doc, setDoc, deleteDoc, onSnapshot, query, collection, where } from 'firebase/firestore';
	import { onMount } from 'svelte';
	import QuitGame from './QuitGame.svelte';
	import GameId from './GameId.svelte';
	import { toast } from 'svelte-sonner';
	import Player from './Player.svelte';

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
					// docs_snapshot.docChanges().forEach((change) => {
					// 	if (change.type === 'added') {
					// 		toast.success(`${change.doc.data().displayName} joined the game`);
					// 	}
					// 	if (change.type === 'removed') {
					// 		toast.error(`${change.doc.data().displayName} leaved the game`);
					// 	}
					// });
				}
			);
		}

		game_set();

		return () => {
			unsub();
			leave_game();
		};
	});

	/**
	 * @param {any} uidToFind
	 */
	function findIndexByUid(uidToFind) {
		const index = players.findIndex((/** @type { any } */ obj) => obj.id === uidToFind);
		return index;
	}

	/**@type {number} */
	let player_index;
	/**@type {number} */
	let enemy_index;
	$: if (players.length == 2) {
		player_index = findIndexByUid($page.data.user.uid);
		enemy_index = !player_index ? 1 : 0;
	}
</script>

<div style="height:100dvh;" class=" flex flex-col">
	<header class="flex p-4 justify-between w-full fixed">
		<!-- <GameId /> -->
		<QuitGame />
	</header>
	{#if players.length !== 2}
	<div class="hero min-h-screen bg-base-200 text-white" style="background-image: url('/bg.jpg');">
	
		<div class="hero-overlay bg-zinc-900/70"></div>
		<div class="hero-content text-center flex flex-col">
			<h1 class="text-3xl font-bold text-center">Waiting for Player 2...</h1>
			<div class="max-w-md flex flex-col gap-4">
				
				<GameId />
	
			</div>
		</div>
	</div>
	{/if}
	{#if players.length == 2}
		<main class="flex-1 flex flex-col justify-between p-3 pt-0">
			<!-- <pre>

				{JSON.stringify(players, null, 2)}
			</pre> -->
			<Player player={players[enemy_index]} is_user={false} />
			<Player player={players[player_index]} is_user={true} />
		</main>
	{/if}
</div>