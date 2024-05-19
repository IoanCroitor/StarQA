import type { Load } from '@sveltejs/kit'
import { getRandomImage } from '../_components/unsplash'

export const load: Load = async ({ fetch }) => {
  const imageThemes = [
    'stars',
    'space',
    'books',
    'planet',
    'planets',
    'library',
  ]

  try {
    const randomImage = await getRandomImage(imageThemes)
    return {
      photo: randomImage,
    }
  } catch (error) {
    return {
      photo: null,
    }
  }
}
