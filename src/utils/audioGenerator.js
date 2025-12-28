// Load audio file from URL
export const loadAudioFile = async (url, audioContext) => {
  try {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    return audioBuffer;
  } catch (error) {
    console.error(`Failed to load audio file: ${url}`, error);
    return null;
  }
};

// Generate synthesized brainrot sounds using Web Audio API (fallback)
export const generateSound = (type, audioContext) => {
  const duration = type === 'scream' ? 2.0 : 0.8;
  const sampleRate = audioContext.sampleRate;
  const buffer = audioContext.createBuffer(1, sampleRate * duration, sampleRate);
  const data = buffer.getChannelData(0);

  switch (type) {
    case 'tung': // Deep bass drum sound
      for (let i = 0; i < buffer.length; i++) {
        const t = i / sampleRate;
        const freq = 80 * Math.exp(-t * 8);
        data[i] = Math.sin(2 * Math.PI * freq * t) * Math.exp(-t * 3);
      }
      break;

    case 'tata': // Metallic percussion
      for (let i = 0; i < buffer.length; i++) {
        const t = i / sampleRate;
        const freq1 = 1200 * Math.exp(-t * 10);
        const freq2 = 800 * Math.exp(-t * 12);
        data[i] = (Math.sin(2 * Math.PI * freq1 * t) + Math.sin(2 * Math.PI * freq2 * t)) * 0.5 * Math.exp(-t * 4);
      }
      break;

    case 'brr': // Ghostly sound
      for (let i = 0; i < buffer.length; i++) {
        const t = i / sampleRate;
        const freq = 200 + 100 * Math.sin(20 * t);
        const noise = (Math.random() * 2 - 1) * 0.3;
        data[i] = (Math.sin(2 * Math.PI * freq * t) * 0.7 + noise) * Math.exp(-t * 2);
      }
      break;

    case 'bombardiro': // Cartoony creature sound
      for (let i = 0; i < buffer.length; i++) {
        const t = i / sampleRate;
        const freq = 300 + 200 * Math.sin(30 * t);
        data[i] = Math.sin(2 * Math.PI * freq * t) * Math.exp(-t * 2.5);
      }
      break;

    case 'tralalero': // Melodic brainrot
      for (let i = 0; i < buffer.length; i++) {
        const t = i / sampleRate;
        const melody = [523, 659, 784, 659]; // C-E-G-E
        const noteIndex = Math.floor((t / 0.2) % melody.length);
        const freq = melody[noteIndex];
        data[i] = Math.sin(2 * Math.PI * freq * t) * Math.exp(-((t % 0.2) * 5));
      }
      break;

    case 'scream': // Terrifying background sound
      for (let i = 0; i < buffer.length; i++) {
        const t = i / sampleRate;
        const freq = 400 + 300 * Math.sin(15 * t) + 200 * Math.sin(7 * t);
        const noise = (Math.random() * 2 - 1) * 0.5;
        data[i] = (Math.sin(2 * Math.PI * freq * t) * 0.5 + noise) * (1 - t / duration);
      }
      break;

    case 'alarm': // Beep boop alarm
      for (let i = 0; i < buffer.length; i++) {
        const t = i / sampleRate;
        const beepFreq = t % 0.4 < 0.2 ? 800 : 1000;
        data[i] = Math.sin(2 * Math.PI * beepFreq * t) * 0.7 * (Math.floor(t / 0.2) % 2);
      }
      break;

    case 'chaos': // Crowd laughter/chaos
      for (let i = 0; i < buffer.length; i++) {
        const t = i / sampleRate;
        const noise = Math.random() * 2 - 1;
        const modulation = Math.sin(2 * Math.PI * 5 * t);
        data[i] = noise * 0.4 * (0.5 + 0.5 * modulation) * (1 - t / duration);
      }
      break;

    default:
      for (let i = 0; i < buffer.length; i++) {
        data[i] = Math.sin(2 * Math.PI * 440 * i / sampleRate) * Math.exp(-i / sampleRate);
      }
  }

  return buffer;
};

