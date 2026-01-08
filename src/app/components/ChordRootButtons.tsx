interface ChordRootButtonsProps {
  selectedRoot: string | null;
  onSelectRoot: (root: string) => void;
}

const CHORD_ROOTS = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

export function ChordRootButtons({ selectedRoot, onSelectRoot }: ChordRootButtonsProps) {
  return (
    <div className="grid grid-cols-6 gap-2">
      {CHORD_ROOTS.map((root) => (
        <button
          key={root}
          onClick={() => onSelectRoot(root)}
          className={`px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
            selectedRoot === root
              ? 'bg-gray-900 text-white shadow-md scale-105'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-102'
          }`}
        >
          {root}
        </button>
      ))}
    </div>
  );
}
