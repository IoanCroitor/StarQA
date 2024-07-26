<script lang="ts">
  import type { PageData } from './$types'
  import SettingsForm from './new-password.svelte'
  export let data: PageData
</script>

<svelte:head>New Password</svelte:head>

<SettingsForm data={data.form} />
