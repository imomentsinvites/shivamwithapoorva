# Design update – illustrated celebrations

This update keeps the existing React/Vite structure and the invitation's existing functionality.

## Included
- Moved the opening-screen instruction to the bottom of the screen.
- Replaced the silver scratch-card foil with a champagne-gold gradient and removed the coin graphic.
- Replaced the event video playback with still artwork extracted from the supplied event videos.
- Added scroll-progress parallax, soft text reveal, drifting petals, ambient light movement, and event-specific colour treatments.
- Repositioned event details in the open upper area of the supplied illustrations to avoid covering the couple artwork.

## Artwork note
The supplied project contains only a small number of distinct event background videos, and some event entries reuse the same source video. The event images in `public/images/events/` are extracted from those supplied videos to preserve the existing caricature/illustration style. Sangeet and Bhaat currently use adapted source artwork rather than newly commissioned, event-exclusive scenes. These can be replaced with dedicated illustrations in a follow-up asset pass without changing the React components.

## Run locally
```bash
npm install
npm run dev
```

Build with:
```bash
npm run build
```
