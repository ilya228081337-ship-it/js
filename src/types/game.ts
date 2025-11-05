export type CharacterId = 'ira' | 'sashka' | 'polinka';

export interface Character {
  id: CharacterId;
  name: string;
  description: string;
  specialAbility: string;
  image: string;
}

export type CustomerType =
  | 'skuf'
  | 'schoolkid'
  | 'regular'
  | 'boss-natasha'
  | 'as-oppa'
  | 'katya'
  | 'grandma'
  | 'student'
  | 'hipster'
  | 'delivery'
  | 'tourist'
  | 'old-man'
  | 'construction'
  | 'manager'
  | 'teenager';

export interface Customer {
  id: string;
  type: CustomerType;
  name: string;
  request: string;
  correctAction: string;
  timeLimit: number;
  points: number;
  arrived: number;
}

export interface GameState {
  character: CharacterId | null;
  score: number;
  cashRegister: number;
  level: number;
  gameOver: boolean;
  timeRemaining: number;
  customers: Customer[];
  currentCustomer: Customer | null;
  consecutiveCorrect: number;
}
