<!-- PlyrAudio.svelte -->
<script lang="ts">
  import {
    getSubstringAfterLastDot,
    removeTrailingSlashAsterisk,
  } from '@/utils'
  import { onMount, onDestroy } from 'svelte'

  export let src: string =
    'https://vclfhqfyjiplikdyazvq.supabase.co/storage/v1/object/public/public_quiz_uploads/quiz_files/17983428/One%20SATISFYING%20Minute%20of%20Trees%20Falling!%20(Sound%20ON!!!).mp3'
  export let type: string = 'audio/mp3'

  let player: any // Use 'any' type initially as Plyr will be loaded dynamically
  let Plyr: any // Declare Plyr variable to hold the imported module

  onMount(async () => {
    const module = await import('plyr')
    Plyr = module.default
    player = new Plyr('#plyr-audio', {
      controls: ['play', 'progress', 'current-time', 'mute', 'volume'],
    })
  })

  $: {
    type = `audio/${getSubstringAfterLastDot(removeTrailingSlashAsterisk(src))}`
    console.log(type)
  }
  onDestroy(() => {
    if (player) {
      player.destroy()
    }
  })
</script>

<svelte:head>
  <link rel="stylesheet" href="https://cdn.plyr.io/3.7.8/plyr.css" />
</svelte:head>

<!-- svelte-ignore a11y-media-has-caption -->
<div class="rounded-lg overflow-hidden">
  <audio id="plyr-audio" class="plyr" playsinline>
    <source {src} {type} />
  </audio>
</div>

<style>
  .plyr {
    width: 100%;
    height: auto;
  }
</style>
