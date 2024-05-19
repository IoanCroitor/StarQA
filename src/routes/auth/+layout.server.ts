// src/routes/+layout.server.js
import { redirect } from '@sveltejs/kit'
import PocketBase from 'pocketbase'
import { getRandomImage } from '../_components/unsplash'
import { PUBLIC_VITE_POCKETBASE_URL } from '$env/static/public'

export const load = async () => {
  //   const pb = new PocketBase(PUBLIC_VITE_POCKETBASE_URL) // Update with your PocketBase URL

  //   // Retrieve the auth token from cookies
  //   const authToken = cookies.get('pb_auth')

  //   if (authToken) {
  //     try {
  //       // Authenticate with the token
  //       pb.authStore.save(authToken, null)
  //       const user = await pb.users.authRefresh()

  //       // If the token is valid, user should be authenticated at this point
  //       // Redirect to a specific page if needed
  //       if (user) {
  //         throw redirect(302, '/dashboard') // Redirect to the dashboard if authenticated
  //       }
  //     } catch (error) {
  //       // If authentication fails, clear the cookie
  //       cookies.delete('pb_auth')
  //     }
  //   }

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
