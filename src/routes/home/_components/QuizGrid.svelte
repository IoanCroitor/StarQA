<script lang="ts">
  import { onMount } from 'svelte'
  import { fetchQuizzes } from '../querryUtils'
  import QuizCard from './QuizCard.svelte'

  let quizzes: any[] = []
  let limit = 12
  let offset = 0
  let loading = false
  let allLoaded = false

  // Function to load more quizzes
  async function loadMoreQuizzes() {
    if (loading || allLoaded) return
    loading = true

    const result = await fetchQuizzes(limit, offset)
    if (result.data) {
      quizzes = [...quizzes, ...result.data]
      offset += result.data.length
      if (result.data.length < limit) {
        allLoaded = true // No more data to load
      }
    }

    loading = false
  }

  // Load initial data
  onMount(() => {
    loadMoreQuizzes()
  })
</script>

<div
  class=" p-4 rounded-lg grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
>
  {#each quizzes as quiz}
    <QuizCard
      date={quiz.created_at}
      description={quiz.description}
      title={quiz.quiz_name}
      image={quiz.thumbnail_url_path}
      link={`/home/${quiz.join_code}`}
      tags={quiz.tags}
    />
  {/each}
</div>

<div class="text-center mt-2 mb-6">
  {#if !allLoaded}
    <button
      on:click={loadMoreQuizzes}
      class="px-6 py-2 bg-primary-foreground text-primary rounded-lg hover:bg-primary-foreground/90 focus:outline-none focus:ring-2 focus:ring-muted-foreground/70 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
      disabled={loading}
    >
      {#if loading}
        <span>Loading...</span>
      {:else}
        <span>Load More</span>
      {/if}
    </button>
  {/if}
  {#if allLoaded}
    <p class="text-primary">No more quizzes to load.</p>
  {/if}
</div>
