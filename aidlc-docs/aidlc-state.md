# AI-DLC State - matzip-map

## Project Overview

| Item | Value |
|------|-------|
| Project Name | matzip-map (맛ZIP) |
| Project Type | New Project (Greenfield) |
| Complexity | Moderate |
| Scope | Single Unit (Frontend SPA + BaaS) |
| Target Users | 외국인 관광객 (EN/JA/ZH) |
| Primary Platform | Mobile Web |
| Development Method | AI-DLC (AI-Driven Lifecycle) |

## Stage Progress

### 🔵 INCEPTION PHASE
- [x] Workspace Detection — Greenfield 확인, 기존 코드 없음
- [x] Requirements Analysis — Standard depth, FR 7개 + NFR 5개 정의
- [x] User Stories — 3 Personas, 4 Epics, 7 Stories
- [x] Workflow Planning — 단일 유닛, 11단계 실행 계획
- [x] Application Design — 12 컴포넌트, 2 서비스, 1 스토어 설계

### 🟢 CONSTRUCTION PHASE (matzip-map unit)
- [x] Functional Design — 5 엔티티, 10 비즈니스 규칙, 7 데이터 플로우
- [x] NFR Requirements — 성능/보안/확장성/접근성 요구사항
- [x] NFR Design — 5개 설계 패턴 (Performance, Resilience, Security, Responsive, i18n)
- [x] Infrastructure Design — Cloudflare + Supabase + Google Maps 아키텍처
- [x] Code Generation — ~35 파일, ~1,830 LOC, 5개 기술적 챌린지 해결
- [x] Build and Test — 빌드/단위/통합 테스트 가이드

### 🟡 OPERATIONS PHASE
- [x] Operations — 배포 절차, 모니터링, 장애 대응, 보안, 로드맵

## Extension Configuration

| Extension | Enabled | Decided At | Compliance |
|-----------|---------|------------|------------|
| Security Baseline | Yes | Requirements Analysis | ✅ All rules compliant |
| Property-Based Testing | Yes | Requirements Analysis | ✅ 5 properties tested |

## Workflow Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Reverse Engineering | Skipped | Greenfield project — 기존 코드 없음 |
| Units Generation | Skipped | 단일 SPA — 분해 불필요 |
| User Stories Depth | Standard | 3개 페르소나, 다국어 사용자 시나리오 필요 |
| Requirements Depth | Standard | 명확한 스코프, 중간 복잡도 |
| Functional Design Depth | Comprehensive | 복잡한 비즈니스 규칙 (10개), 다중 엔티티 (5개) |
| NFR Depth | Standard | 성능 + 보안 고려 필요 |
| Infrastructure Depth | Standard | 3개 외부 서비스 통합 (Cloudflare + Supabase + Google Maps) |

## Key Technical Decisions

| Decision | Choice | Alternatives Considered | Rationale |
|----------|--------|------------------------|-----------|
| 번역 아키텍처 | JSONB 단일 컬럼 | 별도 번역 테이블 + JOIN | JOIN 불필요, 스키마 변경 없이 언어 추가 |
| 바텀시트 구현 | Pointer Events 커스텀 | react-spring-bottom-sheet | React 19 호환, 번들 크기 절약, 완전한 제어 |
| 카메라 애니메이션 | rAF 커스텀 | Google Maps panTo() | 부드러운 ease-out, 취소 가능, 줌 동시 보간 |
| 구역/태그 데이터 | 하드코딩 상수 | DB 저장 | 변경 빈도 극히 낮음, 초기 로드 최적화 |
| 사진 저장 | 외부 URL (DB 컬럼) | Supabase Storage | Storage 비용 제거, 외부 CDN 활용 |
| 상태 관리 | Zustand | Redux, Jotai, Context | 경량, 보일러플레이트 최소, 선택적 구독 |
| 마커 렌더링 | Imperative API | React 컴포넌트 마커 | AdvancedMarkerElement + Clusterer 호환 |

## Metrics Summary

| Category | Metric | Value |
|----------|--------|-------|
| Code | Total Files | ~35 |
| Code | Total LOC | ~1,830 |
| Code | Components | 12 |
| Code | TypeScript Strict | ✅ |
| Performance | Bundle (gzipped) | ~280 KB |
| Performance | Target LCP | < 2.5초 |
| Cost | Monthly | $0 |
| i18n | Languages | 3 (EN/JA/ZH) |
| Data | Districts | 6 |
| Data | Tags | 5 |
| Testing | Property Tests | 5 |
| Security | RLS Policies | 3 tables |

## Current Status

**Phase**: ✅ COMPLETED (All 3 phases done)  
**Last Updated**: 2025-05-20  
**Total AI-DLC Stages Executed**: 12/12
