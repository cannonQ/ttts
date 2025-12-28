import { useState } from 'react';
import { generateShareUrl, copyToClipboard } from '../utils/shareUtils';

const Controls = ({ sequence, mixName, onMixNameChange, playbackSpeed, onSpeedChange, layerMode, onLayerModeChange }) => {
  const [copied, setCopied] = useState(false);
  const [showSavePanel, setShowSavePanel] = useState(false);

  const handleShare = async () => {
    const mixData = {
      name: mixName || 'Untitled Mix',
      sequence: sequence,
      speed: playbackSpeed,
      layerMode: layerMode,
    };

    const shareUrl = generateShareUrl(mixData);
    if (shareUrl) {
      const success = await copyToClipboard(shareUrl);
      if (success) {
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
      }
    }
  };

  return (
    <div className="bg-pink-900 bg-opacity-80 p-4 md:p-6 rounded-xl border-4 border-neon-yellow shadow-2xl">
      <h2 className="text-2xl md:text-3xl font-cursed text-neon-blue glitch mb-4">
        ⚙️ CONTROLS
      </h2>

      <div className="space-y-4">
        {/* Playback Speed */}
        <div>
          <label className="text-white font-bold mb-2 block">
            SPEED: {playbackSpeed}x
          </label>
          <div className="flex gap-2 flex-wrap">
            {[0.75, 1, 1.25, 1.5].map((speed) => (
              <button
                key={speed}
                onClick={() => onSpeedChange(speed)}
                className={`
                  px-4 py-2 rounded-lg font-bold
                  ${playbackSpeed === speed
                    ? 'bg-neon-yellow text-black'
                    : 'bg-gray-700 text-white hover:bg-gray-600'
                  }
                  border-2 border-black
                  transition-all duration-200
                `}
              >
                {speed}x
              </button>
            ))}
          </div>
        </div>

        {/* Layer Mode */}
        <div>
          <label className="flex items-center gap-2 text-white font-bold cursor-pointer">
            <input
              type="checkbox"
              checked={layerMode}
              onChange={(e) => onLayerModeChange(e.target.checked)}
              className="w-5 h-5"
            />
            <span>LAYER MODE (Overlap sounds)</span>
          </label>
        </div>

        {/* Save & Share */}
        <div>
          <button
            onClick={() => setShowSavePanel(!showSavePanel)}
            className="w-full bg-neon-pink hover:bg-pink-400 text-black font-bold py-3 px-4 rounded-lg border-2 border-black transition-all duration-200"
          >
            💾 SAVE & SHARE
          </button>

          {showSavePanel && (
            <div className="mt-4 p-4 bg-black bg-opacity-50 rounded-lg space-y-3">
              <input
                type="text"
                value={mixName}
                onChange={(e) => onMixNameChange(e.target.value)}
                placeholder="Name your cursed creation..."
                className="w-full px-3 py-2 rounded bg-white text-black font-bold"
              />
              <button
                onClick={handleShare}
                disabled={sequence.length === 0}
                className={`
                  w-full py-2 px-4 rounded-lg font-bold
                  ${copied ? 'bg-green-500' : 'bg-neon-blue hover:bg-blue-400'}
                  ${sequence.length === 0 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                  text-black border-2 border-black
                  transition-all duration-200
                `}
              >
                {copied ? '✅ COPIED!' : '📋 COPY SHARE LINK'}
              </button>
              {copied && (
                <p className="text-neon-green text-sm text-center font-bold">
                  Share this link with your friends!
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Controls;
