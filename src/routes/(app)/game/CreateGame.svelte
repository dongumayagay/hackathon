<script>
	import { enhance } from '$app/forms';
	let loading = false;
</script>

<form
	action="?/create"
	method="post"
	class="form-control"
	use:enhance={({}) => {
		loading = true;
		return async ({ update }) => {
			await update();
			loading = false;
		};
	}}
>
	<button class="btn btn-info rounded-full">
		<img src="/skull.png" alt="google icon" class="h-6 w-6" />create game
		<span class=" loading-spinner" class:loading />
	</button>
</form>
