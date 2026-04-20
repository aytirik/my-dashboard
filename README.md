# OpoFinance Marketing Dashboard

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=flat&logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=flat&logo=postgresql&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=flat&logo=prisma&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-blue?style=flat)

A full-stack marketing intelligence dashboard for OpoFinance. The frontend is built with pure HTML, CSS, and JavaScript — no frameworks, no bundler. The backend is a Node.js/Express REST API backed by PostgreSQL via Prisma, with real authentication and persistent data.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend markup | HTML5 (semantic, multi-page) |
| Frontend styling | CSS3 — custom properties, grid, flexbox, dark/light themes |
| Frontend logic | Vanilla JavaScript — client-side router, DOM rendering, chart builder |
| Charts | Inline SVG + JavaScript (zero external chart libs) |
| Backend | Node.js + Express 5 |
| ORM | Prisma 7 |
| Database | PostgreSQL |
| Auth | bcrypt password hashing |
| Environment | dotenv |

---

## Features

### Authentication
- **Register / Login** — credentials stored in PostgreSQL with bcrypt-hashed passwords
- **Split-screen login page** — branded left panel with live floating KPI cards, sign-in form on the right
- **Sign-up page** — matching design with account creation flow

### Dashboard UI
- **Dark / Light mode** — toggle in the header, persists across the session
- **Responsive sidebar navigation** — collapsible on mobile with overlay, 7 sections
- **Live date chip**, notification bell, and user avatar in the header

### Pages & Widgets

| Page | What it shows |
|---|---|
| **Overview** | Lead Momentum card, Quick Route shortcuts, Conversion Goal donut chart, 4 KPI cards (ROI, CVR, Traffic Quality, Social Engagement), Weekly Performance bar chart, Acquisition Mix, Campaign Activity feed, Regional Pulse |
| **Campaigns** | Summary stat cards, sortable/filterable campaign table with status pills, budget progress bars, ROI, CVR, and action buttons — backed by live API data |
| **Lead Funnel** | Full funnel from Impressions → FTD, stage drop-off analysis, funnel-by-channel breakdown |
| **Regional Pulse** | Lead volume and ROI by country, 24 active markets, flags and trend indicators |
| **Social Radar** | 6 platform cards (Facebook, Instagram, X, LinkedIn, TikTok, YouTube) with followers, engagement rate, reach, and post count |
| **Reports** | 8 report templates, recent report list with download buttons |
| **Settings** | Profile editor, notification toggles, integration status, security options |

### Backend & Data
- Full **CRUD API** for campaigns and users
- **Prisma migrations** for schema versioning
- **PostgreSQL** as the persistent data store

---

## Project Structure

```
my-dashboard/
├── index.html           # Login page
├── signup.html          # Sign-up page
├── dashboard.html       # Main dashboard shell + overview widgets
├── script.js            # Client-side router, page renderers, chart builder
├── style.css            # All styles — dark/light themes, components, layout
└── backend/
    ├── index.js         # Express app entry point
    ├── .env             # Local environment variables (not committed)
    ├── .env.example     # Environment variable template
    ├── prisma/
    │   ├── schema.prisma
    │   └── migrations/
    ├── routes/
    │   ├── auth.js
    │   ├── campaigns.js
    │   └── users.js
    ├── controllers/
    │   ├── authController.js
    │   ├── campaignsController.js
    │   └── usersController.js
    └── lib/
        └── prisma.js    # Prisma client singleton
```

---

## Running Locally

### Prerequisites
- Node.js 18+
- PostgreSQL running locally (or a connection string to a remote instance)

### 1. Clone the repo

```bash
git clone https://github.com/<your-username>/my-dashboard.git
cd my-dashboard
```

### 2. Install backend dependencies

```bash
cd backend
npm install
```

### 3. Set up environment variables

```bash
cp .env.example .env
```

Edit `.env` and fill in your database credentials:

```
DATABASE_URL="postgresql://your_user:your_password@localhost:5432/your_db?schema=your_schema"
SHADOW_DATABASE_URL="postgresql://your_user:your_password@localhost:5432/your_db?schema=your_schema"
PORT=3000
```

### 4. Run database migrations

```bash
npm run db:migrate
```

### 5. Start the backend server

```bash
# Production
npm start

# Development (auto-restarts on file changes)
npm run dev
```

The API will be available at `http://localhost:3000`.

### 6. Open the frontend

Open `index.html` directly in your browser, or serve the root directory:

```bash
# From the project root
npx serve .
```

Then visit `http://localhost:3000` (or whichever port `serve` uses).

---

## API Endpoints

Base URL: `http://localhost:3000/api`

### Auth

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/auth/register` | Create a new account — body: `{ name, email, password, role? }` |
| `POST` | `/auth/login` | Log in — body: `{ email, password }` |

### Campaigns

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/campaigns` | List all campaigns (newest first) |
| `POST` | `/campaigns` | Create a campaign — body: `{ title, channel, budget, status, start_date }` |
| `PUT` | `/campaigns/:id` | Update a campaign (partial update supported) |
| `DELETE` | `/campaigns/:id` | Delete a campaign |

### Users

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/users` | List all users |
| `POST` | `/users` | Create a user — body: `{ name, email }` |
| `GET` | `/users/:id` | Get a single user |
| `PUT` | `/users/:id` | Update a user — body: `{ name?, email? }` |
| `DELETE` | `/users/:id` | Delete a user |

---

## KPI Reference

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
