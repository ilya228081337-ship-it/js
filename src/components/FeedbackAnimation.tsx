import { useEffect, useState } from 'react';

interface FeedbackAnimationProps {
  message: string;
  type: 'success' | 'error';
  onComplete: () => void;
}

export default function FeedbackAnimation({ message, type, onComplete }: FeedbackAnimationProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 300);
    }, 2000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  const bgColor = type === 'success' ? 'bg-green-500' : 'bg-red-500';
  const emoji = type === 'success' ? '✅' : '❌';

  return (
    <div
      className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 md:top-4 md:right-4 md:left-auto md:translate-x-0 z-50 transition-all duration-300 ${
        isVisible ? 'md:translate-x-0 translate-y-0 opacity-100' : 'md:translate-x-full translate-y-full opacity-0'
      }`}
    >
      <div className={`${bgColor} text-white px-4 py-3 md:px-6 md:py-4 rounded-xl md:rounded-2xl shadow-2xl border-2 md:border-4 border-white flex items-center gap-2 md:gap-3`}>
        <div className="text-2xl md:text-4xl">{emoji}</div>
        <p className="text-sm md:text-xl font-bold whitespace-nowrap">{message}</p>
      </div>
    </div>
  );
}
