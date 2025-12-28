import { presetMixes } from '../utils/audioGenerator';

const PresetGallery = ({ onLoadPreset }) => {
  return (
    <div className="bg-indigo-900 bg-opacity-80 p-4 md:p-6 rounded-xl border-4 border-neon-green shadow-2xl">
      <h2 className="text-2xl md:text-3xl font-cursed text-neon-pink glitch mb-4">
        🎭 SUGGESTED MIXES
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {presetMixes.map((preset) => (
          <div
            key={preset.id}
            onClick={() => onLoadPreset(preset)}
            className="
              bg-gradient-to-br from-pastel-pink to-pastel-purple
              p-4 rounded-lg cursor-pointer
              border-3 border-black
              hover:scale-105 transition-all duration-200
              hover:shadow-xl
              group
            "
          >
            <h3 className="font-bold text-lg text-black mb-2 group-hover:animate-wiggle">
              {preset.name}
            </h3>
            <p className="text-sm text-purple-900 font-bold">
              {preset.description}
            </p>
            <div className="mt-2 text-xs text-black opacity-75">
              {preset.sequence.length} sounds
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PresetGallery;
