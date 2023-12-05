import { supabase, logIn} from './supabase'


export async function removeClient(email, password, client_id) {  
    await supabase
    .from('clients')
    .update({ trainer_id: null })
    .eq('id', client_id);
  }

  export async function clientsRoutines(email, password) {
    await logIn(email, password);
  
    let { data: clientsRoutines, error } = await supabase
    .from('clients')
    .select(`
      id,training_routines(id,training_sessions(id,tag),created_at,structure,difficulty,goal,notes),profiles(full_name))
    `)
    .eq('trainer_id', (await supabase.auth.getUser()).data.user?.id)
    
    return clientsRoutines;
  }

