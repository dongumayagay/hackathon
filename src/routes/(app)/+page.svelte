<script>
	import { google_signin } from '$lib/firebase/client';
	import CreateGameBtn from './CreateGameBtn.svelte';

	/** @type {import('./$types').PageData} */
	export let data;
</script>

{#if !data.user}
	<div class="hero min-h-screen bg-base-200">
		<div class="hero-content text-center">
			<div class="max-w-md">
				<h1 class="text-5xl font-bold">Hello there</h1>
				<p class="py-6">
					Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi
					exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.
				</p>
				<button class="btn btn-accent" on:click={google_signin}>
					<img src="/google.png" alt="google icon" class="h-6 w-6" />
					Login to Play</button
				>
			</div>
		</div>
	</div>
{:else}
	<main class="h-full p-4">
		<header class="flex">
			<CreateGameBtn />
		</header>
	</main>
{/if}
