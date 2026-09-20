# Project previews

The bento grid uses local, silent H.264 MP4 recordings in `public/previews`.

- `racing-game.mp4`: a private two-player session at https://racing-game-sooty-eta.vercel.app/.
- `live-notes.mp4`: Ricardo's replacement recording from 20 September 2026 at 22:08. The full 21.8 seconds are preserved at 1280 × 800 and 24 fps, with a matching poster frame. The H.264 MP4 is 300,968 bytes, down from the 10,559,413-byte source. A VP9 WebM encode was larger, so only the smaller MP4 is shipped.
- `water-wise.mp4`: panning and zooming the map at https://water-wise-one.vercel.app/.

Captured on 20 September 2026. These are recordings of the deployed applications, not simulated interfaces. Replace the files at the same paths to update the previews. Encode with `yuv420p` and MP4 fast-start for inline playback on iOS.

Previews load on interaction, loop without audio, and pause when outside the viewport or when the browser tab is hidden. Hover starts playback unless reduced motion is enabled. The play/pause button supports keyboard and touch users.

“Try game” and project titles with a live URL open the deployed app in a new tab. The rest of each card links to its case study. No live app is embedded in the portfolio.
