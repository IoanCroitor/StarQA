<script lang="ts">
	// @ts-nocheck
	import { User } from 'lucide-svelte';
	import '../app.css';
	export let data;
</script>

<h1>{data.user}</h1>
<slot />
