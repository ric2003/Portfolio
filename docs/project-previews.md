# Project previews

The bento grid uses local, silent H.264 MP4 recordings in `public/previews`.

- `racing-game.mp4`: a private two-player session at https://racing-game-sooty-eta.vercel.app/.
- `water-wise.mp4`: panning and zooming the map at https://water-wise-one.vercel.app/.

Captured on 20 September 2026. These are recordings of the deployed applications, not simulated interfaces. Replace the files at the same paths to update the previews. Encode with `yuv420p` and MP4 fast-start for inline playback on iOS.

Previews load on interaction, loop without audio, and pause when outside the viewport or when the browser tab is hidden. Hover starts playback unless reduced motion is enabled. The play/pause button supports keyboard and touch users.

The Racing Game iframe only mounts after selecting “Try live demo”. Closing it unmounts the game. Driving requires a desktop keyboard; phone visitors can watch the recording. The demo also links to the standalone app.
