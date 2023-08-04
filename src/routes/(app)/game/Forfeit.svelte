<script>
	import { enhance } from '$app/forms';
	import { toast } from 'svelte-sonner';

	export let opponent_uid = '';
	/** @type {HTMLDialogElement} */
	let forfeit_modal;

	let loading = false;
</script>

<div class="tooltip tooltip-error tooltip-right" data-tip="surrender the game">
	<button
		class="btn btn-sm btn-warning btn-circle btn-ghost text-error"
		on:click={() => forfeit_modal.showModal()}
	>
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
			<path
				d="M3.5 2.75a.75.75 0 00-1.5 0v14.5a.75.75 0 001.5 0v-4.392l1.657-.348a6.449 6.449 0 014.271.572 7.948 7.948 0 005.965.524l2.078-.64A.75.75 0 0018 12.25v-8.5a.75.75 0 00-.904-.734l-2.38.501a7.25 7.25 0 01-4.186-.363l-.502-.2a8.75 8.75 0 00-5.053-.439l-1.475.31V2.75z"
			/>
		</svg></button
	>
</div>

<dialog bind:this={forfeit_modal} class="modal">
	<form method="dialog" class="modal-box">
		<button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
		<h3 class="font-bold text-lg">Forfeit the Game</h3>
		<p class="py-4">Are you sure?</p>
		<div class="modal-action">
			<!-- if there is a button in form, it will close the modal -->
			<form
				action="?/forfeit"
				method="post"
				use:enhance={({}) => {
					loading = true;
					return async ({ update, result }) => {
						await update();
						// if (result.type === 'failure') toast.error(`something went wrong`);
						// else toast.success('Invite your Friends!');
						loading = false;
						forfeit_modal.close();
					};
				}}
			>
				<input type="hidden" name="opponent_uid" value={opponent_uid} />
				<button class="btn btn-error" disabled={loading}>
					<span class={`loading-spinner  ${loading ? 'loading' : 'hidden'}`} />
					yes
				</button>
			</form>
		</div>
	</form>
	<form method="dialog" class="modal-backdrop">
		<button>close</button>
	</form>
</dialog>
