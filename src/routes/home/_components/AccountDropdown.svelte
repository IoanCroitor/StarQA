<script lang="ts">
  import { goto } from '$app/navigation'
  import { Button } from '$lib/components/ui/button/index.js'
  import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js'
  import { getUser, logout } from '@/pocketbase'
  import { onMount } from 'svelte'

  let data = {
    model: {
      username: 'loading',
      email: 'loading',
    },
  }
  onMount(() => {
    data = getUser()
  })

  function handleLogout() {
    logout()
    goto('/auth/login')
  }
</script>

<DropdownMenu.Root>
  <DropdownMenu.Trigger asChild let:builder>
    <Button
      builders={[builder]}
      variant="secondary"
      size="icon"
      class="rounded-full overflow-hidden"
    >
      <img
        alt="User Avatar"
        class="w-full h-full object-cover"
        src={`https://kawaii-avatar.now.sh/api/avatar?username=${data.model.username}&mood=blissful,happy,excited&background=%2300000`}
      />
      <span class="sr-only">Toggle user menu</span>
    </Button>
  </DropdownMenu.Trigger>
  <DropdownMenu.Content align="end">
    <DropdownMenu.Label>
      <div class="flex flex-col font-normal">
        <p class="text-lg font-semibold">Hello again!</p>
        <p class="text-primary/70">{data.model.email}</p>
      </div>
    </DropdownMenu.Label>

    <DropdownMenu.Separator />
    <DropdownMenu.Item href="https://github.com/IoanCroitor" target="_blank"
      >Support</DropdownMenu.Item
    >
    <DropdownMenu.Item class="text-red-500" on:click={handleLogout}
      >Logout</DropdownMenu.Item
    >
  </DropdownMenu.Content>
</DropdownMenu.Root>
