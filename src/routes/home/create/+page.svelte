<script lang="ts">
  import Question from './Question.svelte'
  import * as Card from '$lib/components/ui/card/index'
  import { Input } from '$lib/components/ui/input/index'
  import { Label } from '$lib/components/ui/label/index'
  import Textarea from '@/components/ui/textarea/textarea.svelte'
  import { generate8DigitCode, splitBySpaces } from '@/utils'
  import { Badge } from '@/components/ui/badge'
  import type { QuestionComponentInterface } from './types'
  import Icon from '@iconify/svelte'
  import Button from '@/components/ui/button/button.svelte'

  import { saveQuiz } from './supabaseOperations'
  import Spinner from '@/assets/Spinner.svelte'
  import { goto } from '$app/navigation'

  export let data

  const { supabase, user } = data
  const user_id = user?.id as string

  let quiz_title = ''
  let quiz_description = ''
  let quiz_code = generate8DigitCode()
  let quiz_tags = ''

  let quiz_tags_array: string[] = []
  let quiz_cover_picture: File | undefined = undefined
  $: quiz_tags_array = splitBySpaces(quiz_tags)

  function handleFileChange(event: Event) {
    const input = event.target as HTMLInputElement
    if (input.files && input.files.length > 0) {
      quiz_cover_picture = input.files[0]
    }
  }

  let questions: QuestionComponentInterface[] = []

  function updateQuestion(index: number, data: QuestionComponentInterface) {
    questions[index] = data
    // DBG debug
    // console.log('Deleted question:', index, 'index', questions)
    // console.log('Updated Questions:', index, 'index', questions)
  }

  function deleteQuestion(index: number) {
    questions = questions.filter((_, i) => i !== index)
    // DBG debug
    // console.log('Deleted question:', index, 'index', questions)
  }

  let uploading = false
  // SUPABASE BUSINESS LOGIC
  async function publishQuiz() {
    uploading = true
    await saveQuiz(
      quiz_title,
      quiz_description,
      quiz_code,
      quiz_tags_array,
      quiz_cover_picture,
      questions,
      user_id,
      supabase,
    ).then(() => {
      uploading = false

      goto('/hello')
    })
  }
</script>

<div class="py-6 gap-2">
  <h1 class="text-3xl md:font-4xl font-semibold text-primary">
    StarQA question editor
  </h1>
  <p class="text-muted-foreground">This is where the magic happens</p>
</div>

<div class="grid gap-3 transition-all duration-150">
  <Card.Root>
    <Card.Header>
      <div class="flex flex-row justify-between">
        <div class="bg-primary-foreground rounded-lg p-2 w-fit">
          <Card.Title>Quiz details:</Card.Title>
        </div>
        <div class="bg-primary rounded-lg p-2 w-fit">
          <Card.Title class="text-primary-foreground"
            >Quiz code: {quiz_code}</Card.Title
          >
        </div>
      </div>
    </Card.Header>
    <!-- Quiz name -->
    <Card.Content>
      <div class="grid gap-6">
        <div class="flex flex-row items-center gap-3">
          <Label for="name">Name:</Label>
          <Input
            id="name"
            type="text"
            class="w-full"
            placeholder="Enter your quiz name"
            bind:value={quiz_title}
          />
        </div>
        <!-- Quiz description -->
        <div class="grid gap-3">
          <Label for="name">Description:</Label>
          <Textarea
            id="description"
            class="w-full"
            placeholder="Enter a quiz description"
            bind:value={quiz_description}
          />
        </div>
        <!-- Quiz tags -->
        <div class="grid gap-3">
          <div class="flex flex-row items-center h-5 gap-1">
            <Label for="name">Tags:</Label>
            {#if quiz_tags_array.length > 0}
              {#each quiz_tags_array as tag}
                <Badge variant="secondary">{tag}</Badge>
              {/each}
            {/if}
          </div>
          <Input
            id="tags"
            type="text"
            class="w-full"
            placeholder="Enter tags separated by spaces"
            bind:value={quiz_tags}
          />
        </div>
        <div class="grid gap-3">
          <div class="grid w-full max-w-sm items-center gap-1.5">
            <Label for="picture">Cover image:</Label>
            <Input
              id="picture"
              class="file:bg-primary-foreground file:text-primary file:p-1 file:rounded-lg "
              type="file"
              accept="image/*"
              on:change={handleFileChange}
            />
          </div>
        </div>
      </div>
    </Card.Content>
  </Card.Root>

  {#each questions as _, index}
    <div class="relative">
      <Question {index} on:update={(e) => updateQuestion(index, e.detail)} />
      <button
        class="absolute top-0 right-0 p-2 bg-red-500/90 hover:bg-destructive text-white rounded"
        on:click={() => deleteQuestion(index)}
      >
        <Icon icon="mdi:delete" width="1.2rem" height="1.2rem" />
      </button>
    </div>
  {/each}

  <div class="w-full flex flex-row justify-between mt-2 mb-24">
    <!-- Button to add a new question -->
    <Button
      class="w-min font-semibold"
      on:click={() =>
        (questions = [
          ...questions,
          {
            response_options_values: [''],
            response_option_corect: '',
            response_option_type: '',
            title: '',
            description: '',
            description_upload: '',
            file: undefined,
            file_type: undefined,
          },
        ])}
    >
      <Icon icon="mdi:plus" width="1.2rem" height="1.2rem" />
      Add Question
    </Button>
    <Button
      disabled={uploading}
      class="bg-violet-600 hover:bg-violet-700 font-semibold text-primary"
      on:click={publishQuiz}
    >
      {#if uploading}
        <Spinner />
      {:else}
        <Icon icon="mdi:publish" width="1.2rem" height="1.2rem" />
        Publish
      {/if}
    </Button>
  </div>
</div>
