<script lang="ts">
  import { Button } from '$lib/components/ui/button/index.js'
  import * as Card from '$lib/components/ui/card/index.js'
  import { Input } from '$lib/components/ui/input/index.js'
  import { Label } from '$lib/components/ui/label/index.js'
  import { handleToast } from '@/handleToast.js'

  export let data
  const { supabase, user } = data

  let profilePicture: File | null = null
  let name = ''
  let username = ''
  let userId = user?.id

  async function handleFileChange(event: any) {
    const files = event.target.files
    if (files.length > 0) {
      profilePicture = files[0]
    }
  }

  async function updateProfile(event: any) {
    event.preventDefault()

    try {
      let profilePictureUrl = ''

      if (profilePicture) {
        const { data, error: uploadError } = await supabase.storage
          .from('profile_pictures')
          .upload(`public/${userId}/${profilePicture.name}`, profilePicture)

        if (uploadError) {
          throw uploadError
        }

        profilePictureUrl = data.path
        console.log(data)
      }

      const { error: updateError } = await supabase
        .from('user_data')
        .update({
          profile_picture: profilePictureUrl,
          name: name,
          username: username,
        })
        .eq('user_id', userId)

      if (updateError) {
        throw updateError
      }

      handleToast('success', 200, 'Profile updated successfully')
    } catch (error) {
      console.error('Error updating profile:', error)
      handleToast('error', 400, 'Failed to update profile: ')
    }
  }
</script>

<Card.Root class="w-[350px]">
  <Card.Header>
    <Card.Title>Edit Profile</Card.Title>
    <Card.Description>Update your profile information</Card.Description>
  </Card.Header>
  <Card.Content>
    <form on:submit={updateProfile}>
      <div class="grid w-full items-center gap-4">
        <div class="flex flex-col space-y-1.5">
          <Label for="profile-picture">Profile Picture</Label>
          <Input
            id="profile-picture"
            type="file"
            accept="image/*"
            on:change={handleFileChange}
          />
        </div>
        <div class="flex flex-col space-y-1.5">
          <Label for="name">Name</Label>
          <Input id="name" placeholder="Enter your name" bind:value={name} />
        </div>
        <div class="flex flex-col space-y-1.5">
          <Label for="username">Username</Label>
          <Input
            id="username"
            placeholder="Enter your username"
            bind:value={username}
          />
        </div>
      </div>
      <Card.Footer class="flex justify-between mt-4">
        <Button variant="outline" type="button">Cancel</Button>
        <Button type="submit">Save</Button>
      </Card.Footer>
    </form>
  </Card.Content>
</Card.Root>
