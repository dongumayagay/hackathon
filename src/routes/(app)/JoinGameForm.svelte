<script>
	import { goto } from "$app/navigation";
    import {page} from "$app/stores";
	import { db } from "$lib/firebase/client";
	import { error } from "@sveltejs/kit";
	import { getDoc, doc, updateDoc, arrayUnion } from "firebase/firestore";
	import { toast } from "svelte-sonner";

    let lobbyId = "";
    let loading = false;
</script>

<div class="flex items-end">
    <div class="flex flex-col gap-2">
        <label for="lobby-input">
            <span>Find the Lobby Id</span>
        </label>
        <input type="text" id="lobby-input" class="input" bind:value={lobbyId} required>
    </div>
    
    <a href="/game/{lobbyId}" class="btn btn-secondary">
    Join Game
    </a>
</div>