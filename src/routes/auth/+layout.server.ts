import { getRandomImage } from '../_components/unsplash'

export const load = async () => {
  // Fetch random image
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
