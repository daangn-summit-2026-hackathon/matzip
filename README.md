# 🍽️ 맛ZIP (Matzip Map)

> 한국을 방문하는 외국인 관광객을 위한 현지인 추천 맛집 지도 앱

### 👉 [지금 바로 사용해보기](https://matzip.coldot-sub-1.workers.dev/)

## 프로젝트 소개

올해 1분기에만 방한객이 **476만명**으로, 역대 최대 규모의 외국인들이 한국에 들어오고 있습니다.

유튜브와 인스타그램에서는 '한국 여행 국룰 코스'가 인기인데요. 대부분 **현지인들이 가는 맛집**에 관심이 많고, 카페나 맛집 투어가 주요 콘텐츠입니다.

하지만 외국인 관광객 입장에서는:
- 한국어로 된 리뷰 앱(네이버 지도, 카카오맵)을 읽기 어렵고
- Google Maps에는 관광객 위주 리뷰만 있어 현지인 맛집을 찾기 힘들며
- 일본어/중국어 메뉴가 있는지 사전에 확인할 수 없습니다

**맛ZIP**은 한국을 처음 방문하거나 많이 방문해보지 못한 외국인들을 위한 **전용 맛집 앱**입니다. 서울 주요 관광 구역별로 현지인이 추천하는 맛집을 영어·일본어·중국어로 제공합니다.

---

## 주요 기능

### 🗺️ 구역별 맛집 탐색
서울의 인기 관광 구역(명동, 성수, 강남, 신사, 서울역, COEX)을 선택하면 해당 지역의 맛집 핀이 지도에 표시됩니다. 각 구역의 음식 문화 특징도 함께 안내합니다.

### 🌏 3개 국어 완벽 지원 (EN / JA / ZH)
- 식당 이름, 주소, 영업시간, 메뉴까지 모두 번역
- 브라우저 언어 자동 감지
- 원터치 언어 전환

### 🏷️ 태그 기반 필터링
- 🔥 맛있는 곳 (Delicious)
- ✨ 분위기 좋은 곳 (Great Atmosphere)
- 💰 가성비 좋은 곳 (Good Value)
- 🇯🇵 일본어 메뉴 있음
- 🇨🇳 중국어 메뉴 있음

### 🔍 다국어 검색
식당 이름, 요리 종류를 현재 선택된 언어로 검색할 수 있습니다.

### 📱 모바일 최적화 UI
- 바텀시트 기반 상세 정보 (드래그로 반/전체 화면 전환)
- 사진 캐러셀, 메뉴 목록(가격 포함), 평점, 전화 연결
- 부드러운 스프링 애니메이션과 제스처 인터랙션

### 📍 스마트 지도 마커
- 평점 기반 색상 코딩 (초록: 4.5+, 연초록: 4.0+, 노랑: 기타)
- 마커 클러스터링으로 깔끔한 지도 뷰
- 부드러운 카메라 애니메이션

---

## 기술 스택

| 영역 | 기술 | 선택 이유 |
|------|------|-----------|
| Frontend | React 19 + TypeScript | 최신 기능, 타입 안전성 |
| Build | Vite 6 | 빠른 빌드, HMR |
| Styling | Tailwind CSS 4 | 유틸리티 퍼스트, 빠른 개발 |
| State | Zustand 5 | 경량, 보일러플레이트 최소 |
| Map | Google Maps (@vis.gl/react-google-maps) | 외국인에게 친숙한 인터페이스 |
| Animation | Motion (Framer Motion) | 선언적 애니메이션, 제스처 |
| i18n | react-i18next | 동적 언어 전환 |
| Backend | Supabase (PostgreSQL + REST API) | 서버리스 BaaS, 자동 REST API |
| Hosting | Cloudflare Workers | 글로벌 엣지 배포, 아시아 최적화 |
| Design System | Seed Design | 일관된 UI 컴포넌트 |

---

## 아키텍처

```
┌─────────────────────────────────────────────────────────┐
│                    사용자 (모바일 브라우저)                    │
└──────────────┬──────────────────────┬───────────────────┘
               │                      │
               ▼                      ▼
┌──────────────────────┐   ┌─────────────────────────┐
│   Cloudflare Workers  │   │   Google Maps Platform   │
│   (SPA 정적 호스팅)    │   │   (지도 타일 + SDK)       │
└──────────────────────┘   └─────────────────────────┘
               │
               ▼
┌──────────────────────────────────────────────────────────┐
│                     Supabase (Free Tier)                   │
├──────────────────────────────┬───────────────────────────┤
│       PostgreSQL DB           │       PostgREST API        │
│   (맛집/메뉴/사진URL 데이터)    │       (자동 생성)          │
└──────────────────────────────┴───────────────────────────┘
```

