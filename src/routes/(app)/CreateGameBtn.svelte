<script>
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { addPlayer, db } from '$lib/firebase/client';
	import { collection, doc, setDoc } from 'firebase/firestore';
	import { toast } from 'svelte-sonner';

	let loading = false;

	async function create_game() {
		if (!$page.data.user) return;
		loading = true;
		try {
			const game_id = doc(collection(db, 'id')).id;

			await Promise.all([
				setDoc(doc(db, `game/${game_id}`), {
					which_player_turn: null,
					winner: null
				}),
				addPlayer($page.data.user, game_id)
			]);

			await goto(`/game/${game_id}`);
		} catch (e) {
			console.error(e);
			return e;
		}
		loading = false;
	}
</script>

<button
	class="btn btn-info rounded-full"
	on:click={() => {
		toast.promise(create_game, {
			loading: 'Creating Game',
			success: 'Success: Creating Game',
			error: 'Failed: Creating Game'
		});
	}}
	disabled={loading}
>
<img src="/skull.png" alt="google icon" class="h-6 w-6" />
	create game
</button>
