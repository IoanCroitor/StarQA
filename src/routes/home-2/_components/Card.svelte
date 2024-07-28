<script lang="ts">
  import * as Card from '$lib/components/ui/card/index.js'

  export let id: string
  export let title: string
  export let description: string
  export let cover_image: string
  export let join_code: string

  console.log(
    `https://starqa.pockethost.io/api/files/collections/quizzes/${id}/${cover_image}`,
  )
</script>

<Card.Root>
  <Card.Header class="flex flex-col items-start gap-4 space-y-0">
    <div class="space-y-4">
      <div class=" h-24 rounded-lg overflow-hidden w-full">
        <img
          class="object-cover"
          alt="Space Race"
          src={`https://starqa.pockethost.io/api/files/quizzes/${id}/${cover_image}`}
        />
      </div>
      <div class="px-1">
        <a href={`/home/${join_code}`} target="_blank" class="space-y-1">
          <Card.Title>{title}</Card.Title>
          <Card.Description>
            {description}
          </Card.Description>
        </a>
      </div>
    </div>
  </Card.Header>
  <Card.Content>
    <div class="flex space-x-4 text-sm text-muted-foreground">
      <div class="ml-auto">Updated May 2024</div>
    </div>
  </Card.Content>
</Card.Root>
