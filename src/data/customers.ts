import { CustomerType } from '../types/game';

export interface CustomerTemplate {
  type: CustomerType;
  name: string;
  requests: string[];
  correctActions: string[];
  wrongActions: string[];
  timeLimit: number;
  points: number;
  frequency: number;
}

export const CUSTOMER_TEMPLATES: CustomerTemplate[] = [
  {
    type: 'skuf',
    name: 'Скуф',
    requests: [
      'Где это ваше соевое мясо? Оно вообще настоящее?',
      'Я не понимаю, зачем нужно это соевое мясо!',
      'Дайте мне это соевое мясо, я разберусь!',
      'Это что за хипстерская еда? Верните нормальное мясо!'
    ],
    correctActions: ['refuse', 'explain'],
    wrongActions: ['sell'],
    timeLimit: 10,
    points: 50,
    frequency: 25
  },
  {
    type: 'schoolkid',
    name: 'Школьник',
    requests: [
      'Дайте энергетик!',
      'Мне бульдак 3х спайси!',
      'Можно энергетик и бульдак?',
      'Я взрослый уже, дайте энергетик!'
    ],
    correctActions: ['ask-passport'],
    wrongActions: ['sell'],
    timeLimit: 8,
    points: 40,
    frequency: 20
  },
  {
    type: 'schoolkid',
    name: 'Школьник (соевое мясо)',
    requests: [
      'Дайте соевое мясо!',
      'Мне немного соевого мяса',
      'Можно соевое мясо?',
      'Я хочу попробовать соевое мясо'
    ],
    correctActions: ['sell-limited'],
    wrongActions: ['sell-много', 'refuse'],
    timeLimit: 8,
    points: 30,
    frequency: 18
  },
  {
    type: 'boss-natasha',
    name: 'Босс Наташа',
    requests: [
      'МНЕ НУЖНО ФОТО ТОВАРА! СЕЙЧАС ЖЕ!',
      'ГДЕ ФОТО?! Я ЖДУ!',
      'ПОКАЖИТЕ МНЕ ФОТО ТОВАРА НЕМЕДЛЕННО!',
      'Я ЖДУ ОТЧЕТ С ФОТОГРАФИЯМИ!'
    ],
    correctActions: ['send-photo'],
    wrongActions: ['ignore', 'refuse'],
    timeLimit: 12,
    points: 100,
    frequency: 8
  },
  {
    type: 'as-oppa',
    name: 'Ас Оппа',
    requests: [
      'Мне нужны деньги из кассы',
      'Дай деньги из кассы',
      'Касса, быстро',
      'Инкассация, давай кассу'
    ],
    correctActions: ['give-then-ask'],
    wrongActions: ['refuse', 'give'],
    timeLimit: 15,
    points: 80,
    frequency: 7
  },
  {
    type: 'katya',
    name: 'Катя',
    requests: [
      'Привет! Как дела? А знаешь, сегодня такая погода...',
      'О, слушай, я тут вспомнила одну историю...',
      'Кстати, ты не поверишь что случилось вчера!',
      'Ой, привет! А ты знаешь, что мне сегодня приснилось?'
    ],
    correctActions: ['handle-if-ira'],
    wrongActions: ['listen'],
    timeLimit: 10,
    points: 60,
    frequency: 10
  },
  {
    type: 'grandma',
    name: 'Бабушка',
    requests: [
      'Милочка, а где у вас творог? Я плохо вижу...',
      'Деточка, подскажи, сколько стоит этот хлеб?',
      'Помоги мне, пожалуйста, я не понимаю эти ваши цены',
      'Внученька, покажи где у вас молоко'
    ],
    correctActions: ['help'],
    wrongActions: ['ignore', 'rush'],
    timeLimit: 12,
    points: 45,
    frequency: 18
  },
  {
    type: 'student',
    name: 'Студент',
    requests: [
      'Есть что-то дешевое? У меня только 100 рублей...',
      'Можно самую дешевую лапшу?',
      'Дайте что-нибудь поесть, денег мало',
      'У вас есть что-то за 50 рублей?'
    ],
    correctActions: ['sell-cheap'],
    wrongActions: ['refuse', 'sell-expensive'],
    timeLimit: 9,
    points: 35,
    frequency: 22
  },
  {
    type: 'hipster',
    name: 'Хипстер',
    requests: [
      'У вас есть органическая киноа?',
      'Это точно веган? Покажите состав!',
      'А у вас есть что-то без глютена и лактозы?',
      'Мне нужен кокосовый йогурт с пробиотиками'
    ],
    correctActions: ['show-ingredients'],
    wrongActions: ['refuse', 'lie'],
    timeLimit: 10,
    points: 40,
    frequency: 15
  },
  {
    type: 'delivery',
    name: 'Курьер',
    requests: [
      'Мне срочно 5 бутылок воды! Быстрее!',
      'Дайте сигареты и зажигалку, я спешу!',
      'Быстро! У меня ещё 10 заказов!',
      'Времени нет! Давайте быстрее!'
    ],
    correctActions: ['fast-service'],
    wrongActions: ['slow', 'refuse'],
    timeLimit: 6,
    points: 50,
    frequency: 12
  },
  {
    type: 'tourist',
    name: 'Турист',
    requests: [
      'Hello! Do you have... соевое мясо?',
      'Excuse me, where is японская лапша?',
      'Sorry, I don\'t speak Russian... Водка?',
      'Can you help me? I need chopsticks...'
    ],
    correctActions: ['help-translate'],
    wrongActions: ['ignore', 'rude'],
    timeLimit: 11,
    points: 55,
    frequency: 10
  },
  {
    type: 'old-man',
    name: 'Дед',
    requests: [
      'В мое время такого не было! Верните водку!',
      'Что за цены?! Грабеж! При СССР было дешевле!',
      'Молодежь совсем обнаглела! Где уважение к старшим?',
      'Раньше трава была зеленее, а продукты качественнее!'
    ],
    correctActions: ['listen-politely'],
    wrongActions: ['argue', 'ignore'],
    timeLimit: 13,
    points: 50,
    frequency: 14
  },
  {
    type: 'construction',
    name: 'Строитель',
    requests: [
      'Давай 10 банок энергетика! Смена длинная!',
      'Мне чипсы, орешки и пиво! Быстрее!',
      'Дай всё что есть острого и калорийного!',
      'Нужно много воды и перекус, работа тяжелая'
    ],
    correctActions: ['serve-bulk'],
    wrongActions: ['refuse', 'slow'],
    timeLimit: 8,
    points: 45,
    frequency: 16
  },
  {
    type: 'manager',
    name: 'Менеджер',
    requests: [
      'Мне нужен чек! И обязательно с печатью!',
      'Это не входит в бюджет! Есть дешевле?',
      'Давайте оформим корпоративный заказ',
      'Нужна справка для бухгалтерии'
    ],
    correctActions: ['provide-docs'],
    wrongActions: ['refuse', 'no-receipt'],
    timeLimit: 11,
    points: 55,
    frequency: 11
  },
  {
    type: 'teenager',
    name: 'Подросток',
    requests: [
      'Дай снюс! Или вейп есть?',
      'А у вас есть алкоголь? Ну типа слабый?',
      'Мне сиги! Я взрослый уже!',
      'Дай энергетик! Мне можно, мне 18!'
    ],
    correctActions: ['refuse-underage'],
    wrongActions: ['sell'],
    timeLimit: 7,
    points: 60,
    frequency: 13
  },
  {
    type: 'regular',
    name: 'Обычный покупатель',
    requests: [
      'Здравствуйте, можно хлеб?',
      'Пожалуйста, молоко',
      'Мне, пожалуйста, воду',
      'Добрый день, сок апельсиновый есть?'
    ],
    correctActions: ['sell'],
    wrongActions: ['refuse'],
    timeLimit: 7,
    points: 20,
    frequency: 30
  }
];
