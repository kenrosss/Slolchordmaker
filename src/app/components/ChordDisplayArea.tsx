import { motion, AnimatePresence } from "motion/react";
import {
  Plus,
  Minus,
  Save,
  X,
  CheckCircle,
} from "lucide-react";

interface ChordDisplayAreaProps {
  chords: string[];
  currentKey: string;
  currentSection: string;
  onTransposeUp: () => void;
  onTransposeDown: () => void;
  onSave: () => void;
  onFinish: () => void;
  onRemoveChord: (index: number) => void;
}

export function ChordDisplayArea({
  chords,
  currentKey,
  currentSection,
  onTransposeUp,
  onTransposeDown,
  onSave,
  onFinish,
  onRemoveChord,
}: ChordDisplayAreaProps) {
  return (
    <div className="flex-1 flex flex-col bg-white border border-gray-200 rounded-lg overflow-hidden">
      {/* Header with controls */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center gap-3">
          <h3 className="text-sm font-medium text-gray-700">
            Chord Progression
          </h3>
          <span className="text-xs text-gray-500">
            · {currentSection}
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Transpose Controls */}
          <div className="flex items-center gap-2 bg-white rounded-lg px-3 py-2 border border-gray-200">
            <button
              onClick={onTransposeDown}
              className="p-1 hover:bg-gray-100 rounded transition-colors"
              aria-label="Transpose down"
            >
              <Minus className="w-4 h-4 text-gray-700" />
            </button>
            <motion.div
              key={currentKey}
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="px-3 py-1 bg-gray-50 rounded border border-gray-200 min-w-[60px] text-center"
            >
              <span className="text-sm font-medium text-gray-900">
                Key: {currentKey}
              </span>
            </motion.div>
            <button
              onClick={onTransposeUp}
              className="p-1 hover:bg-gray-100 rounded transition-colors"
              aria-label="Transpose up"
            >
              <Plus className="w-4 h-4 text-gray-700" />
            </button>
          </div>

          {/* Save Button */}
          <button
            onClick={onSave}
            className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-all duration-200 hover:shadow-md"
          >
            <Save className="w-4 h-4" />
            <span className="text-sm font-medium">Save</span>
          </button>

          {/* Finish Button */}
          <button
            onClick={onFinish}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-200 hover:shadow-md"
          >
            <CheckCircle className="w-4 h-4" />
            <span className="text-sm font-medium">Finish</span>
          </button>
        </div>
      </div>

      {/* Chord Display */}
      <div className="flex-1 p-6 overflow-y-auto">
        {chords.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-400 text-sm">...</p>
          </div>
        ) : (
          <div className="flex flex-wrap gap-3">
            <AnimatePresence mode="popLayout">
              {chords.map((chord, index) => (
                <motion.div
                  key={`${chord}-${index}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                  layout
                  className="relative group"
                >
                  <div className="bg-gray-100 border border-gray-200 rounded-lg px-6 py-4 hover:bg-gray-50 transition-colors">
                    <span className="text-2xl font-medium text-gray-900 font-mono">
                      {chord}
                    </span>
                  </div>
                  <button
                    onClick={() => onRemoveChord(index)}
                    className="absolute -top-2 -right-2 p-1 bg-gray-900 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-700"
                    aria-label="Remove chord"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}