<script>
	import { page } from '$app/stores';
	import Lobby from './Lobby.svelte';
	import StartMenu from './StartMenu.svelte';
</script>

{#if !$page.data.game_id}
	<StartMenu />
{:else}
	<Lobby />
{/if}
