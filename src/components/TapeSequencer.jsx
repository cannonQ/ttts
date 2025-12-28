import { useState } from 'react';
import { soundLibrary } from '../utils/audioGenerator';

const TapeSequencer = ({ sequence, onRemove, onClear, onReorder, onPlay, isPlaying }) => {
  const [draggedIndex, setDraggedIndex] = useState(null);

  const handleDragStart = (e, index) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, dropIndex) => {
    e.preventDefault();
    if (draggedIndex !== null && draggedIndex !== dropIndex) {
      onReorder(draggedIndex, dropIndex);
    }
    setDraggedIndex(null);
  };

  const getSoundById = (id) => soundLibrary.find(s => s.id === id);

  return (
    <div className="bg-purple-900 bg-opacity-80 p-4 md:p-6 rounded-xl border-4 border-neon-pink shadow-2xl">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl md:text-3xl font-cursed text-neon-yellow glitch">
          🎬 TAPE RECORDER
        </h2>
        <div className="flex gap-2">
          <button
            onClick={onPlay}
            disabled={sequence.length === 0 || isPlaying}
            className={`
              px-4 py-2 rounded-lg font-bold text-sm md:text-base
              ${isPlaying ? 'bg-gray-500' : 'bg-neon-green hover:bg-green-400'}
              ${sequence.length === 0 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
              text-black border-2 border-black
              transition-all duration-200
            `}
          >
            {isPlaying ? '▶️ PLAYING...' : '▶️ PLAY'}
          </button>
          <button
            onClick={onClear}
            disabled={sequence.length === 0}
            className={`
              px-4 py-2 rounded-lg font-bold text-sm md:text-base
              bg-red-500 hover:bg-red-400
              ${sequence.length === 0 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
              text-white border-2 border-black
              transition-all duration-200
            `}
          >
            🗑️ CLEAR
          </button>
        </div>
      </div>

      {sequence.length === 0 ? (
        <div className="border-4 border-dashed border-neon-blue rounded-lg p-8 text-center">
          <p className="text-neon-blue text-lg md:text-xl font-bold">
            👆 DRAG SOUNDS HERE or CLICK TO ADD 👆
          </p>
          <p className="text-pastel-blue text-sm mt-2">
            Drop sounds to create your cursed mix
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {sequence.map((item, index) => {
            const sound = getSoundById(item.soundId);
            if (!sound) return null;

            return (
              <div
                key={`${item.soundId}-${index}`}
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, index)}
                className={`
                  ${sound.color}
                  p-3 rounded-lg flex items-center justify-between
                  border-2 border-black cursor-move
                  hover:scale-102 transition-all duration-200
                  ${draggedIndex === index ? 'opacity-50' : 'opacity-100'}
                `}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-bold text-black">#{index + 1}</span>
                  <span className="text-2xl">{sound.emoji}</span>
                  <span className="font-bold text-black">{sound.name}</span>
                  <span className="text-xs text-black opacity-75">
                    +{item.delay}ms
                  </span>
                </div>
                <button
                  onClick={() => onRemove(index)}
                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded font-bold"
                >
                  ✕
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TapeSequencer;
