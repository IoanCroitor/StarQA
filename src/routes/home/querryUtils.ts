import type { SupabaseClient } from '@supabase/supabase-js'

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

export function getUsernameByUserId(userId: string, supabase: SupabaseClient) {
  return getFieldnameByUserIdInTable(userId, 'username', 'user_data', supabase)
}

export function getNameById(id: string, supabase: SupabaseClient) {
  return getFieldnameByUserIdInTable(id, 'name', 'user_data', supabase)
}
