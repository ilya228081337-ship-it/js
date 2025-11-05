import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface LeaderboardEntry {
  id: string;
  player_name: string;
  character_id: string;
  score: number;
  created_at: string;
}

export async function saveScore(playerName: string, characterId: string, score: number) {
  const { error } = await supabase
    .from('leaderboard')
    .insert({
      player_name: playerName,
      character_id: characterId,
      score: score
    });

  if (error) {
    console.error('Error saving score:', error);
    throw error;
  }
}

export async function getTopScores(limit: number = 10): Promise<LeaderboardEntry[]> {
  const { data, error } = await supabase
    .from('leaderboard')
    .select('*')
    .order('score', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching leaderboard:', error);
    return [];
  }

  return data || [];
}
