import { handleToast } from '@/handleToast'
import type { SupabaseClient } from '@supabase/supabase-js'
import { supabase } from '$lib/supabaseClient'

// Request the specific user's username
export async function getFieldnameByUserIdInTable(
  userId: string,
  field: string,
  table: string,
  supabase: SupabaseClient,
) {
  let { data: user_data, error } = await supabase
    .from(table)
    .select(field)
    .eq('user_id', userId)

  if (error) {
    console.error('Error:', error)
    return null
  }

  if (user_data === null || user_data === undefined || user_data.length === 0) {
    console.log('No data was found with the specified user ID.')
    return null
  }

  // @ts-expect-error
  // We allready checked for null and undefined behaviour so its safe to use
  return user_data[0]?.[field]
}

export async function getProfilePictureByUserId(
  userId: string,
  supabase: SupabaseClient,
) {
  const profilePictureName = await getFieldnameByUserIdInTable(
    userId,
    'profile_picture',
    'user_data',
    supabase,
  )
  if (!profilePictureName)
    // Default profile picture
    return 'https://vclfhqfyjiplikdyazvq.supabase.co/storage/v1/object/public/profile_pictures/user.png'
  const profilePictureUrl = `https://vclfhqfyjiplikdyazvq.supabase.co/storage/v1/object/public/profile_pictures/${profilePictureName}`
  return profilePictureUrl
}

export async function getUsernameByUserId(
  userId: string,
  supabase: SupabaseClient,
) {
  return await getFieldnameByUserIdInTable(
    userId,
    'username',
    'user_data',
    supabase,
  )
}

export function getNameById(id: string, supabase: SupabaseClient) {
  return getFieldnameByUserIdInTable(id, 'name', 'user_data', supabase)
}

export async function fetchLeaderboardData(supabase: SupabaseClient) {
  const { data, error } = await supabase
    .from('leaderboard')
    .select(
      `
      rank,
      score,
      user_data (username)
    `,
    )
    .order('rank', { ascending: true })

  if (error) {
    handleToast('error', Number(error.code), error.message)
    return { data: null, error }
  }

  return { data, error: null }
}

export async function fetchQuizzes(limit: number, offset: number) {
  const { data, error } = await supabase
    .from('quizzes')
    .select('*')
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1)

  if (error) {
    console.error('Error fetching quizzes:', error)
    return { data: null, error }
  }
  console.log(data)
  return { data, error: null }
}
