# Integration Test Instructions - matzip-map

## Overview

단일 유닛(SPA) 프로젝트이므로 전통적인 서비스 간 통합 테스트 대신, 컴포넌트 간 상호작용과 외부 서비스 연동을 검증합니다.

## Integration Test Scope

### 1. Supabase 연동 테스트

```typescript
// 실제 Supabase 인스턴스에 대한 연동 테스트
describe('Supabase Integration', () => {
  it('should fetch restaurants by district', async () => {
    const restaurants = await fetchRestaurantsByDistrict('57c50c10-198d-48ec-8255-4c45b8f7bc9e');
    expect(restaurants).toBeInstanceOf(Array);
    expect(restaurants.length).toBeGreaterThan(0);
    expect(restaurants[0]).toHaveProperty('translations');
    expect(restaurants[0]).toHaveProperty('lat');
    expect(restaurants[0]).toHaveProperty('lng');
  });

  it('should fetch restaurant photos', async () => {
    const photos = await fetchRestaurantPhotos('<valid-restaurant-id>');
    expect(photos).toBeInstanceOf(Array);
    for (const photo of photos) {
      expect(photo.url).toMatch(/^https:\/\//);
      expect(photo.display_order).toBeGreaterThanOrEqual(0);
    }
  });

  it('should search restaurants by name', async () => {
    const results = await searchRestaurants('Korean', 'en');
    expect(results).toBeInstanceOf(Array);
  });
});
```

### 2. 컴포넌트 상호작용 테스트

```typescript
// Store + Component 통합 동작 검증
describe('Store-Component Integration', () => {
  it('selecting district should trigger restaurant fetch', () => {
    // setActiveDistrict → useEffect → fetchRestaurantsByDistrict → setRestaurants
  });

  it('selecting restaurant should open detail panel', () => {
    // setSelectedRestaurant → isDetailPanelOpen = true
    // + isSearchBottomSheetOpen = false
    // + isTagFilterOpen = false
  });

  it('opening tag filter should close other panels', () => {
    // setTagFilterOpen(true) → isDetailPanelOpen = false
    // + isSearchBottomSheetOpen = false
  });
});
```

### 3. 다국어 통합 테스트

```typescript
describe('i18n Integration', () => {
  it('language switch should update all visible content', () => {
    // setLanguage('ja') → i18n.changeLanguage('ja')
    // → 모든 컴포넌트 re-render with Japanese text
  });

  it('translation fallback should work for missing translations', () => {
    // translations.name.ja가 없을 때 → translations.name.en으로 fallback
  });
});
```

## Manual Integration Test Checklist

브라우저에서 수동으로 검증해야 하는 통합 시나리오:

### Flow 1: 구역 탐색 → 맛집 상세
- [ ] 구역 칩 탭 → 지도 이동 + 핀 표시
- [ ] 핀 탭 → 바텀시트 열림 + 사진/메뉴 로드
- [ ] 바텀시트 드래그 → half/full 전환
- [ ] 닫기 → 바텀시트 닫힘

### Flow 2: 검색 → 결과 확인
- [ ] 검색어 입력 → 자동완성 드롭다운 표시
- [ ] 제안 탭 → 해당 맛집 상세 열림
- [ ] 엔터 → 검색 결과 바텀시트 표시

### Flow 3: 태그 필터링
- [ ] FAB 탭 → 태그 패널 열림
- [ ] 태그 선택 → 매칭 수 업데이트
- [ ] 결과 보기 → 지도 핀 필터링

### Flow 4: 언어 전환
- [ ] EN → JA → ZH → EN 순환
- [ ] 구역 이름, 설명, 맛집 정보 모두 전환 확인
- [ ] 새로고침 후 선택 언어 유지 확인

## 실행 방법

```bash
# 단위 테스트 (mock 기반)
pnpm test

# 통합 테스트 (실제 Supabase 연동 - .env.local 필요)
pnpm test -- --testPathPattern=integration

# 수동 테스트
pnpm dev
# 위 체크리스트를 브라우저에서 수동 검증
```
