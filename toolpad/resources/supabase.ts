import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL ?? 'https://lcqxtlambsxestwlqbod.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY;
export const defaultEmail = process.env.EMAIL;
export const defaultPassword = process.env.PASSWORD;

export const supabase = createClient(supabaseUrl, supabaseKey ?? '');


export async function logIn(email, password) {
  let signInEmail = email || defaultEmail;
  let signInPassword = password || defaultPassword;

  const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
    email: signInEmail,
    password: signInPassword,
  });
}
