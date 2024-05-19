<script lang="ts">
  import { goto } from '$app/navigation'
  import { Button } from '$lib/components/ui/button/index.js'
  import { Input } from '$lib/components/ui/input/index.js'
  import { Label } from '$lib/components/ui/label/index.js'
  import { login } from '@/pocketbase'
  import { LoaderCircle } from 'lucide-svelte'

  let isLoading = false
  let email = ''
  let password = ''
  let errorMessage: string = ''

  async function onSubmit() {
    isLoading = true
    errorMessage = ''

    try {
      await login(email, password)
      // Redirect to a protected page
      await goto('/home')
      isLoading = false
    } catch (error) {
      isLoading = false
      errorMessage = 'Invalid email or password!'
    }
  }
</script>

<div class="grid gap-2">
  <div class="grid gap-1">
    {#if errorMessage}
      <h2 class="text-sm font-bold text-red-500 mx-auto">{errorMessage}</h2>
    {/if}
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
      <Input id="password" type="password" bind:value={password} />
    </div>
  </div>
  <Button type="submit" disabled={isLoading} on:click={onSubmit}>
    {#if isLoading}
      <LoaderCircle class="mr-2 h-4 w-4 animate-spin" />
      <!-- <Icons.spinner class="mr-2 h-4 w-4 animate-spin" /> -->
    {/if}
    Sign In with Email
  </Button>
</div>
