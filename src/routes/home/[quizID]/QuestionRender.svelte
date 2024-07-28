<script lang="ts">
  import Slider from './_answer_componets/Slider.svelte'
  import Trivia from './_answer_componets/Trivia.svelte'
  import TruthFalse from './_answer_componets/TruthFalse.svelte'
  import AudioPlayer from './_components/AudioPlayer.svelte'
  import VideoPlayer from './_components/VideoPlayer.svelte'
  import ImageViewer from './_components/ImageViewer.svelte'
  import { Carta, Markdown } from 'carta-md'
  import type { QuizQuestion } from './types'
  import { PUBLIC_BUCKET_PATH } from '$env/static/public'

  export let question: QuizQuestion

  const carta = new Carta()
  let media_type = question.media_type
  let description = question.description

  let options = JSON.parse(question.response_options)

  console.log(options)

  type ComponentType = typeof Slider | typeof Trivia | typeof TruthFalse

  // Mapping object for question components
  const components: { [key: string]: ComponentType } = {
    slider: Slider,
    trivia: Trivia,
    truth_false: TruthFalse,
  }

  // Mapping object for media components
  const mediaComponents = {
    audio: AudioPlayer,
    video: VideoPlayer,
    image: ImageViewer,
  }
  let url: string
  let Src: string
  let Alt: string
  // State variables
  let selectedComponent: keyof typeof components = question.type
  let selectedMedia: keyof typeof mediaComponents =
    media_type as keyof typeof mediaComponents

  if (question.media_url_path) {
    url = `${PUBLIC_BUCKET_PATH}${question.media_url_path}`
    Src = url
    Alt = `image ${question.type} question`
  }

  // Get the current component or use a fallback
  const CurrentComponent = components[selectedComponent] || null
  const CurrentMediaComponent = mediaComponents[selectedMedia] || null
</script>

<div class="p-2 md:p-4 gap-2 flex flex-col">
  <h1
    class="text-xl font-semibold bg-primary-foreground text-primary w-fit p-2 rounded-lg"
  >
    Question Title hello
  </h1>
  <Markdown {carta} value={description} />

  <!-- Conditionally render the media component -->
  {#if CurrentMediaComponent && question.media_url_path}
    <svelte:component
      this={CurrentMediaComponent}
      src={Src}
      alt={Alt}
      type={media_type}
    />
  {/if}

  <!-- Dynamically render the selected component -->
  {#if CurrentComponent}
    <svelte:component this={CurrentComponent} {options} />
  {/if}
</div>
