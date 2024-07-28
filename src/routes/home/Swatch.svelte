<script>
  // Define the color values for light and dark themes
  const colors = {
    light: {
      background: 'hsl(0, 0%, 100%)',
      foreground: 'hsl(222.2, 84%, 4.9%)',
      muted: 'hsl(210, 40%, 96.1%)',
      mutedForeground: 'hsl(215.4, 16.3%, 46.9%)',
      popover: 'hsl(0, 0%, 100%)',
      popoverForeground: 'hsl(222.2, 84%, 4.9%)',
      card: 'hsl(0, 0%, 100%)',
      cardForeground: 'hsl(222.2, 84%, 4.9%)',
      border: 'hsl(214.3, 31.8%, 91.4%)',
      input: 'hsl(214.3, 31.8%, 91.4%)',
      primary: 'hsl(222.2, 47.4%, 11.2%)',
      primaryForeground: 'hsl(210, 40%, 98%)',
      secondary: 'hsl(210, 40%, 96.1%)',
      secondaryForeground: 'hsl(222.2, 47.4%, 11.2%)',
      accent: 'hsl(210, 40%, 96.1%)',
      accentForeground: 'hsl(222.2, 47.4%, 11.2%)',
      destructive: 'hsl(0, 72.2%, 50.6%)',
      destructiveForeground: 'hsl(210, 40%, 98%)',
      ring: 'hsl(222.2, 84%, 4.9%)',
      pop: 'hsl(261, 100%, 55%)',
    },
    dark: {
      background: 'hsl(222.2, 84%, 4.9%)',
      foreground: 'hsl(210, 40%, 98%)',
      muted: 'hsl(217.2, 32.6%, 17.5%)',
      mutedForeground: 'hsl(215, 20.2%, 65.1%)',
      popover: 'hsl(222.2, 84%, 4.9%)',
      popoverForeground: 'hsl(210, 40%, 98%)',
      card: 'hsl(222.2, 84%, 4.9%)',
      cardForeground: 'hsl(210, 40%, 98%)',
      border: 'hsl(217.2, 32.6%, 17.5%)',
      input: 'hsl(217.2, 32.6%, 17.5%)',
      primary: 'hsl(210, 40%, 98%)',
      primaryForeground: 'hsl(222.2, 47.4%, 11.2%)',
      secondary: 'hsl(217.2, 32.6%, 17.5%)',
      secondaryForeground: 'hsl(210, 40%, 98%)',
      accent: 'hsl(217.2, 32.6%, 17.5%)',
      accentForeground: 'hsl(210, 40%, 98%)',
      destructive: 'hsl(0, 62.8%, 30.6%)',
      destructiveForeground: 'hsl(210, 40%, 98%)',
      ring: 'hsl(212.7, 26.8%, 83.9%)',
      pop: 'hsl(261, 100%, 55%)',
    },
  }
</script>

<div class="color-grid light">
  {#each Object.entries(colors.light) as [name, color]}
    <div class="color-item" style="background-color: {color};">
      {name}
    </div>
  {/each}
</div>

<div class="color-grid dark">
  {#each Object.entries(colors.dark) as [name, color]}
    <div class="color-item" style="background-color: {color};">
      {name}
    </div>
  {/each}
</div>

<style>
  .color-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 1rem;
    margin: 1rem;
  }

  .color-item {
    padding: 1rem;
    text-align: center;
    border-radius: var(--radius);
    color: #fff;
    font-size: 0.9rem;
  }

  .light .color-item {
    color: #333;
  }
</style>
