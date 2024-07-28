<script lang="ts">
  import type { AnswerComponent } from '../types'

  export let component: AnswerComponent

  import { Input } from '$lib/components/ui/input/index.js'
  import { Label } from '$lib/components/ui/label/index.js'

  let minValue = 0
  let maxValue = 100
  let desiredValue = 50

  $: component.slider.minValue = minValue
  $: component.slider.maxValue = maxValue
  $: component.slider.desiredValue = desiredValue
</script>

<div class="flex flex-col gap-2 mb-3">
  <Label for="min-value">Desired Value</Label>
  <Input
    id="min-value"
    type="number"
    class="w-full"
    bind:value={desiredValue}
    placeholder="Enter desired value"
  />
</div>

<div class="flex flex-row gap-4">
  <div class="flex flex-col gap-2">
    <Label for="min-value">Minimum Value</Label>
    <Input
      id="min-value"
      type="number"
      class="w-full"
      bind:value={minValue}
      placeholder="Enter minimum value"
    />
  </div>
  <div class="flex flex-col gap-2">
    <Label for="max-value">Maximum Value</Label>
    <Input
      id="max-value"
      type="number"
      class="w-full"
      bind:value={maxValue}
      placeholder="Enter maximum value"
    />
  </div>
</div>
