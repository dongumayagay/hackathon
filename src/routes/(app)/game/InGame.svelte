<script>
	import { page } from '$app/stores';
	import { db } from '$lib/firebase/client';
	import { onSnapshot, query, collection, where } from 'firebase/firestore';
	import { onMount } from 'svelte';
	import QuitGame from './QuitGame.svelte';
	import GameId from './GameId.svelte';
	import Battle from './Battle.svelte';

	let enter_battle = $page.data.enter_battle;
	/** @type {string}*/
	let opponent_uid = $page.data.opponent_uid;

	onMount(() => {
		const unsub = onSnapshot(
			query(collection(db, 'players'), where('game_id', '==', $page.data.game_id)),
			(snapshot) => {
				opponent_uid = snapshot.docs.filter((doc) => doc.id !== $page.data.user.uid)[0].id;
				enter_battle = snapshot.size === 2;
			}
		);

		return () => {
			unsub();
		};
	});
</script>

<div
	style="height:100dvh;"
	class=" flex flex-col bg-gradient-to-t from-green-950/20 via-transparent"
>
	<header class="flex p-4 justify-between w-full">
		<GameId />
		<QuitGame />
	</header>

	{#if enter_battle}
		<Battle {opponent_uid} />
	{:else}
		<div class="h-full relative">
			<h1 class="text-2xl top-1/3 -translate-x-1/2 left-1/2 absolute">Waiting for Opponent...</h1>
		</div>
	{/if}
</div>
