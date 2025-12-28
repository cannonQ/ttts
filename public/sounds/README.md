# Audio Files Directory

Place your real audio files here to replace the synthesized sounds!

## Supported Formats

- `.mp3` - Recommended (best browser compatibility)
- `.wav` - High quality, larger file size
- `.ogg` - Good compression, modern browsers
- `.m4a` - AAC audio, good quality

## How to Add Your Sounds

1. **Add audio files to this directory** with these names:
   - `tung.mp3` - TUNG TUNG TUNG Sahur sound
   - `tata.mp3` - TA TA TA Sahur sound
   - `brr.mp3` - BRR BRR Patapim sound
   - `bombardiro.mp3` - BOMBARDIRO Crocodilo sound
   - `tralalero.mp3` - TRALALERO Tralala sound
   - `scream.mp3` - SCREAM (DJ Rest DWI) sound
   - `alarm.mp3` - BEEP BOOP Alarm sound
   - `chaos.mp3` - CHAOS Crowd sound

2. **Update the sound library** in `src/utils/audioGenerator.js`:

   Find the `soundLibrary` array and uncomment/update the `audioFile` property:

   ```javascript
   export const soundLibrary = [
     { id: 'tung', name: 'TUNG TUNG', type: 'tung', emoji: '🥁', description: 'Tung Sahur', color: 'bg-neon-pink', audioFile: '/sounds/tung.mp3' },
     { id: 'tata', name: 'TA TA TA', type: 'tata', emoji: '🔔', description: 'Ta Ta Sahur', color: 'bg-neon-blue', audioFile: '/sounds/tata.mp3' },
     // ... etc
   ];
   ```

3. **Restart the dev server** if it's running

## Notes

- Audio files in the `public/` directory are served as static assets
- The app will automatically fall back to synthesized sounds if audio files aren't found
- Keep file sizes reasonable (under 500KB each) for fast loading
- Shorter clips (1-3 seconds) work best for the soundboard

## Example Directory Structure

```
public/
└── sounds/
    ├── README.md (this file)
    ├── tung.mp3
    ├── tata.mp3
    ├── brr.mp3
    ├── bombardiro.mp3
    ├── tralalero.mp3
    ├── scream.mp3
    ├── alarm.mp3
    └── chaos.mp3
```

## Finding/Creating Audio Clips

- **Extract from videos**: Use tools like `ffmpeg` or online converters
- **Record your own**: Use your phone or audio recording software
- **Royalty-free sources**: freesound.org, zapsplat.com (check licenses)
- **Edit clips**: Use Audacity (free) to trim and adjust audio

## Tips

- Normalize audio levels so all clips have similar volume
- Trim silence from the beginning and end of clips
- Consider using `.mp3` with 128kbps for good quality/size balance
- Test on mobile devices - some formats may not work on all browsers
