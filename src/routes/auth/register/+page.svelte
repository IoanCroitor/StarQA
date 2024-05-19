<script lang="ts">
  import { Button } from '$lib/components/ui/button/index.js'
  import { Input } from '$lib/components/ui/input/index.js'
  import { Label } from '$lib/components/ui/label/index.js'
  import { LoaderCircle } from 'lucide-svelte'
  import { Progress } from '$lib/components/ui/progress/index.js'
  import {
    calculateStrength,
    progressColorFunction,
    removeAfterAt,
  } from './functions'
  import { logout, signUp } from '@/pocketbase'
  import { goto } from '$app/navigation'
  import { generateUsername } from '@/utils_server'

  let email = ''
  let password = ''
  let passwordConfirm = ''
  let strength: number = 0
  let progressColor = ''

  let errorMessage: string = ''

  let passwordFormatted: string,
    passwordConfirmFormatted: string,
    emailFormatted: string

  $: passwordFormatted = password
  $: passwordConfirmFormatted = passwordConfirm
  $: emailFormatted = email

  $: arePasswordsMathing = passwordFormatted === passwordConfirmFormatted
  $: strength = calculateStrength(passwordFormatted)
  $: progressColor = progressColorFunction(
    arePasswordsMathing,
    passwordConfirmFormatted,
    strength,
  )

  let isLoading = false
  async function onSubmit() {
    logout()
    errorMessage = ''
    isLoading = true
    const username = generateUsername(removeAfterAt(emailFormatted))
    console.log(username)
    try {
      await signUp(emailFormatted, passwordFormatted, username) // Call the signUp function
      console.log('Signup successful')
      await goto('/home') // Redirect to dashboard after successful signup
    } catch (error) {
      isLoading = false
      console.error('Signup failed', error)
      errorMessage =
        'Something went wrong, check your credentials (posibly email already used)'
    }
  }
</script>

<div class="">
  <h2 class="text-sm font-bold text-red-500 mx-auto">{errorMessage}</h2>
  <form on:submit={onSubmit}>
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