// Sound library with metadata
// To use real audio files:
// 1. Add your audio files to public/sounds/ directory (e.g., public/sounds/tung.mp3)
// 2. Uncomment and update the audioFile property below with the path
// 3. Supported formats: .mp3, .wav, .ogg, .m4a
export const soundLibrary = [
  { id: 'tung', name: 'TUNG TUNG', type: 'tung', emoji: '🥁', description: 'Tung Sahur', color: 'bg-neon-pink', audioFile: null }, // audioFile: '/sounds/tung.mp3'
  { id: 'tata', name: 'TA TA TA', type: 'tata', emoji: '🔔', description: 'Ta Ta Sahur', color: 'bg-neon-blue', audioFile: null }, // audioFile: '/sounds/tata.mp3'
  { id: 'brr', name: 'BRR BRR', type: 'brr', emoji: '👻', description: 'Patapim', color: 'bg-neon-green', audioFile: null }, // audioFile: '/sounds/brr.mp3'
  { id: 'bombardiro', name: 'BOMBARDIRO', type: 'bombardiro', emoji: '🐊', description: 'Crocodilo', color: 'bg-neon-yellow', audioFile: null }, // audioFile: '/sounds/bombardiro.mp3'
  { id: 'tralalero', name: 'TRALALERO', type: 'tralalero', emoji: '🎵', description: 'Tralala', color: 'bg-pastel-pink', audioFile: null }, // audioFile: '/sounds/tralalero.mp3'
  { id: 'scream', name: 'SCREAM', type: 'scream', emoji: '😱', description: 'DJ Rest DWI', color: 'bg-pastel-purple', audioFile: null }, // audioFile: '/sounds/scream.mp3'
  { id: 'alarm', name: 'BEEP BOOP', type: 'alarm', emoji: '⏰', description: 'Alarm', color: 'bg-pastel-blue', audioFile: null }, // audioFile: '/sounds/alarm.mp3'
  { id: 'chaos', name: 'CHAOS', type: 'chaos', emoji: '🤪', description: 'Crowd Chaos', color: 'bg-red-400', audioFile: null }, // audioFile: '/sounds/chaos.mp3'
];

// Preset mixes
export const presetMixes = [
  {
    id: 'ramadan-wakeup',
    name: 'The Ramadan Wake-Up Call',
    description: 'SAHUR ENERGY 💯',
    sequence: [
      { soundId: 'alarm', delay: 0, volume: 0.8 },
      { soundId: 'tung', delay: 500, volume: 1.0 },
      { soundId: 'tung', delay: 700, volume: 1.0 },
      { soundId: 'tata', delay: 1000, volume: 0.9 },
      { soundId: 'scream', delay: 1200, volume: 0.7 },
    ],
  },
  {
    id: 'tribunal-creatures',
    name: 'Tribunal of Creatures',
    description: 'UNHINGED ASSEMBLY',
    sequence: [
      { soundId: 'bombardiro', delay: 0, volume: 1.0 },
      { soundId: 'brr', delay: 300, volume: 0.8 },
      { soundId: 'bombardiro', delay: 600, volume: 1.0 },
      { soundId: 'chaos', delay: 900, volume: 0.6 },
      { soundId: 'tralalero', delay: 1200, volume: 0.9 },
    ],
  },
  {
    id: 'cursed-melody',
    name: 'Cursed Melody',
    description: 'POST-IRONIC SYMPHONY',
    sequence: [
      { soundId: 'tralalero', delay: 0, volume: 0.9 },
      { soundId: 'tata', delay: 400, volume: 0.7 },
      { soundId: 'tralalero', delay: 800, volume: 0.9 },
      { soundId: 'brr', delay: 1200, volume: 0.8 },
      { soundId: 'tung', delay: 1600, volume: 1.0 },
    ],
  },
];
