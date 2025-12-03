# Twitch‑AI‑Clipper

This is a simple backend that accepts a Twitch VOD URL, downloads it, and outputs a 30‑second clip.

## Usage

- Deploy on a service like render.com (Web Service).  
- POST to `/api/clip` with JSON `{ "url": "<twitch_vod_url>" }`.  
- When processing completes, the response includes `{ "clipUrl": "/clip.mp4" }`.  
- Access `https://<your‑domain>/clip.mp4` to download the clip.