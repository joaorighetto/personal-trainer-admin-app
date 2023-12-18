import { supabase, logIn } from './supabase'
import { decode } from 'base64-arraybuffer'


export async function getTrainerProfile(email, password) {

    await logIn(email, password);
    
    let { data: trainerProfile, error } = await supabase
    .from('profiles')
    .select("*")
    .eq("id", (await supabase.auth.getUser()).data.user?.id)

    return trainerProfile
    
}

export async function updateTrainerProfile(email, password, full_name, website) {

    await logIn(email, password);
    
    const updates = {
      id: (await supabase.auth.getUser()).data.user?.id,
      full_name,
      website,
      account_type: (await supabase.auth.getUser()).data.user?.user_metadata?.account_type,
      updated_at: new Date(),
    }
    const { error } = await supabase.from('profiles').upsert(updates)
  }

export async function getAvatarPublicUrl(path) {

  const { data } = await supabase
    .storage
    .from('avatars')
    .getPublicUrl(path)
  return data
}

export async function updateAvatar(base64) {
  const userName = (await supabase.auth.getUser()).data.user?.email?.split('@')[0]


  const filePath = `${userName}_${Math.random()}`
  const fileData = base64.split(',').pop()

  await supabase
  .storage
  .from('avatars')
  .upload(filePath, decode(fileData), {
    contentType: 'image/png'
  })

  await supabase.auth.updateUser({
    data: {avatar_url: filePath}
  })
}
