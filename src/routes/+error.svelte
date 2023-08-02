<script>
	import { page } from '$app/stores';
</script>

<main class="bg-base-300 h-full grid place-items-center">
	<div class="text-center">
		<h1>
			{$page.status}
		</h1>
		<h2>
			for more info <a
				class="link"
				href={`https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/${$page.status}`}
				>click here</a
			>
		</h2>
		<p>
			{$page.error?.message}
		</p>
		<a href="/" class="link">go back to home page</a>
	</div>
</main>
