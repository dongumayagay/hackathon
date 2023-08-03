<script>
	import Navbar from '../Navbar.svelte';
	import CreateGame from './CreateGame.svelte';
	import JoinGame from './JoinGame.svelte';
</script>

<main class="h-full flex flex-col bg-base-200">
	<Navbar />
	<section class="flex flex-1 flex-col p-4 gap-4 justify-center items-center w-full">
		<CreateGame />
		<div class="divider">OR</div>
		<JoinGame />
	</section>
</main>
