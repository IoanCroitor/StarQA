<script>
  // @ts-nocheck

  import { onMount } from 'svelte'
  import { fade, scale } from 'svelte/transition'

  import { incrementscore, score } from './scorestore'
  export let title = 'Timpul conteaza'
  export let question = 'Pe ce data a fost lansat Yuzu (2013)'
  export let answer = 2013
  export let details =
    "Yutu was a robotic lunar rover that formed part of the Chinese Chang'e 3 mission to the Moon. It was launched at 17:30 UTC on 1 December 2013"

  export let min = 2000
  export let max = 2022
  export let value = 2010
  export let precision = 0

  const x0 = (1 / (max - min)) * (answer - min) * 300
  let x1 = (1 / (max - min)) * (value - min) * 300

  let hasStarted = false
  let isRevealed = false

  let svg
  let g
  let sl, l, w

  onMount(() => {
    handleSize()
  })

  const handleSize = () => {
    if (isRevealed === true) return

    const { left: sleft } = svg.getBoundingClientRect()
    const { left, width } = g.getBoundingClientRect()
    sl = sleft
    l = left
    w = width
  }

  const handleStart = (e) => {
    hasStarted = true
    handleIng(e)
  }
  const handleEnd = () => (hasStarted = false)
  const handleIng = ({ offsetX }) => {
    if (hasStarted === false) return

    const p = (offsetX - (l - sl)) / w
    x1 = p * 300
    value = min === 0 ? max * p : min + (max - min) * p
  }

  const handleKeydown = (e) => {
    const { code } = e
    if (code === 'ArrowLeft' || code === 'ArrowRight') {
      e.preventDefault()

      const increment = precision === 0 ? 1 : 1 / 10 ** precision
      if (code === 'ArrowLeft') value = Math.max(min, value - increment)
      if (code === 'ArrowRight') value = Math.min(max, value + increment)

      x1 = (1 / (max - min)) * (value - min) * 300
    }
  }

  const durations = {
    out: 500,
    in: 400,
  }

  const delays = {
    out: 0,
    inGuess: 500,
    inAnswer: 2000,
    details: 2700,
  }

  function handleScore() {
    if (value.toFixed(precision).toString() === answer.toString()) {
      incrementscore()
      console.log(
        value.toFixed(precision).toString() === answer.toString()
          ? 'a functionat incrementarea scorului'
          : 'OOPS',
      )
    }
  }
</script>

