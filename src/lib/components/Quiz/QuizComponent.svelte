<script lang="ts">
  // @ts-nocheck

  // add questions

  export const questionTypeStore = writable<string>('trivia')
  //  'trivia' || 'quiz' || 'truthfalse'

  export let precision = 0,
    answer,
    image_url,
    details,
    min,
    max,
    value,
    question,
    options

  import Trivia from './Trivia.svelte'
  import Quiz from './Quiz.svelte'
  import TruthFalse from './TruthFalse.svelte'
</script>

{#if $questionTypeStore === 'trivia'}
  <Trivia
    {answer}
    {options}
    source={image_url}
    detalii={details}
    intrebare={question}
  />
{:else if $questionTypeStore === 'quiz'}
  <Quiz
    title="Selecteaza corect"
    {question}
    {answer}
    {details}
    {min}
    {max}
    {value}
    {precision}
  />
{:else if $questionTypeStore === 'truthfalse'}
  <TruthFalse
    {answer}
    source={image_url}
    detalii={details}
    intrebare={question}
  />
{/if}
