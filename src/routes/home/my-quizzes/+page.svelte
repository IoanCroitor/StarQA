<script lang="ts">
  import { PUBLIC_BUCKET_PATH } from '$env/static/public'
  import { Button } from '$lib/components/ui/button/index.js'
  import * as Card from '$lib/components/ui/card/index.js'
  import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js'
  import * as Table from '$lib/components/ui/table/index.js'
  import { Input } from '$lib/components/ui/input/index.js'
  import { handleToast } from '@/handleToast.js'
  import Icon from '@iconify/svelte'
  import { getQuizUUID } from '$lib/questionQuerryUtils'
  import Spinner from '$lib/assets/Spinner.svelte'
  import * as ExcelJS from 'exceljs'
  import { formatDate } from '@/utils.js'

  export let data
  const { supabase, user } = data

  let quizzes: Array<any> = []
  let results: Array<any> = []
  let quiz_code: number
  let quiz_id: string
  let showResults = false
  let resultsLoading = false
  async function getMyQuizzes() {
    const userid: string = user!.id
    const { data: fetchedQuizzes, error } = await supabase
      .from('quizzes')
      .select('*')
      .eq('created_by', userid)

    if (error) {
      console.log('Error getting my quizzes', error)
    } else {
      quizzes = fetchedQuizzes
    }
  }

  getMyQuizzes()

  async function deleteQuiz(id: string) {
    const { error } = await supabase.from('quizzes').delete().eq('id', id)

    if (error) {
      console.error('Error deleting quiz:', error)
      handleToast('error', 400, 'Failed to delete quiz: ' + error.message)
    } else {
      quizzes = quizzes.filter((quiz) => quiz.id !== id)
      handleToast('success', 200, 'Quiz deleted successfully')
    }
  }

  async function getUserQuizResults(userId: string, quizId: string) {
    const { data, error } = await supabase
      .from('user_quiz_results')
      .select('*')
      .eq('user_id', userId)
      .eq('quiz_id', quizId)

    if (error) {
      handleToast('error', 400, 'Failed to get quiz results: ' + error.message)
    } else {
      results = data
      console.log('Quiz results:', data)
    }
  }

  async function searchQuizByCode() {
    resultsLoading = true
    quiz_id = await getQuizUUID(quiz_code, supabase)
    await getUserQuizResults(user!.id, quiz_id)
    resultsLoading = false
    showResults = true
  }

  async function exportToExcel() {
    const workbook = new ExcelJS.Workbook()
    const worksheet = workbook.addWorksheet('Quiz Results')

    worksheet.columns = [
      { header: 'Question Title', key: 'question_title' },
      { header: 'Username', key: 'username' },
      { header: 'User Answer', key: 'user_answer' },
      { header: 'Correct Answer', key: 'correct_answer' },
      { header: 'Response Status', key: 'response_status' },
    ]

    results.forEach((result) => {
      worksheet.addRow({
        question_title: result.question_title,
        username: result.username,
        user_answer: result.user_answer,
        correct_answer: result.correct_answer,
        response_status: result.response_status,
        date_modified: formatDate(result.date_modified),
      })
    })

    const buffer = await workbook.xlsx.writeBuffer()
    const blob = new Blob([buffer], { type: 'application/octet-stream' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'quiz_results.xlsx'
    a.click()
    window.URL.revokeObjectURL(url)
  }
</script>

<div class="my-3">
  <Card.Root>
    <Card.Header>
      <Card.Title>My Quizzes</Card.Title>
      <Card.Description>View details about your quizzes</Card.Description>
    </Card.Header>
    <Card.Content>
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.Head class="hidden w-[100px] sm:table-cell">
              <span class="sr-only">Image</span>
            </Table.Head>
            <Table.Head>Name</Table.Head>
            <Table.Head>Join Code</Table.Head>
            <Table.Head>Description</Table.Head>
            <Table.Head class="hidden md:table-cell">Created at</Table.Head>
            <Table.Head>
              <span class="sr-only">Actions</span>
            </Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {#each quizzes as { id, thumbnail_url_path, quiz_name, join_code, description, created_at }}
            <Table.Row>
              <Table.Cell class="hidden sm:table-cell">
                <img
                  alt="Quiz Thumbnail"
                  class="aspect-square rounded-md object-cover"
                  height="64"
                  src={thumbnail_url_path
                    ? `${PUBLIC_BUCKET_PATH}${thumbnail_url_path}`
                    : 'https://upload.wikimedia.org/wikipedia/commons/3/3f/Placeholder_view_vector.svg'}
                  width="64"
                />
              </Table.Cell>
              <Table.Cell class="font-medium">{quiz_name}</Table.Cell>
              <Table.Cell>{join_code}</Table.Cell>
              <Table.Cell>{description}</Table.Cell>
              <Table.Cell class="hidden md:table-cell">
                {formatDate(created_at)}
              </Table.Cell>
              <Table.Cell>
                <DropdownMenu.Root>
                  <DropdownMenu.Trigger asChild let:builder>
                    <Button
                      aria-haspopup="true"
                      size="icon"
                      variant="outline"
                      builders={[builder]}
                    >
                      <Icon
                        icon="mdi:dots-vertical"
                        width="1.2rem"
                        height="1.2rem"
                      />
                      <span class="sr-only">Toggle menu</span>
                    </Button>
                  </DropdownMenu.Trigger>
                  <DropdownMenu.Content align="end">
                    <DropdownMenu.Label>Actions</DropdownMenu.Label>
                    <DropdownMenu.Item on:click={() => deleteQuiz(id)}
                      >Delete</DropdownMenu.Item
                    >
                  </DropdownMenu.Content>
                </DropdownMenu.Root>
              </Table.Cell>
            </Table.Row>
          {/each}
        </Table.Body>
      </Table.Root>
    </Card.Content>
    <Card.Footer>
      <div class="text-muted-foreground text-xs">
        Showing <strong>1-{quizzes.length}</strong> of
        <strong>{quizzes.length}</strong> quizzes
      </div>
    </Card.Footer>
  </Card.Root>
</div>

<Card.Root>
  <Card.Header>
    <Card.Title>View submissions from your quizzes</Card.Title>
    <Card.Description>
      <div class="flex w-full max-w-sm items-center space-x-2 my-3">
        <Input
          bind:value={quiz_code}
          type="number"
          class="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          placeholder="Quiz Code"
        />
        <Button disabled={resultsLoading} on:click={() => searchQuizByCode()}>
          {#if resultsLoading}<Spinner />{:else}Search{/if}</Button
        >
        <Button
          disabled={!showResults}
          variant="outline"
          class="flex flex-row justify-center gap-1"
          on:click={() => exportToExcel()}
        >
          <Icon icon="mdi:file-excel" width="1.25rem" height="1.25rem" />Export
          to Excel</Button
        >
      </div>
    </Card.Description>
  </Card.Header>
  {#if showResults}
    <Card.Content>
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.Head>Question</Table.Head>
            <Table.Head>Username</Table.Head>
            <Table.Head>User Answer</Table.Head>
            <Table.Head>Correct Answer</Table.Head>
            <Table.Head>Response</Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {#each results as { question_title, username, user_answer, correct_answer, response_status }, i (i)}
            <Table.Row>
              <Table.Cell>{question_title}</Table.Cell>
              <Table.Cell>@{username}</Table.Cell>
              <Table.Cell>{user_answer}</Table.Cell>
              <Table.Cell>{correct_answer}</Table.Cell>
              <Table.Cell>{response_status}</Table.Cell>
            </Table.Row>
          {/each}
        </Table.Body>
      </Table.Root>
    </Card.Content>
  {/if}
</Card.Root>
