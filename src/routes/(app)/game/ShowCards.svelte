<script>
	/**
	 * @type {HTMLDialogElement}
	 */
	let show_cards_modal;
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
			<div class="carousel-item">
				<img
					alt=""
					src="https://daisyui.com//images/stock/photo-1559703248-dcaaec9fab78.jpg"
					class="rounded-box"
				/>
			</div>
			<div class="carousel-item">
				<img
					alt=""
					src="https://daisyui.com//images/stock/photo-1565098772267-60af42b81ef2.jpg"
					class="rounded-box"
				/>
			</div>
			<div class="carousel-item">
				<img
					alt=""
					src="https://daisyui.com//images/stock/photo-1572635148818-ef6fd45eb394.jpg"
					class="rounded-box"
				/>
			</div>
			<div class="carousel-item">
				<img
					alt=""
					src="https://daisyui.com//images/stock/photo-1494253109108-2e30c049369b.jpg"
					class="rounded-box"
				/>
			</div>
			<div class="carousel-item">
				<img
					alt=""
					src="https://daisyui.com//images/stock/photo-1550258987-190a2d41a8ba.jpg"
					class="rounded-box"
				/>
			</div>
			<div class="carousel-item">
				<img
					alt=""
					src="https://daisyui.com//images/stock/photo-1559181567-c3190ca9959b.jpg"
					class="rounded-box"
				/>
			</div>
			<div class="carousel-item">
				<img
					alt=""
					src="https://daisyui.com//images/stock/photo-1601004890684-d8cbf643f5f2.jpg"
					class="rounded-box"
				/>
			</div>
		</div>
		<!-- <h3 class="font-bold text-lg">Hello!</h3>
		<p class="py-4">Press ESC key or click outside to close</p> -->
	</form>
	<form method="dialog" class="modal-backdrop">
		<button>close</button>
	</form>
</dialog>
