<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import Google from '$lib/components/ui/icons/google.svelte';
	import { LoaderCircle } from 'lucide-svelte';

	import { redirect } from '@sveltejs/kit';

	let isLoading = false;
	import PocketBase from 'pocketbase';

	const pb = new PocketBase('https://starqa.pockethost.io');

	async function onSubmit() {
		const authData = await pb.collection('users').authWithOAuth2({ provider: 'google' });
	}
</script>

<div class="relative">
	<div class="absolute inset-0 flex items-center">
		<span class="w-full border-t" />
	</div>
	<div class="relative flex justify-center text-xs uppercase">
		<span class="bg-background px-2 text-muted-foreground"> Or continue with </span>
	</div>
</div>
<Button variant="outline" type="button" disabled={isLoading} on:click={onSubmit}>
	{#if isLoading}
		<LoaderCircle class="mr-2 h-4 w-4 animate-spin" />
	{:else}
		<Google class="mr-2 h-4 w-4" />
	{/if}
	Google
</Button>
