import { CustomerType } from '../types/game';

export interface CustomerVisual {
  emoji: string;
  color: string;
  size: 'small' | 'medium' | 'large';
  expression: string;
}

export const CUSTOMER_VISUALS: Record<CustomerType, CustomerVisual> = {
  skuf: {
    emoji: '🧔',
    color: '#8B4513',
    size: 'large',
    expression: 'angry'
  },
  schoolkid: {
    emoji: '🧑‍🎓',
    color: '#4169E1',
    size: 'small',
    expression: 'excited'
  },
  regular: {
    emoji: '🙂',
    color: '#32CD32',
    size: 'medium',
    expression: 'neutral'
  },
  'boss-natasha': {
    emoji: '👩‍💼',
    color: '#DC143C',
    size: 'large',
    expression: 'angry'
  },
  'as-oppa': {
    emoji: '👔',
    color: '#4B0082',
    size: 'medium',
    expression: 'serious'
  },
  katya: {
    emoji: '👩‍🦱',
    color: '#FF69B4',
    size: 'medium',
    expression: 'talking'
  },
  grandma: {
    emoji: '👵',
    color: '#9370DB',
    size: 'medium',
    expression: 'neutral'
  },
  student: {
    emoji: '🧑‍💻',
    color: '#20B2AA',
    size: 'medium',
    expression: 'neutral'
  },
  hipster: {
    emoji: '🧔‍♂️',
    color: '#FF6347',
    size: 'medium',
    expression: 'neutral'
  },
  delivery: {
    emoji: '🛵',
    color: '#FFD700',
    size: 'medium',
    expression: 'excited'
  },
  tourist: {
    emoji: '📸',
    color: '#87CEEB',
    size: 'medium',
    expression: 'excited'
  },
  'old-man': {
    emoji: '👴',
    color: '#696969',
    size: 'medium',
    expression: 'angry'
  },
  construction: {
    emoji: '👷',
    color: '#FF8C00',
    size: 'large',
    expression: 'neutral'
  },
  manager: {
    emoji: '👨‍💼',
    color: '#2F4F4F',
    size: 'medium',
    expression: 'serious'
  },
  teenager: {
    emoji: '🧑‍🎤',
    color: '#FF1493',
    size: 'small',
    expression: 'excited'
  }
};
