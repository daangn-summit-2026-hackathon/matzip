# Frontend Components - matzip-map

## Component Hierarchy

```
App
├── Header (fixed top)
│   ├── SearchBar
│   │   └── AutocompleteDropdown (motion.div, conditional)
│   └── LanguageSwitcher
├── DistrictNavigationBar (fixed, below header)
│   └── DistrictChip[] (motion.button)
├── MapContainer (fills remaining viewport)
│   ├── GoogleMap (@vis.gl/react-google-maps)
│   │   ├── AdvancedMarker[] (restaurant pins)
│   │   └── MarkerClusterer
│   ├── TagFilterButton (floating, bottom-right)
│   └── DistrictDescriptionBanner (motion.div, conditional)
├── TagFilterPanel (motion.div overlay, conditional)
│   ├── TagChip[] (motion.button)
│   ├── MatchingCount
│   └── ShowResultsButton
├── DetailPanel (motion.div bottom sheet, conditional)
│   ├── DragHandle
│   ├── PhotoCarousel
│   │   ├── CarouselImage[]
│   │   └── DotIndicator
│   ├── RestaurantHeader (name + rating)
│   ├── TagBadges
│   ├── RestaurantInfo (address, hours, phone)
│   └── CloseButton
└── SearchBottomSheet (motion.div bottom sheet, conditional)
    ├── DragHandle
    ├── SearchResultItem[]
    └── EmptyState (conditional)
```

## Component Specifications

### App
- Root component, manages global state initialization
- Loads i18n, fetches districts on mount
- Manages which overlay/panel is currently visible

### Header
- Fixed position top
- Contains SearchBar (left/center) and LanguageSwitcher (right)
- z-index above map, below overlays
- Tailwind: `fixed top-0 left-0 right-0 z-20 bg-white shadow-sm`

### SearchBar
- Text input with search icon
- On focus: show AutocompleteDropdown
- On submit: close dropdown, open SearchBottomSheet
- Tailwind: `flex items-center bg-gray-100 rounded-full px-4 py-2`

### AutocompleteDropdown
- Appears below SearchBar on typing
- motion.div with slide-down animation
- Max 10 items
- Each item shows: icon (type indicator) + label
- Tailwind: `absolute top-full mt-1 w-full bg-white rounded-lg shadow-lg`
- Animation: `initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}`

### LanguageSwitcher
- Compact button showing current language code (EN/JA/ZH)
- Tap to cycle or show dropdown
- Tailwind: `px-3 py-1 rounded-full border text-sm font-medium`

### DistrictNavigationBar
- Horizontal scrollable container
- Fixed below Header
- Contains DistrictChip components
- Tailwind: `fixed top-14 left-0 right-0 z-10 flex gap-2 px-4 py-2 overflow-x-auto bg-white/90 backdrop-blur-sm`

### DistrictChip
- motion.button with tap scale animation
- Shows: district name + restaurant count (when selected)
- States: default, selected (highlighted)
- Tailwind default: `px-4 py-2 rounded-full bg-gray-100 text-gray-700 text-sm whitespace-nowrap`
- Tailwind selected: `px-4 py-2 rounded-full bg-blue-600 text-white text-sm whitespace-nowrap`
- Animation: `whileTap={{ scale: 0.95 }}`

### MapContainer
- Fills viewport below DistrictNavigationBar
- Contains Google Map instance
- Floating TagFilterButton positioned bottom-right
- Tailwind: `fixed top-28 bottom-0 left-0 right-0`

### TagFilterButton
- Floating action button on map
- Shows filter icon + active filter count badge
- Tailwind: `absolute bottom-6 right-4 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center`

### TagFilterPanel
- Full-screen overlay with semi-transparent backdrop
- AnimatePresence for enter/exit
- Grid of TagChip components
- Bottom: matching count + "Show Results" button
- Animation: backdrop `initial={{ opacity: 0 }} animate={{ opacity: 1 }}`
- Panel: `initial={{ y: '100%' }} animate={{ y: 0 }} transition={{ type: 'spring', damping: 25 }}`