### 핵심 설계 결정

- **JSONB 번역 패턴**: 각 테이블에 `translations` JSONB 컬럼 하나로 모든 다국어 데이터 저장 → JOIN 없이 단일 쿼리로 조회
- **하드코딩 상수**: 구역(District)과 태그(Tag)는 변경 빈도가 낮아 코드에 상수로 관리 → DB 쿼리 절약, 초기 로드 최적화
- **서버리스 아키텍처**: 별도 백엔드 서버 없이 Supabase Client SDK로 직접 쿼리 → 인프라 비용 $0
- **외부 이미지 URL**: 사진은 외부 URL을 DB에 저장하여 Storage 비용 없이 운영

---

## 개발 방법론: AI-DLC (AI-Driven Lifecycle)

이 프로젝트는 **AWS Summit AI-DLC 해커톤**의 취지에 맞게, AI 에이전트와 함께 체계적인 소프트웨어 개발 라이프사이클을 따라 개발했습니다.

### 진행 단계

```
Inception Phase (기획)
├── Workspace Detection → 프로젝트 환경 분석
├── Requirements Analysis → 요구사항 정의
├── User Stories → 사용자 스토리 작성
├── Workflow Planning → 개발 워크플로우 계획
├── Application Design → 애플리케이션 설계
└── Units Generation → 작업 단위 분해

Construction Phase (구현)
├── Functional Design → 도메인 엔티티, 비즈니스 로직 설계
├── NFR Requirements → 비기능 요구사항 (성능, 기술 스택)
├── NFR Design → 비기능 설계 패턴
├── Infrastructure Design → 인프라 아키텍처 설계
├── Code Generation → 코드 생성 및 구현
└── Build and Test → 빌드/테스트 가이드
```

### AI-DLC의 장점
- **체계적 문서화**: 요구사항부터 설계, 구현까지 모든 의사결정이 문서로 남음
- **품질 보증**: 각 단계별 승인 게이트로 품질 확보
- **추적 가능성**: 요구사항 → 설계 → 코드 간 추적성 확보
- **재현 가능성**: 동일한 프로세스로 다른 프로젝트에도 적용 가능

---

## 운영 비용

| 서비스 | 무료 한도 | 예상 사용량 | 월 비용 |
|--------|-----------|-------------|---------|
| Cloudflare Workers | 10만 req/일 | ~1천 req/일 | $0 |
| Supabase DB | 500MB | ~10MB | $0 |
| Supabase API | 50만 req/월 | ~1만 req/월 | $0 |
| Google Maps | $200 크레딧/월 | ~1천 로드/월 | $0 |
| **합계** | | | **$0** |

---

## AWS 프로덕션 아키텍처 (확장 계획)

현재는 해커톤 MVP로 Cloudflare + Supabase 무료 티어를 사용하고 있지만, 실제 프로덕션 서비스로 전환 시 AWS Well-Architected Framework의 6개 Pillar에 맞춰 다음과 같이 설계합니다.

### 전체 아키텍처

```
┌─────────────────────────────────────────────────────────────────────┐
│                         Amazon CloudFront (CDN)                       │
│                    글로벌 엣지 300+ PoP, 한국 리전 캐싱                   │
└────────────┬────────────────────────────┬───────────────────────────┘
             │ Static Assets              │ API Requests (/api/*)
             ▼                            ▼
┌────────────────────────┐   ┌────────────────────────────────────────┐
│      Amazon S3          │   │         Amazon API Gateway (REST)       │
│   (SPA 정적 호스팅)      │   │   + AWS WAF (DDoS/Bot 방어)             │
└────────────────────────┘   └────────────────────┬───────────────────┘
                                                   │
                              ┌─────────────────────┼─────────────────────┐
                              ▼                     ▼                     ▼
                 ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐
                 │  AWS Lambda       │  │  AWS Lambda       │  │  AWS Lambda       │
                 │  (맛집 조회)       │  │  (검색)           │  │  (사진 처리)       │
                 └────────┬─────────┘  └────────┬─────────┘  └────────┬─────────┘
                          │                     │                     │
                          ▼                     ▼                     ▼
             ┌──────────────────────────────────────────────────────────────────┐
             │                    Amazon Aurora Serverless v2                     │
             │              (PostgreSQL 호환, Auto Scaling 0→ACU)                 │
             └──────────────────────────────────────────────────────────────────┘
                          │                                          │
                          ▼                                          ▼
             ┌──────────────────────┐                   ┌──────────────────────┐
             │  Amazon ElastiCache   │                   │      Amazon S3        │
             │  (Redis - 쿼리 캐시)   │                   │  (이미지 원본 저장)    │
             └──────────────────────┘                   └──────────┬───────────┘
                                                                   │
                                                                   ▼
                                                        ┌──────────────────────┐
                                                        │  CloudFront + S3      │
                                                        │  (이미지 CDN 배포)     │
                                                        └──────────────────────┘
```

