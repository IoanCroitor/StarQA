<script>
	import { VITE_POCKETBASE_URL } from '$env/static/private';

	// @ts-nocheck

	import PocketBase from 'pocketbase';
	import { onMount } from 'svelte';

	onMount(async () => {
		const pb = new PocketBase(VITE_POCKETBASE_URL);

		// you can also fetch all records at once via getFullList
		const recordss = await pb.collection('questions').getFullList({
			sort: '-created'
		});

		console.log(recordss);
	});
</script>

<nav class="navbar bg-card hidden md:block">
	<div class="flex-1">
		<a class="btn btn-ghost normal-case text-xl" href="/">✨StarQA</a>
	</div>
	<div class="flex-none">
		<ul class="menu menu-horizontal px-1">
			<li><a href="/projects">Projects</a></li>
			<li><a href="/about">About</a></li>
		</ul>
	</div>
</nav>

<nav class="navbar bg-card w-full h-16 fixed bottom-0 md:hidden border-t border-border">
	<div class="flex-1">
		<a class="btn btn-ghost normal-case text-xl" href="/">✨StarQA</a>
	</div>
</nav>
