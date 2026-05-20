import { beforeEach, describe, expect, it } from 'vitest';
import { useAppStore } from '../app-store';
import type { Restaurant } from '@/types';

const restaurant: Restaurant = {
  id: 'restaurant-1',
  district_id: 'district-1',
  lat: 37.5,
  lng: 127,
  tags: [],
  rating: null,
  rating_count: 0,
  phone_number: null,
  created_at: '',
  translations: {
    name: { en: 'Restaurant 1' },
  },
};

const anotherRestaurant: Restaurant = {
  ...restaurant,
  id: 'restaurant-2',
  lat: 37.51,
  lng: 127.01,
};

describe('bottom sheet state', () => {
  beforeEach(() => {
    useAppStore.setState({
      activeDistrict: null,
      selectedTags: [],
      searchQuery: '',
      searchResults: [],
      isSearchActive: false,
      selectedRestaurant: null,
      isDetailPanelOpen: false,
      isDistrictBottomSheetOpen: false,
      isSearchBottomSheetOpen: false,
      isTagFilterOpen: false,
    });
  });

  it('clears selected restaurant immediately when the detail sheet closes', () => {
    useAppStore.getState().setSelectedRestaurant(restaurant);
    useAppStore.getState().setDetailPanelOpen(false);

    expect(useAppStore.getState().isDetailPanelOpen).toBe(false);
    expect(useAppStore.getState().selectedRestaurant).toBeNull();
  });

  it('keeps only the newly opened bottom sheet active', () => {
    useAppStore.getState().setSelectedRestaurant(restaurant);
    useAppStore.getState().setSearchBottomSheetOpen(true);

    expect(useAppStore.getState().isSearchBottomSheetOpen).toBe(true);
    expect(useAppStore.getState().isDetailPanelOpen).toBe(false);
    expect(useAppStore.getState().selectedRestaurant).toBeNull();

    useAppStore.getState().setTagFilterOpen(true);

    expect(useAppStore.getState().isTagFilterOpen).toBe(true);
    expect(useAppStore.getState().isSearchBottomSheetOpen).toBe(false);

    useAppStore.getState().setDistrictBottomSheetOpen(true);

    expect(useAppStore.getState().isDistrictBottomSheetOpen).toBe(true);
    expect(useAppStore.getState().isTagFilterOpen).toBe(false);
  });

  it('closes every bottom sheet and clears selection', () => {
    useAppStore.getState().setSelectedRestaurant(restaurant);
    useAppStore.getState().setDistrictBottomSheetOpen(true);
    useAppStore.getState().closeBottomSheets();

    expect(useAppStore.getState().isDetailPanelOpen).toBe(false);
    expect(useAppStore.getState().isDistrictBottomSheetOpen).toBe(false);
    expect(useAppStore.getState().isSearchBottomSheetOpen).toBe(false);
    expect(useAppStore.getState().isTagFilterOpen).toBe(false);
    expect(useAppStore.getState().selectedRestaurant).toBeNull();
  });

  it('opens the district list sheet when a district is selected', () => {
    useAppStore.getState().setSelectedRestaurant(restaurant);
    useAppStore.getState().setActiveDistrict('district-1');

    expect(useAppStore.getState().activeDistrict).toBe('district-1');
    expect(useAppStore.getState().isDistrictBottomSheetOpen).toBe(true);
    expect(useAppStore.getState().isDetailPanelOpen).toBe(false);
    expect(useAppStore.getState().selectedRestaurant).toBeNull();
  });

  it('closes the district list sheet when a restaurant is selected', () => {
    useAppStore.getState().setActiveDistrict('district-1');
    useAppStore.getState().setSelectedRestaurant(restaurant);

    expect(useAppStore.getState().isDistrictBottomSheetOpen).toBe(false);
    expect(useAppStore.getState().isDetailPanelOpen).toBe(true);
    expect(useAppStore.getState().selectedRestaurant).toEqual(restaurant);
  });

  it('applies single-result search as detail mode and clears district filters', () => {
    useAppStore.setState({
      activeDistrict: 'district-1',
      selectedTags: ['delicious'],
      isTagFilterOpen: true,
    });

    useAppStore.getState().applySearchResults([restaurant]);

    expect(useAppStore.getState().activeDistrict).toBeNull();
    expect(useAppStore.getState().selectedTags).toEqual([]);
    expect(useAppStore.getState().isSearchActive).toBe(true);
    expect(useAppStore.getState().searchResults).toEqual([restaurant]);
    expect(useAppStore.getState().selectedRestaurant).toBe(restaurant);
    expect(useAppStore.getState().isDetailPanelOpen).toBe(true);
    expect(useAppStore.getState().isSearchBottomSheetOpen).toBe(false);
    expect(useAppStore.getState().isDistrictBottomSheetOpen).toBe(false);
    expect(useAppStore.getState().isTagFilterOpen).toBe(false);
  });

  it('applies multi-result search as list mode and clears search when a district is selected', () => {
    useAppStore.getState().setSearchQuery('Korean');
    useAppStore.getState().applySearchResults([restaurant, anotherRestaurant]);

    expect(useAppStore.getState().activeDistrict).toBeNull();
    expect(useAppStore.getState().isSearchActive).toBe(true);
    expect(useAppStore.getState().selectedRestaurant).toBeNull();
    expect(useAppStore.getState().isDetailPanelOpen).toBe(false);
    expect(useAppStore.getState().isSearchBottomSheetOpen).toBe(true);

    useAppStore.getState().setActiveDistrict('district-2');

    expect(useAppStore.getState().activeDistrict).toBe('district-2');
    expect(useAppStore.getState().searchQuery).toBe('');
    expect(useAppStore.getState().isSearchActive).toBe(false);
    expect(useAppStore.getState().searchResults).toEqual([]);
    expect(useAppStore.getState().isSearchBottomSheetOpen).toBe(false);
    expect(useAppStore.getState().isDistrictBottomSheetOpen).toBe(true);
  });

  it('returns from a search detail sheet back to the search results sheet', () => {
    useAppStore.getState().setSearchQuery('Korean');
    useAppStore.getState().applySearchResults([restaurant, anotherRestaurant]);
    useAppStore.getState().setSelectedRestaurant(restaurant);

    expect(useAppStore.getState().isDetailPanelOpen).toBe(true);
    expect(useAppStore.getState().isSearchBottomSheetOpen).toBe(false);

    useAppStore.getState().closeDetailPanel();

    expect(useAppStore.getState().selectedRestaurant).toBeNull();
    expect(useAppStore.getState().isDetailPanelOpen).toBe(false);
    expect(useAppStore.getState().isSearchActive).toBe(true);
    expect(useAppStore.getState().searchQuery).toBe('Korean');
    expect(useAppStore.getState().searchResults).toEqual([
      restaurant,
      anotherRestaurant,
    ]);
    expect(useAppStore.getState().isSearchBottomSheetOpen).toBe(true);
  });

  it('dismisses search results back to the initial search state', () => {
    useAppStore.getState().setSearchQuery('Korean');
    useAppStore.getState().applySearchResults([restaurant, anotherRestaurant]);

    useAppStore.getState().dismissSearchResults();

    expect(useAppStore.getState().searchQuery).toBe('');
    expect(useAppStore.getState().searchResults).toEqual([]);
    expect(useAppStore.getState().isSearchActive).toBe(false);
    expect(useAppStore.getState().isSearchBottomSheetOpen).toBe(false);
    expect(useAppStore.getState().selectedRestaurant).toBeNull();
    expect(useAppStore.getState().isDetailPanelOpen).toBe(false);
  });

  it('clears search when the open search results sheet is closed globally', () => {
    useAppStore.getState().setSearchQuery('Korean');
    useAppStore.getState().applySearchResults([restaurant, anotherRestaurant]);

    useAppStore.getState().closeBottomSheets();

    expect(useAppStore.getState().searchQuery).toBe('');
    expect(useAppStore.getState().searchResults).toEqual([]);
    expect(useAppStore.getState().isSearchActive).toBe(false);
    expect(useAppStore.getState().isSearchBottomSheetOpen).toBe(false);
  });
});
