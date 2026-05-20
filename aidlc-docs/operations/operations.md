# Operations - matzip-map

## 1. 배포 현황

| 항목 | 상태 | 비고 |
|------|------|------|
| Production 배포 | ✅ 완료 | Cloudflare Workers |
| 도메인 | ✅ 운영 중 | `matzip.coldot-sub-1.workers.dev` |
| SSL/TLS | ✅ 자동 | Cloudflare 제공 |
| CDN | ✅ 자동 | Cloudflare 글로벌 엣지 (300+ PoP) |
| Database | ✅ 운영 중 | Supabase PostgreSQL (ap-northeast-2) |

---

## 2. 배포 절차

### 2.1 Production 배포 (수동)

```bash
# 1. 코드 변경 확인 및 빌드
pnpm build        # TypeScript 컴파일 + Vite 빌드

# 2. Cloudflare Workers 배포
pnpm deploy       # pnpm build && wrangler deploy

# 3. 배포 확인
# https://matzip.coldot-sub-1.workers.dev 접속하여 동작 확인
```

### 2.2 배포 소요 시간

| 단계 | 소요 시간 |
|------|-----------|
| TypeScript 컴파일 | ~3초 |
| Vite 빌드 | ~5초 |
| Wrangler 업로드 | ~10초 |
| 글로벌 전파 | 즉시 (Cloudflare 엣지) |
| **총 소요** | **~20초** |

### 2.3 롤백 절차

```bash
# 즉시 롤백 (이전 배포 버전으로)
wrangler rollback

# 특정 버전으로 롤백
wrangler deployments list    # 배포 이력 확인
wrangler rollback --version <version-id>
```

### 2.4 배포 체크리스트

- [ ] `pnpm build` 에러 없이 완료
- [ ] 환경변수 (.env.local) 최신 상태 확인
- [ ] 로컬에서 `pnpm preview`로 동작 확인
- [ ] `pnpm deploy` 성공
- [ ] 배포 URL에서 주요 기능 동작 확인:
  - [ ] 지도 렌더링
  - [ ] 구역 선택 → 맛집 핀 표시
  - [ ] 맛집 상세 정보 표시
  - [ ] 언어 전환
  - [ ] 검색 동작

---

## 3. 인프라 모니터링

### 3.1 Cloudflare Workers

| 항목 | 확인 방법 |
|------|-----------|
| 대시보드 | Cloudflare Dashboard > Workers & Pages > matzip-map |
| 요청 수 | Workers Analytics (일별/시간별) |
| 에러율 | Workers Analytics > Errors (4xx, 5xx) |
| 응답 시간 | Workers Analytics > Duration (P50, P95, P99) |
| CPU 사용 | Workers Analytics > CPU Time |

**무료 티어 한도**: 100,000 requests/day, 10ms CPU time/invocation

### 3.2 Supabase

| 항목 | 확인 방법 |
|------|-----------|
| 대시보드 | Supabase Dashboard > Project Settings > Usage |
| DB 크기 | Settings > Database > Disk Usage |
| API 요청 | Reports > API Requests |
| Storage | Settings > Storage > Usage |
| 연결 수 | Database > Connection Pooling |

**무료 티어 한도**: 500MB DB, 1GB Storage, 500K API requests/month, 50 concurrent connections

### 3.3 Google Maps

| 항목 | 확인 방법 |
|------|-----------|
| 대시보드 | Google Cloud Console > APIs & Services > Maps JavaScript API |
| Map loads | Metrics > Map loads |
| 에러율 | Metrics > Error rate |
| 할당량 | Quotas > Maps JavaScript API |
| 비용 | Billing > Cost breakdown |

**무료 한도**: $200 credit/month ≈ 28,000 dynamic map loads

---

## 4. 운영 한도 및 스케일링 계획

### 4.1 현재 사용량 vs 한도

| 서비스 | 한도 | 예상 사용량 | 여유율 | 위험도 |
|--------|------|-------------|--------|--------|
| Cloudflare Workers | 100K req/일 | ~1K req/일 | 99% | 🟢 안전 |
| Supabase DB | 500MB | ~10MB | 98% | 🟢 안전 |
| Supabase API | 500K req/월 | ~10K req/월 | 98% | 🟢 안전 |
| Google Maps | $200/월 | ~$7/월 | 96% | 🟢 안전 |