### Pillar 1: 운영 우수성 (Operational Excellence)

| 서비스 | 역할 | 설계 근거 |
|--------|------|-----------|
| AWS CDK / CloudFormation | IaC (Infrastructure as Code) | 인프라 변경 이력 관리, 환경 복제 용이 |
| Amazon CloudWatch | 로그 수집 + 메트릭 + 알람 | Lambda 실행 로그, API 지연시간, 에러율 모니터링 |
| AWS X-Ray | 분산 추적 | API Gateway → Lambda → Aurora 전 구간 추적 |
| AWS Systems Manager Parameter Store | 환경변수/시크릿 관리 | API 키, DB 연결 정보 안전 관리 |
| Amazon EventBridge | 이벤트 기반 자동화 | 데이터 변경 시 캐시 무효화, 알림 트리거 |

**핵심 전략**: 서버리스 우선으로 운영 부담 최소화. CloudWatch Alarm + SNS로 장애 자동 알림.

### Pillar 2: 보안 (Security)

| 서비스 | 역할 | 설계 근거 |
|--------|------|-----------|
| AWS WAF | 웹 방화벽 | SQL Injection, XSS, Bot 트래픽 차단 |
| Amazon Cognito | 사용자 인증 (향후) | 리뷰/즐겨찾기 기능 추가 시 소셜 로그인 |
| AWS IAM | 최소 권한 원칙 | Lambda별 필요한 리소스만 접근 허용 |
| AWS Secrets Manager | 시크릿 로테이션 | DB 비밀번호, API 키 자동 교체 |
| AWS Shield Standard | DDoS 방어 | CloudFront 연동 시 자동 적용 |
| S3 Bucket Policy | 이미지 접근 제어 | CloudFront OAC(Origin Access Control)로만 접근 허용 |

**핵심 전략**: Zero Trust 모델. 모든 API 요청은 WAF → API Gateway → Lambda 순으로 검증. 데이터 암호화 at rest (Aurora, S3) + in transit (TLS 1.3).

### Pillar 3: 안정성 (Reliability)

| 서비스 | 역할 | 설계 근거 |
|--------|------|-----------|
| Aurora Serverless v2 | Multi-AZ 자동 장애 조치 | 단일 AZ 장애 시 자동 페일오버 (RPO=0, RTO<30초) |
| Lambda | 자동 재시도 + 동시성 관리 | 실패 시 최대 2회 재시도, Reserved Concurrency로 과부하 방지 |
| CloudFront | Origin Failover | S3 원본 장애 시 보조 버킷으로 자동 전환 |
| Route 53 | Health Check + DNS Failover | 엔드포인트 헬스체크, 장애 시 정적 에러 페이지로 라우팅 |
| S3 Cross-Region Replication | 이미지 재해 복구 | ap-northeast-2 → ap-southeast-1 복제 |

**핵심 전략**: 서버리스 아키텍처로 단일 장애점(SPOF) 제거. Aurora Multi-AZ + S3 11 nines 내구성으로 데이터 손실 방지.

### Pillar 4: 성능 효율성 (Performance Efficiency)

| 서비스 | 역할 | 설계 근거 |
|--------|------|-----------|
| CloudFront | 정적 자산 + API 응답 캐싱 | 한국/일본/중국 엣지에서 <50ms 응답 |
| ElastiCache (Redis) | 쿼리 결과 캐싱 | 구역별 맛집 목록 캐시 (TTL 5분), DB 부하 90% 감소 |
| Lambda@Edge | 언어 감지 + 라우팅 | Accept-Language 헤더 기반 최적 응답 |
| Aurora Serverless v2 | Auto Scaling ACU | 트래픽에 따라 0.5~8 ACU 자동 조절 |
| S3 + CloudFront | 이미지 최적화 배포 | WebP 변환 + 리사이징 (Lambda@Edge), Cache-Control 1년 |
| API Gateway Caching | API 응답 캐싱 | 동일 구역 조회 요청 캐싱 (TTL 60초) |

