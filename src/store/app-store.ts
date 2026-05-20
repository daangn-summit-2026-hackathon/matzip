import { create } from 'zustand';
import type { Restaurant, SupportedLanguage } from '@/types';

interface AppState {
  // Language
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;

  // Districts
  activeDistrict: string | null;
  districtCounts: Record<string, number>;
  setActiveDistrict: (id: string | null) => void;
  setDistrictCounts: (counts: Record<string, number>) => void;

  // Restaurants
  restaurants: Restaurant[];
  selectedRestaurant: Restaurant | null;
  setRestaurants: (restaurants: Restaurant[]) => void;
  setSelectedRestaurant: (r: Restaurant | null) => void;

  // Tags
  selectedTags: string[];
  toggleTag: (tagId: string) => void;
  clearTags: () => void;
  isTagFilterOpen: boolean;
  setTagFilterOpen: (open: boolean) => void;

  // Search
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  searchResults: Restaurant[];
  setSearchResults: (results: Restaurant[]) => void;
  isSearchBottomSheetOpen: boolean;
  setSearchBottomSheetOpen: (open: boolean) => void;

  // UI
  isDetailPanelOpen: boolean;
  setDetailPanelOpen: (open: boolean) => void;
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  // Language
  language: 'en',
  setLanguage: (language) => set({ language }),

  // Districts
  activeDistrict: null,
  districtCounts: {},
  setActiveDistrict: (activeDistrict) => set({ activeDistrict }),
  setDistrictCounts: (districtCounts) => set({ districtCounts }),

  // Restaurants
  restaurants: [],
  selectedRestaurant: null,
  setRestaurants: (restaurants) => set({ restaurants }),
  setSelectedRestaurant: (selectedRestaurant) =>
    set({
      selectedRestaurant,
      isDetailPanelOpen: selectedRestaurant !== null,
      isSearchBottomSheetOpen: false,
      isTagFilterOpen: false,
    }),

  // Tags
  selectedTags: [],
  toggleTag: (tagId) =>
    set((state) => ({
      selectedTags: state.selectedTags.includes(tagId)
        ? state.selectedTags.filter((t) => t !== tagId)
        : [...state.selectedTags, tagId],
    })),
  clearTags: () => set({ selectedTags: [] }),
  isTagFilterOpen: false,
  setTagFilterOpen: (isTagFilterOpen) =>
    set((state) => ({
      isTagFilterOpen,
      isSearchBottomSheetOpen: isTagFilterOpen ? false : state.isSearchBottomSheetOpen,
      isDetailPanelOpen: isTagFilterOpen ? false : state.isDetailPanelOpen,
      selectedRestaurant: isTagFilterOpen ? null : state.selectedRestaurant,
    })),

  // Search
  searchQuery: '',
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  searchResults: [],
  setSearchResults: (searchResults) => set({ searchResults }),
  isSearchBottomSheetOpen: false,
  setSearchBottomSheetOpen: (isSearchBottomSheetOpen) =>
    set((state) => ({
      isSearchBottomSheetOpen,
      isTagFilterOpen: isSearchBottomSheetOpen ? false : state.isTagFilterOpen,
      isDetailPanelOpen: isSearchBottomSheetOpen ? false : state.isDetailPanelOpen,
      selectedRestaurant: isSearchBottomSheetOpen ? null : state.selectedRestaurant,
    })),

  // UI
  isDetailPanelOpen: false,
  setDetailPanelOpen: (isDetailPanelOpen) =>
    set((state) => ({
      isDetailPanelOpen,
      selectedRestaurant: isDetailPanelOpen ? state.selectedRestaurant : null,
      isSearchBottomSheetOpen: isDetailPanelOpen
        ? false
        : state.isSearchBottomSheetOpen,
      isTagFilterOpen: isDetailPanelOpen ? false : state.isTagFilterOpen,
    })),
  isLoading: false,
  setLoading: (isLoading) => set({ isLoading }),
}));
