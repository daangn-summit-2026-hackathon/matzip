# Code Generation Summary - matzip-map

## Generated Artifacts

### Source Code Statistics

| Category | Files | LOC | Description |
|----------|-------|-----|-------------|
| Components | 12 | ~1,200 | React 컴포넌트 (MapContainer, DetailPanel, SearchBar 등) |
| Services | 2 | ~120 | data.service.ts, search.service.ts |
| Store | 1 | ~90 | Zustand app-store.ts (전역 상태 관리) |
| Constants | 2 | ~100 | districts.ts, tags.ts (하드코딩 데이터) |
| Types | 1 | ~60 | TypeScript 타입 정의 |
| Lib | 3 | ~40 | supabase.ts, translate.ts, i18n.ts |
| Locales | 3 | ~90 | en.json, ja.json, zh.json (UI 텍스트) |
| Config | 4 | ~50 | vite, wrangler, tsconfig, tailwind |
| Entry | 3 | ~80 | App.tsx, main.tsx, index.css |
| **Total** | **~35** | **~1,830** | |

---

## Technical Challenges & Solutions

### Challenge 1: 바텀시트 제스처 인터랙션

**문제**: 외부 라이브러리(react-spring-bottom-sheet 등)는 React 19 호환성 이슈가 있고, 번들 크기를 증가시킴.

**해결**: Pointer Events API를 활용한 커스텀 바텀시트 구현
- 3단계 스냅 포인트 (half: 30%, full: 5%, closed: 100%)
- `pointerdown` → `pointermove` → `pointerup` 이벤트 체인으로 드래그 추적
- CSS `cubic-bezier(0.32, 0.72, 0, 1)` 트랜지션으로 iOS 네이티브 느낌 재현
- `will-change: transform` 으로 GPU 가속 활성화
- 스크롤 영역과 드래그 영역 분리 (overscroll-contain)

```typescript
// 핵심 로직: 드래그 종료 시 가장 가까운 스냅 포인트로 이동
const handlePointerUp = () => {
  if (mode === 'half') {
    if (currentY < halfY - 80) snapTo('full');      // 위로 충분히 드래그 → 전체 화면
    else if (currentY > halfY + 100) handleClose(); // 아래로 충분히 드래그 → 닫기
    else snapTo('half');                             // 원위치 복귀
  }
};
```

### Challenge 2: 지도 카메라 애니메이션

**문제**: Google Maps `panTo()`는 기본 애니메이션이 딱딱하고, `moveCamera()`는 애니메이션 없이 즉시 이동.

**해결**: `requestAnimationFrame` 기반 커스텀 카메라 애니메이션
- Ease-out cubic 보간: `1 - Math.pow(1 - progress, 3)`
- 380ms 지속 시간 (체감상 자연스러운 속도)
- 중간에 다른 구역 선택 시 이전 애니메이션 취소 (cancel 함수 반환)
- 위치(lat/lng)와 줌 레벨 동시 보간

```typescript
function animateMapCamera(map, targetCenter, targetZoom): () => void {
  const step = (now) => {
    const progress = Math.min((now - startedAt) / 380, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    map.moveCamera({
      center: { lat: lerp(start.lat, target.lat, eased), lng: lerp(start.lng, target.lng, eased) },
      zoom: lerp(startZoom, targetZoom, eased),
    });
    if (progress < 1) frameId = requestAnimationFrame(step);
  };
  return () => cancelAnimationFrame(frameId); // cleanup
}
```

### Challenge 3: Layout Animation (구역 칩 → 히어로 카드 전환)

**문제**: 구역 선택 시 작은 칩이 큰 히어로 카드로 자연스럽게 변환되어야 함. 단순 fade-in/out은 부자연스러움.

**해결**: Framer Motion `layoutId`를 활용한 Shared Layout Animation
- 칩과 히어로 카드에 동일한 `layoutId` 부여 → 자동 위치/크기 보간
- 배경 이미지, 스크림 오버레이, 텍스트 각각 별도 `layoutId`로 독립 애니메이션
- `AnimatePresence` + `mode="popLayout"`으로 진입/퇴장 동시 처리
- Spring physics: `stiffness: 360, damping: 34, mass: 0.9`
- 전환 중 중복 클릭 방지 (520ms transition lock)

### Challenge 4: JSONB 기반 다국어 아키텍처

**문제**: 전통적인 번역 테이블(별도 테이블 + JOIN)은 쿼리 복잡도 증가, 성능 저하.

**해결**: 단일 JSONB 컬럼 패턴
- 각 테이블에 `translations JSONB` 컬럼 하나로 모든 번역 저장
- JOIN 없이 단일 쿼리로 모든 언어 데이터 조회
- GIN 인덱스로 JSONB 내부 검색 성능 확보
- 클라이언트에서 `translations[field][lang]`으로 일관된 접근
- 언어/필드 추가 시 스키마 변경 불필요

