// userStore.js
import { writable } from 'svelte/store'
import { supabase } from '../supabaseClient' // Adjust this import based on your Supabase setup

function createUserStore() {
  const { subscribe, set, update } = writable({
    id: null,
    username: null,
    email: null,
    profilePictureUrl: null,
  })

  return {
    subscribe,
    setUser: async (user) => {
      if (user) {
        const { id, email } = user
        let username = null
        let profilePictureUrl = null

        // Fetch username from user_data table
        const { data: userData, error: userError } = await supabase
          .from('user_data')
          .select('username')
          .eq('user_id', id)
          .single()

        if (userError) {
          console.error('Error fetching username:', userError)
        } else if (userData) {
          username = userData.username
        }

        // Fetch profile picture URL (assuming it's stored in the same table)
        const { data: profileData, error: profileError } = await supabase
          .from('user_data')
          .select('profile_picture_url')
          .eq('user_id', id)
          .single()

        if (profileError) {
          console.error('Error fetching profile picture:', profileError)
        } else if (profileData) {
          profilePictureUrl = profileData.profile_picture_url
        }

        set({ id, username, email, profilePictureUrl })
      } else {
        set({ id: null, username: null, email: null, profilePictureUrl: null })
      }
    },
    clearUser: () =>
      set({ id: null, username: null, email: null, profilePictureUrl: null }),
  }
}

export const userStore = createUserStore()
