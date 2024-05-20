<script lang="ts">
  import * as Card from '$lib/components/ui/card/index.js'
  import * as Carousel from '$lib/components/ui/carousel/index.js'

  import Trivia from '@/components/Quiz/Trivia.svelte'
  import Quiz from '@/components/Quiz/Quiz.svelte'
  import TruthFalse from '@/components/Quiz/TruthFalse.svelte'
  import ScorCurent from '@/components/Quiz/ScorCurent.svelte'
  import { writable } from 'svelte/store'
  import { GetRecordsRelated } from '@/pocketbase.js'
  import { onMount } from 'svelte'

  export let data

  // Create a writable store for questions
  export const questions = writable<any[]>([])

  async function GetData() {
    const slug = data.slug
    try {
      const data = await GetRecordsRelated('questions', slug)
      console.log(data)
      questions.set(data) // Update the store with the fetched data
    } catch (error) {
      console.log(error)
    }
  }

  onMount(GetData)

  export let precision = 0,
    answer,
    image_url,
    details,
    min,
    max,
    value,
    question,
    options

  export const questionTypeStore = writable<string>('trivia')
  //  'trivia' || 'quiz' || 'truthfalse'
</script>

<div class="flex flex-col items-center justify-center relative">
  <ScorCurent />
  <Carousel.Root class="w-full max-w-xs md:max-w-lg 2xl:max-w-xl">
    <Carousel.Content>
      {#each $questions as q}
        <!-- Use the store value with $questions -->
        <Carousel.Item>
          <div class="p-1">
            <Card.Root>
              <Card.Content
                class="flex aspect-square items-center justify-center p-6"
              >
                {#if q.type === 'trivia'}
                  <Trivia
                    answer={Number(q.response_options.response)}
                    options={q.response_options.options}
                    source={`https://starqa.pockethost.io/api/files/questions/${q.id}/${q.image}`}
                    detalii={q.description}
                    intrebare={q.question}
                  />
                {:else if q.type === 'quiz'}
                  <Quiz
                    title="Selecteaza corect"
                    question={q.question}
                    answer={q.response_options.response}
                    details={q.description}
                    min={Number(q.min)}
                    max={Number(q.max)}
                    value={Number(q.value)}
                    {precision}
                  />
                {:else if q.type === 'truthfalse'}
                  <TruthFalse
                    answer={Number(q.response_options.response)}
                    source={`https://starqa.pockethost.io/api/files/quizzes/${q.id}/${q.image}`}
                    detalii={q.description}
                    intrebare={q.question}
                  />
                {/if}
              </Card.Content>
            </Card.Root>
          </div>
        </Carousel.Item>
      {/each}
    </Carousel.Content>
    <Carousel.Previous />
    <Carousel.Next />
  </Carousel.Root>
</div>
