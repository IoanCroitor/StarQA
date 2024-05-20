<script lang="ts">
  import * as Card from '$lib/components/ui/card/index.js'
</script>

<Card.Root>
  <Card.Header class="flex flex-col items-start gap-4 space-y-0">
    <div class="space-y-4">
      <div class="w-full h-24 rounded-lg overflow-hidden">
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
