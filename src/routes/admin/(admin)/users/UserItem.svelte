<script>
	// @ts-nocheck
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import { toast } from 'svelte-sonner';

	export let user;
	$: if ($page.form?.success) toast.success($page.form?.message);
</script>

<!-- <pre>
    {JSON.stringify(user, null, 2)}
</pre> -->
<tr>
	<th>
		<div class="flex items-center space-x-3">
			<div class="avatar">
				<div class="mask mask-squircle w-12 h-12">
					<img src={user.photoURL} alt="Avatar Tailwind CSS Component" />
				</div>
			</div>
			<div>
				<div class="font-bold">{user.displayName}</div>
				<div class="text-sm opacity-50">{user.email}</div>
			</div>
		</div>
	</th>
	<td>
		{user.metadata.creationTime}
	</td>
	<td>{user.metadata.lastSignInTime}</td>
	<th>
		<div class="dropdown dropdown-end">
			<!-- svelte-ignore a11y-label-has-associated-control -->
			<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
			<label tabindex="0" class="btn btn-ghost btn-sm btn-circle"
				><svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="w-6 h-6"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
					/>
				</svg>
			</label>
			<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
			<ul
				tabindex="0"
				class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 gap-y-1"
			>
				<li class:hidden={user?.customClaims?.admin}>
					<form action="?/make_admin" method="post" class="contents" use:enhance>
						<input type="hidden" name="uid" value={user.uid} />
						<button class="btn btn-sm">make admin</button>
					</form>
				</li>
				<li class:hidden={!user?.customClaims?.admin}>
					<form action="?/revoke_admin" method="post" class="contents" use:enhance>
						<input type="hidden" name="uid" value={user.uid} />
						<button class="btn btn-sm">revoke admin</button>
					</form>
				</li>
			</ul>
		</div>
	</th>
</tr>
