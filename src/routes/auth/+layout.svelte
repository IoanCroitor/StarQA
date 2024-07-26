<script lang="ts">
  import Skeleton from '$lib/components/ui/skeleton/skeleton.svelte'
  import { Button, type Props } from '$lib/components/ui/button/index'
  import ContinueWithGoogle from './ContinueWithGoogle.svelte'
  import { onMount } from 'svelte'

  import { goto } from '$app/navigation'
  import { page } from '$app/stores'

  export let data: any

  let photo: {
    image_id: string
    image_description: string
    image_author: string
    image_url: string
    image_url_small: string
  } = data.photo

  const quotes = [
    {
      text: 'This project has a lot of potential to become something awesome!',
      author: 'Reddit comment',
    },
    {
      text: 'Foarte frumos, bravo!',
      author: 'Diaconu Maria - profesoara de istorie',
    },
    {
      text: 'Misto',
      author: 'Simeon, fatele meu',
    },
  ]

  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)]

  let fullRoute: string = $page.url.pathname
  let route = fullRoute.split('/').pop()

  let buttontext = route === 'login' ? 'Register' : 'Sign in'
  function changeRoute() {
    route = route === 'login' ? 'register' : 'login'
    buttontext = route === 'login' ? 'Register' : 'Sign in'
  }
</script>

<div
  class="container relative h-screen flex-col items-center justify-center grid max-w-none lg:grid-cols-2 lg:px-0"
>
  <Button
    on:click={changeRoute}
    href={route}
    class="absolute right-4 top-4 md:right-8 md:top-8">{buttontext}</Button
  >

  <div
    class="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex"
  >
    {#if photo}
      <img
        src={photo.image_url}
        alt={photo.image_description}
        class="absolute inset-0 h-full w-full object-cover text-transparent"
      />
    {:else}
      <Skeleton class="absolute inset-0 h-full w-full" />
    {/if}
    <div
      class="absolute inset-0 bottom-0 w-full h-full bg-gradient-to-t from-background via-transparent to-background/50"
    ></div>

    <div class="relative z-20 flex items-center text-lg font-medium">
      StarQA
    </div>

    <div class="relative flex z-20 mt-auto justify-between">
      <blockquote class="">
        <p class="text-xl">&ldquo;{randomQuote.text}&rdquo;</p>
        <footer class="text-sm">{randomQuote.author}</footer>
      </blockquote>

      <blockquote class="text-primary/70 text-right">
        {#if photo}
          <p class="text-sm truncate">
            <span class="text-right">{photo.image_author} </span><a
              class=""
              href={photo.image_url}>on Unsplash</a
            >
          </p>
          <footer class="text-xs truncate max-w-40">
            {photo.image_description}
          </footer>
        {:else}
          <p class="text-sm truncate">
            <span class="">Error loading image from </span><a
              class=""
              href="unsplash.com">Unsplash</a
            >
          </p>
          <footer class="text-xs truncate max-w-40">
            Error fetching author
          </footer>
        {/if}
      </blockquote>
    </div>
  </div>
  <div class="p-4 mx:p-8">
    <div
      class="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]"
    >
      <h1 class="text-4xl font-bold tracking-tight capitalize">{route}</h1>
      <slot />
      <ContinueWithGoogle />
      <p class="px-8 text-center text-sm text-muted-foreground">
        By clicking continue, you agree to our
        <a
          href="/terms"
          class="underline underline-offset-4 hover:text-primary"
        >
          Terms of Service
        </a>
        and
        <a
          href="/privacy"
          class="underline underline-offset-4 hover:text-primary"
        >
          Privacy Policy
        </a>
        .
      </p>
    </div>
  </div>
</div>
