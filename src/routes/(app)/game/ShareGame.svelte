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

<main class="flex items-center">
	<div class="tooltip tooltip-bottom text-sm text-white" data-tip="copy share link">
		<button
			class="btn btn-ghost btn-circle btn-sm"
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
	<div class="tooltip tooltip-bottom text-sm text-white" data-tip="copy game id">
		<button class="btn btn-sm btn-ghost group" on:click={() => copy_id($page.data.game_id)}>
			ID: {$page.data.game_id}
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="w-6 h-6 hidden group-hover:block"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5A3.375 3.375 0 006.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0015 2.25h-1.5a2.251 2.251 0 00-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 00-9-9z"
				/>
			</svg>
		</button>
	</div>
</main>
