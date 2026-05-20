# Requirements - matzip-map

## Intent Analysis

| Item | Value |
|------|-------|
| User Request | 한국을 방문하는 외국인 관광객을 위한 현지인 추천 맛집 지도 앱 개발 |
| Request Type | New Project (Greenfield) |
| Scope | Single Application (Frontend SPA + BaaS) |
| Complexity | Moderate |
| Target Users | 영어/일본어/중국어 사용 외국인 관광객 |
| Primary Platform | Mobile Web (iOS Safari, Android Chrome) |

## Background & Problem Statement

### 시장 현황
- 2025년 1분기 방한객 **476만명** (역대 최대, 전년 동기 대비 +23%)
- 방한 외국인 국적 비율: 일본(22%), 중국(18%), 미국(8%), 기타
- 외국인 관광객 주요 활동: 맛집 탐방(78%), 쇼핑(65%), 관광지(61%)

### 문제 정의
외국인 관광객이 **현지인이 추천하는 맛집**을 찾기 어려운 3가지 핵심 문제:

| # | 문제 | 기존 솔루션 | 한계 |
|---|------|------------|------|
| 1 | 언어 장벽 | 네이버 지도, 카카오맵 | 한국어 전용, 외국인 접근 불가 |
| 2 | 정보 편향 | Google Maps | 관광객 위주 리뷰, 현지인 맛집 정보 부족 |
| 3 | 정보 산재 | 블로그, 유튜브, 인스타그램 | 실시간 위치 기반 탐색 불가, 정보 파편화 |

### 솔루션 가설
> 서울 주요 관광 구역별로 현지인이 큐레이션한 맛집을 3개 국어(EN/JA/ZH)로 제공하는 지도 기반 모바일 웹앱을 만들면, 외국인 관광객의 맛집 탐색 경험을 크게 개선할 수 있다.

---

## Functional Requirements

### FR-1: 구역 기반 맛집 탐색
| ID | 요구사항 | 우선순위 |
|----|---------|---------|
| FR-1.1 | 서울 주요 관광 구역(명동, 성수, 강남, 신사, 서울역, COEX) 선택 UI 제공 | Must |
| FR-1.2 | 구역 선택 시 해당 지역으로 지도 카메라 이동 (부드러운 애니메이션) | Must |
| FR-1.3 | 선택된 구역의 맛집을 지도 핀으로 표시 | Must |
| FR-1.4 | 구역별 음식 문화 특징 설명을 현재 언어로 제공 | Should |
| FR-1.5 | 구역별 등록된 맛집 수 표시 | Should |
| FR-1.6 | 구역 미선택 시 선택 유도 화면 표시 | Must |

### FR-2: 다국어 지원 (EN/JA/ZH)
| ID | 요구사항 | 우선순위 |
|----|---------|---------|
| FR-2.1 | 모든 UI 텍스트 3개 국어 지원 (react-i18next) | Must |
| FR-2.2 | 식당 이름, 주소, 영업시간, 메뉴 번역 제공 (JSONB) | Must |
| FR-2.3 | 브라우저 언어 자동 감지 (ja→일본어, zh→중국어, 기타→영어) | Must |
| FR-2.4 | 원터치 수동 언어 전환 (EN→JA→ZH 순환) | Must |
| FR-2.5 | 언어 설정 localStorage 영속화 | Must |
| FR-2.6 | 번역 누락 시 English fallback | Must |

### FR-3: 맛집 상세 정보
| ID | 요구사항 | 우선순위 |
|----|---------|---------|
| FR-3.1 | 바텀시트 형태의 상세 패널 (드래그 제스처 지원) | Must |
| FR-3.2 | 식당 이름, 주소, 영업시간, 전화번호 표시 | Must |
| FR-3.3 | 사진 캐러셀 (스와이프, 인디케이터) | Must |
| FR-3.4 | 메뉴 목록 (이름 + 가격, KRW) | Must |
| FR-3.5 | 평점 및 평가 수 (조건부 표시: 3개 미만 시 "New") | Must |
| FR-3.6 | 태그 배지 표시 | Should |
| FR-3.7 | 전화번호 탭 시 전화 앱 연결 | Should |

### FR-4: 태그 기반 필터링
| ID | 요구사항 | 우선순위 |
|----|---------|---------|
| FR-4.1 | 사전 정의된 5개 태그로 맛집 필터링 | Must |
| FR-4.2 | AND 연산 (선택한 모든 태그를 포함하는 맛집만 표시) | Must |
| FR-4.3 | 필터 적용 시 실시간 매칭 수 표시 | Should |
| FR-4.4 | 매칭 결과 0개 시 빈 상태 메시지 | Must |
| FR-4.5 | 태그 필터 FAB 버튼 (구역 선택 시에만 표시) | Must |

### FR-5: 검색 기능
| ID | 요구사항 | 우선순위 |
|----|---------|---------|
| FR-5.1 | 식당 이름, 요리 종류로 검색 (현재 언어 기준) | Must |
| FR-5.2 | 300ms 디바운스 자동완성 (최대 10개 제안) | Must |
| FR-5.3 | 제안 유형 분류 (restaurant/tag/cuisine) | Should |
| FR-5.4 | 검색 결과 바텀시트 표시 | Must |
| FR-5.5 | 결과 없음 시 안내 메시지 | Must |

