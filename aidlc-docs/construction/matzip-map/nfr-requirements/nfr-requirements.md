# NFR Requirements - matzip-map

## 성능 (Performance)

| Metric | Target | Rationale |
|--------|--------|-----------|
| 초기 로드 시간 | < 3초 (4G) | 모바일 사용자 이탈 방지 |
| 지도 인터랙션 응답 | < 100ms | 부드러운 UX |
| Supabase 쿼리 응답 | < 500ms | 구역 선택/검색 시 체감 속도 |
| 동시 사용자 | ~100명 | MVP/데모 수준 |
| 번들 사이즈 | < 300KB (gzipped) | 모바일 네트워크 고려 |

### 최적화 전략
- Vite 코드 스플리팅으로 초기 번들 최소화
- Google Maps SDK lazy loading
- 구역 선택 시에만 레스토랑 데이터 fetch (초기 로드 최소화)
- 이미지 lazy loading (브라우저 네이티브)

## 확장성 (Scalability)

| Aspect | Current | Notes |
|--------|---------|-------|
| 레스토랑 수 | 총 100개 이하 (구역당 10~20개) | 추후 확장 시 페이지네이션 추가 |
| 구역 수 | 6개 (하드코딩) | 추가 시 상수 파일 수정 |
| 언어 수 | 3개 (EN/JA/ZH) | JSONB 구조로 추가 용이 |
| 사진 수 | 레스토랑당 3~5장 | 캐러셀 UX 적정 수준 |

### 확장 고려사항
- 현재 규모에서는 페이지네이션/무한스크롤 불필요
- 구역 전체 레스토랑을 한 번에 fetch해도 성능 문제 없음
- 추후 데이터 증가 시 Supabase의 `.range()` 활용

## 보안 (Security)

| Aspect | Decision | Rationale |
|--------|----------|-----------|
| 인증 | 불필요 | 완전 공개 서비스, 로그인 없음 |
| Supabase RLS | 읽기 전용 공개 | anon key로 SELECT만 허용 |
| API Key 보호 | 환경변수 | Google Maps API key는 도메인 제한 설정 |
| CORS | Cloudflare Workers 도메인만 허용 | Supabase 설정 |

### RLS 정책
```sql
-- restaurants: 누구나 읽기 가능, 쓰기 불가
ALTER TABLE restaurants ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read access" ON restaurants FOR SELECT USING (true);

-- restaurant_photos: 누구나 읽기 가능, 쓰기 불가
ALTER TABLE restaurant_photos ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read access" ON restaurant_photos FOR SELECT USING (true);

-- menu_items: 누구나 읽기 가능, 쓰기 불가
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read access" ON menu_items FOR SELECT USING (true);
```

### Google Maps API Key 보안
- HTTP 리퍼러 제한 (배포 도메인만 허용)
- Maps JavaScript API만 활성화
- 일일 쿼터 설정 (무료 티어 내)

## 가용성 (Availability)

| Aspect | Target | Notes |
|--------|--------|-------|
| 가용성 목표 | 최소한 (가끔 다운타임 허용) | 개인 프로젝트/데모 수준 |
| 백업 | Supabase 자동 백업 (무료 티어) | 별도 백업 전략 불필요 |
| 장애 대응 | 수동 | 알림/자동 복구 없음 |
| CDN | Cloudflare Workers 글로벌 엣지 | 정적 자산 자동 캐싱 |

## 모니터링 (Observability)

| Aspect | Tool | Notes |
|--------|------|-------|
| 에러 추적 | 없음 | Cloudflare/Supabase 기본 대시보드만 활용 |
| 로깅 | Cloudflare Workers 로그 | 기본 제공 |
| 메트릭 | Supabase 대시보드 | 쿼리 수, 응답 시간 기본 확인 |
| 알림 | 없음 | 수동 확인 |

## 접근성 (Accessibility)

| Aspect | Target |
|--------|--------|
| 터치 타겟 | 최소 44x44px |
| 색상 대비 | WCAG AA 수준 |
| 스크린 리더 | 기본 aria-label 제공 |
| 키보드 네비게이션 | Tailwind focus-visible 활용 |
