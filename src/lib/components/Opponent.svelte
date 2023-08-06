<script>
	import { opponentStore } from '$lib/gamestate.js';
	import { tweened } from 'svelte/motion';
	import Forfeit from './Forfeit.svelte';

	$: hp = tweened($opponentStore?.hp ?? 0);
	$: mp = tweened($opponentStore?.mp ?? 0);
</script>

<section class={`flex gap-2 justify-between flex-row-reverse items-start`}>
	<div class={`flex flex-col  gap-4 'items-end'`}>
		<div class="flex gap-2 flex-row-reverse">
			<img
				class="avatar rounded h-16"
				src={$opponentStore?.photoURL ??
					'https://ui-avatars.com/api/?name=?&background=000&color=fff'}
				alt=""
			/>
			<ul class="text-sm flex flex-col justify-between text-right">
				<li>{$opponentStore?.displayName ?? ''}</li>
				<li>Security: {$hp.toFixed(0) ?? ''}</li>
				<li>CPU Power: {$mp.toFixed(0) ?? ''}</li>
			</ul>
		</div>
	</div>
	<!-- <ShowLogs /> -->
	<Forfeit />
</section>
