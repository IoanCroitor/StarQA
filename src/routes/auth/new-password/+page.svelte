<script lang="ts">
  import type { PageData } from './$types'
  import SettingsForm from './new-password.svelte'
  export let data: PageData
  import * as m from '$lib/paraglide/messages'
</script>

<svelte:head><title>{m.new_password()}</title></svelte:head>

<SettingsForm bind:data={data.form} />
