import { NextAuthOptions } from 'next-auth';
import { JWT } from 'next-auth/jwt';

export const authOptions: NextAuthOptions = {
  providers: [
    {
      id: 'spotify',
      name: 'Spotify',
      type: 'oauth',
      authorization: {
        url: 'https://accounts.spotify.com/authorize',
        params: {
          scope: 'user-read-email playlist-read-private playlist-modify-private playlist-modify-public',
        },
      },
      token: 'https://accounts.spotify.com/api/token',
      userinfo: 'https://api.spotify.com/v1/me',
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      profile(profile) {
        return {
          id: profile.id,
          name: profile.display_name,
          email: profile.email,
          image: profile.images?.[0]?.url,
        };
      },
    },
    {
      id: 'tidal',
      name: 'Tidal',
      type: 'oauth',
      authorization: {
        url: 'https://auth.tidal.com/v1/oauth2/authorize',
        params: {
          scope: 'r_usr w_usr',
        },
      },
      token: 'https://auth.tidal.com/v1/oauth2/token',
      userinfo: 'https://api.tidal.com/v1/users/me',
      clientId: process.env.TIDAL_CLIENT_ID,
      clientSecret: process.env.TIDAL_CLIENT_SECRET,
      profile(profile) {
        return {
          id: profile.id.toString(),
          name: profile.firstName + ' ' + profile.lastName,
          email: profile.email,
        };
      },
    },
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.provider = account.provider;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      session.provider = token.provider as string;
      return session;
    },
  },
  pages: {
    signIn: '/auth/signin',
  },
};