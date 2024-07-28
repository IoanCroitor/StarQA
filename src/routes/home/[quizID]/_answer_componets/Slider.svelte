<script lang="ts">
  import { Slider } from '$lib/components/ui/slider/index.js'
  import Button from '@/components/ui/button/button.svelte'

  export let options: string[]

  const minValue = Number(options[0])
  const maxValue = Number(options[1])
  let response: string

  let startingValue = (maxValue - minValue) / 2
  let slider_value = [startingValue]

  $: {
    if (slider_value[0]) response = slider_value[0].toString()
    else response = startingValue.toString()
  }

  function handleClick() {
    console.log(slider_value[0])
  }
</script>

<div class="flex flex-col p-6 border border-muted rounded-lg">
  <h2 class="mx-auto text-6xl font-bold pb-4">{response}</h2>
  <div class="flex gap-2 justify-between content-center">
    <p class="text-lg">{startingValue}</p>
    <Slider
      bind:value={slider_value}
      min={minValue}
      max={maxValue}
      step={1}
      class="max-w-full"
    />
    <p class=" text-lg">{maxValue}</p>
  </div>
  <Button class="my-2 w-min mx-auto" on:click={handleClick}>Submit</Button>
</div>
