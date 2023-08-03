<script>
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import { db } from '$lib/firebase/client';
	import { doc, setDoc, deleteDoc, onSnapshot, query, collection, where } from 'firebase/firestore';
	import { onMount } from 'svelte';
	import QuitGame from './QuitGame.svelte';
	import GameId from './GameId.svelte';
	import { toast } from 'svelte-sonner';
	import Player from './Player.svelte';
	import ShowCards from './ShowCards.svelte';

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

<div
	style="height:100dvh;"
	class=" flex flex-col bg-gradient-to-t from-green-950/20 via-transparent"
>
	<header class="flex p-4 justify-between w-full">
		<GameId />
		<QuitGame />
	</header>
	{#if players.length !== 2}
		<div class="h-full relative">
			<h1 class="text-2xl top-1/3 -translate-x-1/2 left-1/2 absolute">Waiting for Player 2...</h1>
		</div>
	{/if}
	{#if players.length == 2}
		<main class="flex-1 flex flex-col justify-between p-3 pt-0">
			<!-- <pre>

				{JSON.stringify(players, null, 2)}
			</pre> -->
			<Player player={players[enemy_index]} is_user={false} />
			<form action="?/attack" method="POST" use:enhance>
				<input type="hidden" name="to" value={players[enemy_index].id} />
				<input type="hidden" name="from" value={players[player_index].id} />
				<input type="hidden" name="damage" value="2" />
				<input type="hidden" name="cost" value="1" />
				<button class="btn" disabled={players[player_index].mp <= 0}>attack</button>
			</form>
			<Player player={players[player_index]} is_user={true}>
				<ShowCards />
			</Player>
		</main>
	{/if}
</div>
