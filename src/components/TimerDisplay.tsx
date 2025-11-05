interface TimerDisplayProps {
  timeRemaining: number;
  customerTimer: number;
}

export default function TimerDisplay({ timeRemaining, customerTimer }: TimerDisplayProps) {
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;
  const isUrgent = customerTimer <= 3;

  return (
    <div className="flex gap-1 md:gap-3">
      <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg md:rounded-xl p-2 md:p-4 shadow-lg border-2 md:border-4 border-blue-800">
        <div className="text-center">
          <div className="text-xl md:text-3xl mb-1">⏰</div>
          <div className="text-white text-xs md:text-sm">Смена</div>
          <div className="text-white text-lg md:text-2xl font-bold">
            {minutes}:{seconds.toString().padStart(2, '0')}
          </div>
        </div>
      </div>

      <div className={`rounded-lg md:rounded-xl p-2 md:p-4 shadow-lg border-2 md:border-4 transition-all ${
        isUrgent
          ? 'bg-gradient-to-br from-red-500 to-red-700 border-red-800 animate-pulse'
          : 'bg-gradient-to-br from-orange-500 to-orange-700 border-orange-800'
      }`}>
        <div className="text-center">
          <div className="text-xl md:text-3xl mb-1">⏱️</div>
          <div className="text-white text-xs md:text-sm">Клиент</div>
          <div className={`text-white text-2xl md:text-3xl font-bold ${isUrgent ? 'animate-bounce' : ''}`}>
            {customerTimer}
          </div>
        </div>
      </div>
    </div>
  );
}
