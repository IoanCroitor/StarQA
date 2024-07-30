
<script lang="ts">
      import { goto } from '$app/navigation'
    import * as Card from '$lib/components/ui/card/index.js'
    import { Button } from '$lib/components/ui/button/index.js'
  import { Input } from '$lib/components/ui/input/index.js'

  import * as m from '$lib/paraglide/messages'
    let redirect: number
function handleRedirect() {
    if (redirect) {
        goto(`/home/${redirect}`)
    }
  }
  
</script>


    <Card.Root>
      <Card.Header>
        <Card.Title>{m.join_a_quiz()}</Card.Title>
        <Card.Description>
          {m.join_a_quiz_to_rank_higher_in_the_leaderboards()}
        </Card.Description>
      </Card.Header>
      <Card.Content>
        <div class="flex flex-row gap-2">
          <Input bind:value={redirect} type="number" class="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"/>
          <Button class="w-20" on:click={handleRedirect}>{m.join()}</Button>
        </div>

        <p class="flex justify-center text-muted-foreground text-xs my-1">
          {m.or()}
        </p>
        <a href="/home/create" target="_blank">
          <Button variant="secondary" class="w-full">{m.create()}</Button>
        </a>
      </Card.Content>
    </Card.Root>
