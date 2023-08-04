<script>
	import { gameStore, playerStore } from '$lib/gamestate.js';
	import { enhance } from '$app/forms';
</script>

<form action="?/next_turn" method="post" use:enhance>
	{#if $gameStore?.turn}
		<button class="btn btn-warning" disabled={$gameStore.turn !== $playerStore?.id}>
			{$gameStore.turn === $playerStore?.id ? 'End Turn' : "it's your Opponents Turn"}
		</button>
	{/if}
</form>
