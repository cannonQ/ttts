# 🎵 Brainrot Soundboard - TUNG TUNG TUNG SAHUR

A chaotic, post-ironic web-based soundboard and meme mix tape maker featuring Italian Brainrot characters! Create cursed audio mashups, layer sounds, and share your unhinged creations with friends.

## 🎭 Features

- **Interactive Soundboard**: 8 unique brainrot sounds including:
  - 🥁 TUNG TUNG TUNG (Sahur bass drum)
  - 🔔 TA TA TA (Metallic kettle version)
  - 👻 BRR BRR (Ghostly Patapim)
  - 🐊 BOMBARDIRO (Crocodilo creature sound)
  - 🎵 TRALALERO (Melodic brainrot)
  - 😱 SCREAM (DJ Rest DWI terrifying sound)
  - ⏰ BEEP BOOP (Alarm sound)
  - 🤪 CHAOS (Crowd laughter/chaos)

- **Tape Sequencer**: Drag and drop sounds to create custom sequences
- **Layer Mode**: Play multiple sounds simultaneously for maximum chaos
- **Playback Speed Control**: 0.75x, 1x, 1.25x, 1.5x speed options
- **Save & Share**: Generate shareable links to your cursed creations
- **Preset Gallery**: 3 suggested mixes to get started
- **Mobile Responsive**: Works smoothly on phones and tablets
- **Chaotic Design**: Neon colors, glitch effects, and post-ironic aesthetic

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ttts
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open your browser to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## 🎮 How to Use

1. **Play Sounds**: Click any button on the soundboard to hear the sound
2. **Create a Mix**: Drag sounds to the "Tape Recorder" section or click to add them
3. **Arrange**: Reorder sounds by dragging them in the sequence
4. **Adjust Settings**:
   - Change playback speed (0.75x - 1.5x)
   - Enable Layer Mode for overlapping sounds
5. **Play**: Hit the PLAY button to hear your creation
6. **Save & Share**:
   - Name your mix
   - Click "COPY SHARE LINK"
   - Share with friends - they'll hear the exact same mix!
7. **Try Presets**: Load suggested mixes for inspiration

## 🎨 Technical Stack

- **React 18**: UI framework
- **Vite**: Fast build tool and dev server
- **Tailwind CSS**: Utility-first styling
- **Web Audio API**: Synthesized audio generation and playback
- **No backend required**: Uses browser storage and URL encoding

## 🔊 Audio System

### Default: Synthesized Sounds
By default, all sounds are procedurally generated using the Web Audio API - no audio files needed! Each sound is synthesized in real-time using oscillators, noise generators, and envelope shaping.

### Using Real Audio Files
Want to use actual audio clips instead? Easy!

1. **Add your audio files** to the `public/sounds/` directory:
   ```
   public/sounds/
   ├── tung.mp3
   ├── tata.mp3
   ├── brr.mp3
   ├── bombardiro.mp3
   ├── tralalero.mp3
   ├── scream.mp3
   ├── alarm.mp3
   └── chaos.mp3
   ```

2. **Update the sound library** in `src/utils/audioGenerator.js`:
   ```javascript
   export const soundLibrary = [
     { id: 'tung', name: 'TUNG TUNG', type: 'tung', emoji: '🥁',
       description: 'Tung Sahur', color: 'bg-neon-pink',
       audioFile: '/sounds/tung.mp3' }, // Uncomment and add path
     // ... update other sounds similarly
   ];
   ```

3. **Restart your dev server** - The app will load your audio files!

**Supported formats**: `.mp3`, `.wav`, `.ogg`, `.m4a`

**Fallback**: If an audio file isn't found, the app automatically uses the synthesized version.

See `public/sounds/README.md` for detailed instructions.

## 📱 Mobile Support

Fully responsive design optimized for mobile browsers:
- **Touch-friendly**: Large buttons with tap-to-add functionality
- **+ Button**: Always visible on mobile to add sounds to tape (no drag needed!)
- **Drag & Drop**: Works on desktop browsers
- **Audio playback**: Reliable playback on iOS and Android

## 🎭 The Vibe

CURSED • UNHINGED • SAHUR ENERGY 💯

- Post-ironic aesthetic
- Chaotic neon + pastel color combinations
- Glitchy fonts and animations
- Screen shake effects when playing sounds
- Meme-style text and descriptions

## 🤝 Contributing

Feel free to submit issues and pull requests for new sounds, features, or improvements!

## 📄 License

MIT License - feel free to use this for your own cursed creations!

---

Made with chaos and Web Audio API 🎵
