# OpoFinance Marketing Dashboard

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![No Framework](https://img.shields.io/badge/No%20Framework-Zero%20Dependencies-brightgreen?style=flat)
![License](https://img.shields.io/badge/License-MIT-blue?style=flat)

A pixel-perfect, single-page marketing intelligence dashboard for OpoFinance — built entirely with pure HTML, CSS, and JavaScript. No frameworks, no build tools, no backend. Just open `index.html` and go.

---

## Features

### Authentication
- **Split-screen login** — branded left panel with live floating KPI cards, sign-in form on the right
- **Sign-up page** — matching design with account creation flow
- Smooth transition animation into the dashboard on login

### Dashboard
- **Dark / Light mode** — toggle in the header, persists across the session
- **Responsive sidebar navigation** — collapsible on mobile with overlay, 7 sections
- **Live date chip** in the header, notification bell, and user avatar

### Pages & Widgets

| Page | What it shows |
|---|---|
| **Overview** | Lead Momentum card, Quick Route shortcuts, Conversion Goal donut chart, 4 KPI cards (ROI, CVR, Traffic Quality, Social Engagement), Weekly Performance bar chart, Acquisition Mix, Campaign Activity feed, Regional Pulse |
| **Campaigns** | Summary stat cards, sortable/filterable campaign table with status pills, budget progress bars, ROI, CVR, and action buttons |
| **Lead Funnel** | Full funnel from Impressions → FTD, stage drop-off analysis, funnel-by-channel breakdown |
| **Regional Pulse** | Lead volume and ROI by country, 24 active markets, flags and trend indicators |
| **Social Radar** | 6 platform cards (Facebook, Instagram, X, LinkedIn, TikTok, YouTube) with followers, engagement rate, reach, and post count |
| **Reports** | 8 report templates, recent report list with download buttons |
| **Settings** | Profile editor, notification toggles, integration status, security options |

### Charts & Visualisations
- Animated **donut chart** (SVG, pure CSS transition) — Conversion Goal progress
- **Grouped bar chart** (vanilla JS) with hover tooltips — Weekly Performance
- **Sparklines** (inline SVG) on every KPI card
- **Horizontal bar tracks** for acquisition mix, regional pulse, lead funnel, and budget utilisation

---

## Screenshots

> Open the files directly in your browser — no server required.

| Login | Dashboard (Dark) | Dashboard (Light) |
|---|---|---|
| `index.html` | `dashboard.html` | Toggle via ☀️ button |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Markup | HTML5 (semantic, single-file pages) |
| Styling | CSS3 — custom properties, grid, flexbox, transitions |
| Logic | Vanilla JavaScript — client-side router, DOM rendering, chart builder |
| Charts | Inline SVG + JavaScript (zero external chart libs) |
| Fonts | System UI stack |
| Icons | Emoji + inline SVG |

No npm. No bundler. No dependencies.

---

## Project Structure

```
my-dashboard/
├── index.html       # Login page (split-screen)
├── signup.html      # Sign-up page
├── dashboard.html   # Main dashboard shell + overview widgets
├── script.js        # Client-side router, all page renderers, chart builder
└── style.css        # All styles — dark/light themes, components, layout
```

---

## Installation

```bash
git clone https://github.com/<your-username>/my-dashboard.git
cd my-dashboard
```

That's it. No `npm install`, no build step.

---

## Usage

**Option 1 — Open directly**

Double-click `index.html` (or drag it into any browser).

**Option 2 — Local dev server** *(recommended, avoids any `file://` quirks)*

```bash
# Python 3
python -m http.server 8080

# Node.js (npx)
npx serve .
```

Then visit `http://localhost:8080`.

**Demo credentials:** Any email and password will work — authentication is frontend-only.

---

## KPI Reference

The dashboard tracks the following key metrics:

- **Campaign ROI** — return on ad spend across all active campaigns
- **Landing CVR** — landing page conversion rate (leads / clicks)
- **Traffic Quality Score** — composite quality index (0–100)
- **Social Engagement Rate** — average across all platforms
- **Lead Momentum** — weekly lead volume split by Organic / Paid / Referral
- **Conversion Goal** — progress toward monthly FTD (First Time Deposit) target

---

## Author

**Aytirik** — Digital Marketing Manager at OpoFinance

---

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).
