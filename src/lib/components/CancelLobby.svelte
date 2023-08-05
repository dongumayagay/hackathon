<script>
	import { enhance } from '$app/forms';
	let loading = false;
</script>

<form
	action="?/cancel_lobby"
	method="POST"
	use:enhance={({}) => {
		loading = true;
		return async ({ update }) => {
			await update();
			loading = false;
		};
	}}
>
	<button class="btn btn-sm btn-outline">
		<span class={`loading-spinner  ${loading ? 'loading' : 'hidden'}`} />
		Cancel</button
	>
</form>