```typescript
// 3줄로 끝나는 번역 헬퍼
function t(translations: TranslationMap, field: string, lang: SupportedLanguage): string {
  return translations?.[field]?.[lang] ?? translations?.[field]?.['en'] ?? '';
}
```

### Challenge 5: 마커 클러스터링 + 커스텀 마커

**문제**: Google Maps AdvancedMarkerElement는 React 컴포넌트로 직접 렌더링 불가. MarkerClusterer와의 통합도 imperative API 필요.

**해결**: Imperative marker 관리 + Custom renderer
- `useEffect` 내에서 마커를 직접 생성/삭제 (React 렌더 사이클 외부)
- `useRef`로 마커 배열과 클러스터러 인스턴스 관리
- 커스텀 클러스터 렌더러: 크기별 차등 표시 (40/48/56px)
- 평점 기반 마커 색상 코딩 (DOM element 직접 생성)
- 필터 변경 시 기존 마커 정리 → 새 마커 생성 (메모리 누수 방지)

---

## Design Patterns Applied

| Pattern | Where | Why |
|---------|-------|-----|
| Container/Presentational | MapContainer (logic) vs TagBadges (display) | 관심사 분리, 재사용성 |
| Zustand Store | app-store.ts | 보일러플레이트 최소화, 선택적 구독 |
| Service Layer | data.service, search.service | 데이터 접근 추상화, 테스트 용이 |
| Constants Pattern | DISTRICTS, TAGS | 변경 빈도 낮은 데이터 최적화 |
| Translation Helper | t() 함수 | 일관된 다국어 접근, fallback 내장 |
| Lazy Data Fetching | 구역 선택 시에만 로드 | 초기 로드 최소화 |
| Mutual Exclusion | 패널 상태 관리 | UX 일관성 (한 번에 하나만) |
| Cleanup on Unmount | useEffect return | 메모리 누수 방지 |
| Debounce | 검색 자동완성 (300ms) | 불필요한 API 호출 방지 |
| Optimistic UI | 즉시 UI 반응 + 백그라운드 로드 | 체감 속도 향상 |

---

## Code Quality

| Metric | Value | Notes |
|--------|-------|-------|
| TypeScript Strict Mode | ✅ | noImplicitAny, strictNullChecks |
| ESLint | ✅ | React hooks rules 포함 |
| Type Coverage | ~95% | any 사용 최소화 |
| Component 평균 크기 | ~100-150 LOC | 단일 책임 원칙 준수 |
| 순환 의존성 | 0 | 단방향 의존 구조 |
| 외부 의존성 | 10개 | 최소한의 의존성 유지 |
| Dead Code | 0 | Tree shaking + 수동 정리 |

---

## Extension Compliance

### Security Baseline ✅ Compliant

| Rule | Status | Implementation |
|------|--------|---------------|
| RLS 적용 | ✅ | 모든 테이블 SELECT only 정책 |
| API 키 환경변수 | ✅ | VITE_ prefix, .env.local |
| 도메인 제한 | ✅ | Google Maps HTTP referrer |
| SQL Injection 방지 | ✅ | Supabase SDK 파라미터화 |
| XSS 방지 | ✅ | React 기본 이스케이핑 |
| HTTPS 강제 | ✅ | Cloudflare 자동 SSL |
| 민감 데이터 노출 | ✅ | anon key만 클라이언트 노출 (RLS 보호) |

### Property-Based Testing ✅ Compliant

| Property | Test File | Description |
|----------|-----------|-------------|
| P1: 번역 일관성 | translate.property.test.ts | 모든 언어에서 동일 필드 접근 시 빈 문자열 아닌 값 반환 |
| P2: Fallback 보장 | translate.property.test.ts | 임의 언어 누락 시 항상 English fallback |
| P3: 언어 감지 매핑 | translate.property.test.ts | 브라우저 언어 → SupportedLanguage 매핑 전사 함수 |
| P7: 평점 표시 규칙 | rating.property.test.ts | rating_count < 3이면 항상 "New" 표시 |
| P8: 태그 필터 AND | filter.property.test.ts | 필터 결과의 모든 항목이 선택된 모든 태그 포함 |

---

## Build Output

```
dist/
├── index.html                    (1.2 KB)
├── assets/
│   ├── index-[hash].js          (~180 KB gzipped)
│   ├── index-[hash].css         (~15 KB gzipped)
│   └── vendor-[hash].js         (~85 KB gzipped - React, Zustand, i18next)
└── districts/                    (구역 이미지)

Total gzipped: ~280 KB (목표 300KB 이내 달성)
```
