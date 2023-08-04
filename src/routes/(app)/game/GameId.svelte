<script>
	import { page } from '$app/stores';
	import { toast } from 'svelte-sonner';

	/**
	 * @param {string} text
	 */
	async function copy_id(text) {
		await navigator.clipboard.writeText(text);
		toast.success('copied to clipboard');
	}
</script>

<main class="flex items-center gap-2 group">
	<div class="tooltip tooltip-bottom text-sm text-white" data-tip="copy game id">
		<button on:click={() => copy_id($page.data.game_id)}>
			ID: {$page.data.game_id}
		</button>
	</div>
	<div class="tooltip tooltip-bottom text-sm text-white" data-tip="copy share link">
		<button
			class="btn btn-ghost btn-circle btn-xs hidden group-hover:block"
			on:click={() => copy_id(`${$page.url.href}?game_id=${$page.data.game_id}`)}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 20 20"
				fill="currentColor"
				class="w-5 h-5"
			>
				<path
					d="M13 4.5a2.5 2.5 0 11.702 1.737L6.97 9.604a2.518 2.518 0 010 .792l6.733 3.367a2.5 2.5 0 11-.671 1.341l-6.733-3.367a2.5 2.5 0 110-3.475l6.733-3.366A2.52 2.52 0 0113 4.5z"
				/>
			</svg>
		</button>
	</div>
</main>
