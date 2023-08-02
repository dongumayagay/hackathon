<script>
	import Sidebar from './Sidebar.svelte';
	import Drawer from './Drawer.svelte';
	import Navbar from './Navbar.svelte';
	/** @type {import('./$types').LayoutData} */
	// export let data;
</script>

<Drawer>
	<svelte:fragment slot="navbar">
		<Navbar />
	</svelte:fragment>

	<svelte:fragment slot="page_content">
		<slot />
	</svelte:fragment>

	<svelte:fragment slot="sidebar">
		<Sidebar />
	</svelte:fragment>
</Drawer>
