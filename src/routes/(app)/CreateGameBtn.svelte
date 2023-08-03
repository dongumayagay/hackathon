<script>
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { db } from '$lib/firebase/client';
	import { Timestamp, addDoc, collection } from 'firebase/firestore';
	import { toast } from 'svelte-sonner';

	let loading = false;

	async function create_game() {
		if (!$page.data.user) return;
		loading = true;
		try {
			const games_col_ref = collection(db, 'game');
			const players_col_ref = collection(db, 'players');

			const game_doc_ref = await addDoc(games_col_ref, {
				which_player_turn: null,
				winner: null,
				dateCreated: Timestamp.now(),
			})
			console.log(game_doc_ref)
			// const player_doc_ref = await addDoc(players_col_ref, {
			// 	game_id: game_doc_ref.id,
			// 	displayName: $page.data.user.displayName,
			// 	photoURL: $page.data.user.photoURL,
			// 	battleReady: false,
			// 	hp: 30,
			// 	max_mp: 10,
			// 	mp: 3,
			// });
			// console.log(player_doc_ref)
			loading = false;
			await goto(`/game/${game_doc_ref.id}`);
		} catch (e) {
			// @ts-ignore
			return e;
		}
	}
</script>

<button
	class="mx-auto btn btn-primary btn-wide"
	on:click={() => {
		toast.promise(create_game, {
			loading: 'Creating Game',
			success: 'Success: Creating Game',
			error: 'Failed: Creating Game'
		});
	}}
	disabled={loading}
>
	create game
</button>
