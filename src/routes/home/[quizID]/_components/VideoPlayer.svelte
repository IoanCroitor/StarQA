<!-- PlyrVideo.svelte -->
<script lang="ts">
  import {
    getSubstringAfterLastDot,
    removeTrailingSlashAsterisk,
  } from '@/utils'
  import { onMount, onDestroy } from 'svelte'

  export let src: string
  //The type will be video/mp4 or video/webm
  export let type: string
  export let alt: string

  let player: any // Use 'any' type initially as Plyr will be loaded dynamically
  let Plyr: any // Declare Plyr variable to hold the imported module

  //We dont need an alt atribute for video
  alt = ''

  onMount(async () => {
    const module = await import('plyr')
    Plyr = module.default
    player = new Plyr('#plyr-video', {
      controls: [
        'play',
        'progress',
        'current-time',
        'mute',
        'volume',
        'fullscreen',
      ],
    })
  })

  $: {
    type = `video/${getSubstringAfterLastDot(removeTrailingSlashAsterisk(src))}`
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

<h1>Hello from video</h1>
<!-- svelte-ignore a11y-media-has-caption -->
<div class="rounded-xl overflow-hidden">
  <video id="plyr-video" class="plyr" playsinline>
    <source {src} {type} />
  </video>
</div>

<style>
  .plyr {
    width: 100%;
    height: auto;
  }
</style>
