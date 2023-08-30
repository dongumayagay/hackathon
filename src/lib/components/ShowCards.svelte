<script>
	import { playerCardsStore } from '$lib/gamestate';
	import CardItem from './CardItem.svelte';

	/** @type {HTMLDialogElement}	 */
	let show_cards_modal;
</script>

<button on:click={() => show_cards_modal.showModal()} class="stack">
	{#each { length: 3 } as _}
		<div class={`relative `}>
			<img src="/cards/Back_Card.png" alt="" class="h-24 sm:h-36" />
		</div>
	{/each}
</button>
<dialog class="modal px-8" bind:this={show_cards_modal}>
	<form method="dialog" class="modal-box w-full max-w-none p-0 bg-transparent">
		<div class="carousel carousel-center w-full space-x-4 rounded-box">
			{#each $playerCardsStore as card}
				<CardItem {card} on:submit={() => show_cards_modal.close()} />
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
