<script>
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { db } from '$lib/firebase/client';
	import { addDoc, collection } from 'firebase/firestore';
	import { toast } from 'svelte-sonner';

	let loading = false;

	async function create_game() {
		if (!$page.data.user) return;
		loading = true;
		try {
			const game_col_ref = collection(db, 'game');
			const doc_ref = await addDoc(game_col_ref, {
				players: []
			});
			loading = false;
			await goto(`/game/${doc_ref.id}`);
		} catch (e) {
			// @ts-ignore
			return e;
		}
	}
</script>

<button
	class="btn btn-primary mx-auto btn-wide"
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
