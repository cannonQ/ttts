import { useState, useEffect, useRef } from 'react';
import SoundButton from './components/SoundButton';
import TapeSequencer from './components/TapeSequencer';
import PresetGallery from './components/PresetGallery';
import Controls from './components/Controls';
import { soundLibrary, generateSound, loadAudioFile } from './utils/audioGenerator';
import { loadMixFromUrl } from './utils/shareUtils';

function App() {
  const [sequence, setSequence] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [mixName, setMixName] = useState('');
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [layerMode, setLayerMode] = useState(false);
  const [shake, setShake] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const audioContextRef = useRef(null);
  const soundBuffersRef = useRef({});

  // Initialize Web Audio API
  useEffect(() => {
    const initAudio = async () => {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();

      // Load sound buffers (audio files or synthesized)
      await Promise.all(
        soundLibrary.map(async (sound) => {
          // Try to load audio file if specified
          if (sound.audioFile) {
            const buffer = await loadAudioFile(sound.audioFile, audioContextRef.current);
            if (buffer) {
              soundBuffersRef.current[sound.id] = buffer;
              return;
            }
            console.log(`Audio file not found for ${sound.id}, using synthesized sound`);
          }
          // Fallback to synthesized sound
          soundBuffersRef.current[sound.id] = generateSound(sound.type, audioContextRef.current);
        })
      );

      setIsLoading(false);

      // Load mix from URL if present
      const loadedMix = loadMixFromUrl();
      if (loadedMix) {
        setMixName(loadedMix.name || '');
        setSequence(loadedMix.sequence || []);
        setPlaybackSpeed(loadedMix.speed || 1);
        setLayerMode(loadedMix.layerMode || false);
      }
    };

    initAudio();

    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  // Play a single sound
  const playSound = (soundId, delay = 0, volume = 1.0, speed = playbackSpeed) => {
    const audioContext = audioContextRef.current;
    const buffer = soundBuffersRef.current[soundId];

    if (!audioContext || !buffer) return;

    const source = audioContext.createBufferSource();
    const gainNode = audioContext.createGain();

    source.buffer = buffer;
    source.playbackRate.value = speed;
    gainNode.gain.value = volume;

    source.connect(gainNode);
    gainNode.connect(audioContext.destination);

    source.start(audioContext.currentTime + delay / 1000);

    // Trigger screen shake
    setShake(true);
    setTimeout(() => setShake(false), 300);
  };

  // Handle button click
  const handlePlaySound = (soundId) => {
    playSound(soundId);
  };

  // Add sound to sequence
  const handleAddToSequence = (soundId) => {
    const baseDelay = sequence.length > 0
      ? Math.max(...sequence.map(s => s.delay)) + (layerMode ? 300 : 800)
      : 0;

    setSequence([
      ...sequence,
      {
        soundId,
        delay: baseDelay,
        volume: 1.0,
      },
    ]);
  };

  // Handle drop on sequencer
  const handleDrop = (e) => {
    e.preventDefault();
    const soundId = e.dataTransfer.getData('soundId');
    if (soundId) {
      handleAddToSequence(soundId);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // Play entire sequence
  const playSequence = () => {
    if (sequence.length === 0 || isPlaying) return;

    setIsPlaying(true);

    sequence.forEach((item) => {
      playSound(item.soundId, item.delay, item.volume, playbackSpeed);
    });

    // Calculate total duration
    const maxDelay = Math.max(...sequence.map(s => s.delay));
    const duration = maxDelay + 2000; // Add buffer for longest sound

    setTimeout(() => {
      setIsPlaying(false);
    }, duration);
  };

  // Remove from sequence
  const handleRemoveFromSequence = (index) => {
    setSequence(sequence.filter((_, i) => i !== index));
  };

  // Clear sequence
  const handleClearSequence = () => {
    setSequence([]);
  };

  // Reorder sequence
  const handleReorderSequence = (fromIndex, toIndex) => {
    const newSequence = [...sequence];
    const [movedItem] = newSequence.splice(fromIndex, 1);
    newSequence.splice(toIndex, 0, movedItem);

    // Recalculate delays
    const updatedSequence = newSequence.map((item, index) => ({
      ...item,
      delay: index * (layerMode ? 300 : 800),
    }));

    setSequence(updatedSequence);
  };

  // Load preset
  const handleLoadPreset = (preset) => {
    setSequence(preset.sequence);
    setMixName(preset.name);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-bounce">🎵</div>
          <h2 className="text-3xl font-cursed text-white glitch">LOADING SOUNDS...</h2>
          <p className="text-neon-pink mt-2">Preparing your brainrot experience</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen p-4 md:p-8 ${shake ? 'animate-shake' : ''}`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-cursed text-white glitch mb-4">
            🎵 BRAINROT SOUNDBOARD 🎵
          </h1>
          <p className="text-xl md:text-2xl text-neon-pink font-bold">
            TUNG TUNG TUNG SAHUR MEME MIX TAPE MAKER
          </p>
          <p className="text-sm md:text-base text-pastel-blue mt-2">
            Create cursed audio mashups • Layer sounds • Share with friends
          </p>
        </header>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Soundboard */}
          <div className="lg:col-span-2 space-y-6">
            {/* Soundboard */}
            <div className="bg-blue-900 bg-opacity-80 p-4 md:p-6 rounded-xl border-4 border-neon-blue shadow-2xl">
              <h2 className="text-2xl md:text-3xl font-cursed text-neon-green glitch mb-4">
                🎹 SOUNDBOARD
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
                {soundLibrary.map((sound) => (
                  <SoundButton
                    key={sound.id}
                    sound={sound}
                    onPlay={handlePlaySound}
                    onAddToSequence={handleAddToSequence}
                  />
                ))}
              </div>
              <p className="text-center text-pastel-blue text-sm mt-4">
                👆 Click to play • Press + to add to tape • Drag on desktop 👆
              </p>
            </div>

            {/* Tape Sequencer */}
            <TapeSequencer
              sequence={sequence}
              onRemove={handleRemoveFromSequence}
              onClear={handleClearSequence}
              onReorder={handleReorderSequence}
              onPlay={playSequence}
              isPlaying={isPlaying}
            />

            {/* Preset Gallery */}
            <PresetGallery onLoadPreset={handleLoadPreset} />
          </div>

          {/* Right Column: Controls */}
          <div className="lg:col-span-1">
            <div className="sticky top-4">
              <Controls
                sequence={sequence}
                mixName={mixName}
                onMixNameChange={setMixName}
                playbackSpeed={playbackSpeed}
                onSpeedChange={setPlaybackSpeed}
                layerMode={layerMode}
                onLayerModeChange={setLayerMode}
              />

              {/* Stats */}
              <div className="mt-4 bg-gray-900 bg-opacity-80 p-4 rounded-xl border-2 border-white">
                <h3 className="text-white font-bold mb-2">📊 MIX STATS</h3>
                <div className="text-pastel-blue text-sm space-y-1">
                  <p>Sounds: {sequence.length}</p>
                  <p>Speed: {playbackSpeed}x</p>
                  <p>Mode: {layerMode ? 'LAYER' : 'SEQUENCE'}</p>
                  <p>Status: {isPlaying ? '▶️ PLAYING' : '⏸️ READY'}</p>
                </div>
              </div>

              {/* Info */}
              <div className="mt-4 bg-yellow-900 bg-opacity-60 p-4 rounded-xl border-2 border-neon-yellow">
                <h3 className="text-neon-yellow font-bold mb-2">ℹ️ HOW TO USE</h3>
                <ul className="text-white text-sm space-y-2">
                  <li>🎵 Click buttons to hear sounds</li>
                  <li>🎬 Drag sounds to tape recorder</li>
                  <li>▶️ Play your cursed creation</li>
                  <li>💾 Save & share with friends</li>
                  <li>🎭 Try suggested mixes below!</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center text-white text-sm mt-8 pb-4">
          <p className="font-bold text-neon-pink">
            CURSED • UNHINGED • SAHUR ENERGY 💯
          </p>
          <p className="text-pastel-blue mt-2">
            Made with chaos and Web Audio API
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
