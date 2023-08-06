<script>
	import ShowCards from './ShowCards.svelte';
	import EndTurn from './EndTurn.svelte';
	import { tweened } from 'svelte/motion';
	import { playerStore } from '$lib/gamestate';

	$: hp = tweened($playerStore?.hp ?? 0);
	$: mp = tweened($playerStore?.mp ?? 0);
</script>

<section class={`flex gap-2 justify-between items-end`}>
	<div class={`flex flex-col  gap-4 items-start`}>
		<ShowCards />
		<div class="flex gap-2">
			<img
				class="avatar rounded h-16"
				src={$playerStore?.photoURL ??
					'https://ui-avatars.com/api/?name=?&background=000&color=fff'}
				alt=""
			/>
			<ul class="text-sm flex flex-col justify-between">
				<li>{$playerStore?.displayName ?? ''}</li>
				<li>Security: {$hp.toFixed(0) ?? ''}</li>
				<li>CPU Power: {$mp.toFixed(0) ?? ''}</li>
			</ul>
		</div>
	</div>
	<EndTurn />
</section>
