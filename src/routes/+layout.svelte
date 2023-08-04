<script>
	import '../app.css';
	import { Toaster } from 'svelte-sonner';
	/** @type {import('./$types').LayoutData} */
	// export let data;
</script>

<svelte:head>
	<title>CyberSentries</title>
</svelte:head>

<slot />
<Toaster richColors />
