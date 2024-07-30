<script lang="ts">
  export let src: string = 'https://via.placeholder.com/800x600'
  export let alt: string = 'Image'

  export let type: string
  type = ''
</script>

<div class="image-container overflow-hidden rounded-lg">
  <img {src} {alt} />
</div>

<style>
  .image-container {
    position: relative;
    width: 100%;
    max-width: 100%;
  }

  img {
    width: 100%;
    height: auto;
    display: block;
  }
</style>
