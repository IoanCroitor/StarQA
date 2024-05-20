<script lang="ts">
  import { Button } from '@/components/ui/button'
  import Card from './Card.svelte'
  import { GetUserProp, getRecordByID, getUser } from '@/pocketbase'
  import { onMount } from 'svelte'

  // Import writable store from Svelte
  import { writable } from 'svelte/store'

  interface Quiz {
    id: string
    title: string
    description: string
    cover_image: string
    join_code: string
    updated: string
  }

  // Define writable store for records
  const records = writable<Quiz[]>([])

  // Function to fetch and set records
  async function fetchRecords() {
    let userid = getUser().model.id
    const record = await GetUserProp(userid, 'finished_quizzes')
    const finished_quizzes = record.finished_quizzes || []

    const updatedRecords: Quiz[] = []

    // Iterate over each finished quiz ID and fetch the corresponding record
    for (let i = 0; i < finished_quizzes.length; i++) {
      const quizId = finished_quizzes[i]
      try {
        // Replace 'quizzes' with the actual collection name if it's different
        const quiz = await getRecordByID('quizzes', quizId, '')
        updatedRecords.push(quiz as any) // Store the fetched quiz in the records array
      } catch (error) {
        console.error(`Error fetching quiz with ID ${quizId}:`, error)
      }
    }

    // Set the updated records in the store
    records.set(updatedRecords)
  }

  // Fetch records on mount
  onMount(fetchRecords)
</script>

{#if $records && $records.length > 0}
  <div class="flex items-center">
    <h2 class="text-lg font-semibold md:text-2xl">Completed Quizzes</h2>
  </div>
  <div class="flex flex-1 rounded-lg border border-dashed shadow-sm p-4">
    <div
      class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-5 gap-2 w-full h-min"
    >
      {#each $records as quiz}
        <Card
          id={quiz.id}
          title={quiz.title}
          description={quiz.description}
          cover_image={quiz.cover_image}
          join_code={quiz.join_code}
          updated={quiz.updated}
        />
        <!-- Adjust according to the actual properties of your quiz object -->
      {/each}
    </div>
  </div>
{:else}
  <div class="flex items-center">
    <h2 class="text-lg font-semibold md:text-2xl">Searching🔎</h2>
  </div>
{/if}
