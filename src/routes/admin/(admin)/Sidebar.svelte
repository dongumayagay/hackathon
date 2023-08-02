<script>
	import { sign_out } from '$lib/firebase/client';
</script>

<ul class="menu p-4 w-80 h-full bg-base-100 text-base-content">
	<li><a href="/admin">Dashboard</a></li>
	<li><a href="/admin/users">Users</a></li>
	<li class="mt-auto"><button on:click={sign_out}>Sign out</button></li>
</ul>
