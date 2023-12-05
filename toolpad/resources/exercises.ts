import { supabase, logIn } from './supabase'

export async function getSessionExercises(email, password, session_id) {
    await logIn(email, password);
      
    let { data: session_exercises, error } = await supabase
    .from('exercise_series')
    .select(`
        reps,weight,interval_in_seconds,type,exercises(name)
    `)
    .eq("session_id", session_id)
    
    return session_exercises
}