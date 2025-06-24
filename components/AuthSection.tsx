'use client';

import { Music2, CheckCircle, AlertCircle } from 'lucide-react';
import { PlatformConnection } from '@/lib/types';

interface AuthSectionProps {
  connections: PlatformConnection[];
  onConnect: (platform: 'spotify' | 'tidal') => void;
  onDisconnect: (platform: 'spotify' | 'tidal') => void;
}

export default function AuthSection({ connections, onConnect, onDisconnect }: AuthSectionProps) {
  const spotifyConnection = connections.find(c => c.platform === 'spotify');
  const tidalConnection = connections.find(c => c.platform === 'tidal');

  return (
    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
      {/* Spotify Card */}
      <div className="card p-8 hover:scale-105 transition-transform duration-300">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-spotify-500 rounded-full flex items-center justify-center">
              <Music2 className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">Spotify</h3>
              <p className="text-gray-600">Connect your Spotify account</p>
            </div>
          </div>
          {spotifyConnection?.connected ? (
            <CheckCircle className="h-8 w-8 text-green-500" />
          ) : (
            <AlertCircle className="h-8 w-8 text-gray-400" />
          )}
        </div>

        {spotifyConnection?.connected ? (
          <div className="space-y-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="text-green-800 font-medium">Connected</span>
              </div>
              <p className="text-green-700 mt-1">
                Logged in as {spotifyConnection.user?.name}
              </p>
            </div>
            <button
              onClick={() => onDisconnect('spotify')}
              className="w-full px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors duration-200 font-medium"
            >
              Disconnect
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-gray-600">
              Connect your Spotify account to access your playlists and transfer them to Tidal.
            </p>
            <button
              onClick={() => onConnect('spotify')}
              className="w-full platform-spotify px-6 py-3 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              Connect Spotify
            </button>
          </div>
        )}
      </div>

      {/* Tidal Card */}
      <div className="card p-8 hover:scale-105 transition-transform duration-300">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-tidal-500 rounded-full flex items-center justify-center">
              <Music2 className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">Tidal</h3>
              <p className="text-gray-600">Connect your Tidal account</p>
            </div>
          </div>
          {tidalConnection?.connected ? (
            <CheckCircle className="h-8 w-8 text-green-500" />
          ) : (
            <AlertCircle className="h-8 w-8 text-gray-400" />
          )}
        </div>

        {tidalConnection?.connected ? (
          <div className="space-y-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="text-green-800 font-medium">Connected</span>
              </div>
              <p className="text-green-700 mt-1">
                Logged in as {tidalConnection.user?.name}
              </p>
            </div>
            <button
              onClick={() => onDisconnect('tidal')}
              className="w-full px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors duration-200 font-medium"
            >
              Disconnect
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-gray-600">
              Connect your Tidal account to access your playlists and transfer them to Spotify.
            </p>
            <button
              onClick={() => onConnect('tidal')}
              className="w-full platform-tidal px-6 py-3 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              Connect Tidal
            </button>
          </div>
        )}
      </div>
    </div>
  );
}