<script>
	import { page } from '$app/stores';
	import { google_signin, sign_out } from '$lib/firebase/client';
</script>

<div class="navbar bg-base-100 sticky top-0 z-10">
	<div class="navbar-start">
		<!-- <div class="dropdown">
			svelte-ignore a11y-no-noninteractive-tabindex
			svelte-ignore a11y-label-has-associated-control
			<label tabindex="0" class="btn btn-ghost btn-circle">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-5 w-5"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					><path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M4 6h16M4 12h16M4 18h7"
					/></svg
				>
			</label>
			svelte-ignore a11y-no-noninteractive-tabindex
			<ul
				tabindex="0"
				class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
			>
				<li><a href="/">Homepage</a></li>
				<li><a href="/about">About</a></li>
			</ul>
		</div> -->
	</div>
	<div class="navbar-center">
		<a href="/" class="btn btn-ghost normal-case text-xl">CyberSentries</a>
	</div>
	<div class="navbar-end">
		<button class="btn" on:click={google_signin} class:hidden={!!$page.data.user}>
			<img src="/google.png" alt="google icon" class="h-6 w-6" />
			Sign in with Google
		</button>
		<div class="dropdown dropdown-end" class:hidden={!$page.data.user}>
			<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
			<!-- svelte-ignore a11y-label-has-associated-control -->
			<label tabindex="0" class="btn btn-ghost btn-circle avatar">
				<div class="w-10 rounded-full">
					<!-- svelte-ignore a11y-missing-attribute -->
					<img src={$page.data?.user?.photoURL ?? 'https://i.pravatar.cc/300'} />
				</div>
			</label>
			<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
			<ul
				tabindex="0"
				class="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
			>
				<li class=" menu-title">
					<p>Hello {$page.data?.user?.displayName ?? 'Strange'}</p>
				</li>
				<li>
					<button on:click={sign_out}>Logout</button>
				</li>
			</ul>
		</div>
	</div>
</div>
