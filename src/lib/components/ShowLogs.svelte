<script>
	import { page } from '$app/stores';
	import { db } from '$lib/firebase/client';
	import { collection, onSnapshot, query, where } from 'firebase/firestore';
	import { onMount } from 'svelte';

	/** @type {HTMLDialogElement}	 */
	let show_logs_modal;
	let logs = [];
	onMount(() => {
		const unsub = onSnapshot(
			query(collection(db, `game_logs`), where('game_id', '==', $page.data.game_id)),
			(snapshot) => {
				logs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
			}
		);
		return () => unsub();
	});
</script>

<div class="tooltip tooltip-right" data-tip="show battle logs">
	<button on:click={() => show_logs_modal.showModal()} class="">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="1.5"
			stroke="currentColor"
			class="w-6 h-6"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
			/>
		</svg>
	</button>
</div>

<dialog class="modal" bind:this={show_logs_modal}>
	<form method="dialog" class="modal-box">
		<button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
		<h3 class="font-bold text-lg">Battle Log!</h3>
		<ul class="flex flex-col gap-2">
			{#each { length: 20 } as _}
				<li class="text-sm">
					<p>
						Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime laboriosam possimus
						sapiente natus facilis! Repellendus, doloremque corporis eligendi ipsum enim fugit optio
						id facilis adipisci omnis nam rerum necessitatibus consequatur.
					</p>
				</li>
			{/each}
		</ul>
	</form>
	<form method="dialog" class="modal-backdrop">
		<button>close</button>
	</form>
</dialog>
