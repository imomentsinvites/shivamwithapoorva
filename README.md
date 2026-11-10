# Shivam & Apoorva — Wedding Invitation

## Run
```bash
npm install
npm run dev
```

## Production build
```bash
npm run build
```

## Required images
Keep these seven files exactly at these paths. All are 1080 × 1920 px (9:16):
- `public/images/entry-poster.jpg` — opening poster before the video starts
- `public/images/scenes/scratch-garden.jpg` — scratch-card section
- `public/images/scenes/mehendi-garden.jpg` — Mehendi
- `public/images/scenes/haldi-courtyard.jpg` — Haldi
- `public/images/scenes/sangeet-courtyard.jpg` — Tilak & Sangeet (new matching illustration)
- `public/images/scenes/bhaat-courtyard.jpg` — Bhaat
- `public/images/scenes/wedding-mandap.jpg` — Baraat Swagat / wedding finale

## Entry video
`public/videos/entry.mp4`

The entry screen shows only the poster and a small “Tap to Open” pill. On tap, the video starts. Scrolling and the small scroll cue are enabled after six seconds.

## Event details
Edit `src/data/events.ts`. Each event has its own address and map link. No separate Venue slide is rendered.

## RSVP
Contact numbers are in `src/data/events.ts`. The WhatsApp action uses a WhatsApp mark, and the phone action uses a call icon.
