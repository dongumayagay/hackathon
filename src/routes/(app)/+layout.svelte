<script>
	import Navbar from './Navbar.svelte';

	/** @type {import('./$types').LayoutData} */
	// export let data;
</script>

<div class="h-full bg-base-200">
	<Navbar />
	<slot />
</div>
