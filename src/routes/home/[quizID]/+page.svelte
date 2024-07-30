<script lang="ts">
  import QuestionRender from './QuestionRender.svelte'
  import { onMount } from 'svelte'

  import * as Card from '$lib/components/ui/card/index'
  import { page } from '$app/stores'
  import { handleToast } from '@/handleToast'
  import { getQuestionArrayByQuizId, getQuizUUID } from './questionQuerryUtils'
  import type { QuizQuestion } from './types'

  let popup = false
  export let data
  let question_array: QuizQuestion[] = []
  let currentQuestionIndex = 0
  let quizId: number = Number(
    $page.url.pathname.split('/').filter(Boolean).pop(),
  )
  let question: QuizQuestion | undefined

  // Object to store responses with question indexes as keys
  let responses: { [key: number]: string } = {}

  const { supabase } = data

  onMount(async () => {
    try {
      const { error } = await getQuestionArrayByQuizId(
        quizId,
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
      // Perform any action with the responses, e.g., send them to a server
      uploadResponsesAndFetchCorrectAnswers()
      getCorectAnswers()
      popup = true
    }
  }

  async function uploadResponsesAndFetchCorrectAnswers() {
    try {
      const userId = data?.user?.id 

      // Upload responses to user_responses table
      for (const [questionIndex, userAnswer] of Object.entries(responses)) {
        const questionIndexNum = parseInt(questionIndex)
        const questionId = question_array[questionIndexNum]!.id
        // Assuming you don't have answerId, set it to null or appropriate value

        const { error } = await supabase.from('user_responses').insert([
          {
            user_id: userId,
            question_id: questionId,
            user_answer: userAnswer,
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

  let correctAnswers: any
  let userResponses: any
  async function getCorectAnswers() {
    try {
      // Get the quizId from the URL
      quizId = Number($page.url.pathname.split('/').pop())

      const quizuuid = await getQuizUUID(quizId, supabase)

      // Fetch correct answers and user responses
      const [correctAnswersData, userResponsesData] = await Promise.all([
        supabase
          .from('quiz_answers')
          .select('quiz_question_id, answer')
          .eq('quiz_id', quizuuid),
        supabase.from('user_responses').select('question_id, user_answer'),
      ])

      if (correctAnswersData.error) {
        throw new Error(correctAnswersData.error.message)
      }
      if (userResponsesData.error) {
        throw new Error(userResponsesData.error.message)
      }

      correctAnswers = correctAnswersData.data
      userResponses = userResponsesData.data

      // Compare answers and calculate score
      calculateScore()
    } catch (error) {
      console.error('Failed to fetch results:', error)
    }
  }

  let score = 0
  function calculateScore() {
    // Logic to calculate score

    correctAnswers.forEach((correctAnswer: any) => {
      const userAnswer = userResponses.find(
        (response:any) => response.question_id === correctAnswer.quiz_question_id,
      )
      if (userAnswer && userAnswer.user_answer === correctAnswer.answer) {
        score++
      }
    })
  }

  // $: console.log('score', score)
  // $: console.log('quizId:', quizId) // Debug logging of quizId
  // $: console.log(responses) // Debug logging of responses object
</script>

{#if popup}
  <Card.Root>
    <Card.Header class="border-b">
      <Card.Title class="bg-secondary p-2 rounded-lg w-min">Results:</Card.Title
      >
    </Card.Header>
    <Card.Content>
      <h1 class="pt-3">Score: {score}</h1>
    </Card.Content>
  </Card.Root>
{:else}
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
{/if}
