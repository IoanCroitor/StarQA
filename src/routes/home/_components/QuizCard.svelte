<script lang="ts">
  import { PUBLIC_BUCKET_PATH } from '$env/static/public'
  import * as Card from '$lib/components/ui/card/index.js'
  import Badge from '@/components/ui/badge/badge.svelte'
  import { Footer } from '@/components/ui/sheet'
  import { formatDate } from '@/utils'

  export let title = ''
  export let description = ''
  export let link = ''
  export let tags: any[]
  export let date = ''
  export let image = ''

  console.log(tags)

  // const displayedTags = tags.slice(0, 3)
  $: date = formatDate(date)
  $: image = PUBLIC_BUCKET_PATH + image
</script>

<a href={link} target="_blank" class="w-full h-full">
  <Card.Root>
    <Card.Header>
      <div class="h-36 w-full rounded-lg overflow-hidden">
        <img class="object-cover w-full h-full" alt={title} src={image} />
      </div>
    </Card.Header>
    <Card.Content class="flex flex-col">
      <p class="text-primary truncate">{title}</p>
      <p class="text-muted-foreground truncate-multiline">{description}</p>
    </Card.Content>
    <Card.Footer>
      <p class="text-primary/70 bg-muted/30 rounded-lg w-fit h-fit py-1 px-2">
        {date}
      </p>
    </Card.Footer>
  </Card.Root>
</a>

<style>
  .truncate-multiline {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
