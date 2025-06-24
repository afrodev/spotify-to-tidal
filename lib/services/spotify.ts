import axios from 'axios';
import { Playlist, Track } from '@/lib/types';

const SPOTIFY_API_BASE = 'https://api.spotify.com/v1';

export class SpotifyService {
  private accessToken: string;

  constructor(accessToken: string) {
    this.accessToken = accessToken;
  }

  private getHeaders() {
    return {
      Authorization: `Bearer ${this.accessToken}`,
      'Content-Type': 'application/json',
    };
  }

  async getCurrentUser() {
    try {
      const response = await axios.get(`${SPOTIFY_API_BASE}/me`, {
        headers: this.getHeaders(),
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching Spotify user:', error);
      throw error;
    }
  }

  async getUserPlaylists(): Promise<Playlist[]> {
    try {
      const response = await axios.get(`${SPOTIFY_API_BASE}/me/playlists?limit=50`, {
        headers: this.getHeaders(),
      });

      return response.data.items.map((playlist: any) => ({
        id: playlist.id,
        name: playlist.name,
        description: playlist.description,
        trackCount: playlist.tracks.total,
        imageUrl: playlist.images?.[0]?.url,
        platform: 'spotify' as const,
        isPublic: playlist.public,
        externalId: playlist.id,
      }));
    } catch (error) {
      console.error('Error fetching Spotify playlists:', error);
      throw error;
    }
  }

  async getPlaylistTracks(playlistId: string): Promise<Track[]> {
    try {
      const response = await axios.get(
        `${SPOTIFY_API_BASE}/playlists/${playlistId}/tracks?limit=50`,
        {
          headers: this.getHeaders(),
        }
      );

      return response.data.items.map((item: any) => ({
        id: item.track.id,
        name: item.track.name,
        artist: item.track.artists.map((artist: any) => artist.name).join(', '),
        album: item.track.album.name,
        duration: item.track.duration_ms,
        imageUrl: item.track.album.images?.[0]?.url,
      }));
    } catch (error) {
      console.error('Error fetching Spotify playlist tracks:', error);
      throw error;
    }
  }

  async createPlaylist(name: string, description?: string): Promise<string> {
    try {
      const user = await this.getCurrentUser();
      const response = await axios.post(
        `${SPOTIFY_API_BASE}/users/${user.id}/playlists`,
        {
          name,
          description,
          public: false,
        },
        {
          headers: this.getHeaders(),
        }
      );
      return response.data.id;
    } catch (error) {
      console.error('Error creating Spotify playlist:', error);
      throw error;
    }
  }

  async addTracksToPlaylist(playlistId: string, tracks: Track[]): Promise<void> {
    try {
      const trackUris = await this.searchTracks(tracks);
      
      // Add tracks in batches of 100 (Spotify limit)
      for (let i = 0; i < trackUris.length; i += 100) {
        const batch = trackUris.slice(i, i + 100);
        await axios.post(
          `${SPOTIFY_API_BASE}/playlists/${playlistId}/tracks`,
          {
            uris: batch,
          },
          {
            headers: this.getHeaders(),
          }
        );
      }
    } catch (error) {
      console.error('Error adding tracks to Spotify playlist:', error);
      throw error;
    }
  }

  private async searchTracks(tracks: Track[]): Promise<string[]> {
    const trackUris: string[] = [];

    for (const track of tracks) {
      try {
        const query = `track:"${track.name}" artist:"${track.artist}"`;
        const response = await axios.get(
          `${SPOTIFY_API_BASE}/search?q=${encodeURIComponent(query)}&type=track&limit=1`,
          {
            headers: this.getHeaders(),
          }
        );

        if (response.data.tracks.items.length > 0) {
          trackUris.push(response.data.tracks.items[0].uri);
        }
      } catch (error) {
        console.error(`Error searching for track: ${track.name}`, error);
      }
    }

    return trackUris;
  }
}