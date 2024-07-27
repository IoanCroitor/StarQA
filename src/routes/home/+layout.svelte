<script lang="ts">
  import { Badge } from '$lib/components/ui/badge/index.js'
  import { Button } from '$lib/components/ui/button/index.js'
  import * as Sheet from '$lib/components/ui/sheet/index.js'
  import AccountDropdown from './_components/AccountDropdown.svelte'
  import { onMount } from 'svelte'

  import JoinCard from './_components/JoinCard.svelte'
  import { ConstructionIcon, Menu } from 'lucide-svelte'
  import { handleToast } from '@/handleToast'

  let finished_quizzes_length = 0

  export let data

  // export async function handleLogout() {
  //   const { error } = await data.supabase.auth.signOut()
  //   if (error) {
  //     handleToast("error", 400, error as unknown as string)
  // }
</script>

<svelte:head>
  <title>Home</title>
</svelte:head>

<div
  class="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]"
>
  <div class="hidden border-r bg-muted/40 md:block">
    <div class="flex h-full max-h-screen flex-col gap-2">
      <div class="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
        <a href="/" class="flex items-center gap-2 font-semibold">
          <img src="/favicon.svg" alt="StarQA logo" class="h-6 w-6" />
          <span class="">StarQA</span>
        </a>
      </div>
      <div class="flex-1">
        <nav class="grid items-start px-2 text-sm font-medium lg:px-4">
          <a
            href="/home"
            class="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
          >
            Quizzes
          </a>
          <a
            href="/home/completed"
            class="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
          >
            Completed
            <Badge
              variant="outline"
              class="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-primary/70"
              >{finished_quizzes_length}</Badge
            >
          </a>
        </nav>
      </div>
      <div class="p-2">
        <JoinCard />
      </div>
    </div>
  </div>
  <div class="flex flex-col">
    <header
      class="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6"
    >
      <Sheet.Root>
        <Sheet.Trigger asChild let:builder>
          <Button
            variant="outline"
            size="icon"
            class="shrink-0 md:hidden"
            builders={[builder]}
          >
            <Menu class="h-5 w-5" />
            <span class="sr-only">Toggle navigation menu</span>
          </Button>
        </Sheet.Trigger>
        <Sheet.Content side="left" class="flex flex-col">
          <nav class="grid gap-2 text-lg font-medium">
            <a href="/" class="flex items-center gap-2 text-lg font-semibold">
              <span class="sr-only">StarQA</span>
            </a>
            <a
              href="/home"
              class="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
            >
              Quizzes
            </a>
            <a
              href="/home/completed"
              class="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
            >
              Completed
              <Badge
                class="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
              >
                {finished_quizzes_length}
              </Badge>
            </a>
          </nav>
          <JoinCard />
        </Sheet.Content>
      </Sheet.Root>
      <div class="w-full flex-1"></div>
      <AccountDropdown {data} />
    </header>
    <main class="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 h-full w-full">
      <!-- slot here -->
      <slot />
    </main>
  </div>
</div>
