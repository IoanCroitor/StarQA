<script lang="ts">
  import { PUBLIC_BUCKET_PATH } from '$env/static/public'
  import { Badge } from '$lib/components/ui/badge/index.js'
  import { Button } from '$lib/components/ui/button/index.js'
  import * as Card from '$lib/components/ui/card/index.js'
  import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js'
  import * as Table from '$lib/components/ui/table/index.js'
  import { handleToast } from '@/handleToast.js'
  import Icon from '@iconify/svelte'

  export let data
  const { supabase, user } = data

  let quizzes: Array<any> = []

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

  function formatDate(dateString: string) {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true,
    }
    return new Date(dateString).toLocaleString('en-US', options)
  }
</script>

<div class="m-3"></div>
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
