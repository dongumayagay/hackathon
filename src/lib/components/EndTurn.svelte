<script>
	import { gameStore } from '$lib/gamestate.js';
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
</script>

<form action="?/next_turn" method="post" use:enhance>
	{#if $gameStore?.turn}
		<button class="btn btn-warning" disabled={$gameStore.turn !== $page.data.user.uid}>
			{$gameStore.turn === $page.data.user.uid ? 'End Turn' : "it's your Opponents Turn"}
		</button>
	{/if}
</form>
