<script>
	import { page } from '$app/stores';
	import { db } from '$lib/firebase/client';
	import { arrayRemove, arrayUnion, doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore';
	import { onMount } from 'svelte';

	// /** @type {import('./$types/').PageData} */
	// export let data;`

	/**
	 * @type {any[]}
	 */
	let players = [];

	async function leave_game() {
		await updateDoc(doc(db, `game/${$page.params.id}`), {
			players: arrayRemove({
				uid: $page.data.user.uid,
				displayName: $page.data.user.displayName,
				photoURL: $page.data.user.photoURL
			})
		});
	}

	onMount(() => {
		/** @type {import('firebase/firestore').Unsubscribe}*/
		let unsub;

		async function game_set() {
			const doc_ref = doc(db, `game/${$page.params.id}`);
			updateDoc(doc_ref, {
				players: arrayUnion({
					uid: $page.data.user.uid,
					displayName: $page.data.user.displayName,
					photoURL: $page.data.user.photoURL
				})
			});
			// const doc_snapshot = await getDoc(doc_ref);
			unsub = onSnapshot(doc_ref, (doc) => {
				const data = doc.data();
				console.log({ data });
				players = data?.players || [];
			});
		}

		game_set();

		return () => {
			leave_game();
		};
	});
</script>

<svelte:window
	on:beforeunload={async (e) => {
		await leave_game();
		e.preventDefault();
		e.returnValue = '';
		return '...';
	}}
/>

<h1 class="text-center py-4">
	Game ID: {$page.params.id}
</h1>

{#if players}
	<main class="flex items-center justify-center gap-8">
		<section class="flex items-center gap-x-2 justify-evenly">
			<div class="avatar">
				<div class="w-12 h-12 rounded-full">
					<img src={players[0]?.photoURL ?? 'https://ui-avatars.com/api/?name=?'} alt="" />
				</div>
			</div>
			<h1 class="text-xl font-bold">
				{players[0]?.displayName ?? 'Loading...'}
			</h1>
		</section>
		<section class="text-5xl font-bold">VS</section>
		<section class="flex items-center gap-x-2">
			<div class="avatar">
				<div class="w-12 h-12 rounded-full">
					<img src={players[1]?.photoURL ?? 'https://ui-avatars.com/api/?name=?'} alt="" />
				</div>
			</div>
			<h1 class="text-xl font-bold">
				{players[1]?.displayName ?? 'Waiting Player...'}
			</h1>
		</section>
	</main>
{/if}
