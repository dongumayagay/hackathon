<script>
	import { page } from '$app/stores';
	import { db, drawCard } from '$lib/firebase/client';
	import { collection, onSnapshot, query, where } from 'firebase/firestore';
	import { onMount } from 'svelte';
	import CardItem from './CardItem.svelte';

	/** @type {HTMLDialogElement}	 */
	let show_cards_modal;
	export let opponent_uid = '';

	/** @type {any[]} */
	let cards_on_hand = [];
	onMount(() => {
		const unsub = onSnapshot(
			query(collection(db, 'cards_on_hand'), where('uid', '==', $page.data.user.uid)),
			async (snapshot) => {
				cards_on_hand = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
			}
		);
		return () => unsub();
	});
</script>

<button on:click={() => show_cards_modal.showModal()} class="stack">
	{#each { length: 3 } as _}
		<div class={`relative `}>
			<img src="/cards/Back_Card.png" alt="" class="h-36 sm:h-48" />
		</div>
	{/each}
</button>
<dialog class="modal px-8" bind:this={show_cards_modal}>
	<form method="dialog" class="modal-box w-full max-w-none p-0 bg-transparent">
		<div class="carousel carousel-center w-full space-x-4 rounded-box">
			{#each cards_on_hand as card}
				<CardItem {card} {opponent_uid} on:submit={() => show_cards_modal.close()} />
			{:else}
				<h1 class="mx-auto">No Cards</h1>
			{/each}
		</div>
		<!-- <h3 class="font-bold text-lg">Hello!</h3>
		<p class="py-4">Press ESC key or click outside to close</p> -->
	</form>
	<form method="dialog" class="modal-backdrop">
		<button>close</button>
	</form>
</dialog>
