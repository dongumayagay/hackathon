<script>
	import Opponent from './Opponent.svelte';
	export let opponent_uid = '';
	import Player from './Player.svelte';
	import ShowCards from './ShowCards.svelte';
	import TestAttack from './TestAttack.svelte';
</script>

<main class="flex-1 flex flex-col justify-between p-3 pt-0">
	<Opponent {opponent_uid} />
	<!-- <TestAttack
		bind:mp={players[player_index].mp}
		to={opponent_uid}
		from={players[player_index].id}
		damage={2}
		cost={1}
	/> -->
	<Player />
</main>
