<script>
	import ShowLogs from './ShowLogs.svelte';

	/** @type {any} */
	export let player;
	export let is_user = true;
</script>

<!-- <section class="flex items-center gap-x-2 justify-evenly">
	<div class="avatar">
		<div class="w-12 h-12 rounded-full">
			<img src={player?.photoURL ?? 'https://ui-avatars.com/api/?name=?'} alt="" />
		</div>
	</div>
	<h1 class="text-xl font-bold">
		{player?.displayName ?? 'Loading...'}
	</h1>
</section> -->

<section
	class={`flex gap-2 justify-between ${!is_user ? 'items-start' : 'items-end'}`}
	class:flex-row-reverse={!is_user}
>
	<div class={`flex flex-col  gap-4 ${is_user ? 'items-start' : 'items-end'}`}>
		<slot />
		<div class="flex gap-2" class:flex-row-reverse={!is_user}>
			<img class="avatar rounded h-16" src={player.photoURL} alt="" />
			<ul class="text-sm flex flex-col justify-between" class:text-right={!is_user}>
				<li>{player.displayName}</li>
				<li>Security: {player.hp}</li>
				<li>CPU Power: {player.mp}</li>
			</ul>
		</div>
	</div>
	<button class:hidden={!is_user} class="btn btn-warning">End Turn</button>
	{#if !is_user}
		<ShowLogs />
	{/if}
</section>
