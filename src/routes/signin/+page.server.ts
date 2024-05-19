import { fail, redirect, type RequestHandler } from '@sveltejs/kit'
import type { ClientResponseError } from 'pocketbase'

export const actions = {
  // @ts-ignore
  signin: async ({ locals, request }) => {
    const data = await request.formData()
    const email = data.get('email')
    const password = data.get('password')

    if (!email || !password) {
      return fail(400, {
        emailRequired: email === null,
        passwordRequired: password === null,
      })
    }

    try {
      await locals.pb
        .collection('users')
        .authWithPassword(email.toString(), password.toString())
    } catch (error) {
      // Log the error object for debugging
      console.error('Authentication error:', error)

      const errorObj = error as ClientResponseError
      const errorMessage = errorObj.data?.message || 'An unknown error occurred'

      return fail(500, { fail: true, message: errorMessage })
    }

    throw redirect(303, '/home')
  },
  // @ts-ignore
  reset: async ({ locals, request }) => {
    const data = await request.formData()
    const email = data.get('email')

    if (!email) {
      return fail(400, { emailRequired: email === null })
    }

    try {
      await locals.pb.collection('users').requestPasswordReset(email.toString())
    } catch (error) {
      // Log the error object for debugging
      console.error('Password reset error:', error)

      const errorObj = error as ClientResponseError
      const errorMessage = errorObj.data?.message || 'An unknown error occurred'

      return fail(500, { fail: true, message: errorMessage })
    }

    throw redirect(303, '/auth/signin')
  },
  // @ts-ignore
}
