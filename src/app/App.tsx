import { useState } from "react";
import { Music } from "lucide-react";
import { ChordRootButtons } from "./components/ChordRootButtons";
import { ChordTypePanel } from "./components/ChordTypePanel";
import { ChordDisplayArea } from "./components/ChordDisplayArea";
import { SectionSelector } from "./components/SectionSelector";
import { SummaryModal } from "./components/SummaryModal";

const NOTES = [
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#",
  "A",
  "A#",
  "B",
];
const SECTIONS = [
  "Intro",
  "Verse",
  "Pre-Chorus",
  "Chorus",
  "Refrain",
  "Bridge",
  "Outro",
];

interface SongData {
  title: string;
  key: string;
  sections: Record<string, string[]>;
}

function transposeChord(
  chord: string,
  semitones: number,
): string {
  // Extract root note (handles both single notes like "C" and sharps like "C#")
  let root = chord[0];
  let restOfChord = chord.slice(1);

  if (chord[1] === "#" || chord[1] === "b") {
    root = chord.slice(0, 2);
    restOfChord = chord.slice(2);
  }

  const index = NOTES.indexOf(root);
  if (index === -1) return chord;

  const newIndex = (index + semitones + 12) % 12;
  return NOTES[newIndex] + restOfChord;
}

export default function App() {
  const [selectedRoot, setSelectedRoot] = useState<
    string | null
  >(null);
  const [selectedSection, setSelectedSection] =
    useState("Verse");
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [songs, setSongs] = useState<SongData[]>([
    {
      title: "Song 1",
      key: "C",
      sections: {
        Intro: [],
        Verse: [],
        "Pre-Chorus": [],
        Chorus: [],
        Refrain: [],
        Bridge: [],
        Outro: [],
      },
    },
    {
      title: "Song 2",
      key: "C",
      sections: {
        Intro: [],
        Verse: [],
        "Pre-Chorus": [],
        Chorus: [],
        Refrain: [],
        Bridge: [],
        Outro: [],
      },
    },
    {
      title: "Song 3",
      key: "C",
      sections: {
        Intro: [],
        Verse: [],
        "Pre-Chorus": [],
        Chorus: [],
        Refrain: [],
        Bridge: [],
        Outro: [],
      },
    },
  ]);
  const [showSummary, setShowSummary] = useState(false);

  const currentSong = songs[currentSongIndex];
  const currentChords =
    currentSong.sections[selectedSection] || [];

  const handleSelectRoot = (root: string) => {
    setSelectedRoot(selectedRoot === root ? null : root);
  };

  const handleSelectChordType = (chord: string) => {
    setSongs(
      songs.map((song, idx) =>
        idx === currentSongIndex
          ? {
              ...song,
              sections: {
                ...song.sections,
                [selectedSection]: [...currentChords, chord],
              },
            }
          : song,
      ),
    );
    setSelectedRoot(null);
  };

  const handleRemoveChord = (index: number) => {
    setSongs(
      songs.map((song, idx) =>
        idx === currentSongIndex
          ? {
              ...song,
              sections: {
                ...song.sections,
                [selectedSection]: currentChords.filter(
                  (_, i) => i !== index,
                ),
              },
            }
          : song,
      ),
    );
  };

  const handleTransposeUp = () => {
    const semitones = 1;
    setSongs(
      songs.map((song, idx) => {
        if (idx !== currentSongIndex) return song;

        const transposedSections: Record<string, string[]> = {};
        Object.keys(song.sections).forEach((section) => {
          transposedSections[section] = song.sections[
            section
          ].map((chord) => transposeChord(chord, semitones));
        });

        const keyIndex = NOTES.indexOf(song.key);
        const newKey =
          keyIndex !== -1
            ? NOTES[(keyIndex + semitones) % 12]
            : song.key;

        return {
          ...song,
          key: newKey,
          sections: transposedSections,
        };
      }),
    );
  };

  const handleTransposeDown = () => {
    const semitones = -1;
    setSongs(
      songs.map((song, idx) => {
        if (idx !== currentSongIndex) return song;

        const transposedSections: Record<string, string[]> = {};
        Object.keys(song.sections).forEach((section) => {
          transposedSections[section] = song.sections[
            section
          ].map((chord) => transposeChord(chord, semitones));
        });

        const keyIndex = NOTES.indexOf(song.key);
        const newKey =
          keyIndex !== -1
            ? NOTES[(keyIndex + semitones + 12) % 12]
            : song.key;

        return {
          ...song,
          key: newKey,
          sections: transposedSections,
        };
      }),
    );
  };

  const handleSave = () => {
    console.log("Saving songs:", songs);
    alert("Songs saved successfully!");
  };

  const handleFinish = () => {
    setShowSummary(true);
  };

  const handleUpdateSongTitle = (
    index: number,
    title: string,
  ) => {
    setSongs(
      songs.map((song, idx) =>
        idx === index ? { ...song, title } : song,
      ),
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-6xl mx-auto px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Music className="w-6 h-6 text-gray-700" />
            <h1 className="text-3xl font-medium text-gray-900">
              SLOL Chord Maker
            </h1>
          </div>
          <p className="text-sm text-gray-500">
            Build your chord progression here
          </p>
        </div>

        {/* Song Selector */}
        <div className="mb-6 flex gap-2">
          {songs.map((song, index) => (
            <button
              key={index}
              onClick={() => setCurrentSongIndex(index)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                currentSongIndex === index
                  ? "bg-gray-900 text-white"
                  : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
              }`}
            >
              {song.title}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6">
          {/* Chord Selection Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <SectionSelector
              sections={SECTIONS}
              selectedSection={selectedSection}
              onSelectSection={setSelectedSection}
            />

            <h2 className="text-sm font-medium text-gray-700 mb-4 uppercase tracking-wide">
              Select Chord Root
            </h2>
            <ChordRootButtons
              selectedRoot={selectedRoot}
              onSelectRoot={handleSelectRoot}
            />
            <ChordTypePanel
              root={selectedRoot}
              onSelectChordType={handleSelectChordType}
            />
          </div>

          {/* Chord Display Section */}
          <div className="h-[400px]">
            <ChordDisplayArea
              chords={currentChords}
              currentKey={currentSong.key}
              currentSection={selectedSection}
              onTransposeUp={handleTransposeUp}
              onTransposeDown={handleTransposeDown}
              onSave={handleSave}
              onFinish={handleFinish}
              onRemoveChord={handleRemoveChord}
            />
          </div>
        </div>
      </div>

      <SummaryModal
        isOpen={showSummary}
        onClose={() => setShowSummary(false)}
        songs={songs}
        onUpdateSongTitle={handleUpdateSongTitle}
      />
    </div>
  );
}