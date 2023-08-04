<script>
	import { enhance } from '$app/forms';
	import { update } from 'firebase/database';
	import { toast } from 'svelte-sonner';
	let loading = false;
</script>

<form
	action="?/create"
	method="post"
	class="form-control"
	use:enhance={({}) => {
		loading = true;
		return async ({ update, result }) => {
			await update();
			if (result.type === 'failure') toast.error(`something went wrong`);
			else toast.success('Invite your Friends!');
			loading = false;
		};
	}}
>
	<button class="btn btn-info rounded-full">
		<img src="/skull.png" alt="google icon" class="h-6 w-6" />create game
		<span class={`loading-spinner  ${loading ? 'loading' : 'hidden'}`} />
	</button>
</form>
