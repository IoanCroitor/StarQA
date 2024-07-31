<!-- PlyrAudio.svelte -->
<script lang="ts">
  import {
    getSubstringAfterLastDot,
    removeTrailingSlashAsterisk,
  } from '@/utils'
  import { onMount, onDestroy } from 'svelte'

  export let src: string = ''
  export let type: string = 'audio/mp3'
  export let alt: string

  let player: any // Use 'any' type initially as Plyr will be loaded dynamically
  let Plyr: any // Declare Plyr variable to hold the imported module

  // we dont need an alt atribute for audio
  alt = ''
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
<h1>Hello from audio</h1>
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
