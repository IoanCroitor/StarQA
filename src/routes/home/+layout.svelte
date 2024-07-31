<script lang="ts">
  import * as Avatar from '$lib/components/ui/avatar/index.js'
  import { Button } from '$lib/components/ui/button/index.js'
  import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js'
  import {
    getProfilePictureByUserId,
    getUsernameByUserId,
    getNameById,
  } from './querryUtils'

  export let data

  let user_username: string,
    user_name: string,
    user_name_avatar_fallback: string
  let profile_picture: string
  const { supabase, user } = data

  const specificUserId = user?.id as string

  getUsernameByUserId(specificUserId, supabase).then((username) => {
    if (username) {
      user_username = username
    }
  })
  getProfilePictureByUserId(specificUserId, supabase).then(
    (profilePictureUrl: string) => {
      if (profilePictureUrl) {
        profile_picture = profilePictureUrl
      }
    },
  )
  getNameById(specificUserId, supabase).then((name) => {
    if (name) {
      user_name = name
    }
  })

  function getFirstCharacters(str: string): string {
    if (str && typeof str === 'string') {
      // Split the string into words
      const words = str.trim().split(/\s+/)

      // Get the first character of each word and join with spaces
      return words.map((word) => word.charAt(0).toUpperCase()).join(' ')
    }
    return ''
  }

  $: user_name_avatar_fallback = getFirstCharacters(user_name)
</script>

<nav class="bg-muted/40 backdrop-blur-lg w-full fixed z-40">
  <div
    class="flex gap-4 top-0 h-14
  items-center text-slate-200 px-4 justify-between max-w-[100rem] mx-auto"
  >
    <a class="hover:underline font-semibold decoration-wavy" href="/home"
      >StarQA</a
    >

    <div class="flex flex-row gap-2">
      <Button variant="ghost" class="hidden sm:block" href="/home"
        >Explore</Button
      >
      <Button variant="ghost" href="/home/create">Create a quiz</Button>
      <Button variant="ghost" href="/home/my-quizzes">My quizzes</Button>
    </div>
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild let:builder>
        <Button builders={[builder]} variant="ghost" class="h-6 w-6">
          <Avatar.Root>
            <Avatar.Image src={profile_picture} alt={`@${user_username}`} />
            <Avatar.Fallback>{user_name_avatar_fallback}</Avatar.Fallback>
          </Avatar.Root></Button
        >
      </DropdownMenu.Trigger>
      <DropdownMenu.Content class="w-56">
        <DropdownMenu.Label>{user?.email}</DropdownMenu.Label>
        <DropdownMenu.Separator />
        <DropdownMenu.Group>
          <DropdownMenu.Item href="/home">
            Home
            <DropdownMenu.Shortcut>⇧H</DropdownMenu.Shortcut>
          </DropdownMenu.Item>
        </DropdownMenu.Group>
        <DropdownMenu.Separator />
        <DropdownMenu.Group>
          <!-- <DropdownMenu.Item href="/home/profile">
            Profile
            <DropdownMenu.Shortcut>⇧P</DropdownMenu.Shortcut>
          </DropdownMenu.Item> -->
          <DropdownMenu.Sub>
            <DropdownMenu.SubTrigger>Invite users</DropdownMenu.SubTrigger>
            <DropdownMenu.SubContent>
              <DropdownMenu.Item
                href="mailto:?subject=Join%20Me%20on%20StarQA&body=Hey!%20I'm%20on%20StarQA%20and%20I%20think%20you%20should%20try%20it%20too.%20Come%20join%20me%20at:%20starqa.org/auth/register
">Email</DropdownMenu.Item
              >
              <DropdownMenu.Item
                target="_blank"
                href="https://wa.me/?text=Hey!%20I'm%20on%20StarQA%20and%20I%20think%20you%20should%20try%20it%20too.%20Come%20join%20me%20at:%20starqa.org/auth/register
">Whatsapp</DropdownMenu.Item
              >
              <DropdownMenu.Separator />
            </DropdownMenu.SubContent>
          </DropdownMenu.Sub>
        </DropdownMenu.Group>
        <DropdownMenu.Separator />
        <DropdownMenu.Item href="https://github.com/IoanCroitor/StarQA"
          >GitHub</DropdownMenu.Item
        >
        <DropdownMenu.Item href="https://github.com/IoanCroitor/StarQA/issues"
          >Support</DropdownMenu.Item
        >
        <DropdownMenu.Item href="https://github.com/IoanCroitor/StarQA"
          >Documentation</DropdownMenu.Item
        >
        <DropdownMenu.Separator />
        <DropdownMenu.Item href="/logout">
          Log out
          <DropdownMenu.Shortcut>⇧L</DropdownMenu.Shortcut>
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  </div>
</nav>

<div class="h-14 w-full"></div>
<div class="max-w-6xl mx-auto px-4">
  <slot />
</div>
