<script lang="ts">
	import LoginForm from './_components/SignUpForm.svelte';
	import Skeleton from '$lib/components/ui/skeleton/skeleton.svelte';
	import { Button } from '$lib/components/ui/button/index';
	import { getRandomImage } from './_components/unsplash';
	import SignUpForm from './_components/SignUpForm.svelte';
	import SigninForm from './_components/SigninForm.svelte';
	import ContinueWithGoogle from './_components/ContinueWithGoogle.svelte';

	const quotes = [
		{
			text: 'This project has a lot of potential to become something awesome!',
			author: 'Reddit comment'
		},
		{
			text: 'Foarte frumos, bravo!',
			author: 'Diaconu Maria - profesoara de istorie'
		},
		{
			text: 'Misto',
			author: 'Simeon, fatele meu'
		}
	];

	const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
	const imageThemes = ['stars', 'space', 'books', 'planet', 'planets', 'library'];
	let image = getRandomImage(imageThemes).then((image) => image);

	let route = 'signin';
	let buttontext = 'Sign in';
	function changeRoute() {
		route = route === 'signin' ? 'signup' : 'signin';
		buttontext = buttontext === 'Sign in' ? 'Sign up' : 'Sign in';
	}
</script>

<div
	class="container relative h-screen flex-col items-center justify-center grid max-w-none lg:grid-cols-2 lg:px-0"
>
	<Button on:click={changeRoute} class="absolute right-4 top-4 md:right-8 md:top-8"
		>{buttontext}</Button
	>
	<div class="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
		{#await image}
			<Skeleton class="absolute inset-0 h-full w-full" />
		{:then image}
			<img
				src={image.image_url}
				alt={image.image_description}
				class="absolute inset-0 h-full w-full object-cover text-transparent"
			/>
			<div
				class="absolute inset-0 bottom-0 w-full h-full bg-gradient-to-t from-background via-transparent to-background/50"
			></div>
		{/await}

		<div class="relative z-20 flex items-center text-lg font-medium">StarQA</div>

		<div class="relative flex z-20 mt-auto justify-between">
			<blockquote class="">
				<p class="text-xl">&ldquo;{randomQuote.text}&rdquo;</p>
				<footer class="text-sm">{randomQuote.author}</footer>
			</blockquote>

			<blockquote class="text-primary/70 text-right">
				{#await image then image}
					<p class="text-sm truncate">
						<span class="">{image.image_author} </span><a class="" href={image.image_url}
							>on Unsplash</a
						>
					</p>
					<footer class="text-xs truncate">{image.image_description}</footer>
				{/await}
			</blockquote>
		</div>
	</div>
	<div class="p-4 mx:p-8">
		<div class="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
			{#if route === 'signin'}
				<div class="flex flex-col space-y-2 text-center">
					<h1 class="text-2xl font-semibold tracking-tight">Sign in to your account</h1>
					<p class="text-sm text-muted-foreground">Enter your email and password to continue</p>
				</div>
				<SigninForm />
			{:else if route === 'signup'}
				<div class="flex flex-col space-y-2 text-center">
					<h1 class="text-2xl font-semibold tracking-tight">Create an account</h1>
					<p class="text-sm text-muted-foreground">Enter your email below to create your account</p>
				</div>
				<SignUpForm />
			{/if}
			<ContinueWithGoogle />

			<p class="px-8 text-center text-sm text-muted-foreground">
				By clicking continue, you agree to our
				<a href="/terms" class="underline underline-offset-4 hover:text-primary">
					Terms of Service
				</a>
				and
				<a href="/privacy" class="underline underline-offset-4 hover:text-primary">
					Privacy Policy
				</a>
				.
			</p>
		</div>
	</div>
</div>
