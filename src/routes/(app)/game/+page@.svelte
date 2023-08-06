<script>
	// @ts-nocheck
	import { playerStore } from '$lib/gamestate.js';

	import { gameIdStore, userIdStore, gameStore } from '$lib/gamestate.js';
	import ShareGame from '$lib/components/ShareGame.svelte';
	import CancelLobby from '$lib/components/CancelLobby.svelte';
	import { browser } from '$app/environment';
	import Opponent from '$lib/components/Opponent.svelte';
	import Player from '$lib/components/Player.svelte';
	import { onMount } from 'svelte';

	export let data;

	// $: if (browser) {
	// 	$gameIdStore = data.game_id;
	// 	$userIdStore = data.user.uid;
	// }
	onMount(() => {
		$gameIdStore = data.game_id;
		$userIdStore = data.user.uid;
	});
</script>

<div
	style="height:100dvh; background-image: url('/Background.jpg');  display: grid;
    width: 100%;
    background-size: cover;
    background-position: center;"
	class=" flex flex-col min-h-full"
>
	{#if $gameStore?.phase === 'start'}
		<main class="flex-1 flex flex-col justify-between p-4">
			<Opponent />

			<Player />
		</main>
	{:else if $gameStore.phase === 'wait'}
		<div
			class="hero min-h-screen bg-base-200 text-white relative"
			style="background-image: url('/bg.jpg');"
		>
			<div class="hero-overlay bg-zinc-900/70" />
			<div class="hero-content text-center flex flex-col">
				<h1 class="text-3xl font-bold text-center">Waiting for Opponent...</h1>
				<div class="max-w-md flex flex-col gap-4">
					<ShareGame />
					<CancelLobby />
				</div>
			</div>
		</div>
	{:else}
		<!--  -->
	{/if}
</div>
