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

- 🗺️ **구역별 맛집 탐색** — 명동, 성수, 강남, 신사, 서울역, COEX 6개 구역
- 🌏 **3개 국어 완벽 지원** — EN/JA/ZH 브라우저 자동 감지 + 원터치 전환
- 🏷️ **태그 필터링** — 맛있는 곳, 분위기, 가성비, 일본어/중국어 메뉴 유무
- 🔍 **다국어 검색** — 자동완성 + 식당명/요리 종류 검색
- 📱 **모바일 최적화** — 바텀시트, 사진 캐러셀, 제스처 인터랙션
- 📍 **스마트 마커** — 평점 기반 색상 코딩 + 클러스터링

---

## 기술 스택

React 19 · TypeScript · Vite 6 · Tailwind CSS 4 · Zustand · Google Maps API · Framer Motion · react-i18next · Supabase (PostgreSQL) · Cloudflare Workers · Seed Design

**핵심 설계**: JSONB 번역 패턴(JOIN 없는 다국어) · 하드코딩 상수(구역/태그) · 서버리스 아키텍처(월 $0 운영) · 외부 이미지 URL(Storage 비용 제거)

---

## 개발 방법론: AI-DLC

**AWS Summit AI-DLC 해커톤** 취지에 맞게 AI 에이전트와 체계적인 SDLC를 수행했습니다.

**Inception** → Requirements · User Stories · Workflow Planning · Application Design
**Construction** → Functional Design · NFR · Infrastructure · Code Generation · Build & Test
**Operations** → 배포 · 모니터링 · 장애 대응 · 로드맵

모든 의사결정이 `aidlc-docs/`에 문서화되어 있으며, 요구사항 → 설계 → 코드 간 추적성을 확보했습니다.
