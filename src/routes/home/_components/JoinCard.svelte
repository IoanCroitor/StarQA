<script lang="ts">
  import * as Card from '$lib/components/ui/card/index.js'
  import { Button } from '$lib/components/ui/button'
  import Input from '@/components/ui/input/input.svelte'
  import { goto } from '$app/navigation'

  let redirect: string
  function handleRedirect() {
    goto(`/home/${redirect}`)
  }
</script>

<div class="mt-auto">
  <Card.Root>
    <Card.Header>
      <Card.Title>Join a Quiz!</Card.Title>
      <Card.Description>
        Join a quiz to test your knowledge and rank higher in the leaderboards
      </Card.Description>
    </Card.Header>
    <Card.Content>
      <div class="flex flex-row gap-2">
        <Input bind:value={redirect} type="text" />
        <Button class="w-20" on:click={handleRedirect}>Join</Button>
      </div>

      <p class="flex justify-center text-muted-foreground text-xs my-1">or</p>
      <Button variant="secondary" class="w-full">Create</Button>
    </Card.Content>
  </Card.Root>
</div>
