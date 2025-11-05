interface Action {
  id: string;
  label: string;
  color: string;
}

interface ActionButtonsProps {
  actions: Action[];
  onAction: (actionId: string) => void;
  disabled?: boolean;
}

export default function ActionButtons({ actions, onAction, disabled }: ActionButtonsProps) {
  const getColorClass = (color: string) => {
    const colors: Record<string, string> = {
      red: 'bg-red-500 hover:bg-red-600 shadow-red-300',
      green: 'bg-green-500 hover:bg-green-600 shadow-green-300',
      blue: 'bg-blue-500 hover:bg-blue-600 shadow-blue-300',
      orange: 'bg-orange-500 hover:bg-orange-600 shadow-orange-300',
      yellow: 'bg-yellow-500 hover:bg-yellow-600 shadow-yellow-300',
      gray: 'bg-gray-500 hover:bg-gray-600 shadow-gray-300'
    };
    return colors[color] || 'bg-gray-500 hover:bg-gray-600 shadow-gray-300';
  };

  return (
    <div className="grid grid-cols-1 gap-2 md:gap-3">
      {actions.map((action) => (
        <button
          key={action.id}
          onClick={() => onAction(action.id)}
          disabled={disabled}
          className={`${getColorClass(action.color)} text-white px-4 py-3 md:px-6 md:py-4 rounded-xl md:rounded-2xl font-bold text-base md:text-lg transition-all transform hover:scale-105 active:scale-95 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none`}
        >
          {action.label}
        </button>
      ))}
    </div>
  );
}
