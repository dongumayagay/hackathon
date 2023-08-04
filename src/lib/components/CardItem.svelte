<script>
	import { page } from '$app/stores';
	import { enhance } from '$app/forms';
	import { toast } from 'svelte-sonner';

	/** @type { any}	 */
	export let card;
	let loading = false;
</script>

<form
	on:submit
	action="?/use_card"
	method="post"
	class="carousel-item"
	use:enhance={({}) => {
		loading = true;
		return async ({ update, result }) => {
			await update();
			if (result.type === 'failure' && result.data?.error) toast.error(`${result.data?.error}`);
			loading = false;
		};
	}}
>
	{#each Object.entries(card) as [key, value]}
		<input type="hidden" name={key} {value} />
	{/each}
	<!-- <input type="hidden" name="opponent_uid" value={opponent_uid} /> -->
	<button disabled={loading}>
		<img alt="" src={card?.image ?? ''} class="rounded-box h-96" />
	</button>
</form>
