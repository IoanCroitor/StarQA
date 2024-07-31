<script lang="ts">
  import { Button } from '$lib/components/ui/button/index.js'
  import Google from '$lib/components/ui/icons/google.svelte'
  import Spinner from '@/assets/Spinner.svelte'
  import { toast } from 'svelte-sonner'
  import * as m from '$lib/paraglide/messages'
  import { supabase } from '$lib/supabaseClient'

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

  async function signInWithGoogle() {
    isLoading = true
    errorMessage = ''
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: 'http://localhost:5173/auth/callback',
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      })

      if (error) {
        throw error
      }
    } catch (error) {
      console.error('Error initiating Google sign-in:', error)
      handleErrorToast(500, String(error))
      errorMessage = 'Failed to sign in with Google. Please try again.'
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
