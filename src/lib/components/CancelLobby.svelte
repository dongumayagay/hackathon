<script>
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	let loading = false;
</script>

<form
	action="?/cancel_lobby"
	method="POST"
	use:enhance={({}) => {
		loading = true;
		return async ({ update, result }) => {
			await update();
			if (result.type === 'redirect') await goto(result.location);
			loading = false;
		};
	}}
>
	<button class="btn btn-sm btn-outline">
		<span class={`loading-spinner  ${loading ? 'loading' : 'hidden'}`} />
		Cancel</button
	>
</form>
