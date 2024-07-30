<script lang="ts">
  import type { PageData } from './$types'
  import SettingsForm from './register-form.svelte'
  export let data: PageData
  import * as m from '$lib/paraglide/messages'
</script>

<h1 class="text-4xl font-bold tracking-tight capitalize">{m.register()}</h1>
<SettingsForm data={data.form} />
