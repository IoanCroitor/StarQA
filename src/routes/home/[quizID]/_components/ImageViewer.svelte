<script lang="ts">
  export let src: string = ''
  export let alt: string = 'Image'

  export let type: string
  type = ''
</script>

<h1>Hello from image</h1>
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
