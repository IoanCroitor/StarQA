import { math } from '@cartamd/plugin-math'
import { tikz } from '@cartamd/plugin-tikz'
import { Carta } from 'carta-md'

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
})

export { carta }
