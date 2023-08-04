<script>
	import { enhance } from '$app/forms';

	/**
	 * @type {any}
	 */
	export let cost;
	/**
	 * @type {any}
	 */
	export let from;
	/**
	 * @type {any}
	 */
	export let damage;
	/**
	 * @type {any}
	 */
	export let to;
	/**
	 * @type {number}
	 */
	export let mp;

	let loading = false;
</script>

<form
	action="?/attack"
	method="POST"
	use:enhance={({}) => {
		loading = true;
		return async ({ update }) => {
			await update();
			loading = false;
		};
	}}
>
	<input type="hidden" name="to" value={to} />
	<input type="hidden" name="from" value={from} />
	<input type="hidden" name="damage" value={damage} />
	<input type="hidden" name="cost" value={cost} />
	<button class="btn" disabled={mp <= 0 || loading}>
		<span class=" loading-spinner" class:loading />
		attack</button
	>
</form>
