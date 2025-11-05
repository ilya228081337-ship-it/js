import { useState, useEffect, useCallback } from 'react';
import { Customer, CharacterId, GameState } from '../types/game';
import { CUSTOMER_TEMPLATES } from '../data/customers';

const GAME_DURATION = 180;
const INITIAL_CASH = 5000;
const CUSTOMER_SPAWN_INTERVAL = 5000;

export function useGameLogic(character: CharacterId | null) {
  const [gameState, setGameState] = useState<GameState>({
    character,
    score: 0,
    cashRegister: INITIAL_CASH,
    level: 1,
    gameOver: false,
    timeRemaining: GAME_DURATION,
    customers: [],
    currentCustomer: null,
    consecutiveCorrect: 0
  });

  const [isPlaying, setIsPlaying] = useState(false);

  const generateCustomer = useCallback((): Customer => {
    const totalFrequency = CUSTOMER_TEMPLATES.reduce((sum, t) => sum + t.frequency, 0);
    let random = Math.random() * totalFrequency;

    let selectedTemplate = CUSTOMER_TEMPLATES[0];
    for (const template of CUSTOMER_TEMPLATES) {
      random -= template.frequency;
      if (random <= 0) {
        selectedTemplate = template;
        break;
      }
    }

    const requestIndex = Math.floor(Math.random() * selectedTemplate.requests.length);
    const correctActionIndex = Math.floor(Math.random() * selectedTemplate.correctActions.length);

    return {
      id: Math.random().toString(36).substr(2, 9),
      type: selectedTemplate.type,
      name: selectedTemplate.name,
      request: selectedTemplate.requests[requestIndex],
      correctAction: selectedTemplate.correctActions[correctActionIndex],
      timeLimit: selectedTemplate.timeLimit,
      points: selectedTemplate.points,
      arrived: Date.now()
    };
  }, []);

  const startGame = useCallback(() => {
    if (!character) return;

    const firstCustomer = generateCustomer();
    console.log('Starting game with character:', character);
    console.log('First customer:', firstCustomer);

    setGameState({
      character,
      score: 0,
      cashRegister: INITIAL_CASH,
      level: 1,
      gameOver: false,
      timeRemaining: GAME_DURATION,
      customers: [],
      currentCustomer: firstCustomer,
      consecutiveCorrect: 0
    });
    setIsPlaying(true);
  }, [character, generateCustomer]);

  const handleAction = useCallback((action: string) => {
    setGameState((prev) => {
      if (!prev.currentCustomer) return prev;

      const customer = prev.currentCustomer;
      let scoreChange = 0;
      let cashChange = 0;
      let isCorrect = false;

      if (customer.type === 'katya') {
        if (action === 'handle-if-ira' && (prev.character === 'ira' || prev.character === 'sashka' || prev.character === 'polinka')) {
          isCorrect = true;
          scoreChange = customer.points;
        } else if (action === 'listen') {
          scoreChange = -30;
        } else {
          scoreChange = -50;
        }
      } else if (customer.type === 'as-oppa') {
        if (action === 'give-then-ask') {
          isCorrect = true;
          scoreChange = customer.points;
        } else if (action === 'give') {
          cashChange = -500;
          scoreChange = -50;
        } else {
          scoreChange = -30;
        }
      } else if (action === customer.correctAction || customer.correctAction.split(',').includes(action)) {
        isCorrect = true;
        scoreChange = customer.points;

        if (customer.type === 'regular' || (customer.type === 'schoolkid' && action === 'sell-limited')) {
          cashChange = 100;
        }
      } else {
        scoreChange = -Math.floor(customer.points / 2);

        if (customer.type === 'boss-natasha' && action !== 'send-photo') {
          scoreChange = -100;
        }
      }

      const newConsecutive = isCorrect ? prev.consecutiveCorrect + 1 : 0;
      if (newConsecutive > 0 && newConsecutive % 5 === 0) {
        scoreChange += 50;
      }

      return {
        ...prev,
        score: Math.max(0, prev.score + scoreChange),
        cashRegister: Math.max(0, prev.cashRegister + cashChange),
        currentCustomer: null,
        consecutiveCorrect: newConsecutive
      };
    });

    setTimeout(() => {
      setGameState((prev) => ({
        ...prev,
        currentCustomer: generateCustomer()
      }));
    }, 1500);
  }, [generateCustomer]);

  useEffect(() => {
    if (!isPlaying) return;

    const timer = setInterval(() => {
      setGameState((prev) => {
        const newTime = prev.timeRemaining - 1;
        if (newTime <= 0) {
          setIsPlaying(false);
          return { ...prev, timeRemaining: 0, gameOver: true };
        }
        return { ...prev, timeRemaining: newTime };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isPlaying]);

  return {
    gameState,
    startGame,
    handleAction,
    isPlaying
  };
}
