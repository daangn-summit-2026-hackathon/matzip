# Business Rules - matzip-map

## BR-1: Rating Display Rules

| Condition | Display |
|-----------|---------|
| rating_count >= 3 | 숫자 별점 (1.0~5.0) + 평가 수 표시 |
| rating_count < 3 | "New" 라벨 표시, 숫자 별점 숨김 |
| rating is null | "New" 라벨 표시 |

**Constraint**: 별점은 Detail Panel에서만 표시. Restaurant Pin에는 별점 미표시.

## BR-2: Language Detection & Fallback

```
IF browser_language starts with 'ja' → set language to 'ja'
ELSE IF browser_language starts with 'zh' → set language to 'zh'
ELSE → set language to 'en' (default fallback)
```

**Persistence**: 선택된 언어는 localStorage에 저장. 재방문 시 저장된 언어 우선 적용.

**Graceful Degradation**: 언어 전환이 1초 초과 시 로딩 인디케이터 표시, 사용자 인터랙션 차단하지 않음.

## BR-3: Tag Filtering Logic (AND 연산)

```
filtered_restaurants = restaurants.filter(r =>
  selected_tags.every(tag => r.tags.includes(tag))
)
```

- 태그 미선택 시: 모든 레스토랑 표시
- 1개 이상 선택 시: 선택된 모든 태그를 포함하는 레스토랑만 표시 (교집합)
- Tag_Filter_Panel에 매칭 레스토랑 수 실시간 표시

## BR-4: District Filter Rules

- 구역 미선택 시: 지도에 핀 없음, 구역 선택 유도 화면 표시
- 구역 선택 시: 해당 구역 내 레스토랑만 핀으로 표시
- 구역 재탭 시: 선택 해제, 초기 화면으로 복귀
- 구역별 레스토랑 수 항상 표시 (0개인 경우 "0 restaurants" 표시)

## BR-5: Search Behavior

### Autocomplete (타이핑 중)
- Supabase에 debounced 쿼리 (300ms)
- 검색 대상: restaurant name, cuisine_type, tag labels (현재 선택 언어 기준)
- 결과를 Autocomplete_Dropdown에 표시
- 최대 10개 제안 표시

### Search Submit (엔터/검색 버튼)
- 전체 검색 결과를 Search_Bottom_Sheet에 표시
- 동시에 지도에 매칭 핀 하이라이트
- 지도 하이라이트 실패 시에도 바텀시트 결과는 표시 + 안내 메시지

### No Results
- "No results found" 메시지를 Search_Bottom_Sheet에 표시 (현재 언어)

## BR-6: Map Interaction Rules

### Initial State
- 서울 전체 지도 표시 (줌 레벨 11~12)
- 핀 없음
- District_Navigation_Bar에 구역 칩 표시

### District Selected State
- 지도 중심을 구역 center로 이동
- 줌 레벨을 구역 zoom_level로 설정
- 해당 구역 레스토랑 핀 표시
- 구역 음식 문화 설명 표시 (토스트 또는 배너)

### Pin Clustering
- 줌 레벨에 따라 근접 핀 클러스터링
- 클러스터 마커에 포함된 레스토랑 수 표시
- 클러스터 탭 시 줌 인

### Pin Tap
- Detail_Panel (바텀시트) 열림
- 해당 핀 시각적 강조

## BR-7: Restaurant Order (Non-Ranked)

- 레스토랑은 별점 기준으로 정렬하지 않음
- 표시 순서: Supabase에서 반환되는 순서 (created_at 또는 랜덤)
- 알고리즘 추천, 큐레이션 라벨, 랭킹 인디케이터 없음

## BR-8: Photo Carousel Rules

- 사진이 2장 이상일 때 캐러셀 UI 활성화
- 사진이 1장일 때 단일 이미지 표시
- 사진이 0장일 때 플레이스홀더 이미지 표시
- display_order 순서대로 표시
- 스와이프 제스처로 사진 전환
- 현재 사진 인덱스 인디케이터 (dots) 표시

## BR-9: Detail Panel Missing Data Handling

| Field | Missing Behavior |
|-------|-----------------|
| name | 표시 불가 - 패널 열리지 않음 |
| address | "Address not available" 플레이스홀더 |
| rating | "New" 라벨 표시 |
| tags | 태그 섹션 숨김 |
| photo | 플레이스홀더 이미지 |
| operating_hours | "Hours not available" 플레이스홀더 |
| phone_number | 전화번호 섹션 숨김 |

## BR-10: Responsive Layout Rules

| Screen Width | Behavior |
|-------------|----------|
| 320px - 428px | 모바일 최적화 레이아웃 (primary) |
| 429px - 768px | 태블릿/폴드 - 동일 레이아웃, 여백 확대 |
| 769px - 1024px | 태블릿 가로 - 지도 영역 확대, 사이드 패널 가능 |

- Portrait orientation only
- 모든 터치 타겟 최소 44x44px
