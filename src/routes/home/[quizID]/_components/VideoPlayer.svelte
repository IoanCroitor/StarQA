<!-- PlyrVideo.svelte -->
<script lang="ts">
  import { onMount, onDestroy } from 'svelte'

  export let src: string =
    'https://vclfhqfyjiplikdyazvq.supabase.co/storage/v1/object/public/public_quiz_uploads/quiz_files/23783779/m2-res_4asDCA80p.mp4'
  export let type: string = 'video/mp4'

  let player: any // Use 'any' type initially as Plyr will be loaded dynamically
  let Plyr: any // Declare Plyr variable to hold the imported module

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
