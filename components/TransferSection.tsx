'use client';

import { ArrowLeftRight, ArrowRight, Music2, Zap } from 'lucide-react';

interface TransferSectionProps {
  transferDirection: 'spotify-to-tidal' | 'tidal-to-spotify';
  onDirectionChange: (direction: 'spotify-to-tidal' | 'tidal-to-spotify') => void;
  selectedCount: number;
  onTransfer: () => void;
  disabled: boolean;
}

export default function TransferSection({
  transferDirection,
  onDirectionChange,
  selectedCount,
  onTransfer,
  disabled,
}: TransferSectionProps) {
  const sourcePlatform = transferDirection === 'spotify-to-tidal' ? 'Spotify' : 'Tidal';
  const targetPlatform = transferDirection === 'spotify-to-tidal' ? 'Tidal' : 'Spotify';

  return (
    <div className="card p-8 max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Transfer Direction</h2>
        <p className="text-gray-600">Choose which platform to transfer from and to</p>
      </div>

      {/* Direction Selector */}
      <div className="flex items-center justify-center mb-8">
        <div className="flex items-center space-x-4 bg-gray-100 rounded-xl p-2">
          <button
            onClick={() => onDirectionChange('spotify-to-tidal')}
            className={`flex items-center space-x-3 px-6 py-4 rounded-lg transition-all duration-200 ${
              transferDirection === 'spotify-to-tidal'
                ? 'bg-white shadow-md text-gray-900'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <div className="w-8 h-8 bg-spotify-500 rounded-full flex items-center justify-center">
              <Music2 className="h-4 w-4 text-white" />
            </div>
            <ArrowRight className="h-5 w-5" />
            <div className="w-8 h-8 bg-tidal-500 rounded-full flex items-center justify-center">
              <Music2 className="h-4 w-4 text-white" />
            </div>
            <span className="font-medium">Spotify → Tidal</span>
          </button>

          <div className="w-px h-12 bg-gray-300"></div>

          <button
            onClick={() => onDirectionChange('tidal-to-spotify')}
            className={`flex items-center space-x-3 px-6 py-4 rounded-lg transition-all duration-200 ${
              transferDirection === 'tidal-to-spotify'
                ? 'bg-white shadow-md text-gray-900'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <div className="w-8 h-8 bg-tidal-500 rounded-full flex items-center justify-center">
              <Music2 className="h-4 w-4 text-white" />
            </div>
            <ArrowRight className="h-5 w-5" />
            <div className="w-8 h-8 bg-spotify-500 rounded-full flex items-center justify-center">
              <Music2 className="h-4 w-4 text-white" />
            </div>
            <span className="font-medium">Tidal → Spotify</span>
          </button>
        </div>
      </div>

      {/* Transfer Summary */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
              <ArrowLeftRight className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Transfer from {sourcePlatform} to {targetPlatform}
              </h3>
              <p className="text-gray-600">
                {selectedCount > 0 
                  ? `${selectedCount} playlist${selectedCount > 1 ? 's' : ''} selected`
                  : 'Select playlists to transfer'
                }
              </p>
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-2xl font-bold text-gray-900">{selectedCount}</div>
            <div className="text-sm text-gray-600">Selected</div>
          </div>
        </div>
      </div>

      {/* Transfer Button */}
      <div className="text-center">
        <button
          onClick={onTransfer}
          disabled={disabled}
          className={`inline-flex items-center space-x-3 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 ${
            disabled
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-xl transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
          }`}
        >
          <Zap className="h-6 w-6" />
          <span>
            {disabled 
              ? 'Select playlists to transfer' 
              : `Transfer ${selectedCount} Playlist${selectedCount > 1 ? 's' : ''}`
            }
          </span>
        </button>
        
        {!disabled && (
          <p className="text-sm text-gray-600 mt-3">
            This will create new playlists on {targetPlatform} with matching tracks
          </p>
        )}
      </div>
    </div>
  );
}