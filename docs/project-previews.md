# Project previews

Project cards and details pages share the same video sources. Live Notes and Water Wise prefer full-resolution WebM files in `public/videos`, with H.264 MP4 compatibility fallbacks. Racing Game uses an MP4 in `public/previews`.

- `racing-game.mp4`: a private two-player session at https://racing-game-sooty-eta.vercel.app/.
- `live-notes.mp4`: Ricardo's replacement recording from 20 September 2026 at 22:08. The full 21.8 seconds are preserved at 1280 × 800 and 24 fps. The H.264 MP4 is 300,968 bytes, down from the 10,559,413-byte source. This smaller encode is only a compatibility fallback when WebM is unsupported.
- `water-wise.mp4`: H.264 compatibility fallback generated from Ricardo's supplied `demo.webm`, preserving its 2880 × 1800 resolution and 60 fps. Both views prefer `public/videos/water-wise.webm`, an unchanged copy of the supplied 11.7-second, 6,444,139-byte VP9 recording. `public/videos/water-wise.webp` is a matching full-resolution poster.

Captured on 20 September 2026. These are recordings of the deployed applications, not simulated interfaces. Replace the files at the same paths to update the previews. Encode with `yuv420p` and MP4 fast-start for inline playback on iOS.

Previews load on interaction, loop without audio, and pause when outside the viewport or when the browser tab is hidden. Hover starts playback unless reduced motion is enabled. The play/pause button supports keyboard and touch users.

“Try game” and project titles with a live URL open the deployed app in a new tab. The rest of each card links to its case study. No live app is embedded in the portfolio.

Both the Live Notes card and details page prefer `public/videos/live-notes.webm`: a separate VP9 encode at the original 2880 × 1800 resolution, 30 fps, CRF 20, with no audio. Its poster uses the original resolution too. The MP4 remains as a compatibility fallback. The higher resolution and quality settings are intentional; codec choice alone does not account for the difference in sharpness.
