<script lang="ts">
  import type { PageData } from './$types'
  import SettingsForm from './login-form.svelte'
  export let data: PageData
</script>

<SettingsForm data={data.form} />
