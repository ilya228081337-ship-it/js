import { useState, useEffect } from 'react';
import { Trophy, RotateCcw, Home } from 'lucide-react';
import { saveScore } from '../lib/supabase';
import Leaderboard from './Leaderboard';

interface GameOverProps {
  score: number;
  character: string;
  onRestart: () => void;
  onMainMenu: () => void;
}

export default function GameOver({ score, character, onRestart, onMainMenu }: GameOverProps) {
  const [playerName, setPlayerName] = useState('');
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const getRank = (score: number) => {
    if (score >= 2000) return { title: 'Легенда Япоши', emoji: '👑', color: 'text-yellow-600' };
    if (score >= 1500) return { title: 'Мастер Продаж', emoji: '🏆', color: 'text-orange-600' };
    if (score >= 1000) return { title: 'Опытный Продавец', emoji: '⭐', color: 'text-blue-600' };
    if (score >= 500) return { title: 'Начинающий Работник', emoji: '📝', color: 'text-green-600' };
    return { title: 'Стажёр', emoji: '🌱', color: 'text-gray-600' };
  };

  const rank = getRank(score);

  const handleSaveScore = async () => {
    if (!playerName.trim() || saving || saved) return;

    setSaving(true);
    try {
      await saveScore(playerName.trim(), character, score);
      setSaved(true);
    } catch (error) {
      console.error('Failed to save score:', error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center p-4">
      <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-3xl shadow-2xl p-12">
          <div className="text-center">
          <div className="text-8xl mb-6">{rank.emoji}</div>
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            Смена окончена!
          </h1>

          <div className="bg-gradient-to-r from-orange-100 to-pink-100 rounded-2xl p-8 mb-8">
            <p className="text-gray-600 text-lg mb-2">Ваш результат</p>
            <p className="text-6xl font-bold text-orange-600 mb-4">{score}</p>
            <p className={`text-2xl font-bold ${rank.color}`}>{rank.title}</p>
          </div>

          {!saved ? (
            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2">
                Сохранить результат:
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  placeholder="Ваше имя"
                  maxLength={20}
                  className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none"
                />
                <button
                  onClick={handleSaveScore}
                  disabled={!playerName.trim() || saving}
                  className="bg-green-500 hover:bg-green-600 disabled:bg-gray-300 text-white px-6 py-3 rounded-lg font-bold transition-all"
                >
                  {saving ? '...' : 'Сохранить'}
                </button>
              </div>
            </div>
          ) : (
            <div className="mb-6 bg-green-50 border-2 border-green-400 rounded-lg p-4 text-center">
              <p className="text-green-800 font-bold">Результат сохранён!</p>
            </div>
          )}

          <div className="space-y-4">
            <button
              onClick={onRestart}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-xl font-bold text-xl transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-3"
            >
              <RotateCcw className="w-6 h-6" />
              Сыграть ещё раз
            </button>

            <button
              onClick={onMainMenu}
              className="w-full bg-gray-500 hover:bg-gray-600 text-white px-8 py-4 rounded-xl font-bold text-xl transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-3"
            >
              <Home className="w-6 h-6" />
              Главное меню
            </button>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-gray-600 text-sm">
              💡 Совет: Следите за типом клиента и выбирайте правильные действия, чтобы набрать больше очков!
            </p>
          </div>
          </div>
        </div>

        <div className="lg:flex lg:items-center">
          <Leaderboard />
        </div>
      </div>
    </div>
  );
}
