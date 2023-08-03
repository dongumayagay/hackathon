<script>
	/** @type {any} */
	export let player;
</script>

<section class="flex items-center gap-x-2 justify-evenly">
	<div class="avatar">
		<div class="w-12 h-12 rounded-full">
			<img src={player?.photoURL ?? 'https://ui-avatars.com/api/?name=?'} alt="" />
		</div>
	</div>
	<h1 class="text-xl font-bold">
		{player?.displayName ?? 'Loading...'}
	</h1>
</section>
