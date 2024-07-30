<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  export let options = [
    'Uniunea Sovietica',
    'Statele Unite ale Americii',
    'India',
    'Franta',
  ]

  let response: string

  const dispatch = createEventDispatcher()

  function handleClick(number: number) {
    response = options[number - 1] as string
    dispatch('responseSelected', { response })
  }
</script>

<div class=" bg-card p-4 border border-muted rounded-lg">
  <div class="grid grid-flow-row grid-rows-2 grid-cols-2 gap-2 m-4">
    <button
      on:click={() => handleClick(1)}
      class=" text-l font-semibold flex justify-center place-items-center h-16 bg-red-500/80 hover:bg-red-600/80 hover:rounded-2xl hover:text-white transition-all rounded-md"
    >
      {options[0]}
    </button>
    <button
      on:click={() => handleClick(2)}
      class=" text-l font-semibold flex justify-center place-items-center h-16 bg-purple-500/80 hover:bg-purple-600/80 hover:rounded-2xl hover:text-white transition-all rounded-md"
    >
      {options[1]}
    </button>
    <button
      on:click={() => handleClick(3)}
      class=" text-l font-semibold flex justify-center place-items-center h-16 bg-yellow-500/80 hover:bg-yellow-600/80 hover:rounded-2xl hover:text-white transition-all rounded-md"
    >
      {options[2]}
    </button>
    <button
      on:click={() => handleClick(4)}
      class=" text-l font-semibold flex justify-center place-items-center h-16 bg-blue-500/80 hover:bg-blue-600/80 hover:rounded-2xl hover:text-white transition-all rounded-md"
    >
      {options[3]}
    </button>
  </div>
</div>
