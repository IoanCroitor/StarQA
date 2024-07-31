<script lang="ts">
  import { setLanguageTag } from '$lib/paraglide/runtime'

  let selectedLanguage: 'en' | 'ro' | 'fr' = 'en' // Default language

  function handleLanguageChange(event: Event) {
    const target = event.target as HTMLSelectElement
    const language = target.value as 'en' | 'ro' | 'fr'
    setLanguageTag(language)
    selectedLanguage = language
  }
</script>

<div class="p-2">
  <select
    bind:value={selectedLanguage}
    on:change={handleLanguageChange}
    class="bg-white border rounded p-1"
  >
    <option value="en">English</option>
    <option value="ro">Romanian</option>
    <option value="fr">French</option>
  </select>
</div>
