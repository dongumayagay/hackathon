<script>
	import { enhance } from '$app/forms';
	let loading = false;
</script>

<form
	action="?/quit"
	method="post"
	class=" tooltip tooltip-right h-fit flex items-center"
	data-tip="quit game"
	use:enhance={({}) => {
		loading = true;
		return async ({ update }) => {
			await update();
			loading = false;
		};
	}}
>
	<button class="btn btn-ghost btn-sm btn-circle">
		<span class={`loading-spinner  ${loading ? 'loading' : 'hidden'}`} />
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 20 20"
			fill="currentColor"
			class="w-8 h-8"
			class:hidden={loading}
		>
			<path
				d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z"
			/>
		</svg>
	</button>
</form>
