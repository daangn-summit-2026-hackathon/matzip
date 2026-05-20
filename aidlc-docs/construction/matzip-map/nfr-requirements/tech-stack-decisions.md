# Tech Stack Decisions - matzip-map

## Final Tech Stack

| Layer | Technology | Version | Rationale |
|-------|-----------|---------|-----------|
| Framework | React | 19 | 최신 기능 (use, Actions), 컴포넌트 기반 |
| Language | TypeScript | 5.x | 타입 안전성, DX |
| Build | Vite | 6.x | 빠른 빌드, 코드 스플리팅 |
| Map | @vis.gl/react-google-maps | latest | React 친화적 Google Maps 래퍼 |
| Styling | Tailwind CSS | 4.x | 유틸리티 퍼스트, 빠른 개발 |
| Animation | motion.dev (Framer Motion) | latest | 선언적 애니메이션, 제스처 |
| State | Zustand | 5.x | 경량, 보일러플레이트 최소 |
| i18n | react-i18next | latest | 동적 언어 전환 |
| Backend | Supabase | - | PostgreSQL, 자동 REST API, Storage |
| Deployment | Cloudflare Workers | - | 글로벌 엣지, Static Assets |
| Testing | Vitest + fast-check | latest | 단위 + 속성 기반 테스트 |

## Decision Rationale

### Why NOT a separate backend server?
- 데이터 규모가 작음 (100개 이하 레스토랑)
- CRUD는 Supabase 대시보드에서 수동 관리
- 인증 불필요 → 서버 사이드 로직 최소
- Supabase Client SDK로 직접 쿼리 충분

### Why Cloudflare Workers over Vercel/Netlify?
- 사용자 지정 (프로젝트 요구사항)
- 글로벌 엣지 배포로 아시아 지역 빠른 응답
- Static Assets 기능으로 SPA 호스팅 간편
- 무료 티어 충분 (일 100,000 요청)

### Why Google Maps over Kakao Maps?
- 사용자 지정 (프로젝트 요구사항)
- 외국인 사용자에게 친숙한 인터페이스
- 글로벌 문서/커뮤니티 지원
- @vis.gl/react-google-maps로 React 통합 용이

### Why JSONB translations over separate columns?
- 언어 추가 시 스키마 변경 불필요
- 필드 추가 시에도 구조 변경 없음
- JOIN 불필요 → 단순한 쿼리
- Supabase 대시보드에서 JSON 직접 편집 용이

### Why hardcoded Districts/Tags?
- 데이터 변경 빈도 극히 낮음
- DB 쿼리 절약 (초기 로드 최적화)
- 배포 시 즉시 반영 (DB 의존성 제거)
- 타입 안전성 보장 (TypeScript 상수)

## Package Dependencies (예상)

```json
{
  "dependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "@vis.gl/react-google-maps": "^1.0.0",
    "motion": "^11.0.0",
    "zustand": "^5.0.0",
    "react-i18next": "^15.0.0",
    "i18next": "^24.0.0",
    "@supabase/supabase-js": "^2.0.0"
  },
  "devDependencies": {
    "typescript": "^5.6.0",
    "vite": "^6.0.0",
    "@tailwindcss/vite": "^4.0.0",
    "tailwindcss": "^4.0.0",
    "vitest": "^2.0.0",
    "fast-check": "^3.0.0",
    "wrangler": "^3.0.0"
  }
}
```

## Constraints & Limitations

- **무료 티어 운영**: Supabase Free (500MB DB, 1GB Storage), Cloudflare Free (100K req/day)
- **Google Maps 무료 한도**: 월 $200 크레딧 (약 28,000 map loads)
- **별도 CI/CD 없음**: wrangler CLI로 수동 배포
- **모니터링 없음**: 기본 대시보드만 활용
- **백업**: Supabase 자동 백업에 의존
