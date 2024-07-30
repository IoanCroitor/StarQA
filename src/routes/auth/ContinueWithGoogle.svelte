<script lang="ts">
  import { Button } from '$lib/components/ui/button/index.js'
  import Google from '$lib/components/ui/icons/google.svelte'
  import { goto } from '$app/navigation'
  import Spinner from '@/assets/Spinner.svelte'
  import { toast } from 'svelte-sonner'
  import * as m from '$lib/paraglide/messages'
  let isLoading = false
  let errorMessage = ''

  function handleErrorToast(status: number, error: string) {
    toast.error(error, {
      description: 'Error Code: ' + status,
      action: {
        label: 'Close',
        onClick: () =>
          console.info(
            'Closed error message: ' + error + ' with the status: ' + status,
          ),
      },
    })
  }
  // async function signInWithGoogle() {
  //   isLoading = true
  //   errorMessage = ''
  //   try {
  //     const response = await fetch('/auth/google', {
  //       method: 'GET',
  //     })

  //     const contentType = response.headers.get('content-type')
  //     if (contentType && contentType.indexOf('application/json') !== -1) {
  //       const data = await response.json()
  //       if (!response.ok) {
  //         console.error('Error:', data)
  //         errorMessage =
  //           data.error || 'Failed to sign in with Google. Please try again.'
  //       } else {
  //         goto('/home')
  //       }
  //     } else {
  //       // Handle non-JSON response (like a redirect)
  //       const text = await response.text()
  //       console.log('Non-JSON response:', text)
  //       // You might want to handle redirects here if that's the expected behavior
  //     }
  //   } catch (error) {
  //     console.error('Fetch error:', error)
  //     errorMessage =
  //       'Network error. Please check your connection and try again.'
  //   } finally {
  //     isLoading = false
  //   }
  // }
  async function signInWithGoogle() {
    try {
      const response = await fetch('/auth/google', {
        method: 'GET',
      })

      if (response.ok) {
        // If the response is a redirect (status 3xx), get the URL and navigate to it
        const redirectUrl = response.url
        window.location.href = redirectUrl
      } else {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to initiate Google sign-in')
      }
    } catch (error) {
      console.error('Error initiating Google sign-in:', error)
      // Handle the error (e.g., show an error message to the user)
    }
  }
</script>

<div class="relative">
  <div class="absolute inset-0 flex items-center">
    <span class="w-full border-t" />
  </div>
  <div class="relative flex justify-center text-xs uppercase">
    <span class="bg-background px-2 text-muted-foreground">
      {m.or_continue_with()}
    </span>
  </div>
</div>

<Button variant="outline" on:click={signInWithGoogle} disabled={isLoading}>
  {#if isLoading}
    <Spinner />
  {:else}
    <Google class="mr-2 h-4 w-4" />
    Google
  {/if}
</Button>
{#if errorMessage}
  <p class="text-red-500 text-sm mt-2">{errorMessage}</p>
{/if}
