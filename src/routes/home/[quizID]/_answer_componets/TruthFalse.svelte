<script lang="ts">
  export let options = ['Adevarat', 'Fals']
  import { createEventDispatcher } from 'svelte'
  let response: string

  const dispatch = createEventDispatcher()
  console.log('Options', options)
  function handleClick(number: number) {
    response = options[number - 1] as string
    dispatch('responseSelected', { response })
  }
</script>

<div class=" bg-card p-4 border border-muted rounded-lg">
  <div class="grid grid-flow-col grid-rows-1 grid-cols-2 gap-2 m-4">
    <button
      on:click={() => handleClick(1)}
      class=" text-l font-semibold flex justify-center place-items-center h-16 bg-green-500/80 hover:bg-green-600/80 hover:rounded-2xl hover:text-white transition-all rounded-md"
    >
      {options[0]}
    </button>
    <button
      on:click={() => handleClick(2)}
      class=" text-l font-semibold flex justify-center place-items-center h-16 bg-red-500/80 hover:bg-red-600/80 hover:rounded-2xl hover:text-white transition-all rounded-md"
    >
      {options[1]}
    </button>
  </div>
</div>
