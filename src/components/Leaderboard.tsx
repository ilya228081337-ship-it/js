import { useEffect, useState } from 'react';
import { Trophy, Medal } from 'lucide-react';
import { getTopScores, LeaderboardEntry } from '../lib/supabase';

export default function Leaderboard() {
  const [scores, setScores] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLeaderboard();
  }, []);

  const loadLeaderboard = async () => {
    setLoading(true);
    const data = await getTopScores(10);
    setScores(data);
    setLoading(false);
  };

  const getMedalColor = (position: number) => {
    if (position === 0) return 'text-yellow-500';
    if (position === 1) return 'text-gray-400';
    if (position === 2) return 'text-orange-600';
    return 'text-gray-600';
  };

  const getCharacterEmoji = (characterId: string) => {
    const emojis: Record<string, string> = {
      'ira': '👩‍🦰',
      'sashka': '👨‍🦱',
      'polinka': '👩‍🦱'
    };
    return emojis[characterId] || '👤';
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/2"></div>
          <div className="space-y-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-12 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center gap-3 mb-6">
        <Trophy className="w-8 h-8 text-orange-600" />
        <h2 className="text-2xl font-bold text-gray-800">Таблица лидеров</h2>
      </div>

      {scores.length === 0 ? (
        <p className="text-gray-500 text-center py-8">
          Пока нет результатов. Станьте первым!
        </p>
      ) : (
        <div className="space-y-2">
          {scores.map((entry, index) => (
            <div
              key={entry.id}
              className={`flex items-center gap-4 p-4 rounded-lg transition-all ${
                index < 3
                  ? 'bg-gradient-to-r from-orange-50 to-yellow-50 border-2 border-orange-200'
                  : 'bg-gray-50'
              }`}
            >
              <div className={`flex items-center justify-center w-10 h-10 font-bold text-xl ${getMedalColor(index)}`}>
                {index < 3 ? <Medal className="w-8 h-8" /> : `#${index + 1}`}
              </div>

              <div className="text-3xl">
                {getCharacterEmoji(entry.character_id)}
              </div>

              <div className="flex-1">
                <p className="font-bold text-gray-800">{entry.player_name}</p>
                <p className="text-sm text-gray-600 capitalize">{entry.character_id}</p>
              </div>

              <div className="text-right">
                <p className="text-2xl font-bold text-orange-600">{entry.score}</p>
                <p className="text-xs text-gray-500">очков</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
