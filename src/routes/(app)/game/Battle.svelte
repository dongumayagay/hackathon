<script>
	import QuitGame from './QuitGame.svelte';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import Opponent from './Opponent.svelte';
	import Player from './Player.svelte';
	import { doc, onSnapshot, updateDoc, writeBatch } from 'firebase/firestore';
	import { db, pick_first } from '$lib/firebase/client';
	import { toast } from 'svelte-sonner';

	/** @type{any}*/
	let game;

	export let opponent_uid = '';

	onMount(() => {
		const doc_ref = doc(db, `game/${$page.data.game_id}`);
		const unsub = onSnapshot(doc_ref, async (snapshot) => {
			game = snapshot.data();
			if (game.turn === null && game.start) await pick_first($page.data.game_id);
			if (game.turn !== null && game.turn === $page.data.user.uid) toast('Its now your turn!');
		});
		return () => unsub();
	});
</script>

<main class="flex-1 flex flex-col justify-between p-4">
	<Opponent {opponent_uid} />
	<!-- <TestAttack
			bind:mp={players[player_index].mp}
			to={opponent_uid}
			from={players[player_index].id}
			damage={2}
			cost={1}
			/> -->
	<Player {game} {opponent_uid} />
</main>
