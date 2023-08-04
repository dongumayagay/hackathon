<script>
	import { page } from '$app/stores';
	import '../app.css';
	import { Toaster } from 'svelte-sonner';
	/** @type {import('./$types').LayoutData} */
	// export let data;
</script>

<svelte:head>
	<title>CyberSentries</title>
</svelte:head>

<slot />

<Toaster
	richColors
	position={$page.url.pathname.startsWith('/game') ? 'top-center' : 'bottom-right'}
/>
