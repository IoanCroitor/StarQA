<script lang="ts">
  import { onMount } from 'svelte'
  import type { PageData } from './$types'
  import SettingsForm from './password-reset-form.svelte'
  import * as m from '$lib/paraglide/messages'
  export let data: PageData
</script>

<svelte:head>{m.reset_password()}</svelte:head>

<SettingsForm data={data.form} />
