<script lang="ts">
  import { math } from '@cartamd/plugin-math'
  import { tikz } from '@cartamd/plugin-tikz'
  import { Carta, MarkdownEditor } from 'carta-md'
  // import DOMPurify from 'isomorphic-dompurify'
  const carta = new Carta({
    sanitizer: false,
    extensions: [
      math(),
      tikz({
        postProcessing: (html) => {
          return html
            .replaceAll('#000000', '~~~')
            .replaceAll('#000', '~~~')
            .replaceAll('black', '~~~')
            .replaceAll('#ffffff', '#000')
            .replaceAll('#fff', '#000')
            .replaceAll('white', '#000')
            .replaceAll('~~~', '#fff')
        },
      }),
    ],
    theme: 'github-dark',
  })
  export let value = ''
</script>

<MarkdownEditor theme="default" {carta} bind:value />

<style>
  /* Set monospace font (Required to have the editor working correctly!) */
  :global(.carta-font-code) {
    font-family: theme('fontFamily.mono');
    font-size: theme('fontSize.lg');
  }

  /* using adaptive theme */

  :global(.carta-theme__default) {
    --border-color: theme('colors.muted.DEFAULT');
    --selection-color: theme('colors.muted.DEFAULT');
    --focus-outline: theme('colors.muted.DEFAULT');
    --hover-color: theme('colors.secondary.DEFAULT');
    --caret-color: var(--pop);
    --text-color: theme('colors.primary.DEFAULT');
  }

  /* Code dark mode */
  :global(html.dark .shiki),
  :global(html.dark .shiki span) {
    color: theme('colors.gray.200') !important;
  }
</style>
