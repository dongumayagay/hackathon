<script>
	import QuitGame from './QuitGame.svelte';
	import { db } from '$lib/firebase/client';
	import { doc, onSnapshot } from 'firebase/firestore';
	import { onMount } from 'svelte';
	import ShowLogs from './ShowLogs.svelte';
	import { tweened } from 'svelte/motion';

	export let opponent_uid = '';
	/** @type {any}	 */
	let player;
	const hp = tweened(0);
	const mp = tweened(0);
	onMount(() => {
		const unsub = onSnapshot(doc(db, `players/${opponent_uid}`), (snapshot) => {
			player = snapshot.data();
			$hp = player?.hp ?? 0;
			$mp = player?.mp ?? 0;
		});
		return () => unsub();
	});
</script>

<section class={`flex gap-2 justify-between flex-row-reverse items-start`}>
	<div class={`flex flex-col  gap-4 'items-end'`}>
		<div class="flex gap-2 flex-row-reverse">
			<img class="avatar rounded h-16" src={player?.photoURL ?? ''} alt="" />
			<ul class="text-sm flex flex-col justify-between text-right">
				<li>{player?.displayName ?? ''}</li>
				<li>Security: {$hp.toFixed(0) ?? ''}</li>
				<li>CPU Power: {$mp.toFixed(0) ?? ''}</li>
			</ul>
		</div>
	</div>
	<!-- <ShowLogs /> -->
	<QuitGame />
</section>
