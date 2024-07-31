# StarQA Project Structure

## src

- [[lib]]
  - [[config]]
    - [[zod-schema.ts]]
  - [[paraglide]]
    - [[messages]]
      - [[en.js]]
      - [[fr.js]]
      - [[ro.js]]
- [[routes]]
  - [[home]]
    - [[create]]
      - [[_inputComponents]]
        - [[Trivia_editor.svelte]]
      - [[Question.svelte]]
      - [[supabaseOperations.ts]]
      - [[+page.svelte]]
    - [[querryUtils.ts]]
    - [[types.ts]]
    - [[+layout.server.ts]]
  - [[privacy]]
    - [[+page.svelte]]
  - [[terms]]
    - [[+page.svelte]]
  - [[+layout.ts]]

## File Links

### lib

- [[config]]
  - [[zod-schema.ts]]
- [[paraglide]]
  - [[messages]]
    - [[en.js]]
    - [[fr.js]]
    - [[ro.js]]

### routes

- [[home]]
  - [[create]]
    - [[_inputComponents]]
      - [[Trivia_editor.svelte]]
    - [[Question.svelte]]
    - [[supabaseOperations.ts]]
    - [[+page.svelte]]
  - [[querryUtils.ts]]
  - [[types.ts]]
  - [[+layout.server.ts]]
- [[privacy]]
  - [[+page.svelte]]
- [[terms]]
  - [[+page.svelte]]
- [[+layout.ts]]
