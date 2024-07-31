<script lang="ts">
  import * as Avatar from '$lib/components/ui/avatar/index.js'
  import * as Card from '$lib/components/ui/card/index.js'
  import Icon from '@iconify/svelte'
  import FeaturedContent from './_components/FeaturedContent.svelte'
  import JoinQuiz from './_components/JoinQuiz.svelte'
  import { handleToast } from '@/handleToast'
  import { fetchLeaderboardData } from './querryUtils'
  import { PUBLIC_BUCKET_PATH } from '$env/static/public'
  import * as Table from '$lib/components/ui/table/index.js'
  import QuizGrid from './_components/QuizGrid.svelte'

  export let data
  let profile_picture: string = ''
  let username: string = ''
  let user_score: number | null = null
  let rank: number | null = null
  const { supabase, user } = data
  let userId = String(user?.id)
  let name = user?.user_metadata?.full_name || 'Unknown User'
  let leaderboard: any[] = []

  async function fetchUserData() {
    const { data, error } = await supabase
      .from('user_data')
      .select('username, profile_picture, user_score')
      .eq('user_id', userId)
      .single()

    if (error) {
      handleToast('error', 400, 'Error fetching user data')
      return { data: null, error }
    }

    return { data, error: null }
  }

  let userDataProfile

  fetchUserData().then((result) => {
    if (result.data) {
      userDataProfile = result.data
      username = userDataProfile.username
      profile_picture =
        'https://vclfhqfyjiplikdyazvq.supabase.co/storage/v1/object/public/profile_pictures/' +
        userDataProfile.profile_picture
      user_score = userDataProfile.user_score
    }
  })

  fetchLeaderboardData(supabase).then((result) => {
    if (result.data) {
      leaderboard = result.data
    }
  })

  function findUserRank(leaderboard: any[], username: string) {
    for (let i = 0; i < leaderboard.length; i++) {
      if (leaderboard[i].user_data.username === username) {
        return leaderboard[i].rank
      }
    }
    return null
  }
  $: rank = findUserRank(leaderboard, username)
  // $: console.log(leaderboard)
</script>

<div class="mt-3"></div>

<div
  class="grid grid-cols-1 sm:grid-cols-2 sm:grid-rows-1 grid-rows-2 grid-flow-col gap-2 my-3 overflow-hidden sm:max-h-72"
>
  <Card.Root class="sm:col-span-2">
    <Card.Header class="pb-4">
      <Card.Title>Account Stats</Card.Title>
    </Card.Header>
    <Card.Content>
      <div class="flex items-center gap-4">
        <Avatar.Root class="hidden h-9 w-9 sm:flex">
          <Avatar.Image src={profile_picture} alt="Avatar" />
        </Avatar.Root>
        <div class="grid gap-1">
          <p class="text-sm font-medium leading-none">{name}</p>
          <p class="text-muted-foreground text-sm">@{username}</p>
        </div>
        <div class="flex flex-row gap-2 ml-auto">
          <div
            class="font-medium bg-purple-500/20 items-center text-purple-500/80 px-2 rounded"
          >
            <p>{user_score ? `${user_score} points` : 'Loading points...'}</p>
          </div>
        </div>
        {#if rank}
          <div
            class="font-medium bg-green-500/20 flex flex-row items-center text-green-500 px-2 rounded"
          >
            <Icon
              icon={rank === 1
                ? 'mdi:medal'
                : rank === 2
                  ? 'mdi:star'
                  : 'mdi:rank'}
              width="1.25rem"
              height="1.25rem"
            />
            <p>Ranked #{rank}</p>
          </div>
        {/if}
      </div>
      <div
        class="pt-3 font-semibold overflow-hidden group-hover:overflow-auto group-focus:overflow-auto"
      >
        <Table.Root>
          <Table.Header>
            <Table.Row>
              <Table.Head class="w-[100px]">Rank</Table.Head>
              <Table.Head>Username</Table.Head>
              <Table.Head class="text-right">Score</Table.Head>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {#each leaderboard as entry, i (i)}
              <Table.Row>
                <Table.Cell class="font-medium">{entry.rank}</Table.Cell>
                <Table.Cell>{entry.user_data.username}</Table.Cell>
                <Table.Cell class="text-right">{entry.score}</Table.Cell>
              </Table.Row>
            {/each}
          </Table.Body>
        </Table.Root>
      </div>
    </Card.Content>
  </Card.Root>
  <JoinQuiz />
</div>

<div
  class="flex flex-col border border-none bg-muted-foreground/10 rounded-lg p-4"
>
  <div
    class="flex flex-row items-center bg-purple-700 w-fit rounded-lg mb-3 px-2 py-1"
  >
    <Icon icon="mdi:star" width="1rem" height="1rem" />
    <h2 class="font-semibold text-sm">Featured Content</h2>
  </div>

  <div class="flex flex-row overflow-hidden rounded-lg">
    <div class="w-72">
      <FeaturedContent />
    </div>
  </div>
</div>

<QuizGrid />
