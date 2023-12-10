import { supabase, logIn } from './supabase'


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

    console.log(updates)

    const { error } = await supabase.from('profiles').upsert(updates)
  }

export async function getAvatarPublicUrl(path) {
  const { data } = await supabase
    .storage
    .from('avatars')
    .getPublicUrl(path)
  return data
}

export async function updateAvatar(file) {
  
  
    const fileExt = file.name.split('.').pop()
    const fileName = `${Math.random()}.${fileExt}`
    const filePath = `${fileName}`

    const { error: uploadError } = await supabase.storage.from('avatars').upload(filePath, file, {contentType: 'image/png'});
}
