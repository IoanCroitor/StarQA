<script lang="ts">
  import * as Card from '$lib/components/ui/card/index.js'
  import { Button } from '$lib/components/ui/button'
  import Input from '@/components/ui/input/input.svelte'
  import { goto } from '$app/navigation'
  import { onMount } from 'svelte'
  import * as m from '$lib/paraglide/messages'

  let redirect: string

  function handleRedirect() {
    goto(`/home/${redirect}`)
  }
</script>

<div class="mt-auto">
  <Card.Root>
    <Card.Header>
      <Card.Title>{m.join_a_quiz()}</Card.Title>
      <Card.Description>
        {m.join_a_quiz_to_rank_higher_in_the_leaderboards()}
      </Card.Description>
    </Card.Header>
    <Card.Content>
      <div class="flex flex-row gap-2">
        <Input bind:value={redirect} type="text" />
        <Button class="w-20" on:click={handleRedirect}>{m.join()}</Button>
      </div>

      <p class="flex justify-center text-muted-foreground text-xs my-1">
        {m.or()}
      </p>
      <a href="/create">
        <Button variant="secondary" class="w-full">{m.create()}</Button>
      </a>
    </Card.Content>
  </Card.Root>
</div>
