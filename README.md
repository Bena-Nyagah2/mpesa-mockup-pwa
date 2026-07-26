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
| **Admin Panel** | Secondary PIN (`0000`) unlocks admin config and usage stats |
| **Time Bomb** | Global access revoked after Aug 30, 2026; forces cache wipe |
| **Auto-Lock** | App re-locks after 30 seconds of DOM inactivity |
| **Rate Limiter** | Daily mockup cap (default 5/day, configurable), midnight reset, hard block with admin bypass |
| **Ghost Queue** | Failed logs vaulted to `localStorage` and background-synced on reconnect via `online` event tripwire |
| **Enhanced Logging** | Every action tagged with `[USER:uuid] [DEVICE:model] [OS:os] [ACTION:type]` for attribution |
| **Dual View** | Truecaller light receipt or Android dark mode SMS thread |
| **Dynamic History** | Dark mode generates realistic 2-3 prior chat entries from name/type/amount pools |
| **Smart Parser** | Regex-based raw SMS auto-fill (transaction ID, amount, date, recipient, paybill account) |
| **Cost Auto-Calc** | M-Pesa Kenya fee lookup table auto-fills transaction cost (overridable) |
| **Editable Balance** | M-Pesa balance is an editable field (default Ksh 8,500) |
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

1. **Cache Invalidation** — If you modify `index.html` or CSS logic, you **must** manually increment the `CACHE_NAME` variable in `sw.js` (e.g. `v6` to `v7`). Otherwise the PWA serves stale files to offline users.
2. **Vanilla Only** — No React, Webpack, Node modules, or build steps. This is a lightweight raw-file deployment.

## Deployment

Managed via Vercel CLI. Zero-config static deployment — just `vercel` from the project root.

## Security

- **User PIN:** `7050` (hardcoded in `index.html`)
- **Admin PIN:** `0000` (unlocks admin panel, bypasses rate limits)
- **Expiry:** Aug 30, 2026
- **Rate Limit:** 5 mockups/day (configurable via admin panel), midnight reset
- **User Tracking:** UUID + device fingerprint logged to Google Forms via Ghost Queue
- **Telemetry:** Logs sent to Google Form webhook via no-cors fetch
