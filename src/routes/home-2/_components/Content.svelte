<script lang="ts">
  import { Button } from '@/components/ui/button'
  import PromotedWebsite from './PromotedWebsite.svelte'

  import { onMount } from 'svelte'
  import { writable } from 'svelte/store'

  interface Quiz {
    id: string
    title: string
    description: string
    cover_image: string
    join_code: string
    updated: string
  }

  const records = writable<Quiz[]>([])

  async function fetchRecords() {
    // let recordsupdate: Quiz[] = []
    // try {
    //   const fetchedRecords = await GetAllRecords('quizzes')
    //   recordsupdate = fetchedRecords as any
    // } catch (error) {
    //   console.error(`Error fetching quiz:`, error)
    // }
    // records.set(recordsupdate)
    // console.log(records)
  }

  onMount(fetchRecords)
</script>

<div class="flex items-center">
  <h2 class="text-lg font-semibold md:text-2xl">Quizzes</h2>
</div>
<div class="flex flex-1 rounded-lg border border-dashed shadow-sm p-4">
  <div
    class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-5 gap-2 w-full h-min"
  >
    <PromotedWebsite />
    <!-- {#each records as quiz}
      <Card
        id={quiz.id}
        title={quiz.title}
        description={quiz.description}
        cover_image={quiz.cover_image}
        join_code={quiz.join_code}
        updated={quiz.updated}
      />
    {/each} -->
  </div>
</div>
