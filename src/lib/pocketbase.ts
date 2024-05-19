import { PUBLIC_VITE_POCKETBASE_URL } from '$env/static/public'
import PocketBase from 'pocketbase'

const pb = new PocketBase(PUBLIC_VITE_POCKETBASE_URL)

async function checkUsernameAvailability(username: string) {
  try {
    const users = await pb
      .collection('users')
      .getList(1, 1, { filter: `username="${username}"` })
    return users.items.length === 0
  } catch (error) {
    console.error('Error checking username availability', error)
    throw error
  }
}

export async function signUp(
  email: string,
  password: string,
  username: string,
) {
  try {
    const isUsernameAvailable = await checkUsernameAvailability(username)
    if (!isUsernameAvailable) {
      throw new Error('Username is already taken')
    }

    const user = await pb.collection('users').create({
      email,
      password,
      passwordConfirm: password,
      username,
    })

    // Automatically log the user in after sign up
    await pb.collection('users').authWithPassword(email, password)
    document.cookie = pb.authStore.exportToCookie({ secure: true })
    return user
  } catch (error) {
    console.error('Sign up failed', error)
    throw error
  }
}

export async function login(email: string, password: string) {
  try {
    const authData = await pb
      .collection('users')
      .authWithPassword(email, password)
    document.cookie = pb.authStore.exportToCookie({ secure: false })
    return authData
  } catch (error) {
    console.error('Login failed', error)
    throw error
  }
}

export async function logout() {
  pb.authStore.clear()
  document.cookie = pb.authStore.exportToCookie({ secure: true })
}
