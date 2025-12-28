import { useState } from 'react';

const SoundButton = ({ sound, onPlay, onAddToSequence }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleClick = () => {
    setIsPlaying(true);
    onPlay(sound.id);
    setTimeout(() => setIsPlaying(false), 300);
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
