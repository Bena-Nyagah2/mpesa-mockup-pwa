# M-Pesa Mockup Generator

Offline-first PWA for generating realistic M-Pesa transaction mockups with two display modes: Truecaller-style light receipts and Android dark mode SMS threads.

## Architecture

- **Monolithic single-file app** — All UI, logic, and styling in `index.html`
- **Tailwind CSS via CDN** — No build step, no Node dependencies
- **Vanilla JavaScript** — Zero frameworks, zero bundlers
- **PWA** — Installable with offline support via Service Worker

## Core Features

| Feature | Description |
|---------|-------------|
| **PIN Wall** | Hardcoded 4-digit PIN locks the UI on load |
| **Time Bomb** | Global access revoked after Aug 30, 2026; forces cache wipe |
| **Auto-Lock** | App re-locks after 30 seconds of DOM inactivity |
| **Ghost Queue** | Failed logs vaulted to `localStorage` and background-synced on reconnect via `online` event tripwire |
| **Dual View** | Truecaller light receipt or Android dark mode SMS thread |
| **Smart Parser** | Regex-based raw SMS auto-fill (transaction ID, amount, date, recipient, paybill account) |
| **Hardware Detection** | User-Agent Client Hints API to capture exact device model |

## File Structure

```
.
├── index.html          # Monolithic app (UI + JS + Tailwind)
├── sw.js               # Service Worker (Network-First, Fallback-to-Cache)
├── manifest.json       # PWA manifest
└── assets/
    ├── mpesa-logo.png
    ├── truecaller-logo.png
    ├── equity-logo.png
    ├── icon-192.png
    ├── icon-512.png
    └── *.svg           # UI action icons
```

## Development Rules

1. **Cache Invalidation** — If you modify `index.html` or CSS logic, you **must** manually increment the `CACHE_NAME` variable in `sw.js` (e.g. `v5` to `v6`). Otherwise the PWA serves stale files to offline users.
2. **Vanilla Only** — No React, Webpack, Node modules, or build steps. This is a lightweight raw-file deployment.

## Deployment

Managed via Vercel CLI. Zero-config static deployment — just `vercel` from the project root.

## Security

- PIN: `7050` (hardcoded in `index.html`)
- Expiry: Aug 30, 2026
- Telemetry: Logs sent to Google Form webhook via no-cors fetch
