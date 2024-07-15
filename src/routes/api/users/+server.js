import { json } from '@sveltejs/kit';
import { supabase } from 'src/lib/client/supabaseClient';

export async function POST({ request }) {
  const { name } = await request.json();

  try {
    const { data, error } = await supabase
      .from('users')
      .insert({ name })
      .select();

    if (error) {
      throw error;
    }

    return json(data[0]);
  } catch (error) {
    return json({ error }, { status: 500 });
  }
}
