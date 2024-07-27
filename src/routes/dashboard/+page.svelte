<!-- Parent.svelte -->
<script lang="ts">
  import Question from './Question.svelte'
  // import type { AnswerComponent } from './types'

  // let instances: AnswerComponent[] = [
  //   {
  //     slider: {
  //       minValue: 0,
  //       maxValue: 100,
  //       desiredValue: 50,
  //     },
  //     truth_or_false: {
  //       truth: '',
  //       false: '',
  //     },
  //     trivia: {
  //       options: ['', '', '', ''],
  //       answer: '',
  //     },
  //   },
  // ]

  // function addInstance() {
  //   instances = [...instances, { id: instances.length, data: {} }]
  // }

  // function removeInstance(id: number) {
  //   instances = instances.filter((instance) => instance.id !== id)
  // }

  // function updateInstance(id: number, data) {
  //   instances = instances.map((instance) =>
  //     instance.id === id ? { ...instance, data } : instance,
  //   )
  // }
</script>

<!-- <div class="parent-container">
  <button on:click={addInstance}>Add Question</button>

  {#each instances as instance (instance.id)}
    {id}
    on:remove={() => removeInstance(instance.id)}
    on:update={(event) => updateInstance(instance.id, event.detail)}
    />
  {/each}

  <pre>{JSON.stringify(instances, null, 2)}</pre>
</div> -->

<Question />

<style>
  .parent-container {
    margin: 20px;
  }

  button {
    margin-bottom: 20px;
  }
</style>
