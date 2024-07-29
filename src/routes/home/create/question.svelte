<script lang="ts">
  import * as Card from '$lib/components/ui/card/index.js'
  import { Input } from '$lib/components/ui/input/index.js'
  import { Label } from '$lib/components/ui/label/index.js'
  import Icon from '@iconify/svelte'
  import * as Select from '$lib/components/ui/select/index.js'
  import 'carta-md/default.css' /* Default theme */
  import MarkdownWysiwyg from './MarkdownWYSIWYG.svelte'
  import * as ToggleGroup from '$lib/components/ui/toggle-group/index.js'
  import TruthFalseEditor from './_inputComponents/TruthFalse_editor.svelte'
  import TriviaEditor from './_inputComponents/Trivia_editor.svelte'
  import SliderEditor from './_inputComponents/Slider_editor.svelte'
  import { createEventDispatcher } from 'svelte'
  import type {
    MediaType,
    QuestionChildrenData,
    QuestionComponent,
  } from './types'
  import { getAcceptType } from '@/utils'

  export let index: number

  let question_childern_data: QuestionChildrenData = {
    question_answer: '',
    slider: {
      minValue: '0',
      maxValue: '100',
      desiredValue: '50',
    },
    truth_or_false: {
      truth: '',
      false: '',
    },
    trivia: {
      options: ['', '', '', ''],
      answer: '',
    },
  }
  const answers_type = [
    {
      value: 'truth_false',
      label: 'Truth or False',
      component: TruthFalseEditor,
    },
    {
      value: 'trivia',
      label: 'Trivia (4 options)',
      component: TriviaEditor,
    },
    {
      value: 'slider',
      label: 'Slider',
      component: SliderEditor,
    },
  ]
  // Default selection for answer
  let answer_type = {
    value: 'truth_false',
    label: 'Truth or False',
  }

  let title = ''
  let file: File | undefined = undefined
  let description = ''
  let description_upload: MediaType | undefined = undefined
  let description_upload_type = ''

  const question_data: QuestionComponent = {
    response_options_values: [],
    response_option_corect: '',
    response_option_type: '',
    title,
    description,
    description_upload,
    file,
    file_type: '',
  }
  // Updating data to parent, depricated in svelte 5
  const dispatch = createEventDispatcher()

  function handleFileChange(event: Event) {
    const input = event.target as HTMLInputElement
    if (input.files && input.files.length > 0) {
      file = input.files[0]
      sendDataToParent()
    }
  }

  $: {
    if (description_upload) {
      description_upload_type = getAcceptType(description_upload)
    }
  }

  function sendDataToParent() {
    dispatch('update', question_data)
    // DBG: debugging
    // console.log('Data sent to parent: ', question_data)
  }

  $: {
    question_data.response_option_type = answer_type.value
    question_data.response_options_values = response_options_values
    question_data.response_option_corect = response_option_corect
    question_data.file_type = description_upload_type
    question_data.title = title
    question_data.description = description
    question_data.description_upload = description_upload
    ;(question_data.file = file), sendDataToParent()
  }

  function getComponentByType(action_type: string) {
    // Find the entry with the matching value in the answers_type array
    const found = answers_type.find((answer) => answer.value === action_type)
    // Return the component if found, otherwise return null or a default value
    return found ? found.component : null
  }

  // Answer Component is initialized with null so it isn't shown until update
  let answer_component: any = null
  $: answer_component = getComponentByType(answer_type.value)

  let response_options_values: string[]
  let response_option_corect: string

  $: {
    // store the correct answer

    switch (answer_type.value) {
      case 'truth_false':
        question_childern_data.question_answer =
          question_childern_data.truth_or_false.truth

        response_options_values = [question_childern_data.truth_or_false.false]
        break
      case 'trivia':
        question_childern_data.question_answer =
          question_childern_data.trivia.answer

        response_options_values = question_childern_data.trivia.options
        break
      case 'slider':
        question_childern_data.question_answer = question_childern_data.slider
          .desiredValue as unknown as string
        response_options_values = [
          question_childern_data.slider.minValue as unknown as string,
          question_childern_data.slider.maxValue as unknown as string,
        ]
        break
      default:
        question_childern_data.question_answer = ''
        response_options_values = []
        break
    }
    response_option_corect = question_childern_data.question_answer
  }

  // DBG debugging
  // $: console.log(description_upload)
  // $: console.log(question_childern_data)
  $: console.log(question_data)
