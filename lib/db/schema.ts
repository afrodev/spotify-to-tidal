import { pgTable, text, timestamp, integer, boolean, uuid } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: text('email').unique().notNull(),
  name: text('name'),
  spotifyId: text('spotify_id'),
  tidalId: text('tidal_id'),
  spotifyAccessToken: text('spotify_access_token'),
  spotifyRefreshToken: text('spotify_refresh_token'),
  tidalAccessToken: text('tidal_access_token'),
  tidalRefreshToken: text('tidal_refresh_token'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const playlists = pgTable('playlists', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id),
  spotifyId: text('spotify_id'),
  tidalId: text('tidal_id'),
  name: text('name').notNull(),
  description: text('description'),
  trackCount: integer('track_count').default(0),
  imageUrl: text('image_url'),
  platform: text('platform').notNull(), // 'spotify' | 'tidal'
  isPublic: boolean('is_public').default(false),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const transfers = pgTable('transfers', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id),
  sourcePlaylistId: uuid('source_playlist_id').references(() => playlists.id),
  targetPlaylistId: uuid('target_playlist_id').references(() => playlists.id),
  sourcePlatform: text('source_platform').notNull(),
  targetPlatform: text('target_platform').notNull(),
  status: text('status').notNull(), // 'pending' | 'in_progress' | 'completed' | 'failed'
  totalTracks: integer('total_tracks').default(0),
  transferredTracks: integer('transferred_tracks').default(0),
  failedTracks: integer('failed_tracks').default(0),
  errorMessage: text('error_message'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});