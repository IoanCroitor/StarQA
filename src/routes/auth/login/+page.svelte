<script lang="ts">
  import type { PageData } from './$types'
  import SettingsForm from './login-form.svelte'
  import * as m from '$lib/paraglide/messages'
  export let data: PageData
</script>

<h1 class="text-4xl font-bold tracking-tight capitalize">{m.login()}</h1>
<SettingsForm data={data.form} />
