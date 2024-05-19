<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { LoaderCircle } from 'lucide-svelte';
	import { Progress } from '$lib/components/ui/progress/index.js';
	import { calculateStrength, progressColorFunction } from './functions';
	import { signUp } from '@/pocketbase';
	import { goto } from '$app/navigation';

	let email = '';
	let password = '';
	let passwordConfirm = '';
	let strength: number = 0;
	let progressColor = '';

	let passwordFormatted: string, passwordConfirmFormatted: string, emailFormatted: string;

	$: passwordFormatted = password;
	$: passwordConfirmFormatted = passwordConfirm;
	$: emailFormatted = email;

	$: arePasswordsMathing = passwordFormatted === passwordConfirmFormatted;
	$: strength = calculateStrength(passwordFormatted);
	$: progressColor = progressColorFunction(arePasswordsMathing, passwordConfirmFormatted, strength);

	let isLoading = false;
	async function onSubmit() {
		// isLoading = true;
		// try {
		// 	await signUp(emailFormatted, passwordFormatted, 'uhwiuAHIHIUHSIU'); // Call the signUp function
		// 	console.log('Signup successful');
		// 	await goto('/dashboard'); // Redirect to dashboard after successful signup
		// } catch (error) {
		// 	console.error('Signup failed', error);
		// 	error = error || 'Signup failed';
		// }
	}
</script>

<div class="space-y-2">
	<div class="flex flex-col text-center">
		<h1 class="text-2xl font-semibold tracking-tight">Create an account</h1>
		<p class="text-sm text-muted-foreground">Enter your email below to create your account</p>
	</div>
	<div class="grid gap-6">
		<form action="" method="POST">
			<div class="grid gap-2">
				<div class="grid gap-1">
					<div class="grid gap-2">
						<Label for="email">Email</Label>
						<Input
							id="email"
							placeholder="ioan@example.com"
							type="email"
							autocapitalize="none"
							autocomplete="email"
							autocorrect="off"
							disabled={isLoading}
							bind:value={email}
						/>
					</div>
					<div class="grid gap-2 pt-2">
						<Label for="password">Password</Label>
						<Input
							id="password"
							type="password"
							placeholder="Password"
							disabled={isLoading}
							bind:value={password}
						/>
					</div>
					<div class="grid gap-2">
						<Label for="password" class="sr-only">Confirm Password</Label>
						<Input
							id="passwordconfirm"
							type="password"
							placeholder="Confirm Password"
							bind:value={passwordConfirm}
							disabled={isLoading}
						/>
					</div>
					<div class="w-full mx-1 mt-2 mb-1">
						<Progress value={strength} max={100} class={` ${progressColor} `} />
					</div>
				</div>
				<Button type="submit" disabled={isLoading}>
					{#if isLoading}
						<LoaderCircle class="mr-2 h-4 w-4 animate-spin" />
						<!-- <Icons.spinner class="mr-2 h-4 w-4 animate-spin" /> -->
					{/if}
					Sign Up with Email
				</Button>
			</div>
		</form>
	</div>
</div>
