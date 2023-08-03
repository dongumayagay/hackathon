<script>
	import { page } from '$app/stores';
	import { toast } from 'svelte-sonner';

	async function copy_id() {
		await navigator.clipboard.writeText($page.data.game_id);
		toast.success('copied to clipboard');
	}
</script>

<div class="tooltip tooltip-bottom text-xs text-white" data-tip="click to copy">
	<button on:click={copy_id}>
		ID: {$page.data.game_id}
	</button>
</div>
