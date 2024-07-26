<script lang="ts">
  import type { PageData } from './$types'
  import SettingsForm from './register-form.svelte'
  export let data: PageData
</script>

<h1 class="text-4xl font-bold tracking-tight capitalize">Register</h1>
<SettingsForm data={data.form} />
