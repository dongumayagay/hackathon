<script>
	import ShowCards from './ShowCards.svelte';
	import EndTurn from './EndTurn.svelte';
	import { tweened } from 'svelte/motion';
	import { playerStore } from '$lib/gamestate';
	import { computePercentage } from '$lib/utils';

	$: hp = tweened($playerStore?.hp ?? 0);
	$: mp = tweened($playerStore?.mp ?? 0);
	$: currentHp = $hp;
	$: maxHp = 10;
	$: if (currentHp > 10) {
		maxHp = currentHp;
	} else if (currentHp < 10){
		maxHp = 10;
	}

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
	<EndTurn />
</section>
