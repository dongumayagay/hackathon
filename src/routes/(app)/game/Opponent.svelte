<script>
	import { db } from '$lib/firebase/client';
	import { doc, onSnapshot } from 'firebase/firestore';
	import { onMount } from 'svelte';
	import ShowLogs from './ShowLogs.svelte';

	export let opponent_uid = '';
	/** @type {any}	 */
	let player;

	onMount(() => {
		const unsub = onSnapshot(
			doc(db, `players/${opponent_uid}`),
			(snapshot) => (player = snapshot.data())
		);
		return () => unsub();
	});
</script>

<section class={`flex gap-2 justify-between flex-row-reverse items-start`}>
	<div class={`flex flex-col  gap-4 'items-end'`}>
		<div class="flex gap-2 flex-row-reverse">
			<img class="avatar rounded h-16" src={player?.photoURL ?? ''} alt="" />
			<ul class="text-sm flex flex-col justify-between text-right">
				<li>{player?.displayName ?? ''}</li>
				<li>Security: {player?.hp ?? ''}</li>
				<li>CPU Power: {player?.mp ?? ''}</li>
			</ul>
		</div>
	</div>
	<ShowLogs />
</section>
