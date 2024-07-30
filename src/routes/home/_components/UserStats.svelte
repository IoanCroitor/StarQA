<script lang="ts">
    import * as Avatar from '$lib/components/ui/avatar/index.js'
    import * as Card from '$lib/components/ui/card/index.js'
    import { Button } from '@/components/ui/button'
    import { Footer } from '@/components/ui/sheet'
    import Icon from '@iconify/svelte'
</script>

<Card.Root class="sm:col-span-2">
  <Card.Header class="pb-4">

    <Card.Title>Account Stas</Card.Title>
  </Card.Header>

  <Card.Content>
		<div class="flex items-center gap-4">
			<Avatar.Root class="hidden h-9 w-9 sm:flex">
				<Avatar.Image src="" alt="Avatar" />
				<Avatar.Fallback>OM</Avatar.Fallback>
			</Avatar.Root>
			<div class="grid gap-1">
				<p class="text-sm font-medium leading-none">Ioan Croitor</p>
				<p class="text-muted-foreground text-sm">@ioancroitor</p>
			</div>
      <div class="flex flex-row gap-2 ml-auto">
          <div class=" font-medium  bg-purple-500/20 items-center text-purple-500/80 px-2 rounded">
            
            <p>
              500 points
            </p></div>
          </div>
        <div class=" font-medium bg-green-500/20 flex flex-row items-center text-green-500 px-2 rounded">
          <Icon icon="mdi:chevron-up" width="1.25rem" height="1.25rem" />
          <p>
            1st place
          </p></div>

        </div>
        <div class="pt-3 font-semibold">
          <p>Leaderboard</p>
        </div>
    </Card.Content> 
</Card.Root>