</script>

<Card.Root>
  <Card.Header>
    <div class="flex flex-row justify-between">
      <div class="bg-primary-foreground rounded-lg p-2 w-fit">
        <Card.Title>Question {index + 1}</Card.Title>
      </div>
    </div>
  </Card.Header>
  <!-- Question Name -->
  <Card.Content>
    <div class="grid gap-6">
      <div class="grid gap-3">
        <Label for="name">Name</Label>
        <Input
          id="name"
          type="text"
          class="w-full"
          placeholder="Enter your question title"
          bind:value={title}
        />
      </div>
      <div class="grid gap-3 z-10">
        <Label for="description">Description</Label>
        <MarkdownWysiwyg bind:value={description} />
      </div>
    </div>
    <!-- Media upload -->
    <div class="flex flex-col pt-4 gap-3">
      <Label for="Toggle group">Additional media</Label>
      <ToggleGroup.Root
        bind:value={description_upload}
        size="lg"
        type="single"
        variant="outline"
      >
        <ToggleGroup.Item value="music" aria-label="Toggle music">
          <Icon icon="mdi:music-note" width="1.2rem" height="1.2rem" />
          Music
        </ToggleGroup.Item>
        <ToggleGroup.Item value="video" aria-label="Toggle video">
          <Icon icon="mdi:video" width="1.2rem" height="1.2rem" />Video
        </ToggleGroup.Item>
        <ToggleGroup.Item value="model" aria-label="Toggle 3D model">
          <Icon icon="mdi:video-3d" width="1.2rem" height="1.2rem" />CG Model
        </ToggleGroup.Item>
        <ToggleGroup.Item value="image" aria-label="Toggle image">
          <Icon icon="mdi:image" width="1.2rem" height="1.2rem" />Image
        </ToggleGroup.Item>
      </ToggleGroup.Root>
      <div
        class="mx-auto max-w-xs p-4 rounded-lg outline-dashed outline-2 outline-muted-foreground my-2"
      >
        <label
          for="example1"
          class="mb-1 block text-sm font-medium text-muted-foreground/80"
          >Upload {description_upload ? `${description_upload}` : ``} file</label
        >
        <input
          id="example1"
          type="file"
          class="mt-2 block w-full text-secondary-foreground file:text-primary/90 file:hover:text-primary text-sm file:mr-4 file:rounded-md file:border-0 file:bg-primary-foreground file:py-2 file:px-4 file:text-sm file:font-semibold file:text-white hover:file:bg-muted transition-colors focus:outline-none disabled:pointer-events-none disabled:opacity-60"
          on:change={handleFileChange}
          accept={description_upload_type}
        />
      </div>
    </div>
    <!-- Answer -->
    <div class="flex flex-col gap-3">
      <Label for="Answer">Answer</Label>
      <Select.Root bind:selected={answer_type}>
        <Select.Trigger class="w-[180px]">
          <Select.Value placeholder="Select an answer type" />
        </Select.Trigger>
        <Select.Content>
          <Select.Group>
            <Select.Label>Answer type</Select.Label>
            {#each answers_type as answer}
              <Select.Item value={answer.value} label={answer.label}
                >{answer.label}</Select.Item
              >
            {/each}
          </Select.Group>
        </Select.Content>
        <Select.Input name="answer_type" />
      </Select.Root>
    </div>
    {#if answer_component}
      <div class="p-4 border border-muted rounded-lg mt-2">
        <svelte:component
          this={answer_component}
          bind:component={question_childern_data}
        />
      </div>
    {/if}
  </Card.Content>
</Card.Root>
