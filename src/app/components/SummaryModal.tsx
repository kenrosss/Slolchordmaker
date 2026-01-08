import { motion } from 'motion/react';
import { X, Music } from 'lucide-react';

interface SongData {
  title: string;
  key: string;
  sections: Record<string, string[]>;
}

interface SummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  songs: SongData[];
  onUpdateSongTitle: (index: number, title: string) => void;
}

const SECTIONS = ['Intro', 'Verse', 'Pre-Chorus', 'Chorus', 'Refrain', 'Bridge', 'Outro'];

export function SummaryModal({
  isOpen,
  onClose,
  songs,
  onUpdateSongTitle,
}: SummaryModalProps) {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-gray-900 z-50 overflow-hidden"
      onClick={onClose}
    >
      <div className="h-full flex flex-col" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="bg-black text-white px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-2 sm:gap-3">
            <Music className="w-5 h-5 sm:w-6 sm:h-6" />
            <h2 className="text-lg sm:text-xl font-medium">Chord Progressions</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 sm:p-2 hover:bg-white/10 rounded-lg transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content - Full screen grid */}
        <div className="flex-1 overflow-hidden p-2 sm:p-4">
          <div className="h-full grid grid-cols-1 lg:grid-cols-3 gap-2 sm:gap-4">
            {songs.map((song, songIndex) => (
              <motion.div
                key={songIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: songIndex * 0.1 }}
                className="bg-white rounded-lg flex flex-col overflow-hidden border-2 border-gray-300"
              >
                {/* Song Title Input */}
                <div className="bg-gray-100 px-3 sm:px-4 py-2 sm:py-3 border-b-2 border-gray-300 flex-shrink-0">
                  <input
                    type="text"
                    value={song.title}
                    onChange={(e) => onUpdateSongTitle(songIndex, e.target.value)}
                    className="w-full bg-white border border-gray-300 rounded px-2 sm:px-3 py-1 sm:py-1.5 text-sm sm:text-base font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900"
                    placeholder="Song Title"
                  />
                  <div className="text-xs sm:text-sm text-gray-600 mt-1 font-medium">
                    Key: {song.key}
                  </div>
                </div>

                {/* Sections - Scrollable but compact */}
                <div className="flex-1 overflow-y-auto p-2 sm:p-3 space-y-1.5 sm:space-y-2">
                  {SECTIONS.map((section) => {
                    const chords = song.sections[section] || [];
                    if (chords.length === 0) return null;

                    return (
                      <div
                        key={section}
                        className="bg-gray-50 border border-gray-300 rounded p-2 sm:p-2.5"
                      >
                        <div className="text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-1.5">
                          {section}
                        </div>
                        <div className="flex flex-wrap gap-1.5 sm:gap-2">
                          {chords.map((chord, index) => (
                            <div
                              key={`${chord}-${index}`}
                              className="bg-white border-2 border-gray-400 rounded px-2 sm:px-3 py-1 sm:py-1.5"
                            >
                              <span className="text-xl sm:text-2xl font-bold text-gray-900 font-mono">
                                {chord}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                  
                  {/* Show message if no chords */}
                  {SECTIONS.every((section) => (song.sections[section] || []).length === 0) && (
                    <div className="flex items-center justify-center h-full">
                      <p className="text-gray-400 text-xs sm:text-sm italic">
                        No chords added
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
