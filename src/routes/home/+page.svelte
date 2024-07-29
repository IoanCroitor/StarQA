<script lang="ts">
  import { goto } from '$app/navigation'
  import { Button } from '$lib/components/ui/button/index.js'
  import { Input } from '$lib/components/ui/input/index.js'
  import * as Card from '$lib/components/ui/card/index.js'
  import * as m from '$lib/paraglide/messages'

  let redirect: string
  function handleRedirect() {
    goto(`/home/${redirect}`)
  }
</script>

<Card.Root class="sm:col-span-2">
  <Card.Header class="pb-3">
    <Card.Title>Account Stas</Card.Title>
    <Card.Description class="max-w-lg text-balance leading-relaxed">
      Introducing Our Dynamic Orders Dashboard for Seamless Management and
      Insightful Analysis.
    </Card.Description>
  </Card.Header>
  <Card.Footer>
    <Button>Create New Order</Button>
  </Card.Footer>
</Card.Root>
<div
  class="grid grid-cols-2 grid-rows-1 grid-flow-col gap-2 flex-col sm:flex-row mt-3"
>
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

  <Card.Root>
    <Card.Header class="flex flex-col items-start gap-4 space-y-0">
      <div class="space-y-4">
        <div class="w-full h-24 rounded-lg overflow-hidden mx-auto">
          <img
            class="object-cover w-full h-full"
            alt="Space Race"
            src="https://cdn.mos.cms.futurecdn.net/iBN6fuoeYTJmqb7y4fjzDn-1200-80.jpg.webp"
          />
        </div>
        <div class="px-1">
          <a
            href="https://printrestele.netlify.app/"
            target="_blank"
            class="space-y-1"
          >
            <Card.Title>Razboiul Rece Printre Stele</Card.Title>
            <Card.Description>
              Un site interactiv si educativ in care explorezi subiectul "The
              Space Race"
            </Card.Description>
          </a>
        </div>
      </div>
    </Card.Header>
    <Card.Content>
      <div class="flex space-x-4 text-sm text-muted-foreground">
        <div class="ml-auto">Updated April 2024</div>
      </div>
    </Card.Content>
  </Card.Root>
</div>
