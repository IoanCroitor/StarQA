// src/routes/+layout.server.js
import { redirect } from '@sveltejs/kit'

import { getRandomImage } from '../_components/unsplash'

import { goto } from '$app/navigation'

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
