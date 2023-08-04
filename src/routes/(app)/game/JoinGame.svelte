<script>
	import { enhance } from '$app/forms';
	import { error } from '@sveltejs/kit';
	import { toast } from 'svelte-sonner';
	let loading = false;
</script>

<form
	action="?/join"
	method="post"
	class="form-control"
	use:enhance={({}) => {
		loading = true;
		return async ({ update, result }) => {
			await update();
			if (result.type === 'failure' && result.data?.error) toast.error(`${result.data?.error}`);
			else toast.success('Goodluck!');
			loading = false;
		};
	}}
>
	<div class="input-group">
		<input
			type="text"
			class="input input-bordered w-full"
			name="game_id"
			placeholder="Enter Game ID"
		/>
		<button class="btn btn-secondary">
			<img src="/skull.png" alt="google icon" class="h-6 w-6" />join game
			<span class=" loading-spinner" class:loading />
		</button>
	</div>
</form>
