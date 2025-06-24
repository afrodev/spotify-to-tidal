export interface User {
  id: string;
  email: string;
  name?: string;
  spotifyId?: string;
  tidalId?: string;
  spotifyAccessToken?: string;
  tidalAccessToken?: string;
}

export interface Playlist {
  id: string;
  name: string;
  description?: string;
  trackCount: number;
  imageUrl?: string;
  platform: 'spotify' | 'tidal';
  isPublic: boolean;
  externalId: string;
}

export interface Track {
  id: string;
  name: string;
  artist: string;
  album: string;
  duration: number;
  imageUrl?: string;
}

export interface TransferProgress {
  id: string;
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  totalTracks: number;
  transferredTracks: number;
  failedTracks: number;
  errorMessage?: string;
}

export interface PlatformConnection {
  platform: 'spotify' | 'tidal';
  connected: boolean;
  user?: {
    id: string;
    name: string;
    email?: string;
  };
}