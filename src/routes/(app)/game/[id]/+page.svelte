<script>
	import { page } from '$app/stores';
	import { db } from '$lib/firebase/client';
	import { arrayRemove, arrayUnion, doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore';
	import { onMount } from 'svelte';

	// /** @type {import('./$types/').PageData} */
	// export let data;`

	/**
	 * @type {string[]}
	 */
	let players = [];

	async function leave_game() {
		await updateDoc(doc(db, `game/${$page.params.id}`), {
			players: arrayRemove($page.data.user.uid)
		});
	}

	onMount(() => {
		/** @type {import('firebase/firestore').Unsubscribe}*/
		let unsub;

		async function game_set() {
			const doc_ref = doc(db, `game/${$page.params.id}`);
			updateDoc(doc_ref, {
				players: arrayUnion($page.data.user.uid)
			});
			// const doc_snapshot = await getDoc(doc_ref);
			unsub = onSnapshot(doc_ref, (doc) => {
				const data = doc.data();
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

Game ID: {$page.params.id}

<br />
<h1>Players</h1>
<ul>
	{#each players as player}
		{player}
	{/each}
</ul>
