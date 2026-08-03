# Alireza Yoonesi | Academic Portfolio & Writings Aggregator

Personal website, writings aggregator, resume, and research showcase for **Alireza Yoonesi (علیرضا یونسی)** — Law Student, Tech-Forward Legal Researcher & Rookie Kantian specializing in Private Law, International Trade, ADR, and Legal Tech.

## Features

- **Writings Aggregator**: Automatically fetches and parses live RSS feeds from Medium, Virgool, Blogspot, and personal blogs (`fa.ayoonesi.ir`, `en.ayoonesi.ir`).
- **Reading Time Estimation**: Calculates estimated reading times for aggregated posts based on word count.
- **Resume & Academic Background**: Displays education at Shiraz University, publication history, certifications, skills, and honors.
- **Interests & Projects**: Highlights research topics (Kantian Ethics, Legal Tech, International Trade, Civil Liability) and software/automation projects.
- **SEO & Google Search Engine Optimization**: Includes structured JSON-LD (`Person` schema), `robots.txt`, XML sitemap (`/sitemap.xml`), and Open Graph meta tags.

## Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS v4, Lucide Icons, Motion animations
- **Backend & RSS Middleware**: Express.js, `rss-parser`, `tsx`, `esbuild`
- **Build Tooling**: Vite 6, TypeScript

## Getting Started

### Prerequisites

- Node.js (v18+)
- npm or pnpm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ayoonesi/ayoonesi.git
   cd ayoonesi
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables (optional):
   ```bash
   cp .env.example .env
   ```

### Running Locally

To start the server and Vite development environment:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

To build the static frontend assets and bundle the Express server:

```bash
npm run build
```

To run the production build:

```bash
npm start
```

## Configuration

Site configurations (name, tagline, bio, social links, RSS feed URLs, and interests) are located in `src/config.ts`.

## Deploying to Custom Root Domain (`ayoonesi.ir`)

To host this application at your root domain (`https://ayoonesi.ir`):

### Option A: Hosting with Node.js Server (Recommended for Live RSS Proxy & Dynamic Sitemap)

Since this project includes an Express server (`server.ts`) for dynamic RSS parsing and sitemap generation:

1. **Deploy to a Node.js Host** (e.g., Render, Railway, Fly.io, Cloud Run, or a VPS):
   - **Build Command**: `npm run build`
   - **Start Command**: `npm start`
   - **Environment Variables**: Set `NODE_ENV=production` and `PORT=3000` (or host-provided port).

2. **Configure DNS Records** at your domain registrar/DNS provider (e.g., Cloudflare, ArvanCloud):
   - **Apex / Root Domain (`@`)**: Add an `A` record pointing to your server's public IP address (or `ALIAS`/`ANAME` record if required by provider).
   - **Subdomain (`www`)**: Add a `CNAME` record pointing to your host's domain endpoint (e.g., `your-app.onrender.com`).

3. **Enable SSL/TLS**:
   - Most modern cloud providers (or Cloudflare/Let's Encrypt) automatically issue free SSL certificates once DNS records resolve.

---

### Option B: Deploying Static Site on GitHub Pages / Vercel

If deploying as a purely static frontend:

1. **GitHub Pages CNAME**:
   - Create a `CNAME` file in the `public/` folder containing:
     ```
     ayoonesi.ir
     ```
2. **DNS Configuration for GitHub Pages**:
   - Point your root domain `ayoonesi.ir` to GitHub Pages IP addresses:
     - `185.199.108.153`
     - `185.199.109.153`
     - `185.199.110.153`
     - `185.199.111.153`

## License

This project is licensed under the [MIT License](LICENSE).







---




To publish this application under your custom domain (`ayoonesi.ir`), you have a few options depending on where you want to host it.

## Option 1: GitHub + Vercel / Cloudflare Pages / Netlify (Recommended & Free)

This is the easiest and most popular method for personal sites.

1. Export the code to GitHub:
   - Click the Settings / Export menu in the top header and select Export to GitHub (or download as ZIP and push to a new GitHub repository, e.g. `ayoonesi/portfolio`).

2. Deploy on Vercel or Cloudflare Pages:
   - Sign in to Vercel or Cloudflare Pages using your GitHub account.
   - Click Add New Project and import your repository.
   - Framework Preset: `Vite`
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Click Deploy.

3. Connect your custom domain (`ayoonesi.ir`):
   - In Vercel / Cloudflare Pages, go to Project Settings → Domains.
   - Enter `ayoonesi.ir` and `www.ayoonesi.ir`.
   - Update your DNS records (at Cloudflare, ArvanCloud, or your registrar) with the provided A or CNAME records.

## Option 2: Cloud Run (Google Cloud)

If you deploy the container directly from Google Cloud:

1. Deploy the app container to Google Cloud Run.
2. Go to Google Cloud Console → Cloud Run → Custom Domains.
3. Click Add Mapping and enter `ayoonesi.ir`.
4. Copy the generated A and AAAA IP records and paste them into your DNS provider (e.g., Cloudflare or ArvanCloud).

## Option 3: VPS or Custom Server (Nginx + Node)

If you have a Linux VPS:

1. Clone the GitHub repository onto your server.
2. Install dependencies and build the app:
   ```bash
   npm install
   npm run build
   ```
3. Run the production server using PM2:
   ```bash
   pm2 start npm --name "ayoonesi-app" -- start
   ```
4. Point Nginx reverse proxy to `http://localhost:3000` for domain `ayoonesi.ir` and enable SSL with Let's Encrypt Certbot.
