<script>
	import Navbar from '../Navbar.svelte';
	import CardLib from './CardLib.svelte';
	import CreateGame from './CreateGame.svelte';
	import JoinGame from './JoinGame.svelte';
</script>

<!-- <main class="h-full flex flex-col bg-base-200">
	<Navbar />
	<section class="flex flex-1 flex-col p-4 gap-4 justify-center items-center w-full">
		<CreateGame />
		<div class="divider">OR</div>
		<JoinGame />
	</section>
</main> -->
<Navbar />
<div class="hero min-h-screen bg-base-200 text-white" style="background-image: url('/banner.jpg');">
	<div class="hero-overlay bg-zinc-900/70"></div>
	<div class="hero-content text-center flex flex-col">
		<h1 class="text-8xl font-bold italic text-center" style="text-shadow: 0 0 5px rgba(0, 0, 255, 0.7), 0 0 10px rgba(0, 0, 255, 0.7), 0 0 15px rgba(0, 0, 255, 0.7); animation: glowing 2s infinite;">CyberSentries</h1>
		<div class="max-w-md flex flex-col gap-4">
			<p class="py-6">
				Your Gateway to Mastering Cybersecurity through an Engaging Card Game Experience
			</p>

			<!-- <button class="btn btn-info rounded-full" on:click={google_signin}>
				<img src="/skull.png" alt="google icon" class="h-6 w-6" />
				Login to Play</button
			> -->
			
			<CreateGame />
			<CardLib />
			<JoinGame />
		</div>
	</div>
</div>
