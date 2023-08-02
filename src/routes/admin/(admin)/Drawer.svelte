<div class="drawer lg:drawer-open h-full bg-base-200">
	<input id="admin-drawer" type="checkbox" class="drawer-toggle" />
	<div class="drawer-content flex flex-col">
		<slot name="navbar" />
		<main class="h-full p-2">
			<slot name="page_content" />
		</main>
	</div>
	<div class="drawer-side">
		<label for="admin-drawer" class="drawer-overlay" />
		<slot name="sidebar" />
	</div>
</div>
