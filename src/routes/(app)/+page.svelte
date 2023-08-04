<script>
	import { google_signin } from '$lib/firebase/client';
	import { page } from '$app/stores';
</script>

<div class="hero min-h-screen bg-base-200 text-white" style="background-image: url('/banner.jpg');">
	<div class="hero-overlay bg-zinc-900/70" />
	<div class="hero-content text-center flex flex-col">
		<h1 class="text-8xl font-bold italic text-center">CyberSentries</h1>
		<div class="max-w-md flex flex-col gap-4">
			<p class="py-6">
				Your Gateway to Mastering Cybersecurity through an Engaging Card Game Experience
			</p>
			<a href="/library" class="btn btn-warning rounded-full">
				<img src="/skull.png" alt="google icon" class="h-6 w-6" /><span>card library</span>
			</a>
			<button class="btn btn-info rounded-full" on:click={google_signin}>
				<img src="/skull.png" alt="google icon" class="h-6 w-6" />
				Login to Play</button
			>

			<button class="btn rounded-full" on:click={google_signin} class:hidden={!!$page.data.user}>
				<img src="/google.png" alt="google icon" class="h-6 w-6" />
				Sign in with Google
			</button>
		</div>
	</div>
</div>
