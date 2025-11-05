import { Character } from '../types/game';
import { CHARACTERS } from '../data/characters';

interface CharacterSelectionProps {
  onSelect: (characterId: string) => void;
}

export default function CharacterSelection({ onSelect }: CharacterSelectionProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center p-4">
      <div className="max-w-6xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-orange-900 mb-4">
            Защитники Япоши
          </h1>
          <p className="text-xl text-orange-700">
            Выберите персонажа для начала игры
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {CHARACTERS.map((character: Character) => (
            <div
              key={character.id}
              onClick={() => onSelect(character.id)}
              className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 cursor-pointer border-4 border-transparent hover:border-orange-400"
            >
              <div className="text-center">
                <div className="mb-6">
                  {character.image.startsWith('/') ? (
                    <img
                      src={character.image}
                      alt={character.name}
                      className="w-48 h-48 mx-auto rounded-full object-cover border-4 border-orange-200"
                    />
                  ) : (
                    <div className="text-8xl">{character.image}</div>
                  )}
                </div>
                <h2 className="text-3xl font-bold text-gray-800 mb-3">
                  {character.name}
                </h2>
                <p className="text-gray-600 mb-4 text-lg">
                  {character.description}
                </p>
                <div className="bg-orange-50 rounded-lg p-4">
                  <p className="text-sm font-semibold text-orange-900 mb-2">
                    Особая способность:
                  </p>
                  <p className="text-sm text-orange-700">
                    {character.specialAbility}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-white rounded-xl p-6 shadow-lg">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Правила игры:</h3>
          <ul className="space-y-2 text-gray-700">
            <li>• Скуфы пытаются разломать магазин - не продавайте им соевое мясо!</li>
            <li>• Школьникам можно продать немного соевого мяса, но не слишком много</li>
            <li>• Спрашивайте паспорт у школьников, покупающих энергетики и бульдак 3х спайси</li>
            <li>• Босс Наташа требует фото товара - отправляйте быстро!</li>
            <li>• Ас Оппа забирает деньги - дайте, но попросите вернуть</li>
            <li>• Катя много болтает - только Ира, Саша и Полина могут с ней справиться</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