### TagChip
- Selectable chip in TagFilterPanel
- Shows: icon + label (current language)
- States: unselected (outline), selected (filled with tag color)
- motion.button with tap animation

### DetailPanel
- Bottom sheet pattern
- Draggable (drag="y", dragConstraints)
- Swipe down to close (onDragEnd threshold)
- Content: photo carousel, name, rating, tags, info
- Animation: `initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}`
- Transition: `type: 'spring', damping: 25, stiffness: 300`
- Max height: 70vh
- Tailwind: `fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-2xl max-h-[70vh] overflow-y-auto`

### PhotoCarousel
- Horizontal swipeable image carousel
- Dot indicators below
- Handles 0, 1, or multiple photos (BR-8)
- Tailwind container: `relative w-full h-48 overflow-hidden rounded-lg`

### RatingDisplay
- Star icon + numeric rating OR "New" badge
- Applies BR-1 rules
- Tailwind rating: `flex items-center gap-1 text-amber-500`
- Tailwind new badge: `px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded-full text-xs`

### TagBadges
- Horizontal scrollable row of tag badges
- Each badge: colored background + icon + label
- Uses tag.color Tailwind classes

### SearchBottomSheet
- Similar to DetailPanel but for search results
- List of SearchResultItem components
- Empty state when no results
- Same spring animation as DetailPanel

### SearchResultItem
- Restaurant name + cuisine type + district
- Tap to navigate to restaurant on map
- Tailwind: `flex items-center gap-3 px-4 py-3 border-b border-gray-100`

### DistrictDescriptionBanner
- Appears when district is selected
- Shows district food culture description
- Auto-dismisses after 5 seconds or on tap
- motion.div with fade + slide animation
- Tailwind: `absolute top-4 left-4 right-4 bg-white/95 backdrop-blur rounded-lg p-3 shadow-md`

## State Management (Zustand Store)

```typescript
interface AppState {
  // Language
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;

  // Districts
  districts: District[];
  activeDistrict: string | null;
  districtCounts: Record<string, number>;
  setActiveDistrict: (id: string | null) => void;

  // Restaurants
  restaurants: Restaurant[];
  selectedRestaurant: Restaurant | null;
  setSelectedRestaurant: (r: Restaurant | null) => void;

  // Tags
  selectedTags: string[];
  toggleTag: (tagId: string) => void;
  clearTags: () => void;

  // Search
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  searchResults: Restaurant[];
  setSearchResults: (results: Restaurant[]) => void;

  // UI Panels
  isDetailPanelOpen: boolean;
  isTagFilterOpen: boolean;
  isSearchBottomSheetOpen: boolean;
  setDetailPanelOpen: (open: boolean) => void;
  setTagFilterOpen: (open: boolean) => void;
  setSearchBottomSheetOpen: (open: boolean) => void;

  // Loading
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
}
```

## User Interaction Flows

### Initial Load → District Selection → Pin Tap

```
[App Load] → Seoul map (no pins) + district chips
    ↓ tap chip
[District Selected] → map zooms to district + pins appear + description banner
    ↓ tap pin
[Detail Panel] → bottom sheet slides up with restaurant info
    ↓ swipe down
[Back to Map] → bottom sheet closes
```

### Search Flow

```
[Tap Search Bar] → keyboard opens
    ↓ type
[Autocomplete] → suggestions dropdown appears
    ↓ tap suggestion OR submit
[Search Results] → bottom sheet with results + map highlights
    ↓ tap result
[Detail Panel] → map centers on restaurant + detail opens
```

### Tag Filter Flow

```
[Tap Filter Button] → tag panel overlay slides up
    ↓ tap tags
[Tags Selected] → matching count updates in real-time
    ↓ tap "Show Results"
[Filtered Map] → only matching pins visible
    ↓ tap filter button again
[Reset] → clear filters, show all district pins
```
