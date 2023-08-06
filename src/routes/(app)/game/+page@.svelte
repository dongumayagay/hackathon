<script>
	// @ts-nocheck

	import { gameIdStore, userIdStore, gameStore } from '$lib/gamestate.js';
	import ShareGame from '$lib/components/ShareGame.svelte';
	import CancelLobby from '$lib/components/CancelLobby.svelte';
	import { browser } from '$app/environment';
	import Opponent from '$lib/components/Opponent.svelte';
	import Player from '$lib/components/Player.svelte';

	export let data;

	$: if (browser) {
		$gameIdStore = data.game_id;
		$userIdStore = data.user.uid;
	}
</script>

<!-- 
<div
	class="hero min-h-screen bg-base-200 text-white relative hidden"
	style="background-image: url('/bg.jpg');"
	class:grid={$gameStore === null}
>
	<div class="hero-overlay bg-zinc-900/70" />
	<div class="hero-content text-center flex flex-col">
		<h1 class="text-3xl font-bold text-center flex items-end">
			Game Loading <span class="loading loading-dots" />
		</h1>
	</div>
</div>
<div
	class="hero min-h-screen bg-base-200 text-white relative hidden"
	style="background-image: url('/bg.jpg');"
	class:grid={$gameStore?.phase === 'wait'}
>
	<div class="hero-content text-center flex flex-col">
		<div class="hero-overlay bg-zinc-900/70" />
		<h1 class="text-3xl font-bold text-center flex items-end">
			Waiting for Opponent<span class="loading loading-dots" />
		</h1>
		<div class="max-w-md flex flex-col gap-4">
			<ShareGame />
			<CancelLobby />
		</div>
	</div>
</div>
<div
	style="height:100dvh; background-image: url('/Background.jpg'); 
    background-size: cover;
    background-position: center;"
>
	<main class="flex-1 flex flex-col justify-between p-4">
		<Opponent />

		<Player />
	</main>
</div> -->

<div
	class="hero min-h-screen bg-base-200 text-white relative"
	style="background-image: url('/bg.jpg');"
	class:hidden={$gameStore?.phase === 'playing' || $gameStore?.phase === 'finished'}
>
	<div class="hero-overlay bg-zinc-900/70" />
	<div class="hero-content text-center flex flex-col transition" class:hidden={$gameStore !== null}>
		<h1 class="text-3xl font-bold text-center flex items-end">
			Game Loading <span class="loading loading-dots" />
		</h1>
	</div>
	<div
		class={`hero-content text-center flex-col transition ${
			$gameStore?.phase === 'waiting' ? 'flex' : 'hidden'
		}`}
	>
		<div class="hero-overlay bg-zinc-900/70" />
		<h1 class="text-3xl font-bold text-center flex items-end">
			Waiting for Opponent<span class="loading loading-dots" />
		</h1>
		<div class="max-w-md flex flex-col gap-4">
			<ShareGame />
			<CancelLobby />
		</div>
	</div>
</div>

<div
	style="height:100dvh; background-image: url('/Background.jpg'); 
    background-size: cover;
    background-position: center; display:grid"
	class:hidden={!$gameStore?.phase === 'playing' || !$gameStore?.phase === 'finished'}
>
	<main class="flex-1 flex flex-col justify-between p-4">
		<Opponent />

		<Player />
	</main>
</div>
