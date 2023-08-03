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

<section class="flex gap-2" class:flex-row-reverse={!is_user}>
	<div class={`flex flex-col  gap-4 ${is_user ? 'items-start' : 'items-end'}`}>
		<div class="stack">
			{#each { length: 5 } as _}
				<button class={`relative ${!is_user ? 'pointer-events-none cursor-none' : ''}`}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="currentColor"
						class="w-6 h-6 absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2"
						class:hidden={!is_user}
					>
						<path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
						<path
							fill-rule="evenodd"
							d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z"
							clip-rule="evenodd"
						/>
					</svg>

					<img src="/cards/Back_Card.png" alt="" class="h-36" />
				</button>
			{/each}
		</div>
		<div class="flex gap-2" class:flex-row-reverse={!is_user}>
			<img class="avatar rounded h-16" src={player.photoURL} alt="" />
			<ul class="text-sm flex flex-col justify-between" class:text-right={!is_user}>
				<li>{player.displayName}</li>
				<li>Security: {player.hp}</li>
				<li>CPU Power: {player.mp}</li>
			</ul>
		</div>
	</div>
</section>