<article class="bg-card pt-7 pb-2 rounded-xl h-full w-full">
  {#if title}
    <h2 class="text-xl font-semibold text-slate-200">
      {title}
    </h2>
  {/if}

  <p class=" text-slate-100">
    {question}
  </p>

  <svg bind:this={svg} viewBox="-24 -50 348 100">
    <g>
      <rect y="-3.5" width="300" height="7" rx="3.5" fill="hsl(0, 0%, 85%)" />

      {#if isRevealed}
        <g transform="translate({x0} 0)">
          <g style:color="hsl(185, 62%, 45%)">
            <g fill="currentColor">
              <g
                in:scale={{
                  duration: durations.in,
                  delay: delays.inAnswer,
                }}
              >
                <circle r="6" />
              </g>
            </g>
            <g fill="none" stroke="currentColor" stroke-width="1.5">
              <g
                in:scale={{
                  duration: durations.in,
                  delay: delays.inAnswer + 100,
                }}
              >
                <circle r="9" />
              </g>
            </g>

            <g
              in:fade={{
                duration: durations.in,
                delay: delays.inAnswer + durations.in,
              }}
            >
              <g>
                <g fill="none" stroke="currentColor" stroke-width="1.5">
                  <path d="M 0 9 v 11" />
                </g>
                <g fill="currentColor">
                  <g
                    transform="translate(0 34)"
                    font-size="12"
                    text-anchor={x0 > 150 ? 'end' : 'start'}
                  >
                    <text class=" text-slate-200"> Raspunsul corect </text>
                    <text
                      class="text-slate-200"
                      y="12"
                      font-size="10"
                      font-weight="700"
                    >
                      {answer}
                    </text>
                  </g>
                </g>
              </g>
            </g>
          </g>
        </g>

        <g transform="translate({x1} 0)">
          <g style:color="hsl(205, 87%, 29%)">
            <g fill="currentColor">
              <g
                in:scale={{
                  duration: durations.in,
                  delay: delays.inGuess,
                }}
              >
                <circle r="6" />
              </g>
            </g>
            <g fill="none" stroke="currentColor" stroke-width="1.5">
              <g
                in:scale={{
                  duration: durations.in,
                  delay: delays.inGuess + 100,
                }}
              >
                <circle r="9" />
              </g>
            </g>
            <g
              in:fade={{
                duration: durations.in,
                delay: delays.inGuess + durations.in,
              }}
            >
              <g fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M 0 -9 v -11" />
              </g>
              <g fill="currentColor">
                <g
                  transform="translate(0 -38)"
                  font-size="12"
                  text-anchor={x1 > 150 ? 'end' : 'start'}
                >
                  <text class="text-blue-200"> Tu ai raspuns... </text>
                  <text
                    class="text-blue-200"
                    y="12"
                    font-size="10"
                    font-weight="700">{value.toFixed(precision)}</text
                  >
                </g>
              </g>
            </g>
          </g>
        </g>
        <!-- svelte-ignore a11y-no-static-element-interactions -->
      {:else}
        <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <g
          style:cursor="pointer"
          on:mousedown={handleStart}
          on:mouseup={handleEnd}
          on:mouseleave={handleEnd}
          on:mousemove={handleIng}
          style:outline="none"
          tabindex="0"
          aria-label="Schimba valoarea cu tastele de stanga si dreapta."
          class="focusable"
          on:keydown={handleKeydown}
        >
          <g style:pointer-events="none">
            <g transform="translate({x1} 0)">
              <g style:color="hsl(205, 87%, 29%)">
                <g out:scale={{ duration: durations.out }}>
                  <g transform="translate(0 -28)">
                    <g
                      fill="currentColor"
                      font-size="11"
                      font-weight="700"
                      text-anchor="middle"
                    >
                      <text>{value.toFixed(precision)}</text>
                    </g>
                  </g>

                  <g transform="scale(0)" class="focus">
                    <circle
                      r="23.5"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="1"
                    />
                  </g>

                  <circle
                    r="18.5"
                    fill="hsl(0, 0%, 100%)"
                    stroke="currentColor"
                    stroke-width="3"
                  />
                  <g fill="currentColor">
                    <path d="M 2 -5 l 5 5 -5 5z" />
                    <path transform="scale(-1 1)" d="M 2 -5 l 5 5 -5 5z" />
                  </g>
                </g>
              </g>
            </g>
          </g>
          <g bind:this={g}>
            <rect opacity="0" y="-50" width="300" height="100" />
          </g>
        </g>
      {/if}
    </g>
  </svg>

  {#if isRevealed}
    <p class="text-slate-200" in:fade={{ delay: delays.details }}>
      {details}
    </p>
  {:else}
    <button
      class="text-slate-200 rounded-xl"
      on:click|once={() => {
        isRevealed = true
        handleScore()
      }}
    >
      Arata raspunsul!
    </button>
  {/if}
</article>

<style>
  article {
    padding: 1rem;
    box-shadow:
      0 2px 5px hsla(0, 0%, 50%, 0.1),
      0 0 5px hsla(0, 0%, 0%, 0.2);
  }

  h2 {
    font-size: 1.2rem;
  }

  article > * + * {
    margin-top: 0.75em;
  }

  p {
    line-height: 1.7;
  }

  svg {
    display: block;
  }

  svg,
  svg + * {
    margin-top: 1.5em;
  }

  button {
    display: block;
    background: hsl(205, 79%, 36%);
    font-weight: 700;
    border: none;
    padding: 0.75rem 0.95rem;
    color: hsl(0, 0%, 100%);
  }

  .focus {
    transition: transform 0.25s cubic-bezier(0.45, 0, 0.55, 1);
  }

  .focusable:focus .focus {
    transform: scale(1);
  }

  .focusable:focus:not(:focus-visible) .focus {
    transform: scale(0);
  }
</style>
