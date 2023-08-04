<script>
	import Opponent from './Opponent.svelte';
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
				enter_battle = snapshot.size === 2;
				if (enter_battle)
					opponent_uid = snapshot.docs.filter((doc) => doc.id !== $page.data.user.uid)[0].id;
			}
		);

		return () => {
			unsub();
		};
	});
</script>

<div
	style="height:100dvh; background-image: url('/Background.jpg');  display: grid;
    width: 100%;
    background-size: cover;
    background-position: center;"
	class=" flex flex-col min-h-full"
>
	{#if enter_battle}
		<Battle {opponent_uid} />
	{:else}
		<div
			class="hero min-h-screen bg-base-200 text-white relative"
			style="background-image: url('/bg.jpg');"
		>
			<div class="absolute top-4 left-4">
				<QuitGame />
			</div>
			<div class="hero-overlay bg-zinc-900/70" />
			<div class="hero-content text-center flex flex-col">
				<h1 class="text-3xl font-bold text-center">Waiting for Opponent...</h1>
				<div class="max-w-md flex flex-col gap-4">
					<GameId />
				</div>
			</div>
		</div>
		<!-- <div class="h-full relative">
			<h1 class="text-2xl top-1/3 -translate-x-1/2 left-1/2 absolute">Waiting for Opponent...</h1>
			<GameId />
		</div> -->
	{/if}
</div>
