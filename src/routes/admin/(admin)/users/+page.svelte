<script>
	import UserItem from './UserItem.svelte';

	/** @type {import('./$types').PageData} */
	export let data;
</script>

{#await data.streamed.users}
	loading
{:then users}
	<div class="overflow-x-auto min-h-full">
		<table class="table bg-base-100">
			<thead>
				<tr>
					<th>Name</th>
					<th>Created</th>
					<th>Signed in</th>
					<th />
				</tr>
			</thead>
			<tbody>
				{#each users as user}
					<UserItem {user} />
				{/each}
			</tbody>
		</table>
	</div>
{/await}
