import { useState, useEffect } from 'react';
import { CharacterId } from './types/game';
import CharacterSelection from './components/CharacterSelection';
import GameInterface from './components/GameInterface';
import GameOver from './components/GameOver';
import { useGameLogic } from './hooks/useGameLogic';

type GameScreen = 'menu' | 'playing' | 'gameover';

function App() {
  const [screen, setScreen] = useState<GameScreen>('menu');
  const [selectedCharacter, setSelectedCharacter] = useState<CharacterId | null>(null);
  const { gameState, startGame, handleAction, isPlaying } = useGameLogic(selectedCharacter);

  useEffect(() => {
    if (screen === 'playing' && selectedCharacter && !isPlaying) {
      startGame();
    }
  }, [screen, selectedCharacter, isPlaying, startGame]);

  const handleCharacterSelect = (characterId: string) => {
    const charId = characterId as CharacterId;
    setSelectedCharacter(charId);
    setScreen('playing');
  };

  const handleGameOver = () => {
    setScreen('gameover');
  };

  const handleRestart = () => {
    setScreen('playing');
    startGame();
  };

  const handleMainMenu = () => {
    setScreen('menu');
    setSelectedCharacter(null);
  };

  if (screen === 'menu') {
    return <CharacterSelection onSelect={handleCharacterSelect} />;
  }

  if (screen === 'gameover') {
    return (
      <GameOver
        score={gameState.score}
        character={gameState.character!}
        onRestart={handleRestart}
        onMainMenu={handleMainMenu}
      />
    );
  }

  return (
    <GameInterface
      character={gameState.character!}
      score={gameState.score}
      cashRegister={gameState.cashRegister}
      timeRemaining={gameState.timeRemaining}
      currentCustomer={gameState.currentCustomer}
      onAction={handleAction}
      onGameOver={handleGameOver}
    />
  );
}

export default App;
