# Build Instructions - matzip-map

## Prerequisites

- Node.js >= 20
- pnpm >= 9.15.0

## Setup

```bash
# 1. Install dependencies
pnpm install

# 2. Copy environment variables
cp .env.example .env.local

# 3. Fill in .env.local with your credentials:
#    - VITE_SUPABASE_URL
#    - VITE_SUPABASE_ANON_KEY
#    - VITE_GOOGLE_MAPS_API_KEY
#    - VITE_GOOGLE_MAPS_MAP_ID
```

## Development

```bash
pnpm dev
# Opens at http://localhost:5173
```

## Production Build

```bash
pnpm build
# Output: dist/
```

## Deploy to Cloudflare Workers

```bash
pnpm deploy
# Runs: pnpm build && wrangler deploy
```

## Supabase Setup

1. Create a new Supabase project (ap-northeast-2 region)
2. Run the migration SQL in Supabase SQL Editor:
   - `supabase/migrations/001_initial_schema.sql`
3. Create a Storage bucket named `restaurant-photos` (public access)
4. Copy the project URL and anon key to `.env.local`

## Google Maps Setup

1. Create a Google Cloud project
2. Enable Maps JavaScript API
3. Create an API key with HTTP referrer restrictions
4. Create a Map ID in the Cloud Console
5. Copy API key and Map ID to `.env.local`
