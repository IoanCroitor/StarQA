<script lang="ts">
  import type { AnswerComponent } from '../types'
  import * as RadioGroup from '$lib/components/ui/radio-group/index.js'
  import { Label } from '$lib/components/ui/label/index.js'
  import { Input } from '$lib/components/ui/input/index.js'

  export let component: AnswerComponent

  let options = ['', '']
  let correct_answer: string = ''

  $: {
    if (correct_answer !== null) {
      const tindex = Number(correct_answer)
      if (tindex >= 0 && tindex < options.length) {
        const truthy = options[tindex]
        component.truth_or_false.truth = String(truthy)

        const findex = tindex === 1 ? 0 : 1
        const falsey = options[findex]
        component.truth_or_false.false = String(falsey)
      } else {
        component.truth_or_false.truth = ''
        component.truth_or_false.false = ''
      }
    }
  }
</script>

<RadioGroup.Root bind:value={correct_answer}>
  <div class="flex flex-col gap-2">
    <Label for={`option-1`}>Option 1</Label>
    <div class="flex flex-row items-center gap-2">
      <RadioGroup.Item value="0" id="0" />
      <Input
        id={`option-1`}
        type="text"
        class="w-full"
        bind:value={options[0]}
        placeholder={`Enter option 1`}
      />
    </div>
    <Label for={`option-2`}>Option 2</Label>
    <div class="flex flex-row items-center gap-2">
      <RadioGroup.Item value="1" id="1" />
      <Input
        id={`option-2`}
        type="text"
        class="w-full"
        bind:value={options[1]}
        placeholder={`Enter option 2`}
      />
    </div>
  </div>
</RadioGroup.Root>
