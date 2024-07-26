<script lang="ts">
  import { onMount } from 'svelte'
  import type { PageData } from './$types'
  import SettingsForm from './password-reset-form.svelte'
  export let data: PageData
</script>

<svelte:head>Reset Password</svelte:head>

<SettingsForm data={data.form} />
