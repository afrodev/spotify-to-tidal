'use client';

import { useState, useEffect } from 'react';
import { Music, ArrowLeftRight, Zap, Shield, Clock, Users } from 'lucide-react';
import AuthSection from '@/components/AuthSection';
import PlaylistGrid from '@/components/PlaylistGrid';
import TransferSection from '@/components/TransferSection';
import { PlatformConnection, Playlist } from '@/lib/types';

export default function HomePage() {
  const [connections, setConnections] = useState<PlatformConnection[]>([
    { platform: 'spotify', connected: false },
    { platform: 'tidal', connected: false },
  ]);
  
  const [playlists, setPlaylists] = useState<{
    spotify: Playlist[];
    tidal: Playlist[];
  }>({
    spotify: [],
    tidal: [],
  });
  
  const [selectedPlaylists, setSelectedPlaylists] = useState<string[]>([]);
  const [transferDirection, setTransferDirection] = useState<'spotify-to-tidal' | 'tidal-to-spotify'>('spotify-to-tidal');

  const handleConnect = async (platform: 'spotify' | 'tidal') => {
    // Mock connection for demo
    setConnections(prev => 
      prev.map(conn => 
        conn.platform === platform 
          ? { ...conn, connected: true, user: { id: '1', name: `${platform} User` } }
          : conn
      )
    );

    // Load mock playlists
    const mockPlaylists: Playlist[] = [
      {
        id: `${platform}-1`,
        name: 'My Favorites',
        description: 'All my favorite songs',
        trackCount: 42,
        imageUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
        platform,
        isPublic: false,
        externalId: `${platform}-1`,
      },
      {
        id: `${platform}-2`,
        name: 'Workout Mix',
        description: 'High energy tracks for workouts',
        trackCount: 28,
        imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop',
        platform,
        isPublic: true,
        externalId: `${platform}-2`,
      },
      {
        id: `${platform}-3`,
        name: 'Chill Vibes',
        description: 'Relaxing music for any time',
        trackCount: 35,
        imageUrl: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300&h=300&fit=crop',
        platform,
        isPublic: false,
        externalId: `${platform}-3`,
      },
    ];

    setPlaylists(prev => ({
      ...prev,
      [platform]: mockPlaylists,
    }));
  };

  const handleDisconnect = (platform: 'spotify' | 'tidal') => {
    setConnections(prev => 
      prev.map(conn => 
        conn.platform === platform 
          ? { ...conn, connected: false, user: undefined }
          : conn
      )
    );
    setPlaylists(prev => ({
      ...prev,
      [platform]: [],
    }));
  };

  const handlePlaylistSelect = (playlistId: string) => {
    setSelectedPlaylists(prev => 
      prev.includes(playlistId)
        ? prev.filter(id => id !== playlistId)
        : [...prev, playlistId]
    );
  };

  const handleTransfer = async () => {
    console.log('Transferring playlists:', selectedPlaylists);
    console.log('Direction:', transferDirection);
    // Transfer logic will be implemented here
  };

  const bothConnected = connections.every(conn => conn.connected);
  const sourcePlatform = transferDirection === 'spotify-to-tidal' ? 'spotify' : 'tidal';
  const targetPlatform = transferDirection === 'spotify-to-tidal' ? 'tidal' : 'spotify';

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="relative">
                <Music className="h-20 w-20 text-white animate-float" />
                <div className="absolute -top-2 -right-2 h-6 w-6 bg-yellow-400 rounded-full animate-pulse"></div>
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Playlist Transfer
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Seamlessly transfer your playlists between Spotify and Tidal with one click
            </p>
            <div className="flex items-center justify-center space-x-4 text-white/80">
              <div className="flex items-center space-x-2">
                <Zap className="h-5 w-5" />
                <span>Lightning Fast</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5" />
                <span>Secure</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5" />
                <span>Real-time</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Auth Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Connect Your Accounts
          </h2>
          <AuthSection
            connections={connections}
            onConnect={handleConnect}
            onDisconnect={handleDisconnect}
          />
        </div>

        {bothConnected && (
          <>
            {/* Transfer Controls */}
            <div className="mb-12">
              <TransferSection
                transferDirection={transferDirection}
                onDirectionChange={setTransferDirection}
                selectedCount={selectedPlaylists.length}
                onTransfer={handleTransfer}
                disabled={selectedPlaylists.length === 0}
              />
            </div>

            {/* Playlists Grid */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                Select Playlists to Transfer
              </h2>
              <PlaylistGrid
                playlists={playlists[sourcePlatform]}
                selectedPlaylists={selectedPlaylists}
                onPlaylistSelect={handlePlaylistSelect}
                platform={sourcePlatform}
              />
            </div>
          </>
        )}

        {/* Features Section */}
        <div className="py-16 bg-white rounded-2xl shadow-xl">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Why Choose Our Platform?
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ArrowLeftRight className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Bidirectional Transfer</h3>
                <p className="text-gray-600">Transfer playlists from Spotify to Tidal or vice versa with ease.</p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Lightning Fast</h3>
                <p className="text-gray-600">Advanced matching algorithms ensure quick and accurate transfers.</p>
              </div>
              <div className="text-center">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Trusted by Thousands</h3>
                <p className="text-gray-600">Join thousands of users who have successfully transferred their music.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}