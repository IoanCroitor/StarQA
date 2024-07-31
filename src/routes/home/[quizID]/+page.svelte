<script lang="ts">
  import QuestionRender from './QuestionRender.svelte'
  import { onMount } from 'svelte'

  import * as Card from '$lib/components/ui/card/index'
  import { page } from '$app/stores'
  import { handleToast } from '@/handleToast'
  import {
    getQuestionArrayByQuizCode,
    getQuizUUID,
  } from '$lib/questionQuerryUtils'
  import type { QuizQuestion } from './types'
  import { goto } from '$app/navigation'
  export let data
  let question_array: QuizQuestion[] = []
  let currentQuestionIndex = 0
  let quiz_code: number = Number(
    $page.url.pathname.split('/').filter(Boolean).pop(),
  )
  let question: QuizQuestion | undefined
  // Object to store responses with question indexes as keys
  let responses: { [key: number]: string } = {}
  let quizuuid: string

  const { supabase } = data

  onMount(async () => {
    try {
      quizuuid = await getQuizUUID(quiz_code, supabase)
      const { error } = await getQuestionArrayByQuizCode(
        quiz_code,
        supabase,
      ).then((res) => (question_array = res))
      if (error) {
        throw new Error(error?.message)
      }

      question = question_array[currentQuestionIndex]
    } catch (error) {
      handleToast('error', 400, 'Failed to load questions: ' + error)
    }
  })

  function handleResponseSelected(event: CustomEvent<{ response: string }>) {
    const { response } = event.detail
    console.log('Selected response:', response)

    // Store the response in the responses object with the current question index
    responses[currentQuestionIndex] = response

    // Advance to the next question
    if (currentQuestionIndex < question_array.length - 1) {
      currentQuestionIndex++
      question = question_array[currentQuestionIndex]
    } else {
      handleToast('success', 200, 'Quiz completed')
      console.log('All Responses:', responses)

      uploadResponses()
      goto(`/home/${quiz_code}/results`)
    }
  }

  async function uploadResponses() {
    try {
      const userId = data?.user?.id

      // Upload responses to user_responses table
      for (const [questionIndex, userAnswer] of Object.entries(responses)) {
        const questionIndexNum = parseInt(questionIndex)
        const questionId = question_array[questionIndexNum]!.id

        const { error } = await supabase.from('user_responses').insert([
          {
            user_id: userId,
            question_id: questionId,
            user_answer: userAnswer,
            quiz_id: quizuuid,
          },
        ])

        if (error) {
          throw new Error(error.message)
        }
      }
    } catch (error) {
      handleToast('error', 400, 'Failed to upload responses: ' + error)
    }
  }

  // $: console.log('quiz_code:', quiz_code) // Debug logging of quiz_code
  // $: console.log(responses) // Debug logging of responses object
</script>

<div class="py-2">
  <Card.Root>
    <Card.Header class="border-b">
      <div class="flex flex-row gap-2 items-center">
        <Card.Title class="bg-secondary p-2 rounded-lg">
          Question {currentQuestionIndex + 1}
        </Card.Title>
        <Card.Description class="text-muted-foreground/50">
          Carefully read the description and answer the question.
        </Card.Description>
      </div>
    </Card.Header>
    <Card.Content>
      {#if question}
        <QuestionRender
          {question}
          on:responseSelected={handleResponseSelected}
        />
      {:else}
        <p class="text-primary">Loading question...</p>
      {/if}
    </Card.Content>
  </Card.Root>
</div>
