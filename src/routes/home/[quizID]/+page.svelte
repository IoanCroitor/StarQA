<script lang="ts">
  import QuestionRender from './QuestionRender.svelte'
  import { onMount } from 'svelte'
  import { Progress } from '$lib/components/ui/progress/index.js'
  import { Button } from '$lib/components/ui/button/index'
  import * as Card from '$lib/components/ui/card/index'
  import Icon from '@iconify/svelte'
  import { page } from '$app/stores'
  import { handleToast } from '@/handleToast'
  import { getQuestionArrayByQuizId } from './questionQuesrryUtils'
  import type { QuizQuestion } from './types'

  export let data
  let question_array: QuizQuestion[]
  let quizId: number
  $: quizId = Number($page.url.pathname.split('/').filter(Boolean).pop())

  const { supabase } = data

  onMount(async () => {
    getQuestionArrayByQuizId(quizId, supabase).then((data) => {
      question_array = data
    })
  })

  $: console.log(question_array)
</script>

<div class="py-2">
  <Card.Root>
    <Card.Header class="border-b">
      <div class="flex flex-row gap-2 items-center">
        <Card.Title class="bg-secondary p-2 rounded-lg">Queston 1</Card.Title>
        <Card.Description class="text-muted-foreground/50">
          Carefully read the description and answer the question.
        </Card.Description>
      </div>
    </Card.Header>
    <Card.Content>
      <QuestionRender />
    </Card.Content>
    <Card.Footer class="border-t px-6 flex flex-row justify-between pt-6">
      <Button variant="secondary" disabled>
        <Icon icon="mdi:chevron-left" />
        Previous
      </Button>
      <Button variant="secondary"
        >Next
        <Icon icon="mdi:chevron-right" />
      </Button>
    </Card.Footer>
  </Card.Root>
</div>
