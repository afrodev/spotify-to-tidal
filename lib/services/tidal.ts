import axios from 'axios';
import { Playlist, Track } from '@/lib/types';

const TIDAL_API_BASE = 'https://api.tidal.com/v1';

export class TidalService {
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
      const response = await axios.get(`${TIDAL_API_BASE}/users/me`, {
        headers: this.getHeaders(),
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching Tidal user:', error);
      throw error;
    }
  }

  async getUserPlaylists(): Promise<Playlist[]> {
    try {
      const user = await this.getCurrentUser();
      const response = await axios.get(
        `${TIDAL_API_BASE}/users/${user.id}/playlists?limit=50`,
        {
          headers: this.getHeaders(),
        }
      );

      return response.data.items.map((playlist: any) => ({
        id: playlist.uuid,
        name: playlist.title,
        description: playlist.description,
        trackCount: playlist.numberOfTracks,
        imageUrl: playlist.image ? `https://resources.tidal.com/images/${playlist.image.replace(/-/g, '/')}/640x640.jpg` : undefined,
        platform: 'tidal' as const,
        isPublic: playlist.publicPlaylist,
        externalId: playlist.uuid,
      }));
    } catch (error) {
      console.error('Error fetching Tidal playlists:', error);
      throw error;
    }
  }

  async getPlaylistTracks(playlistId: string): Promise<Track[]> {
    try {
      const response = await axios.get(
        `${TIDAL_API_BASE}/playlists/${playlistId}/tracks?limit=50`,
        {
          headers: this.getHeaders(),
        }
      );

      return response.data.items.map((track: any) => ({
        id: track.id.toString(),
        name: track.title,
        artist: track.artists.map((artist: any) => artist.name).join(', '),
        album: track.album.title,
        duration: track.duration * 1000, // Convert to milliseconds
        imageUrl: track.album.cover ? `https://resources.tidal.com/images/${track.album.cover.replace(/-/g, '/')}/640x640.jpg` : undefined,
      }));
    } catch (error) {
      console.error('Error fetching Tidal playlist tracks:', error);
      throw error;
    }
  }

  async createPlaylist(name: string, description?: string): Promise<string> {
    try {
      const response = await axios.post(
        `${TIDAL_API_BASE}/playlists`,
        {
          title: name,
          description,
        },
        {
          headers: this.getHeaders(),
        }
      );
      return response.data.uuid;
    } catch (error) {
      console.error('Error creating Tidal playlist:', error);
      throw error;
    }
  }

  async addTracksToPlaylist(playlistId: string, tracks: Track[]): Promise<void> {
    try {
      const trackIds = await this.searchTracks(tracks);
      
      // Add tracks in batches
      for (let i = 0; i < trackIds.length; i += 50) {
        const batch = trackIds.slice(i, i + 50);
        await axios.post(
          `${TIDAL_API_BASE}/playlists/${playlistId}/tracks`,
          {
            trackIds: batch,
          },
          {
            headers: this.getHeaders(),
          }
        );
      }
    } catch (error) {
      console.error('Error adding tracks to Tidal playlist:', error);
      throw error;
    }
  }

  private async searchTracks(tracks: Track[]): Promise<number[]> {
    const trackIds: number[] = [];

    for (const track of tracks) {
      try {
        const query = `${track.name} ${track.artist}`;
        const response = await axios.get(
          `${TIDAL_API_BASE}/search/tracks?query=${encodeURIComponent(query)}&limit=1`,
          {
            headers: this.getHeaders(),
          }
        );

        if (response.data.items.length > 0) {
          trackIds.push(response.data.items[0].id);
        }
      } catch (error) {
        console.error(`Error searching for track: ${track.name}`, error);
      }
    }

    return trackIds;
  }
}