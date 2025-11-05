import { useEffect, useState } from 'react';
import { Customer } from '../types/game';
import { CUSTOMER_VISUALS } from '../data/customerVisuals';

interface AnimatedCustomerProps {
  customer: Customer | null;
  isLeaving: boolean;
}

export default function AnimatedCustomer({ customer, isLeaving }: AnimatedCustomerProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [showBubble, setShowBubble] = useState(false);

  useEffect(() => {
    if (customer && !isLeaving) {
      setIsVisible(true);
      setTimeout(() => setShowBubble(true), 500);
    } else if (isLeaving) {
      setShowBubble(false);
    }
  }, [customer, isLeaving]);

  if (!customer || !isVisible) return null;

  const visual = CUSTOMER_VISUALS[customer.type];
  const sizeClass = {
    small: 'text-4xl md:text-6xl',
    medium: 'text-5xl md:text-8xl',
    large: 'text-6xl md:text-9xl'
  }[visual.size];

  return (
    <div className="relative">
      <div
        className={`transition-all duration-500 transform ${
          isVisible && !isLeaving
            ? 'translate-x-0 opacity-100 scale-100'
            : isLeaving
            ? 'translate-x-full opacity-0 scale-75'
            : '-translate-x-full opacity-0 scale-75'
        }`}
      >
        <div
          className={`${sizeClass} animate-bounce-slow`}
          style={{
            filter: visual.expression === 'angry' ? 'hue-rotate(340deg)' : 'none'
          }}
        >
          {visual.emoji}
        </div>

        {visual.expression === 'angry' && (
          <div className="absolute -top-2 md:-top-4 -right-2 md:-right-4 text-xl md:text-3xl animate-pulse">
            💢
          </div>
        )}

        {visual.expression === 'talking' && (
          <div className="absolute -top-1 md:-top-2 -right-1 md:-right-2 text-lg md:text-2xl animate-bounce">
            💬💬💬
          </div>
        )}

        {visual.expression === 'excited' && (
          <div className="absolute -top-2 md:-top-4 right-0 text-xl md:text-3xl animate-pulse">
            ✨
          </div>
        )}
      </div>

      {showBubble && !isLeaving && (
        <div
          className="absolute top-0 left-full ml-2 md:ml-8 bg-white rounded-xl md:rounded-3xl shadow-2xl p-3 md:p-6 max-w-[200px] md:max-w-md animate-fade-in"
          style={{
            border: `2px solid ${visual.color}`,
          }}
        >
          <div className="relative">
            <div
              className="absolute -left-4 md:-left-10 top-4 md:top-8 w-0 h-0"
              style={{
                borderTop: '8px solid transparent',
                borderBottom: '8px solid transparent',
                borderRight: `8px solid ${visual.color}`,
              }}
            />
            <p className="text-sm md:text-xl font-bold text-gray-800 italic">
              "{customer.request}"
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
