import { supabase, logIn } from './supabase'


export async function getTrainerProfile(email, password) {
    await logIn(email, password);
    const { data:user } = await supabase.auth.getUser();

    let { data: trainerProfile, error } = await supabase
        .from('profiles')
        .select("*")
        .eq("id", user.user?.id)
    
    return trainerProfile
    
}

export async function getAvatarPublicUrl(path) {
  const { data } = await supabase
    .storage
    .from('avatars')
    .getPublicUrl(path)
  return data
}