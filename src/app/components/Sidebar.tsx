import { Music } from 'lucide-react';

interface Song {
  id: string;
  title: string;
}

interface SidebarProps {
  songs: Song[];
  selectedSongId: string;
  onSelectSong: (songId: string) => void;
}

export function Sidebar({ songs, selectedSongId, onSelectSong }: SidebarProps) {
  return (
    <div className="w-64 bg-gray-50 border-r border-gray-200 h-screen flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <Music className="w-5 h-5 text-gray-700" />
          <h1 className="text-lg font-medium text-gray-900">Chord Organizer</h1>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        <div className="p-3">
          <h2 className="px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wide">
            Songs
          </h2>
          <ul className="space-y-1 mt-1">
            {songs.map((song) => (
              <li key={song.id}>
                <button
                  onClick={() => onSelectSong(song.id)}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                    selectedSongId === song.id
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {song.title}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
