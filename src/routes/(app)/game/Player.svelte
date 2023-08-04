<script>
	import { page } from '$app/stores';
	import { db, drawCard } from '$lib/firebase/client';
	import { doc, onSnapshot } from 'firebase/firestore';
	import { onMount } from 'svelte';
	import ShowCards from './ShowCards.svelte';
	import EndTurn from './EndTurn.svelte';

	/** @type {any}	 */
	export let game;
	export let opponent_uid = '';
	/** @type {any}	 */
	let player;

	onMount(() => {
		const unsub = onSnapshot(doc(db, `players/${$page.data.user.uid}`), async (snapshot) => {
			player = snapshot.data();
			if (player.first) await drawCard($page.data.game_id, $page.data.user.uid, 5, true);
		});
		return () => unsub();
	});
</script>

<section class={`flex gap-2 justify-between items-end`}>
	<div class={`flex flex-col  gap-4 items-start`}>
		<ShowCards {opponent_uid} />
		<div class="flex gap-2">
			<img class="avatar rounded h-16" src={player?.photoURL ?? ''} alt="" />
			<ul class="text-sm flex flex-col justify-between">
				<li>{player?.displayName ?? ''}</li>
				<li>Security: {player?.hp ?? ''}</li>
				<li>CPU Power: {player?.mp ?? ''}</li>
			</ul>
		</div>
	</div>
	<EndTurn {game} {opponent_uid} />
</section>
