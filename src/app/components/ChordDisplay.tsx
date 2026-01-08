import { Plus, Minus, Save } from 'lucide-react';

interface Section {
  id: string;
  name: string;
  chords: string;
}

interface ChordDisplayProps {
  songTitle: string;
  sections: Section[];
  selectedSectionId: string;
  onSelectSection: (sectionId: string) => void;
  currentKey: string;
  onTransposeUp: () => void;
  onTransposeDown: () => void;
  onSave: () => void;
  onUpdateChords: (chords: string) => void;
}

export function ChordDisplay({
  songTitle,
  sections,
  selectedSectionId,
  onSelectSection,
  currentKey,
  onTransposeUp,
  onTransposeDown,
  onSave,
  onUpdateChords,
}: ChordDisplayProps) {
  const selectedSection = sections.find((s) => s.id === selectedSectionId);

  return (
    <div className="flex-1 flex flex-col h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 px-8 py-6">
        <h2 className="text-2xl font-medium text-gray-900">{songTitle}</h2>
      </div>

      {/* Controls */}
      <div className="border-b border-gray-200 px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Section Buttons */}
          <div className="flex gap-2">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => onSelectSection(section.id)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  selectedSectionId === section.id
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {section.name}
              </button>
            ))}
          </div>

          {/* Transpose & Save */}
          <div className="flex items-center gap-4">
            {/* Transpose Controls */}
            <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2 border border-gray-200">
              <button
                onClick={onTransposeDown}
                className="p-1 hover:bg-gray-200 rounded transition-colors"
                aria-label="Transpose down"
              >
                <Minus className="w-4 h-4 text-gray-700" />
              </button>
              <div className="px-3 py-1 bg-white rounded border border-gray-200 min-w-[60px] text-center">
                <span className="text-sm font-medium text-gray-900">
                  Key: {currentKey}
                </span>
              </div>
              <button
                onClick={onTransposeUp}
                className="p-1 hover:bg-gray-200 rounded transition-colors"
                aria-label="Transpose up"
              >
                <Plus className="w-4 h-4 text-gray-700" />
              </button>
            </div>

            {/* Save Button */}
            <button
              onClick={onSave}
              className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors"
            >
              <Save className="w-4 h-4" />
              <span className="text-sm font-medium">Save</span>
            </button>
          </div>
        </div>
      </div>

      {/* Chord Display Area */}
      <div className="flex-1 overflow-y-auto px-8 py-6">
        <div className="max-w-4xl">
          <textarea
            value={selectedSection?.chords || ''}
            onChange={(e) => onUpdateChords(e.target.value)}
            className="w-full h-full min-h-[500px] p-6 font-mono text-base text-gray-800 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent resize-none"
            placeholder="Enter chords and lyrics here..."
            spellCheck={false}
          />
        </div>
      </div>
    </div>
  );
}
