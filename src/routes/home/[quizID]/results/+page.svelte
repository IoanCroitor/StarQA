<script lang="ts">
  import * as Table from '$lib/components/ui/table/index.js'
  import { page } from '$app/stores'
  import {
    getQuestionArrayByQuizCode,
    getQuizUUID,
  } from '$lib/questionQuerryUtils'
  import type { QuizResponse, UserResponse } from '../types'
  import { handleToast } from '@/handleToast'
  import Spinner from '@/assets/Spinner.svelte'
  let quiz_code: number

  let question_array: any
  let quizuuid: string
  let userResponses: UserResponse[] = []
  let correctAnswers: QuizResponse[] = []
  export let data

  const { supabase, user } = data

  let user_id = user?.id

  async function getCorectAnswers() {
    try {
      // Get the quiz_code from the URL
      quiz_code = Number($page.url.pathname.split('/')[2])

      quizuuid = await getQuizUUID(quiz_code, supabase)

      console.log(quizuuid)

      // Fetch correct answers and user responses
      const [correctAnswersData, userResponsesData] = await Promise.all([
        supabase
          .from('quiz_answers')
          .select('quiz_question_id, answer')
          .eq('quiz_id', quizuuid),
        supabase
          .from('user_responses')
          .select('question_id, user_answer')
          .eq('user_id', user_id)
          .eq('quiz_id', quizuuid),
      ])

      if (correctAnswersData.error) {
        throw new Error(correctAnswersData.error.message)
      }
      if (userResponsesData.error) {
        throw new Error(userResponsesData.error.message)
      }

      correctAnswers = correctAnswersData.data
      userResponses = userResponsesData.data
      console.log(correctAnswers, userResponses)
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
        (response: any) =>
          response.question_id === correctAnswer.quiz_question_id,
      )
      if (userAnswer && userAnswer.user_answer === correctAnswer.answer) {
        score++
      }
    })
  }

  async function getQuestionArray() {
    try {
      const { error } = await getQuestionArrayByQuizCode(
        quiz_code,
        supabase,
      ).then((res) => (question_array = res))
      if (error) {
        throw new Error(error?.message)
      }
    } catch (error) {
      handleToast('error', 400, 'Failed to load questions: ' + error)
    }
  }

  async function updateUserScore(user_id: any, score: number) {
    console.log('passed userid', user_id)
    let { data, error } = await supabase.rpc('update_user_score', {
      p_user_id: user_id,
      p_increment_value: score,
    })
    if (error)
      handleToast('error', 400, 'Failed to update score: ' + error.message)
  }
  getCorectAnswers()
  getQuestionArray()

  $: updateUserScore(user_id, score)
</script>

<div
  class="my-2 bg-muted-foreground/30 px-2 py-1 w-fit rounded-lg flex flex-row"
>
  <h1 class="text-primary text-lg">Results:</h1>
</div>

<div class="p-4 rounded-lg border">
  {#if question_array && correctAnswers.length > 0 && userResponses.length > 0}
    <p class="px-2 py-2">
      You answered corectly to {score} out of {correctAnswers.length} questions
    </p>

    <div class="">
      <Table.Root>
        <Table.Caption>A list of your answered questions</Table.Caption>
        <Table.Header>
          <Table.Row>
            <Table.Head class="w-[100px]">Question</Table.Head>
            <Table.Head>Answer</Table.Head>
            <Table.Head>Your answer</Table.Head>
            <Table.Head class="text-right">Points gained</Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {#each question_array as question, _i}
            <Table.Row>
              <Table.Cell class="font-medium"
                >{_i + 1}. {question.title}</Table.Cell
              >
              <Table.Cell>{correctAnswers[_i]?.answer}</Table.Cell>
              <Table.Cell>{userResponses[_i]?.user_answer}</Table.Cell>
              <Table.Cell class="text-right"
                >{correctAnswers[_i]?.answer === userResponses[_i]?.user_answer
                  ? 1
                  : 0}</Table.Cell
              >
            </Table.Row>
          {/each}
        </Table.Body>
      </Table.Root>
    </div>
  {:else}
    <Spinner />
  {/if}
</div>
