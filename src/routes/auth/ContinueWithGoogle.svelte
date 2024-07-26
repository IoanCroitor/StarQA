<script lang="ts">
  import { Button } from '$lib/components/ui/button/index.js'
  import Google from '$lib/components/ui/icons/google.svelte'
  import Spinner from '@/assets/Spinner.svelte'
  import { goto } from '$app/navigation'
  import { toast } from 'svelte-sonner'

  let isLoading = false

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

  async function signInWithGoogle() {
    isLoading = true
    try {
      const response = await fetch('/auth/google', {
        method: 'GET',
      })

      const contentType = response.headers.get('content-type')
      if (contentType && contentType.indexOf('application/json') !== -1) {
        const data = await response.json()
        if (!response.ok) {
          console.error('Error:', data)
          handleErrorToast(
            response.status,
            data.error || 'Failed to sign in with Google. Please try again.',
          )
        } else {
          goto('/home')
        }
      } else {
        // Handle non-JSON response (like a redirect)
        const text = await response.text()
        console.log('Non-JSON response:', text)
        // You might want to handle redirects here if that's the expected behavior
      }
    } catch (error) {
      console.error('Fetch error:', error)
      handleErrorToast(
        500,
        'Network error. Please check your connection and try again.',
      )
    } finally {
      isLoading = false
    }
  }
</script>

<div class="relative">
  <div class="absolute inset-0 flex items-center">
    <span class="w-full border-t" />
  </div>
  <div class="relative flex justify-center text-xs uppercase">
    <span class="bg-background px-2 text-muted-foreground">
      Or continue with
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
