<script>
	import { game, gameIdStore } from './gamestate.js';
	import { page } from '$app/stores';

	import ShareGame from '$lib/components/ShareGame.svelte';
	import Battle from '$lib/components/Battle.svelte';
	import CancelLobby from '$lib/components/CancelLobby.svelte';
	import { browser } from '$app/environment';

	let players_size = $page.data.players_size;
	/** @type {string}*/
	let opponent_uid = $page.data.opponent_uid;

	$: {
		console.log('game', $game);
	}
</script>

<div
	style="height:100dvh; background-image: url('/Background.jpg');  display: grid;
    width: 100%;
    background-size: cover;
    background-position: center;"
	class=" flex flex-col min-h-full"
>
	{#if $game?.start}
		<Battle {opponent_uid} />
	{:else}
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
	{/if}
</div>
