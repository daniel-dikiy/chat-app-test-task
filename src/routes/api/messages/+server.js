import { json } from '@sveltejs/kit';
import { supabase } from 'src/lib/client/supabaseClient';

export async function POST({ request }) {
  const { text, user_id, username } = await request.json();

  try {
    const { data, error } = await supabase
      .from('messages')
      .insert({ text, user_id, username })
      .select();

    if (error) {
      throw error;
    }

    return json(data[0]);
  } catch (error) {
    return json({ error }, { status: 500 });
  }
}

export async function GET() {
  try {
    const { data, error } = await supabase.from('messages').select('*');

    if (error) {
      throw error;
    }

    const transformedData = data.map(message => {
      const createdAt = new Date(message.created_at);
      const hours = createdAt.getHours().toString().padStart(2, '0');
      const minutes = createdAt.getMinutes().toString().padStart(2, '0');
      const formattedTime = `${hours}:${minutes}`;

      return {
        ...message,
        time: formattedTime,
      };
    });

    return json(transformedData);
  } catch (error) {
    return json({ error }, { status: 500 });
  }
}