### 4.2 스케일링 트리거

| 지표 | 경고 임계값 | 위험 임계값 | 대응 |
|------|------------|------------|------|
| Cloudflare 일일 요청 | > 50K | > 80K | Workers Paid ($5/월) 전환 |
| Supabase DB 크기 | > 300MB | > 450MB | Pro Plan ($25/월) 전환 |
| Supabase API 요청 | > 300K/월 | > 450K/월 | Pro Plan 전환 |
| Google Maps loads | > 15K/월 | > 25K/월 | 사용 패턴 분석, 캐싱 검토 |

---

## 5. 장애 대응 절차

### 5.1 장애 감지

현재 자동 알림 시스템은 없으며, 수동 모니터링으로 운영합니다.

**정기 확인 (일 1회)**:
- Cloudflare Workers 대시보드 에러율 확인
- Supabase 대시보드 사용량 확인

### 5.2 장애 유형별 대응

#### Type A: 사이트 접속 불가 (Cloudflare)
```
증상: 5xx 에러, 페이지 로드 실패
확인: https://www.cloudflarestatus.com
대응:
  1. Cloudflare 인프라 장애 → 복구 대기
  2. 코드 문제 → wrangler rollback
  3. 도메인 문제 → DNS 설정 확인
```

#### Type B: 데이터 로드 실패 (Supabase)
```
증상: 맛집 목록 비어있음, 사진 표시 안됨
확인: https://status.supabase.com
대응:
  1. Supabase 장애 → 복구 대기 (앱은 에러 메시지 표시)
  2. RLS 정책 변경 → Supabase Dashboard에서 확인/복구
  3. API 키 만료 → 키 재발급 + 재배포
```

#### Type C: 지도 렌더링 실패 (Google Maps)
```
증상: 지도 영역 빈 화면, 콘솔 에러
확인: Google Cloud Status Dashboard
대응:
  1. Google 장애 → 복구 대기
  2. API 키 문제 → Cloud Console에서 키 상태 확인
  3. 할당량 초과 → 다음 달 리셋 대기 또는 결제 설정
```

#### Type D: 성능 저하
```
증상: 느린 로딩, 지도 인터랙션 지연
확인: Cloudflare Analytics + Supabase Logs
대응:
  1. 번들 크기 확인 → 코드 스플리팅 최적화
  2. Supabase 쿼리 느림 → 인덱스 확인
  3. 이미지 로딩 느림 → 이미지 최적화 (WebP, 리사이징)
```

---

## 6. 데이터 관리

### 6.1 맛집 데이터 CRUD

모든 데이터 관리는 Supabase Dashboard의 Table Editor에서 수행합니다.

#### 맛집 추가
```
1. Supabase Dashboard > Table Editor > restaurants
2. "Insert row" 클릭
3. 필수 필드 입력:
   - id: UUID 생성
   - district_id: 구역 ID (districts 상수 참조)
   - lat, lng: 좌표 (Google Maps에서 확인)
   - translations: {"name": {"en": "...", "ja": "...", "zh": "..."}, ...}
4. 선택 필드: tags, rating, rating_count, phone_number
```

#### 사진 추가
```
1. 외부 이미지 호스팅에 사진 업로드 (또는 공개 URL 확보)
2. Table Editor > restaurant_photos
3. Insert row: restaurant_id, url (외부 이미지 URL), display_order
4. translations: {"alt_text": {"en": "...", "ja": "...", "zh": "..."}}
```

#### 메뉴 추가
```
1. Table Editor > menu_items
2. Insert row: restaurant_id, price (원 단위), display_order
3. translations: {"name": {"en": "Bibimbap", "ja": "ビビンバ", "zh": "拌饭"}}
```

### 6.2 백업 정책

| 대상 | 방법 | 주기 | 보관 기간 |
|------|------|------|-----------|
| Database | Supabase 자동 백업 | 일 1회 | 7일 (Free tier) |
| 코드 | Git repository | 커밋 시 | 영구 |
| 환경변수 | .env.example (템플릿) | - | Git 관리 |

### 6.3 데이터 무결성 확인

