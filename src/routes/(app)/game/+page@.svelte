<script>
	import { page } from '$app/stores';
	import InGame from './InGame.svelte';
	import StartMenu from './StartMenu.svelte';
</script>

{#if !$page.data.game_id}
	<StartMenu />
{:else}
	<InGame />
{/if}
