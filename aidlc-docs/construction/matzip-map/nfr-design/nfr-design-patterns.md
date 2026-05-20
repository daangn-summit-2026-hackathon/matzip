# NFR Design Patterns - matzip-map

## 1. Performance Patterns

### Lazy Loading
- **Google Maps SDK**: `<script async>` + 컴포넌트 마운트 시 초기화
- **레스토랑 데이터**: 구역 선택 시에만 fetch (초기 로드에 포함하지 않음)
- **이미지**: `loading="lazy"` + Intersection Observer로 뷰포트 진입 시 로드
- **코드 스플리팅**: Vite dynamic import로 Detail Panel, Tag Filter Panel 등 lazy load

### Data Fetching Strategy
```
App Load → Districts (하드코딩, 즉시) + i18n (번들 포함)
District Select → fetch restaurants WHERE district_id = X
Pin Tap → fetch photos + menu_items WHERE restaurant_id = X
Search → debounced Supabase query (300ms)
```

### Caching
- **Districts/Tags**: 하드코딩이므로 캐싱 불필요 (번들에 포함)
- **레스토랑 데이터**: Zustand store에 구역별 캐시 (같은 구역 재선택 시 재요청 안 함)
- **검색 결과**: 캐시하지 않음 (매번 fresh query)
- **이미지**: 브라우저 HTTP 캐시에 의존 (외부 이미지 서버 Cache-Control 헤더)

### Bundle Optimization
- Tree shaking (Vite 기본)
- Google Maps SDK 외부 스크립트 (번들 미포함)
- Tailwind CSS purge (사용하지 않는 클래스 제거)
- motion.dev: 사용하는 컴포넌트만 import

## 2. Resilience Patterns

### Graceful Degradation
| 실패 시나리오 | 대응 |
|-------------|------|
| Supabase 쿼리 실패 | 에러 메시지 + 재시도 버튼 |
| Google Maps 로드 실패 | "지도를 불러올 수 없습니다" 메시지 |
| 이미지 로드 실패 | 플레이스홀더 이미지 표시 |
| 번역 데이터 누락 | English fallback |

### Retry Strategy
- **네트워크 요청**: 최대 2회 재시도, 1초 간격
- **사용자 트리거**: 에러 상태에서 "다시 시도" 버튼 제공
- **자동 재시도 없음**: MVP 수준에서 복잡한 exponential backoff 불필요

### Error Boundary
```typescript
// React Error Boundary로 컴포넌트 크래시 격리
<ErrorBoundary fallback={<ErrorFallback />}>
  <MapContainer />
</ErrorBoundary>
```

## 3. Security Patterns

### API Key Protection
- Google Maps API Key: 환경변수 (`VITE_GOOGLE_MAPS_API_KEY`)
  - Google Cloud Console에서 HTTP 리퍼러 제한
  - Maps JavaScript API만 활성화
- Supabase: 환경변수 (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`)
  - anon key는 공개 가능 (RLS로 보호)

### Data Access Control
- Supabase RLS: 모든 테이블 SELECT만 허용
- 쓰기 작업: Supabase 대시보드에서만 (service_role key)
- 클라이언트에서 INSERT/UPDATE/DELETE 불가

### Input Sanitization
- 검색 쿼리: Supabase SDK가 자동 파라미터화 (SQL injection 방지)
- XSS: React의 기본 이스케이핑에 의존
- 사용자 입력 저장 없음 (읽기 전용 서비스)

## 4. Responsive Design Pattern

### Mobile-First Approach
```
Base (320px~) → 모바일 최적화 레이아웃
md (768px~) → 태블릿 여백 확대
lg (1024px~) → 넓은 화면 대응 (선택적)
```

### Touch Optimization
- 모든 인터랙티브 요소: 최소 44x44px
- 바텀시트: 드래그 핸들 + 스와이프 제스처
- 지도: 핀치 줌 + 스와이프 팬

## 5. Internationalization Pattern

### Translation Resolution
```typescript
// 1순위: 선택된 언어
// 2순위: English fallback
// 3순위: 빈 문자열 (플레이스홀더 표시)
function t(translations: TranslationMap, field: string, lang: SupportedLanguage): string {
  return translations?.[field]?.[lang] 
    ?? translations?.[field]?.['en'] 
    ?? '';
}
```

### Language Persistence
```
Load → localStorage.getItem('lang') ?? detectBrowserLang() ?? 'en'
Switch → setState + localStorage.setItem('lang', newLang)
```
