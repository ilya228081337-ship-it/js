import { useEffect, useState } from 'react';
import { Customer, CharacterId } from '../types/game';
import { Trophy, User } from 'lucide-react';
import AnimatedCustomer from './AnimatedCustomer';
import ShopScene from './ShopScene';
import ActionButtons from './ActionButtons';
import FeedbackAnimation from './FeedbackAnimation';
import TimerDisplay from './TimerDisplay';

interface GameInterfaceProps {
  character: CharacterId;
  score: number;
  cashRegister: number;
  timeRemaining: number;
  currentCustomer: Customer | null;
  onAction: (action: string) => void;
  onGameOver: (score: number) => void;
}

export default function GameInterface({
  character,
  score,
  cashRegister,
  timeRemaining,
  currentCustomer,
  onAction,
  onGameOver
}: GameInterfaceProps) {
  const [customerTimer, setCustomerTimer] = useState<number>(0);
  const [feedback, setFeedback] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [isCustomerLeaving, setIsCustomerLeaving] = useState(false);
  const [actionDisabled, setActionDisabled] = useState(false);

  useEffect(() => {
    if (currentCustomer) {
      setIsCustomerLeaving(false);
      setCustomerTimer(currentCustomer.timeLimit);
      const interval = setInterval(() => {
        setCustomerTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            handleCustomerTimeout();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [currentCustomer]);

  useEffect(() => {
    if (timeRemaining <= 0) {
      onGameOver(score);
    }
  }, [timeRemaining, score, onGameOver]);

  const handleCustomerTimeout = () => {
    setFeedback({ message: 'Время вышло!', type: 'error' });
    setIsCustomerLeaving(true);
    setActionDisabled(true);
    setTimeout(() => {
      onAction('timeout');
      setActionDisabled(false);
    }, 1500);
  };

  const handleAction = (action: string) => {
    if (actionDisabled) return;

    setActionDisabled(true);
    setIsCustomerLeaving(true);

    const isCorrect = currentCustomer?.correctAction === action ||
                      currentCustomer?.correctAction.includes(action);

    if (isCorrect) {
      setFeedback({
        message: `Правильно! +${currentCustomer?.points} очков`,
        type: 'success'
      });
    } else {
      setFeedback({
        message: 'Неправильно! Потеряно очков',
        type: 'error'
      });
    }

    setTimeout(() => {
      onAction(action);
      setActionDisabled(false);
    }, 1500);
  };

  const getActionsForCustomer = () => {
    if (!currentCustomer) return [];

    switch (currentCustomer.type) {
      case 'skuf':
        return [
          { id: 'refuse', label: 'Отказать', color: 'red' },
          { id: 'explain', label: 'Объяснить про соевое мясо', color: 'blue' },
          { id: 'sell', label: 'Продать', color: 'green' }
        ];
      case 'schoolkid':
        if (currentCustomer.request.includes('энергетик') || currentCustomer.request.includes('бульдак')) {
          return [
            { id: 'ask-passport', label: 'Спросить паспорт', color: 'orange' },
            { id: 'sell', label: 'Продать', color: 'green' }
          ];
        } else {
          return [
            { id: 'sell-limited', label: 'Продать немного', color: 'blue' },
            { id: 'sell-много', label: 'Продать много', color: 'green' },
            { id: 'refuse', label: 'Отказать', color: 'red' }
          ];
        }
      case 'boss-natasha':
        return [
          { id: 'send-photo', label: 'Отправить фото товара', color: 'green' },
          { id: 'ignore', label: 'Игнорировать', color: 'gray' },
          { id: 'refuse', label: 'Отказать', color: 'red' }
        ];
      case 'as-oppa':
        return [
          { id: 'give-then-ask', label: 'Дать, потом попросить обратно', color: 'blue' },
          { id: 'give', label: 'Просто дать', color: 'yellow' },
          { id: 'refuse', label: 'Отказать', color: 'red' }
        ];
      case 'katya':
        return [
          { id: 'handle-if-ira', label: character === 'ira' || character === 'sashka' || character === 'polinka' ? 'Вежливо прервать' : 'Попробовать справиться', color: 'blue' },
          { id: 'listen', label: 'Слушать', color: 'gray' }
        ];
      case 'grandma':
        return [
          { id: 'help', label: 'Помочь и показать', color: 'green' },
          { id: 'ignore', label: 'Игнорировать', color: 'gray' },
          { id: 'rush', label: 'Торопить', color: 'red' }
        ];
      case 'student':
        return [
          { id: 'sell-cheap', label: 'Показать дешевые товары', color: 'green' },
          { id: 'sell-expensive', label: 'Предложить дорогое', color: 'yellow' },
          { id: 'refuse', label: 'Отказать', color: 'red' }
        ];
      case 'hipster':
        return [
          { id: 'show-ingredients', label: 'Показать состав', color: 'green' },
          { id: 'lie', label: 'Соврать что веган', color: 'yellow' },
          { id: 'refuse', label: 'Отказать', color: 'red' }
        ];
      case 'delivery':
        return [
          { id: 'fast-service', label: 'Быстро обслужить', color: 'green' },
          { id: 'slow', label: 'Не спешить', color: 'gray' },
          { id: 'refuse', label: 'Отказать', color: 'red' }
        ];
      case 'tourist':
        return [
          { id: 'help-translate', label: 'Помочь с переводом', color: 'green' },
          { id: 'ignore', label: 'Игнорировать', color: 'gray' },
          { id: 'rude', label: 'Нагрубить', color: 'red' }
        ];
      case 'old-man':
        return [
          { id: 'listen-politely', label: 'Вежливо выслушать', color: 'green' },
          { id: 'argue', label: 'Спорить', color: 'yellow' },
          { id: 'ignore', label: 'Игнорировать', color: 'red' }
        ];
      case 'construction':
        return [
          { id: 'serve-bulk', label: 'Собрать заказ быстро', color: 'green' },
          { id: 'slow', label: 'Не спешить', color: 'gray' },
          { id: 'refuse', label: 'Отказать', color: 'red' }
        ];
      case 'manager':
        return [
          { id: 'provide-docs', label: 'Дать чек и документы', color: 'green' },
          { id: 'no-receipt', label: 'Без чека', color: 'yellow' },
          { id: 'refuse', label: 'Отказать', color: 'red' }
        ];
      case 'teenager':
        return [
          { id: 'refuse-underage', label: 'Отказать (несовершеннолетний)', color: 'green' },
          { id: 'sell', label: 'Продать', color: 'red' }
        ];
      case 'regular':
        return [
          { id: 'sell', label: 'Продать', color: 'green' },
          { id: 'refuse', label: 'Отказать', color: 'red' }
        ];
      default:
        return [];
    }
  };

  const getCharacterEmoji = () => {
    const emojis = { ira: '👩‍🦰', sashka: '👨‍🦱', polinka: '👩‍🦱' };
    return emojis[character] || '👤';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-2 md:p-4">
      {feedback && (
        <FeedbackAnimation
          message={feedback.message}
          type={feedback.type}
          onComplete={() => setFeedback(null)}
        />
      )}

      <div className="max-w-7xl mx-auto space-y-2 md:space-y-4">
        <div className="grid grid-cols-3 gap-2 md:flex md:justify-between md:items-center">
          <div className="flex items-center gap-2 bg-white rounded-xl shadow-lg p-2 md:p-3">
            <div className="text-2xl md:text-4xl">{getCharacterEmoji()}</div>
            <div className="hidden md:block">
              <p className="text-xs text-gray-600">Играет</p>
              <p className="text-lg font-bold text-gray-800 capitalize">{character}</p>
            </div>
          </div>

          <div className="col-span-2 md:col-span-1">
            <TimerDisplay timeRemaining={timeRemaining} customerTimer={customerTimer} />
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl shadow-lg p-2 md:p-4 border-2 md:border-4 border-purple-700">
            <div className="text-center">
              <Trophy className="text-white w-6 h-6 md:w-8 md:h-8 mx-auto mb-1" />
              <div className="text-white text-2xl md:text-3xl font-bold">{score}</div>
            </div>
          </div>
        </div>

        <ShopScene cashRegister={cashRegister}>
          <AnimatedCustomer customer={currentCustomer} isLeaving={isCustomerLeaving} />
        </ShopScene>

        <div className="bg-white rounded-xl md:rounded-2xl shadow-2xl p-3 md:p-6">
          {currentCustomer ? (
            <div>
              {currentCustomer.type === 'katya' && character !== 'ira' && character !== 'sashka' && character !== 'polinka' && (
                <div className="bg-yellow-50 border-2 border-yellow-400 rounded-lg p-2 mb-3 text-center">
                  <p className="text-yellow-800 font-semibold text-xs md:text-sm">
                    ⚠️ Только Ира, Саша и Полина могут справиться с Катей!
                  </p>
                </div>
              )}

              <ActionButtons
                actions={getActionsForCustomer()}
                onAction={handleAction}
                disabled={actionDisabled}
              />
            </div>
          ) : (
            <div className="text-center py-6 md:py-8">
              <div className="text-4xl md:text-5xl mb-2 animate-pulse">⏳</div>
              <p className="text-lg md:text-xl text-gray-600 font-semibold">
                Ожидание клиента...
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
