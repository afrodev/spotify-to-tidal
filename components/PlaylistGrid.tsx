'use client';

import { useState } from 'react';
import { Music, Users, Lock, Globe, CheckCircle2 } from 'lucide-react';
import { Playlist } from '@/lib/types';

interface PlaylistGridProps {
  playlists: Playlist[];
  selectedPlaylists: string[];
  onPlaylistSelect: (playlistId: string) => void;
  platform: 'spotify' | 'tidal';
}

export default function PlaylistGrid({ 
  playlists, 
  selectedPlaylists, 
  onPlaylistSelect, 
  platform 
}: PlaylistGridProps) {
  const [hoveredPlaylist, setHoveredPlaylist] = useState<string | null>(null);

  if (playlists.length === 0) {
    return (
      <div className="text-center py-12">
        <Music className="h-16 w-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-600 mb-2">No Playlists Found</h3>
        <p className="text-gray-500">
          Connect your {platform} account to see your playlists here.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {playlists.map((playlist) => {
        const isSelected = selectedPlaylists.includes(playlist.id);
        const isHovered = hoveredPlaylist === playlist.id;

        return (
          <div
            key={playlist.id}
            className={`card cursor-pointer transition-all duration-300 overflow-hidden ${
              isSelected 
                ? 'ring-2 ring-blue-500 shadow-xl scale-105' 
                : 'hover:shadow-xl hover:scale-105'
            }`}
            onClick={() => onPlaylistSelect(playlist.id)}
            onMouseEnter={() => setHoveredPlaylist(playlist.id)}
            onMouseLeave={() => setHoveredPlaylist(null)}
          >
            {/* Playlist Image */}
            <div className="relative h-48 bg-gradient-to-br from-gray-200 to-gray-300 overflow-hidden">
              {playlist.imageUrl ? (
                <img
                  src={playlist.imageUrl}
                  alt={playlist.name}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-400 to-purple-500">
                  <Music className="h-16 w-16 text-white opacity-80" />
                </div>
              )}
              
              {/* Selection Overlay */}
              {isSelected && (
                <div className="absolute inset-0 bg-blue-500/20 flex items-center justify-center">
                  <div className="bg-blue-500 rounded-full p-2">
                    <CheckCircle2 className="h-8 w-8 text-white" />
                  </div>
                </div>
              )}

              {/* Platform Badge */}
              <div className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-medium ${
                platform === 'spotify' 
                  ? 'bg-spotify-500 text-white' 
                  : 'bg-tidal-500 text-white'
              }`}>
                {platform.charAt(0).toUpperCase() + platform.slice(1)}
              </div>

              {/* Privacy Badge */}
              <div className="absolute top-3 right-3">
                {playlist.isPublic ? (
                  <Globe className="h-5 w-5 text-white drop-shadow-lg" />
                ) : (
                  <Lock className="h-5 w-5 text-white drop-shadow-lg" />
                )}
              </div>
            </div>

            {/* Playlist Info */}
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 leading-tight">
                {playlist.name}
              </h3>
              
              {playlist.description && (
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {playlist.description}
                </p>
              )}

              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <Music className="h-4 w-4" />
                  <span>{playlist.trackCount} tracks</span>
                </div>
                
                <div className="flex items-center space-x-1">
                  {playlist.isPublic ? (
                    <>
                      <Users className="h-4 w-4" />
                      <span>Public</span>
                    </>
                  ) : (
                    <>
                      <Lock className="h-4 w-4" />
                      <span>Private</span>
                    </>
                  )}
                </div>
              </div>

              {/* Selection Indicator */}
              {isSelected && (
                <div className="mt-3 flex items-center space-x-2 text-blue-600">
                  <CheckCircle2 className="h-4 w-4" />
                  <span className="text-sm font-medium">Selected for transfer</span>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}