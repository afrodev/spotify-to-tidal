import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Playlist Transfer - Spotify ⇄ Tidal',
  description: 'Transfer your playlists between Spotify and Tidal with one click',
  keywords: ['spotify', 'tidal', 'playlist', 'transfer', 'music'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
          {children}
        </div>
      </body>
    </html>
  );
}