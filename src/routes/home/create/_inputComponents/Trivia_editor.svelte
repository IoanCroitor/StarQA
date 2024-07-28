<script lang="ts">
  import type { AnswerComponent } from '../types'

  export let component: AnswerComponent
  import * as RadioGroup from '$lib/components/ui/radio-group/index.js'
  import { Label } from '$lib/components/ui/label/index.js'
  import { Input } from '$lib/components/ui/input/index.js'

  let options = ['', '', '', '']

  let correct_question: string
  function removeFirstCharacter(str: string) {
    if (str.length > 0) {
      return str.substring(1)
    }
    return str
  }

  $: {
    if (correct_question) {
      // We can do this because correct_question is a string with the first character of "q" because of the `RadioGroup.Root` item wants a string not a number
      const qindex = removeFirstCharacter(correct_question) as unknown as number
      component.trivia.answer = options[qindex] as string
    }
  }

  $: component.trivia.options = options

  // $: console.log(component.trivia)
</script>

<div class="grid gap-4">
  <RadioGroup.Root bind:value={correct_question}>
    {#each options as option, index}
      <div class="flex flex-col gap-2">
        <Label for={`option-${index}`}>Option {index + 1}</Label>
        <div class=""></div>
        <div class="flex flex-row items-center gap-2">
          <RadioGroup.Item value="q{index}" id="q{index}" />
          <Input
            id={`option-${index}`}
            type="text"
            class="w-full"
            bind:value={options[index]}
            placeholder={`Enter option ${index + 1}`}
          />
        </div>
      </div>
    {/each}
  </RadioGroup.Root>
</div>
