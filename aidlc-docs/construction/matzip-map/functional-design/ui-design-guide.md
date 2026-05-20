# UI Design Guide - matzip-map (SEED Design 기반)

## SEED Design 도입 개요

당근의 디자인 시스템 [SEED Design](https://seed-design.io)을 활용하여 일관된 UI를 구현합니다.
SEED Design은 역할 기반 색상 시스템, 접근성 고려, 라이트/다크 테마 자동 적응을 제공합니다.

### 셋업 명령어

```bash
# 초기화
pnpm dlx @seed-design/cli@latest init

# 필요한 컴포넌트 추가
pnpm dlx @seed-design/cli@latest add ui:chip
pnpm dlx @seed-design/cli@latest add ui:bottom-sheet
pnpm dlx @seed-design/cli@latest add ui:badge
pnpm dlx @seed-design/cli@latest add ui:skeleton
pnpm dlx @seed-design/cli@latest add ui:action-button
pnpm dlx @seed-design/cli@latest add ui:text-field-input
```

## 컴포넌트 매핑

matzip-map의 UI 컴포넌트를 SEED Design 컴포넌트에 매핑합니다.

| matzip-map 컴포넌트 | SEED Design 컴포넌트 | 용도 |
|-------------------|---------------------|------|
| DistrictChip | `Chip.RadioRoot` + `Chip.RadioItem` | 구역 선택 (단일 선택) |
| TagChip (필터) | `Chip.Toggle` | 태그 필터 (다중 선택) |
| TagBadge (상세) | `Badge` | 레스토랑 태그 표시 |
| DetailPanel | `BottomSheet` | 레스토랑 상세 정보 |
| SearchBottomSheet | `BottomSheet` | 검색 결과 표시 |
| LoadingSkeleton | `Skeleton` | 로딩 상태 |
| TagFilterButton | `Floating Action Button` | 태그 필터 진입점 |
| SearchInput | `TextFieldInput` | 검색 입력 |
| ShowResultsButton | `ActionButton` | 태그 필터 적용 |

## 색상 시스템

SEED Design의 역할 기반 색상(Role-Based Color)을 사용합니다.

### 주요 색상 역할

| 역할 | 토큰 | 용도 |
|------|------|------|
| Brand | `$color.bg.brand-solid` | 선택된 구역 칩, 주요 액션 |
| Neutral | `$color.fg.neutral` | 일반 텍스트, 기본 UI |
| Neutral Muted | `$color.fg.neutral-muted` | 보조 텍스트 (주소, 영업시간) |
| Neutral Subtle | `$color.fg.neutral-subtle` | 비활성 상태, 플레이스홀더 |
| Positive | `$color.fg.positive` | 별점 표시, 긍정 상태 |
| Warning | `$color.fg.warning` | "New" 배지 |
| Informative | `$color.bg.informative-weak` | 구역 설명 배너 배경 |

### 태그별 색상 (Badge tone 매핑)

| 태그 | Badge tone | Badge variant |
|------|-----------|---------------|
| Delicious 🔥 | `critical` | `weak` |
| Great Atmosphere ✨ | `brand` | `weak` |
| Good Value 💰 | `positive` | `weak` |
| Japanese Menu 🇯🇵 | `informative` | `weak` |
| Chinese Menu 🇨🇳 | `warning` | `weak` |

## 컴포넌트 사용 예시

### District Navigation Bar (구역 칩)

```tsx
import { Chip } from "seed-design/ui/chip";
import { HStack } from "@seed-design/react";

function DistrictNavigationBar({ districts, activeDistrict, onSelect, lang }) {
  return (
    <Chip.RadioRoot
      value={activeDistrict ?? ''}
      onValueChange={(value) => onSelect(value || null)}
      aria-label="District selection"
    >
      <HStack gap="x2" overflow="auto" paddingX="x4">
        {districts.map((district) => (
          <Chip.RadioItem
            key={district.id}
            value={district.id}
            size="medium"
            variant="outlineWeak"
          >
            <Chip.Label>
              {t(district.translations, 'name', lang)}
            </Chip.Label>
          </Chip.RadioItem>
        ))}
      </HStack>
    </Chip.RadioRoot>
  );
}
```

### Tag Filter Panel (태그 토글)

```tsx
import { Chip } from "seed-design/ui/chip";
import { ActionButton } from "seed-design/ui/action-button";
import { VStack, HStack } from "@seed-design/react";

function TagFilterPanel({ tags, selectedTags, onToggle, onApply, matchingCount, lang }) {
  return (
    <VStack gap="x4" padding="x4">
      <HStack gap="x2" flexWrap="wrap">
        {tags.map((tag) => (
          <Chip.Toggle
            key={tag.id}
            size="medium"
            variant="outlineWeak"
            checked={selectedTags.includes(tag.id)}
            onCheckedChange={() => onToggle(tag.id)}
          >
            <Chip.Label>
              {tag.icon} {tag.label[lang]}
            </Chip.Label>
          </Chip.Toggle>
        ))}
      </HStack>
      <ActionButton
        variant="brandSolid"
        disabled={matchingCount === 0}
        onClick={onApply}
      >
        Show Results ({matchingCount})
      </ActionButton>
    </VStack>
  );
}
```

### Tag Badges (상세 패널 내)

```tsx
import { Badge } from "@seed-design/react";
import { HStack } from "@seed-design/react";
import { TAGS } from "@/constants/tags";

const TAG_TONE_MAP: Record<string, Badge['tone']> = {
  'delicious': 'critical',
  'great-atmosphere': 'brand',
  'good-value': 'positive',
  'japanese-menu': 'informative',
  'chinese-menu': 'warning',
};

function TagBadges({ tagIds, lang }) {
  return (
    <HStack gap="x2" flexWrap="wrap">
      {tagIds.map((tagId) => {
        const tag = TAGS.find(t => t.id === tagId);
        if (!tag) return null;
        return (
          <Badge key={tagId} tone={TAG_TONE_MAP[tagId]} variant="weak" size="medium">
            {tag.icon} {tag.label[lang]}
          </Badge>
        );
      })}
    </HStack>
  );
}
```

### Detail Panel (Bottom Sheet)

```tsx
import {
  BottomSheetRoot,
  BottomSheetContent,
  BottomSheetBody,
} from "seed-design/ui/bottom-sheet";

function DetailPanel({ restaurant, isOpen, onClose, lang }) {
  return (
    <BottomSheetRoot open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <BottomSheetContent
        title={t(restaurant.translations, 'name', lang)}
        description={t(restaurant.translations, 'address', lang)}
      >
        <BottomSheetBody>
          {/* Photo Carousel */}
          <PhotoCarousel restaurantId={restaurant.id} />

          {/* Rating */}
          <RatingDisplay
            rating={restaurant.rating}
            ratingCount={restaurant.rating_count}
          />

          {/* Tags */}
          <TagBadges tagIds={restaurant.tags} lang={lang} />

          {/* Info */}
          <RestaurantInfo restaurant={restaurant} lang={lang} />

          {/* Menu */}
          <MenuList restaurantId={restaurant.id} lang={lang} />
        </BottomSheetBody>
      </BottomSheetContent>
    </BottomSheetRoot>
  );
}
```

### Loading Skeleton

```tsx
import { Skeleton, VStack, HStack } from "@seed-design/react";

function RestaurantDetailSkeleton() {
  return (
    <VStack gap="x4" padding="x4">
      {/* Photo placeholder */}
      <Skeleton radius="16" width="full" height="200px" />

      {/* Name */}
      <Skeleton radius="8" width="60%" height="x6" />

      {/* Address */}
      <Skeleton radius="8" width="80%" height="x4" />

      {/* Tags */}
      <HStack gap="x2">
        <Skeleton radius="full" width="80px" height="x6" />
        <Skeleton radius="full" width="100px" height="x6" />
        <Skeleton radius="full" width="70px" height="x6" />
      </HStack>

      {/* Info lines */}
      <Skeleton radius="8" width="full" height="x4" />
      <Skeleton radius="8" width="full" height="x4" />
    </VStack>
  );
}
```

## 스페이싱 & 레이아웃

SEED Design의 스페이싱 토큰을 사용합니다.

| 용도 | 토큰 | 값 |
|------|------|-----|
| 칩 간 간격 | `spacingX.betweenChips` | 8px |
| 글로벌 좌우 여백 | `spacingX.globalGutter` | 16px |
| 컴포넌트 간 기본 간격 | `spacingY.componentDefault` | 16px |
| 텍스트 간 간격 | `spacingY.betweenText` | 4px |
| 화면 하단 여백 | `spacingY.screenBottom` | 24px |

### 레이아웃 컴포넌트

```tsx
import { VStack, HStack, Flex } from "@seed-design/react";

// 수직 스택 (기본 레이아웃)
<VStack gap="x4" paddingX="spacingX.globalGutter">
  {children}
</VStack>

// 수평 스택 (칩 나열)
<HStack gap="spacingX.betweenChips" overflow="auto">
  {chips}
</HStack>
```

## 타이포그래피

SEED Design의 Text 컴포넌트를 사용합니다.

```tsx
import { Text } from "@seed-design/react";

// 레스토랑 이름 (제목)
<Text textStyle="t5Bold">{name}</Text>

// 주소 (본문)
<Text textStyle="t3Regular" color="$color.fg.neutral-muted">{address}</Text>

// 영업시간 (보조)
<Text textStyle="t2Regular" color="$color.fg.neutral-subtle">{hours}</Text>

// 구역 설명 (배너)
<Text textStyle="t3Regular" color="$color.fg.informative">{description}</Text>
```

## 테마 지원

SEED Design은 라이트/다크 모드를 자동 지원합니다. 역할 기반 색상을 사용하면 테마 전환 시 자동으로 적절한 색상이 적용됩니다.

```tsx
// Tailwind CSS와 SEED Design 통합 (seed-design.json 설정 후)
// 별도 다크모드 처리 불필요 — 역할 기반 토큰이 자동 적응
```

## 접근성 가이드

| 항목 | 기준 | SEED Design 지원 |
|------|------|-----------------|
| 색상 대비 | WCAG AA (4.5:1) | 역할 기반 색상이 자동 보장 |
| 터치 타겟 | 최소 44x44px | Chip, Button 기본 사이즈 충족 |
| 스크린 리더 | aria-label 필수 | Chip.RadioRoot에 aria-label |
| 포커스 표시 | focus-visible | SEED 컴포넌트 기본 제공 |

## 참고 문서

- [SEED Design 공식 문서](https://seed-design.io)
- [Chip 컴포넌트](https://seed-design.io/react/components/chip)
- [Bottom Sheet 컴포넌트](https://seed-design.io/react/components/bottom-sheet)
- [Badge 컴포넌트](https://seed-design.io/react/components/badge)
- [Skeleton 컴포넌트](https://seed-design.io/react/components/skeleton)
- [Color System](https://seed-design.io/docs/foundation/color/color-system)
- [Color Roles](https://seed-design.io/docs/foundation/color/color-role)
- [Spacing](https://seed-design.io/docs/foundation/spacing)
