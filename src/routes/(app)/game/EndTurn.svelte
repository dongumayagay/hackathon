<script>
	import { page } from '$app/stores';
	/** @type {any}	 */
	export let game;
	export let opponent_uid = '';
</script>

<form action="?/end_turn" method="post">
	<input type="hidden" name="game_id" value={$page.data.game_id} />
	<input type="hidden" name="uid" value={opponent_uid} />
	{#if game.turn}
		<button class="btn btn-warning" disabled={game.turn !== $page.data.user.uid}>
			{game.turn === $page.data.user.uid ? 'End Turn' : 'Wait'}
		</button>
	{/if}
</form>
