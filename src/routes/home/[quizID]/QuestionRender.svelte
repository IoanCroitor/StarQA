<script lang="ts">
  import Slider from './_answer_componets/Slider.svelte'
  import Trivia from './_answer_componets/Trivia.svelte'
  import TruthFalse from './_answer_componets/TruthFalse.svelte'
  import AudioPlayer from './_components/AudioPlayer.svelte'
  import VideoPlayer from './_components/VideoPlayer.svelte'
  import ImageViewer from './_components/ImageViewer.svelte'
  import type { QuizQuestion } from './types'
  import { PUBLIC_BUCKET_PATH } from '$env/static/public'
  import { createEventDispatcher } from 'svelte'

  import { handleToast } from '@/handleToast'
  import { Markdown} from 'carta-md'
    import { carta } from '@/Carta'
    import MarkdownWysiwyg from '../create/MarkdownWYSIWYG.svelte'

  export let question: QuizQuestion
  let options: string[]



  //Server side Markdown conversion using Carta MD is temporary disabled due to a bug in vite ssr circular dependencies


//   const convertMarkdown = async (markdown: string) => {
//   try {
//     const response = await fetch('/api/convertMarkdown', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'text/plain',
//       },
//       body: markdown, // Send markdown as plain text
//     });

//     if (!response.ok) {
//       throw new Error('Failed to convert Markdown');
//     }

//     const result = await response.json();
//     html = result.html;
//   } catch (error) {
//     handleToast('error', 500, 'Failed to convert Markdown');
//   }
// };

  // $: convertMarkdown(question.description)


  //The event dispatcher is deprecated. When migrating to svelte 5 we need to use hooks 'n stuff
  const dispatch = createEventDispatcher()
  $: media_type = question.media_type

  let render = true
  $: {
    try {
      options = JSON.parse(question.response_options)
    } catch (error) {
      handleToast('error', 500, 'Failed to parse options JSON')
      console.log(error)
      options = ['']
      render = false
    }
  }


  type ComponentType = typeof Slider | typeof Trivia | typeof TruthFalse

  const components: { [key: string]: ComponentType } = {
    slider: Slider,
    trivia: Trivia,
    truth_false: TruthFalse,
  }

  const mediaComponents = {
    audio: AudioPlayer,
    video: VideoPlayer,
    image: ImageViewer,
  }

  let url: string = ''
  let src: string = ''
  let alt: string = ''

  let selectedComponent: keyof typeof components = question.type
  let selectedMedia: keyof typeof mediaComponents =
    media_type as keyof typeof mediaComponents

  let CurrentComponent = components[selectedComponent] || null
  let CurrentMediaComponent = mediaComponents[selectedMedia] || null
  // $: selectedComponent = question.type as keyof typeof components
  // $: CurrentComponent = components[selectedComponent] || null

  // $: selectedMedia = media_type as keyof typeof mediaComponents
  // $: CurrentMediaComponent = mediaComponents[selectedMedia] || null

  $: selectedComponent = question.type as keyof typeof components
  $: CurrentComponent = components[selectedComponent] || null

  $: selectedMedia = question.media_type as keyof typeof mediaComponents
  $: CurrentMediaComponent = mediaComponents[selectedMedia] || null
  $: {
    if (question.media_url_path) {
      url = `${PUBLIC_BUCKET_PATH}${question.media_url_path}`
      src = url
      alt = `image ${question.type} question`
    } else {
      src = ''
      alt = ''
    }
  }

  function handleResponse(event: CustomEvent) {
    const { response } = event.detail
    dispatch('responseSelected', { response })
  }
</script>

<div class="p-2 md:p-4 gap-2 flex flex-col">
  {#if render}
    <h1
      class="text-xl font-semibold bg-primary-foreground text-primary w-fit p-2 rounded-lg"
    >
      {question.title}
    </h1>

    <div class="text-primary">
      <Markdown value={question.description} {carta}/>
    </div>
    {#if CurrentMediaComponent}
      {#each [{ src, alt, type: question.media_type }] as media (src)}
        <svelte:component
          this={CurrentMediaComponent}
          type={media.type ?? ''}
          {src}
          {alt}
        />
      {/each}
    {/if}

    {#if CurrentComponent}
      <svelte:component
        this={CurrentComponent}
        bind:options
        on:responseSelected={handleResponse}
      />
    {/if}
  {:else}
    <p>Something went wrong, the question could not be loaded</p>
  {/if}
</div>
