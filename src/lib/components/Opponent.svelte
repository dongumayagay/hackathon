<script>
	import { opponentStore } from '$lib/gamestate.js';
	import { tweened } from 'svelte/motion';
	import Forfeit from './Forfeit.svelte';
	import { computePercentage } from '$lib/utils';

	$: hp = tweened($opponentStore?.hp ?? 0);
	$: mp = tweened($opponentStore?.mp ?? 0);
	$: currentHp = $hp;
	$: maxHp = 10;
	$: if (currentHp > 10) {
		maxHp = currentHp;
	} else if (currentHp < 10){
		maxHp = 10;
	}

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
				<li>
					<!-- Security: {$hp.toFixed(0) ?? ''} -->
					<div class="mb-1 text-base font-medium dark:text-white">Security:</div>
					<div class="w-60 bg-gray-200 rounded-full mb-2 dark:bg-gray-700">
						<div class="bg-green-600 text-xs font-medium text-white text-center p-0.5 leading-none rounded-full dark:bg-green-500" style="width: {computePercentage($hp)}%">{$hp.toFixed(0) ?? ''}/{maxHp}</div>
					</div>
				</li>
				<li>
					<!-- CPU Power: {$mp.toFixed(0) ?? ''} -->
					<div class="mb-1 text-base font-medium dark:text-white">CPU Power:</div>
					<div class="w-60 bg-gray-200 rounded-full mb-2 dark:bg-gray-700">
						<div class="bg-blue-600 text-xs font-medium text-white text-center p-0.5 leading-none rounded-full dark:bg-blue-500" style="width: {$mp.toFixed(0) * 10}%">{$mp.toFixed(0) ?? ''}/10</div>
					</div>
				</li>
			</ul>
		</div>
	</div>
	<!-- <ShowLogs /> -->
	<Forfeit />
</section>