**핵심 전략**: 3-tier 캐싱 (CloudFront Edge → API Gateway → ElastiCache). 한국/일본/중국 사용자 모두 <100ms 응답 목표.

### Pillar 5: 비용 최적화 (Cost Optimization)

| 서비스 | 과금 모델 | 예상 비용 (MAU 10만 기준) |
|--------|-----------|--------------------------|
| CloudFront | 데이터 전송량 | ~$5/월 (50GB 전송) |
| S3 | 저장량 + 요청 수 | ~$1/월 (5GB 이미지) |
| Lambda | 요청 수 + 실행 시간 | ~$3/월 (100만 요청, 128MB, 100ms) |
| Aurora Serverless v2 | ACU-시간 | ~$15/월 (평균 0.5 ACU) |
| ElastiCache | 노드 시간 | ~$12/월 (cache.t4g.micro) |
| API Gateway | 요청 수 | ~$3.50/월 (100만 요청) |
| **합계** | | **~$40/월** |

**비용 절감 전략**:
- Aurora Serverless v2: 트래픽 없을 때 0 ACU로 스케일 다운 (야간 비용 절감)
- Lambda: 128MB 메모리로 충분 (단순 CRUD), Graviton2(ARM) 런타임으로 20% 절감
- CloudFront: 캐시 적중률 90%+ 유지로 Origin 요청 최소화
- S3 Intelligent-Tiering: 접근 빈도 낮은 이미지 자동 계층 이동
- Reserved Capacity: ElastiCache 1년 예약 시 40% 할인

**MVP → AWS 전환 시 비용 비교**:
| 단계 | 월 비용 | MAU |
|------|---------|-----|
| MVP (현재) | $0 | ~1,000 |
| AWS 초기 | ~$40 | ~100,000 |
| AWS 성장기 | ~$120 | ~500,000 |

### Pillar 6: 지속 가능성 (Sustainability)

| 전략 | 구현 방법 |
|------|-----------|
| 서버리스 우선 | Lambda + Aurora Serverless → 유휴 시 리소스 0 소비 |
| Graviton 프로세서 | Lambda ARM64 런타임 → x86 대비 60% 에너지 효율 |
| 캐싱 극대화 | CloudFront + ElastiCache → 불필요한 컴퓨팅 반복 제거 |
| 이미지 최적화 | WebP + 적응형 리사이징 → 네트워크 전송량 70% 감소 |
| 리전 선택 | ap-northeast-2 (서울) → 사용자 근접 배치로 네트워크 홉 최소화 |

---

### AWS 전환 마이그레이션 경로

```
Phase 1: 정적 호스팅 전환 (Day 1)
  Cloudflare Workers → S3 + CloudFront
  - S3 버킷 생성, dist/ 업로드
  - CloudFront 배포 생성, OAC 설정
  - Route 53 도메인 연결

Phase 2: 데이터베이스 전환 (Day 2-3)
  Supabase PostgreSQL → Aurora Serverless v2
  - pg_dump로 데이터 export
  - Aurora 클러스터 생성 (ap-northeast-2)
  - 스키마 + 데이터 import
  - 연결 문자열 업데이트

Phase 3: API 레이어 구축 (Day 3-5)
  Supabase REST API → API Gateway + Lambda
  - Lambda 함수 작성 (Node.js 20, ARM64)
  - API Gateway REST API 생성
  - 엔드포인트 매핑: GET /restaurants, GET /photos, GET /menu-items
  - WAF 연동

Phase 4: 캐싱 + 최적화 (Day 5-7)
  - ElastiCache Redis 클러스터 생성
  - Lambda에 캐시 로직 추가
  - CloudFront 캐시 정책 최적화
  - 이미지 최적화 파이프라인 (S3 + Lambda@Edge)
```

---

## 로컬 개발 환경 설정

```bash
# 의존성 설치
pnpm install

# 환경 변수 설정
cp .env.example .env.local
# .env.local에 Supabase, Google Maps 키 입력

# 개발 서버 실행
pnpm dev

# 빌드
pnpm build

# 배포 (Cloudflare Workers)
pnpm deploy
```
