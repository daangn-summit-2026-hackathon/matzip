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

describe('bottom sheet state', () => {
  beforeEach(() => {
    useAppStore.setState({
      selectedRestaurant: null,
      isDetailPanelOpen: false,
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
  });
});
