<script>
	import { goto } from "$app/navigation";
    import {page} from "$app/stores";
	import { db } from "$lib/firebase/client";
	import { error } from "@sveltejs/kit";
	import { getDoc, doc, updateDoc, arrayUnion } from "firebase/firestore";
	import { toast } from "svelte-sonner";

    let lobbyId = "";
    let loading = false;

    async function submitHandler() {
        if (!$page.data.user) return;
        loading = true;
        try {
            await goto(`game/${lobbyId}`)
        } catch (error) {
            console.log(error)
            return error;
        }
    }
</script>

<form class="flex items-end" on:submit|preventDefault={()=>toast.promise(submitHandler, {
    loading: `Finding lobby ${lobbyId}`,
    success: 'Lobby Found',
    error: "Lobby Not Found, Please Try Again"
}
)}>
    <div class="flex flex-col gap-2">
        <label for="lobby-input">
            <span>Find the Lobby Id</span>
        </label>
        <input type="text" id="lobby-input" class="input" bind:value={lobbyId} required>
    </div>
    
    <button type="submit" class="btn btn-secondary">
    Join Game
    </button>
</form>