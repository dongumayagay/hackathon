<div class="drawer lg:drawer-open">
	<input id="admin-drawer" type="checkbox" class="drawer-toggle" />
	<div class="drawer-content flex flex-col">
		<slot name="navbar" />
		<slot name="page_content" />
	</div>
	<div class="drawer-side">
		<label for="admin-drawer" class="drawer-overlay" />
		<slot name="sidebar" />
	</div>
</div>
