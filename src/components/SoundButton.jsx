import { useState } from 'react';

const SoundButton = ({ sound, onPlay, onAddToSequence }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleClick = () => {
    setIsPlaying(true);
    onPlay(sound.id);
    setTimeout(() => setIsPlaying(false), 300);
  };

  const handleAddClick = (e) => {
    e.stopPropagation(); // Prevent playing sound when adding
    onAddToSequence(sound.id);
  };

  const handleDragStart = (e) => {
    e.dataTransfer.setData('soundId', sound.id);
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      className={`
        ${sound.color}
        ${isPlaying ? 'animate-shake scale-110' : 'scale-100'}
        p-4 rounded-lg cursor-pointer transition-all duration-200
        hover:scale-105 hover:shadow-2xl
        border-4 border-black
        flex flex-col items-center justify-center
        min-h-[120px] md:min-h-[140px]
        relative overflow-hidden
        group
      `}
      onClick={handleClick}
    >
      {/* Glitch effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transition-opacity"></div>

      {/* Add to Tape button - visible on mobile, hidden on desktop (where drag works) */}
      <button
        onClick={handleAddClick}
        className="absolute top-2 right-2 bg-neon-green hover:bg-green-400 text-black font-bold w-8 h-8 rounded-full border-2 border-black shadow-lg z-10 flex items-center justify-center text-lg md:opacity-0 md:group-hover:opacity-100 transition-opacity"
        title="Add to tape"
      >
        +
      </button>

      <div className="text-4xl md:text-5xl mb-2 animate-bounce">{sound.emoji}</div>
      <div className="text-sm md:text-lg font-bold text-black text-center font-pixel leading-tight">
        {sound.name}
      </div>
      <div className="text-xs text-black opacity-75 mt-1 text-center">
        {sound.description}
      </div>

      {isPlaying && (
        <div className="absolute inset-0 bg-white opacity-50 animate-pulse-fast"></div>
      )}
    </div>
  );
};

export default SoundButton;