### FR-6: 지도 인터랙션
| ID | 요구사항 | 우선순위 |
|----|---------|---------|
| FR-6.1 | Google Maps 기반 인터랙티브 지도 (전체 화면) | Must |
| FR-6.2 | 평점 기반 색상 코딩 마커 (4.5+: 초록, 4.0+: 연초록, 기타: 노랑) | Must |
| FR-6.3 | 마커 클러스터링 (근접 핀 그룹화) | Must |
| FR-6.4 | 부드러운 카메라 애니메이션 (requestAnimationFrame) | Should |
| FR-6.5 | 핀 탭 시 상세 패널 열림 | Must |

### FR-7: 모바일 최적화 UI
| ID | 요구사항 | 우선순위 |
|----|---------|---------|
| FR-7.1 | 모바일 퍼스트 반응형 디자인 (320px~) | Must |
| FR-7.2 | 터치 최적화 (최소 44x44px 터치 타겟) | Must |
| FR-7.3 | Safe area 대응 (노치, 홈 인디케이터) | Must |
| FR-7.4 | 상호 배타적 패널 (한 번에 하나만 표시) | Must |

---

## Non-Functional Requirements

### NFR-1: 성능
| Metric | Target | Measurement |
|--------|--------|-------------|
| First Contentful Paint | < 1.5초 | Lighthouse (Mobile, 4G) |
| Largest Contentful Paint | < 2.5초 | Lighthouse |
| Time to Interactive | < 3.0초 | Lighthouse |
| Cumulative Layout Shift | < 0.1 | Lighthouse |
| 지도 인터랙션 응답 | < 100ms | 체감 측정 |
| Supabase 쿼리 응답 | < 500ms | Network tab |
| 번들 사이즈 (gzipped) | < 300KB | Build output |

### NFR-2: 보안
| Aspect | Requirement |
|--------|-------------|
| 인증 | 불필요 (공개 읽기 전용 서비스) |
| 데이터 보호 | Supabase RLS (SELECT only) |
| API 키 | Google Maps: HTTP referrer 제한 |
| 전송 암호화 | HTTPS 강제 (Cloudflare) |
| SQL Injection | Supabase SDK 파라미터화 쿼리 |
| XSS | React 기본 이스케이핑 |

### NFR-3: 가용성 & 운영
| Aspect | Target |
|--------|--------|
| 월 운영 비용 | $0 (모든 서비스 무료 티어) |
| 배포 | Cloudflare Workers (글로벌 엣지) |
| 백업 | Supabase 자동 일일 백업 |
| 모니터링 | 서비스 대시보드 수동 확인 |

### NFR-4: 접근성
| Aspect | Target |
|--------|--------|
| 색상 대비 | WCAG AA (4.5:1) |
| 터치 타겟 | 최소 44x44px |
| 스크린 리더 | aria-label 제공 |
| 키보드 | focus-visible 지원 |

### NFR-5: 국제화
| Aspect | Target |
|--------|--------|
| 지원 언어 | EN, JA, ZH (3개) |
| 언어 추가 | 스키마 변경 없이 가능 (JSONB) |
| Fallback | English |
| 감지 | 브라우저 언어 자동 감지 |

---

## Constraints

| Constraint | Description | Rationale |
|-----------|-------------|-----------|
| 예산 | $0/월 | 해커톤 프로젝트, 지속 가능한 운영 |
| 지도 | Google Maps | 외국인에게 친숙, 글로벌 지원 |
| 호스팅 | Cloudflare Workers | 글로벌 엣지, 무료 티어 충분 |
| 데이터 관리 | Supabase 대시보드 수동 | 관리자 UI 개발 불필요 (MVP) |
| 인증 | 없음 | 공개 읽기 전용 서비스 |
| 타겟 디바이스 | 모바일 웹 | iOS Safari, Android Chrome |
| 데이터 규모 | ~100개 맛집 | 6개 구역, 구역당 10~20개 |

---

## Success Criteria

| # | Criteria | Measurement |
|---|----------|-------------|
| 1 | 외국인 관광객이 3개 국어로 맛집을 탐색할 수 있다 | 기능 동작 확인 |
| 2 | 구역별 맛집을 지도에서 직관적으로 찾을 수 있다 | 3탭 이내 도달 |
| 3 | 태그 필터와 검색으로 원하는 맛집을 빠르게 찾을 수 있다 | 10초 이내 |
| 4 | 모바일에서 부드러운 UX를 제공한다 | Lighthouse 90+ |
| 5 | 월 운영 비용 $0으로 지속 가능하다 | 비용 모니터링 |
| 6 | AI-DLC 프로세스를 통해 체계적으로 개발되었다 | 문서 완성도 |

---

## Traceability Matrix

| Requirement | User Story | Design | Component |
|-------------|-----------|--------|-----------|
| FR-1 (구역 탐색) | US-1.1 | business-logic-model.md Flow 2 | DistrictNavigationBar, MapContainer |
| FR-2 (다국어) | US-3.1, US-3.2 | nfr-design-patterns.md §5 | LanguageSwitcher, i18n.ts |
| FR-3 (상세 정보) | US-1.2 | business-logic-model.md Flow 3 | DetailPanel, PhotoCarousel, MenuList |
| FR-4 (태그 필터) | US-1.3 | business-logic-model.md Flow 4 | TagFilterPanel, search.service.ts |
| FR-5 (검색) | US-2.1 | business-logic-model.md Flow 5,6 | SearchBar, SearchBottomSheet |
| FR-6 (지도) | US-4.1 | frontend-components.md | MapContainer, RestaurantPin |
| FR-7 (모바일 UI) | All | ui-design-guide.md | All components |
