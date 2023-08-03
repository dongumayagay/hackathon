<script>
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

<div class="flex gap-2" class:flex-row-reverse={!is_user}>
	<img class="avatar rounded w-16" src={player.photoURL} alt="" />
	<ul class="text-sm flex flex-col justify-between" class:text-right={!is_user}>
		<li>{player.displayName}</li>
		<li>Security: {player.hp}</li>
		<li>CPU Power: {player.mp}</li>
	</ul>
</div>
