# Requirement Verification Questions - matzip-map

## Q1: 타겟 사용자 언어 범위

방한 외국인 중 어떤 언어권 사용자를 우선 지원할까요?

- A) 영어 (EN) + 일본어 (JA) + 중국어 (ZH)
- B) 영어 (EN) + 일본어 (JA) + 중국어 (ZH) + 한국어 (KO)
- C) 영어 (EN)만 우선, 추후 확장
- X) Other

[Answer]: A — 방한 외국인 중 일본인과 중국인 비율이 가장 높으므로 EN/JA/ZH 3개 국어 우선 지원

---

## Q2: 맛집 데이터 소스

맛집 데이터는 어떻게 수집/관리할 예정인가요?

- A) 크롤링 자동 수집
- B) 관리자가 Supabase 대시보드에서 수동 입력
- C) 사용자 제보 기반
- D) 외부 API 연동 (Google Places 등)
- X) Other

[Answer]: B — MVP 단계에서는 직접 큐레이션한 맛집을 Supabase에 수동 입력. 품질 관리 우선.

---

## Q3: 서울 내 커버 구역 범위

어떤 구역을 포함할까요?

- A) 명동, 강남, 홍대 (관광 핵심 3곳)
- B) 명동, 성수, 강남, 신사, 서울역, COEX (6곳)
- C) 서울 전체 25개 구
- X) Other

[Answer]: B — 외국인 관광객이 주로 방문하는 6개 핵심 구역으로 시작

---

## Q4: 사용자 인증 필요 여부

사용자 로그인/회원가입이 필요한가요?

- A) 필요 없음 (완전 공개 서비스)
- B) 선택적 (즐겨찾기 등 부가 기능용)
- C) 필수 (리뷰 작성 등)
- X) Other

[Answer]: A — MVP에서는 인증 없이 완전 공개 읽기 전용 서비스로 운영

---

## Q5: 지도 서비스 선택

어떤 지도 서비스를 사용할까요?

- A) Google Maps
- B) Kakao Maps
- C) Naver Maps
- X) Other

[Answer]: A — 외국인 사용자에게 친숙하고, 글로벌 문서/커뮤니티 지원이 좋은 Google Maps 선택

---

## Q6: 호스팅/배포 환경

프론트엔드 호스팅은 어디에 할까요?

- A) Cloudflare Workers
- B) Vercel
- C) Netlify
- D) AWS S3 + CloudFront
- X) Other

[Answer]: A — 글로벌 엣지 배포, 무료 티어 충분, 아시아 지역 빠른 응답

---

## Q7: 예산 제약

월 운영 비용 예산은?

- A) $0 (무료 티어만 사용)
- B) $10 이하
- C) $50 이하
- X) Other

[Answer]: A — 해커톤 프로젝트이므로 모든 서비스 무료 티어로 운영

---

## Q8: Security Baseline Extension

보안 기본 규칙(RLS, API 키 보호, HTTPS 등)을 적용할까요?

- A) Yes — 보안 기본 규칙 적용
- B) No — 보안 규칙 생략

[Answer]: A — 공개 서비스이지만 기본적인 보안 설정(RLS, API 키 제한)은 적용

---

## Q9: Property-Based Testing Extension

속성 기반 테스트(fast-check)를 적용할까요?

- A) Yes — 핵심 비즈니스 로직에 속성 기반 테스트 적용
- B) No — 단위 테스트만 사용

[Answer]: A — 태그 필터링, 번역 fallback 등 핵심 로직에 속성 기반 테스트 적용