```sql
-- 고아 사진 확인 (restaurant 없는 photo)
SELECT p.id FROM restaurant_photos p
LEFT JOIN restaurants r ON r.id = p.restaurant_id
WHERE r.id IS NULL;

-- 고아 메뉴 확인
SELECT m.id FROM menu_items m
LEFT JOIN restaurants r ON r.id = m.restaurant_id
WHERE r.id IS NULL;

-- 번역 누락 확인
SELECT id, translations->>'name' as name_translations
FROM restaurants
WHERE translations->'name'->>'en' IS NULL
   OR translations->'name'->>'ja' IS NULL
   OR translations->'name'->>'zh' IS NULL;
```

---

## 7. 보안 운영

### 7.1 현재 보안 설정

| 항목 | 상태 | 설명 |
|------|------|------|
| HTTPS | ✅ 적용 | Cloudflare 자동 SSL/TLS |
| RLS | ✅ 적용 | 모든 테이블 읽기 전용 공개 |
| API Key 제한 | ✅ 적용 | Google Maps - HTTP referrer 제한 |
| Supabase Anon Key | ✅ 안전 | SELECT만 허용 (RLS) |
| CORS | ✅ 설정 | 배포 도메인만 허용 |
| DDoS 보호 | ✅ 자동 | Cloudflare 기본 제공 |

### 7.2 보안 점검 체크리스트 (월 1회)

- [ ] Google Maps API 키 사용량 이상 여부 확인
- [ ] Supabase RLS 정책 변경 여부 확인
- [ ] 의존성 취약점 스캔: `pnpm audit`
- [ ] Cloudflare Workers 로그에서 비정상 요청 패턴 확인
- [ ] Supabase 대시보드에서 비정상 쿼리 패턴 확인

### 7.3 인시던트 대응

```
1. 비정상 트래픽 감지 시:
   → Cloudflare WAF 규칙 추가 (IP 차단 등)
   
2. API 키 유출 의심 시:
   → 즉시 키 재발급 + 재배포
   → Google Cloud Console에서 이전 키 비활성화
   
3. 데이터 변조 의심 시:
   → Supabase 백업에서 복원
   → RLS 정책 재확인
```

---

## 8. 성능 기준선 (Baseline)

### 8.1 측정 기준

| 메트릭 | 목표 | 측정 방법 |
|--------|------|-----------|
| FCP (First Contentful Paint) | < 1.5초 | Lighthouse |
| LCP (Largest Contentful Paint) | < 2.5초 | Lighthouse |
| TTI (Time to Interactive) | < 3.0초 | Lighthouse |
| CLS (Cumulative Layout Shift) | < 0.1 | Lighthouse |
| 번들 크기 (gzipped) | < 300KB | `pnpm build` 출력 |
| Supabase 쿼리 응답 | < 500ms | Supabase Dashboard |

### 8.2 성능 모니터링 명령

```bash
# 번들 크기 확인
pnpm build
# dist/ 폴더 크기 확인

# Lighthouse 성능 측정 (Chrome DevTools)
# 1. Chrome > DevTools > Lighthouse
# 2. Mobile 선택 > Performance 체크
# 3. Analyze page load
```

---

## 9. 향후 개선 로드맵

### Phase 1: 안정화 (1-2주)
- [ ] Sentry 에러 모니터링 도입 (Free tier)
- [ ] 이미지 최적화 파이프라인 (WebP 변환, 리사이징)
- [ ] Lighthouse 성능 점수 90+ 달성
- [ ] 접근성 감사 및 개선

### Phase 2: 자동화 (1-2개월)
- [ ] GitHub Actions CI/CD 파이프라인
  - PR 시 자동 빌드 + 테스트
  - main 머지 시 자동 배포
- [ ] E2E 테스트 자동화 (Playwright)
- [ ] 의존성 자동 업데이트 (Renovate/Dependabot)

### Phase 3: 기능 확장 (2-3개월)
- [ ] 한국어(KO) 언어 추가
- [ ] PWA 지원 (오프라인 캐싱, 홈 화면 추가)
- [ ] 사용자 즐겨찾기 (localStorage 기반)
- [ ] 맛집 리뷰/평점 기능 (인증 필요)

### Phase 4: 스케일링 (3개월+)
- [ ] 부산, 제주 등 서울 외 지역 확장
- [ ] 추천 알고리즘 (사용자 선호 기반)
- [ ] 관리자 대시보드 (맛집 데이터 관리 UI)
- [ ] 다국어 풀텍스트 검색 (Supabase Full-Text Search)
