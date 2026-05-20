# Build and Test Summary - matzip-map

## Build Configuration

| Item | Value |
|------|-------|
| Build Tool | Vite 6 |
| Output | `dist/` |
| Target | ES2020 |
| Package Manager | pnpm 9.15.0 |
| Node Version | >= 20 |

## Test Configuration

| Item | Value |
|------|-------|
| Test Runner | Vitest 2 |
| Property Testing | fast-check 3 |
| Coverage | Not configured (MVP) |

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Development server (localhost:5173) |
| `pnpm build` | Production build |
| `pnpm preview` | Preview production build locally |
| `pnpm test` | Run all tests |
| `pnpm test:watch` | Run tests in watch mode |
| `pnpm deploy` | Build + deploy to Cloudflare Workers |

## External Dependencies

| Service | Setup Required |
|---------|---------------|
| Supabase | Create project, run migration SQL |
| Google Maps | Enable API, create key with referrer restriction, create Map ID |
| Cloudflare | `wrangler login`, then `pnpm deploy` |

## Deployment Checklist

- [ ] Supabase project created (ap-northeast-2)
- [ ] Migration SQL executed
- [ ] Google Maps API key created with domain restriction
- [ ] Google Maps Map ID created
- [ ] `.env.local` filled with all credentials
- [ ] `pnpm build` succeeds without errors
- [ ] `pnpm deploy` deploys to Cloudflare Workers
- [ ] Verify at `https://matzip.coldot-sub-1.workers.dev`

## Known Limitations (MVP)

- No CI/CD pipeline (manual deploy)
- No error monitoring (Sentry etc.)
- No automated tests in deployment pipeline
- No image optimization pipeline
- Search relies on Supabase JSONB ilike (not full-text search)
