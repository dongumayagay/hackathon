<script>
	import { auth } from '$lib/firebase/client';
	import { GoogleAuthProvider, getIdToken, signInWithPopup } from 'firebase/auth';

	async function google_signin() {
		const credential = await signInWithPopup(auth, new GoogleAuthProvider());
		const idToken = await getIdToken(credential.user);
		await fetch(`/api/auth?idToken=${idToken}`, { method: 'POST' });
	}
</script>

<main class="grid place-items-center h-full">
	<button on:click={google_signin} class={`btn btn-primary`}> sign in with google </button>
</main>
