<script>
	import InGame from './InGame.svelte';
	import StartMenu from './StartMenu.svelte';

	/** @type {import('./$types').PageData} */
	export let data;
</script>

{#if !data?.game_id}
	<StartMenu />
{:else}
	<InGame />
{/if}
