<script>
	import { page } from '$app/stores';
	import { db } from '$lib/firebase/client';
	import { addDoc, arrayRemove, arrayUnion, doc, onSnapshot, updateDoc, collection, Timestamp, query, where, getDocs, orderBy, deleteDoc, getDoc } from 'firebase/firestore';
	import { onMount } from 'svelte';

	// /** @type {import('./$types/').PageData} */
	// export let data;`

	/**
	 * @type {any[]}
	 */
	let players = [];

	let linkCopied = false;

	let isHost = false;

	async function playerSessionId() {
		const player_session_id = players.find((player) => player.displayName = $page.data.user.displayName).id;
		console.log(player_session_id)
		return player_session_id
	}

	async function leave_game() {
		try {
			// const playerSeshId = await playerSessionId()
			await deleteDoc(doc(db, 'players', await playerSessionId()))
			
			if(players.length === 0){
				await deleteDoc(doc(db, 'game', await playerSessionId()))
			}
			// const player_query = getDoc(doc)
			// await deleteDoc(doc)
		} catch (error) {
			
		}
	}
	
	/**
	 * @param {string} text
	 */
	function copyToClipboard(text) {
		navigator.clipboard.writeText(text);
		linkCopied = true;
		setTimeout(()=>{
			linkCopied = false;
		}, 2000)
	}

	/**
	 * @param {number} playerIndex
	 * @param {boolean} readyState
	 */
	async function changeReadyState(playerIndex, readyState) {
		console.log("player Ready")
		await updateDoc(doc(db, `players`, players[playerIndex].id), {
			battleReady: readyState,
		});
	}

	onMount(() => {
		/** @type {import('firebase/firestore').Unsubscribe}*/
		let unsub;

		async function game_set() {
			const players_col_ref = collection(db, `players`);
			const player_doc = addDoc(players_col_ref, {
				// players: arrayUnion({
				game_id: $page.params.id,
				displayName: $page.data.user.displayName,
				photoURL: $page.data.user.photoURL,
				dateJoined: Timestamp.now(),
				battleReady: false,
				hp: 30,
				max_mp: 10,
				mp: 3,
				// })
			});
			const players_query = query(players_col_ref, where("game_id", "==", $page.params.id), orderBy("dateJoined", "asc"));
			unsub = onSnapshot(players_query, (querySnapshot) => {
				players = querySnapshot.docs.map((doc)=>({
					...doc.data(), 
					id: doc.id,
				}))
			});
		}

		const player_session = getDocs(query(collection(db, 'players'), where("game_id", "==", $page.params.id), where("displayName", "==", $page.data.user.displayName)))
		.then((querySnapshots)=>{
			if(querySnapshots.docs.length == 0){
				game_set();
			}
			
		})
		// game_set();

		return () => {
			leave_game();
		};
	});

	$: isHost = players[0]?.displayName === $page.data.user.displayName;
	$: bothReady = players.filter((player)=>player.battleReady).length === 2;
</script>

<svelte:window
	on:beforeunload={async (e) => {
		e.preventDefault();
		e.returnValue = '';
		await leave_game();
		return '...';
	}}
/>

<h1 class="flex justify-center gap-2 py-4 text-center">
	Game ID: {$page.params.id}
	<button class="hover:scale-110" on:click={()=>copyToClipboard($page.params.id)}>
		<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
			<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" />
		  </svg>
	</button>
</h1>

{#if players}
<main class="flex flex-col items-center gap-5">
	<section class="flex items-center justify-center gap-8">

		<section class="flex flex-col items-center justify-start min-h-[20vh]">
			<p>HOST</p>
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
			{#if players[0] && players[0].displayName === $page.data.user.displayName}
			<button class="btn {players[0]?.battleReady ? "btn-error" : "btn-success"}" on:click={()=>changeReadyState(0, !players[0].battleReady)}>{players[0]?.battleReady? "Cancel" : "Ready"}</button>
			{/if}
			{#if players[0] !== $page.data.user.displayName && players[0]?.battleReady}
				<p>READY</p>
			{/if}
		</section>

		<section class="text-5xl font-bold">VS</section>

		<section class="flex flex-col items-center justify-start h-[20vh]">
			
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
			{#if players[1] && players[1].displayName === $page.data.user.displayName}
				<button class="btn {players[1]?.battleReady ? "btn-error" : "btn-success"}" on:click={()=>changeReadyState(1, !players[1].battleReady)}>{players[1]?.battleReady? "Cancel" : "Ready"}</button>
			{/if}
			{#if players[1] !== $page.data.user.displayName && players[1]?.battleReady}
				<p>READY</p>
			{/if}
		</section>
	</section>
	{#if players.length < 2 }
	<button class="flex gap-2 btn btn-primary w-max tooltip" data-tip={linkCopied ? "Copied to clipboard" : "Copy Lobby Link"}
		on:click={() => copyToClipboard(`https://pup-hackathon-2023.vercel.app/game/${$page.params.id}`)}
	>
		Invite
		<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
			<path stroke-linecap="round" stroke-linejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
		  </svg>
		  
	</button>
	{:else}
	<button disabled={!isHost || players.filter((player)=>player.battleReady).length < 2} class="btn {bothReady ? "btn-success" : ""}" on:click={()=>console.log("Game Started")}>Start Game</button>
	{/if}
</main>
{/if}
