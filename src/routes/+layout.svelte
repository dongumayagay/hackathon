<script>
	import '../app.css';
	import { Toaster } from 'svelte-sonner';
	/** @type {import('./$types').LayoutData} */
	// export let data;
</script>

<svlete:head>
	<title>Hackathon 2023</title>
</svlete:head>

<slot />
<Toaster richColors />
