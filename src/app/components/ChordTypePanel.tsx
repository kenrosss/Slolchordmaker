import { motion, AnimatePresence } from 'motion/react';

interface ChordTypePanelProps {
  root: string | null;
  onSelectChordType: (chord: string) => void;
}

const CHORD_TYPES = [
  { label: 'Major', suffix: '' },
  { label: 'Minor', suffix: 'm' },
  { label: 'Major 7', suffix: 'maj7' },
  { label: 'Minor 7', suffix: 'm7' },
  { label: 'Dominant 7', suffix: '7' },
  { label: 'Sus2', suffix: 'sus2' },
  { label: 'Sus4', suffix: 'sus4' },
  { label: 'Dim', suffix: 'dim' },
  { label: 'Aug', suffix: 'aug' },
  { label: '6', suffix: '6' },
  { label: 'Add9', suffix: 'add9' },
  { label: '9', suffix: '9' },
];

export function ChordTypePanel({ root, onSelectChordType }: ChordTypePanelProps) {
  return (
    <AnimatePresence>
      {root && (
        <motion.div
          initial={{ opacity: 0, y: -10, height: 0 }}
          animate={{ opacity: 1, y: 0, height: 'auto' }}
          exit={{ opacity: 0, y: -10, height: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="overflow-hidden"
        >
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mt-4">
            <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-3">
              Select Chord Type for {root}
            </div>
            <div className="grid grid-cols-4 gap-2">
              {CHORD_TYPES.map((type) => (
                <motion.button
                  key={type.suffix}
                  onClick={() => onSelectChordType(root + type.suffix)}
                  className="px-4 py-2 bg-white border border-gray-200 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-all duration-200"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {type.label}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
