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
  isDistrictBottomSheetOpen: boolean;
  setDistrictBottomSheetOpen: (open: boolean) => void;

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
  applySearchResults: (results: Restaurant[]) => void;
  clearSearchMode: () => void;
  dismissSearchResults: () => void;
  isSearchActive: boolean;
  isSearchBottomSheetOpen: boolean;
  setSearchBottomSheetOpen: (open: boolean) => void;

  // UI
  isDetailPanelOpen: boolean;
  setDetailPanelOpen: (open: boolean) => void;
  closeDetailPanel: () => void;
  closeBottomSheets: () => void;
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
  setActiveDistrict: (activeDistrict) =>
    set((state) => ({
      activeDistrict,
      isDistrictBottomSheetOpen: activeDistrict !== null,
      isTagFilterOpen: activeDistrict ? false : state.isTagFilterOpen,
      isDetailPanelOpen: activeDistrict ? false : state.isDetailPanelOpen,
      selectedRestaurant: activeDistrict ? null : state.selectedRestaurant,
      ...(activeDistrict
        ? {
            searchQuery: '',
            searchResults: [],
            isSearchActive: false,
            isSearchBottomSheetOpen: false,
          }
        : {
            searchResults: state.searchResults,
            isSearchActive: state.isSearchActive,
          }),
    })),
  setDistrictCounts: (districtCounts) => set({ districtCounts }),
  isDistrictBottomSheetOpen: false,
  setDistrictBottomSheetOpen: (isDistrictBottomSheetOpen) =>
    set((state) => ({
      isDistrictBottomSheetOpen,
      isSearchBottomSheetOpen: isDistrictBottomSheetOpen
        ? false
        : state.isSearchBottomSheetOpen,
      isDetailPanelOpen: isDistrictBottomSheetOpen
        ? false
        : state.isDetailPanelOpen,
      isTagFilterOpen: isDistrictBottomSheetOpen ? false : state.isTagFilterOpen,
      selectedRestaurant: isDistrictBottomSheetOpen
        ? null
        : state.selectedRestaurant,
    })),

  // Restaurants
  restaurants: [],
  selectedRestaurant: null,
  setRestaurants: (restaurants) => set({ restaurants }),
  setSelectedRestaurant: (selectedRestaurant) =>
    set({
      selectedRestaurant,
      isDetailPanelOpen: selectedRestaurant !== null,
      isDistrictBottomSheetOpen: false,
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
      isDistrictBottomSheetOpen: isTagFilterOpen
        ? false
        : state.isDistrictBottomSheetOpen,
      selectedRestaurant: isTagFilterOpen ? null : state.selectedRestaurant,
    })),

  // Search
  searchQuery: '',
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  searchResults: [],
  setSearchResults: (searchResults) => set({ searchResults }),
  applySearchResults: (searchResults) =>
    set(() => {
      const singleResult = searchResults.length === 1 ? searchResults[0]! : null;

      return {
        activeDistrict: null,
        selectedTags: [],
        isTagFilterOpen: false,
        isDistrictBottomSheetOpen: false,
        searchResults,
        isSearchActive: true,
        selectedRestaurant: singleResult,
        isDetailPanelOpen: singleResult !== null,
        isSearchBottomSheetOpen: singleResult === null,
      };
    }),
  clearSearchMode: () =>
    set({
      searchQuery: '',
      searchResults: [],
      isSearchActive: false,
      isSearchBottomSheetOpen: false,
      isDistrictBottomSheetOpen: false,
      isDetailPanelOpen: false,
      selectedRestaurant: null,
    }),
  dismissSearchResults: () =>
    set({
      searchQuery: '',
      searchResults: [],
      isSearchActive: false,
      isSearchBottomSheetOpen: false,
      isDistrictBottomSheetOpen: false,
      isDetailPanelOpen: false,
      selectedRestaurant: null,
    }),
  isSearchActive: false,
  isSearchBottomSheetOpen: false,
  setSearchBottomSheetOpen: (isSearchBottomSheetOpen) =>
    set((state) => ({
      isSearchBottomSheetOpen,
      isTagFilterOpen: isSearchBottomSheetOpen ? false : state.isTagFilterOpen,
      isDistrictBottomSheetOpen: isSearchBottomSheetOpen
        ? false
        : state.isDistrictBottomSheetOpen,
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
      isDistrictBottomSheetOpen: isDetailPanelOpen
        ? false
        : state.isDistrictBottomSheetOpen,
    })),
  closeDetailPanel: () =>
    set((state) => {
      const shouldReturnToSearchResults =
        state.isSearchActive && state.searchResults.length > 0;
      const shouldReturnToDistrictList =
        !state.isSearchActive && state.activeDistrict !== null;

      return {
        isDetailPanelOpen: false,
        selectedRestaurant: null,
        isSearchBottomSheetOpen: shouldReturnToSearchResults
          ? true
          : state.isSearchBottomSheetOpen,
        isDistrictBottomSheetOpen: shouldReturnToSearchResults
          ? false
          : shouldReturnToDistrictList,
      };
    }),
  closeBottomSheets: () =>
    set((state) => {
      if (state.isSearchActive && state.isSearchBottomSheetOpen) {
        return {
          searchQuery: '',
          searchResults: [],
          isSearchActive: false,
          isDetailPanelOpen: false,
          isDistrictBottomSheetOpen: false,
          isSearchBottomSheetOpen: false,
          isTagFilterOpen: false,
          selectedRestaurant: null,
        };
      }

      if (
        state.isSearchActive &&
        state.isDetailPanelOpen &&
        state.searchResults.length > 0
      ) {
        return {
          isDetailPanelOpen: false,
          isDistrictBottomSheetOpen: false,
          isSearchBottomSheetOpen: true,
          isTagFilterOpen: false,
          selectedRestaurant: null,
        };
      }

      if (
        !state.isSearchActive &&
        state.isDetailPanelOpen &&
        state.activeDistrict !== null
      ) {
        return {
          isDetailPanelOpen: false,
          isDistrictBottomSheetOpen: true,
          isSearchBottomSheetOpen: false,
          isTagFilterOpen: false,
          selectedRestaurant: null,
        };
      }

      return {
        isDetailPanelOpen: false,
        isDistrictBottomSheetOpen: false,
        isSearchBottomSheetOpen: false,
        isTagFilterOpen: false,
        selectedRestaurant: null,
      };
    }),
  isLoading: false,
  setLoading: (isLoading) => set({ isLoading }),
}));
