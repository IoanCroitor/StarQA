<script lang="ts">
  import { goto } from '$app/navigation'
  import { handleToast } from '@/handleToast.js'
  import { redirect } from '@sveltejs/kit'
  import { onMount } from 'svelte'
  import { toast } from 'svelte-sonner'
  export let data

  $: ({ supabase } = data)

  onMount(async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      handleToast('error', 400, error as unknown as string)
    }
    goto('/auth/login')
  })
</script>
