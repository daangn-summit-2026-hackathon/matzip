import { APIProvider, Map, useMap, useMapsLibrary } from '@vis.gl/react-google-maps';
import { useEffect, useMemo, useRef } from 'react';
import { MarkerClusterer } from '@googlemaps/markerclusterer';
import { useAppStore } from '@/store/app-store';
import { DISTRICTS } from '@/constants/districts';
import { getRestaurantRatingStyle } from '@/lib/rating-style';
import { filterByTags } from '@/services/search.service';
import { t } from '@/lib/translate';
import type { Restaurant } from '@/types';

const SEOUL_CENTER = { lat: 37.5665, lng: 126.978 };
const DEFAULT_ZOOM = 12;
const SINGLE_SEARCH_RESULT_ZOOM = 16;
const SELECTED_RESTAURANT_ZOOM = 17;
const CAMERA_ANIMATION_MS = 380;

export function MapContainer() {
  const { activeDistrict, closeBottomSheets, isSearchActive } = useAppStore();
  const district = isSearchActive
    ? undefined
    : DISTRICTS.find((d) => d.id === activeDistrict);

  return (
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY ?? ''}>
      <Map
        mapId={import.meta.env.VITE_GOOGLE_MAPS_MAP_ID}
        defaultCenter={SEOUL_CENTER}
        defaultZoom={DEFAULT_ZOOM}
        gestureHandling="greedy"
        disableDefaultUI
        className="w-full h-full"
        onClick={closeBottomSheets}
      >
        <ClusteredMarkers district={district} />
      </Map>
    </APIProvider>
  );
}

function ClusteredMarkers({ district }: { district: typeof DISTRICTS[number] | undefined }) {
  const map = useMap();
  const markerLib = useMapsLibrary('marker');
  const {
    restaurants,
    searchResults,
    isSearchActive,
    isSearchBottomSheetOpen,
    isDetailPanelOpen,
    selectedRestaurant,
    selectedTags,
    setSelectedRestaurant,
    language,
  } = useAppStore();

  const clustererRef = useRef<MarkerClusterer | null>(null);
  const markersRef = useRef<google.maps.marker.AdvancedMarkerElement[]>([]);
  const cancelCameraAnimationRef = useRef<(() => void) | null>(null);

  const visibleRestaurants = useMemo(
    () => (isSearchActive ? searchResults : filterByTags(restaurants, selectedTags)),
    [isSearchActive, restaurants, searchResults, selectedTags],
  );

  // Pan to the most specific active district context.
  useEffect(() => {
    if (!map || isSearchActive) return;

    cancelCameraAnimationRef.current?.();
    cancelCameraAnimationRef.current = null;

    if (selectedRestaurant) {
      cancelCameraAnimationRef.current = focusRestaurantInView(
        map,
        selectedRestaurant,
        {
          isDetailPanelOpen,
          maxZoom: SELECTED_RESTAURANT_ZOOM,
        },
      );
    } else if (district) {
      cancelCameraAnimationRef.current = animateMapCamera(
        map,
        { lat: district.center_lat, lng: district.center_lng },
        district.zoom_level,
      );
    } else {
      cancelCameraAnimationRef.current = animateMapCamera(
        map,
        SEOUL_CENTER,
        DEFAULT_ZOOM,
      );
    }

    return () => {
      cancelCameraAnimationRef.current?.();
      cancelCameraAnimationRef.current = null;
    };
  }, [district, isDetailPanelOpen, isSearchActive, map, selectedRestaurant]);

  // Fit the map to search results so every result pin remains visible with the sheet open.
  useEffect(() => {
    if (!map || !isSearchActive) return;

    cancelCameraAnimationRef.current?.();
    cancelCameraAnimationRef.current = null;

    const cleanup =
      selectedRestaurant && isDetailPanelOpen
        ? focusRestaurantInView(map, selectedRestaurant, {
            isDetailPanelOpen,
            maxZoom: SELECTED_RESTAURANT_ZOOM,
          })
        : fitSearchResultsInView(map, searchResults, {
            isSingleResult: searchResults.length === 1,
            isBottomSheetOpen: isSearchBottomSheetOpen,
            isDetailPanelOpen,
          });

    return cleanup;
  }, [
    isDetailPanelOpen,
    isSearchActive,
    isSearchBottomSheetOpen,
    map,
    searchResults,
    selectedRestaurant,
  ]);

  // Create/update markers imperatively
  useEffect(() => {
    if (!map || !markerLib) return;

    // Clear old markers
    for (const marker of markersRef.current) {
      marker.map = null;
    }
    markersRef.current = [];

    if (clustererRef.current) {
      clustererRef.current.clearMarkers();
    } else {
      clustererRef.current = new MarkerClusterer({
        map,
        markers: [],
        renderer: {
          render({ count, position }) {
            const size = count >= 20 ? 56 : count >= 10 ? 48 : 40;
            const el = document.createElement('div');
            el.innerHTML = `
              <div style="
                width:${size}px;height:${size}px;border-radius:50%;
                background:linear-gradient(135deg, #6366f1, #3b82f6);
                color:white;display:flex;align-items:center;justify-content:center;
                font-weight:700;font-size:${size > 48 ? 16 : 14}px;
                border:3px solid white;
                box-shadow:0 4px 12px rgba(99,102,241,0.4);
                transition:transform 0.2s;
              ">
                ${count}
              </div>
            `;
            return new markerLib.AdvancedMarkerElement({ position, content: el });
          },
        },
      });
    }

    // Create new markers
    const newMarkers: google.maps.marker.AdvancedMarkerElement[] = [];

    for (const restaurant of visibleRestaurants) {
      const marker = createMarker(markerLib, restaurant, language, setSelectedRestaurant);
      newMarkers.push(marker);
    }

    markersRef.current = newMarkers;
    clustererRef.current.addMarkers(newMarkers);

    return () => {
      // Cleanup on unmount
      for (const marker of markersRef.current) {
        marker.map = null;
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map, markerLib, visibleRestaurants, language]);

  return null;
}

function animateMapCamera(
  map: google.maps.Map,
  targetCenter: google.maps.LatLngLiteral,
  targetZoom: number,
): () => void {
  const startCenter = map.getCenter()?.toJSON() ?? targetCenter;
  const startZoom = map.getZoom() ?? targetZoom;
  const startedAt = performance.now();
  let frameId: number | null = null;
  let isCancelled = false;

  const step = (now: number) => {
    if (isCancelled) return;

    const progress = Math.min((now - startedAt) / CAMERA_ANIMATION_MS, 1);
    const eased = 1 - Math.pow(1 - progress, 3);

    map.moveCamera({
      center: {
        lat: interpolate(startCenter.lat, targetCenter.lat, eased),
        lng: interpolate(startCenter.lng, targetCenter.lng, eased),
      },
      zoom: interpolate(startZoom, targetZoom, eased),
    });

    if (progress < 1) {
      frameId = window.requestAnimationFrame(step);
      return;
    }

    map.moveCamera({ center: targetCenter, zoom: targetZoom });
    frameId = null;
  };

  frameId = window.requestAnimationFrame(step);

  return () => {
    isCancelled = true;
    if (frameId !== null) {
      window.cancelAnimationFrame(frameId);
      frameId = null;
    }
  };
}

function interpolate(start: number, end: number, progress: number): number {
  return start + (end - start) * progress;
}

function fitSearchResultsInView(
  map: google.maps.Map,
  results: Restaurant[],
  options: {
    isSingleResult: boolean;
    isBottomSheetOpen: boolean;
    isDetailPanelOpen: boolean;
  },
): () => void {
  if (!globalThis.google?.maps?.LatLngBounds || !globalThis.google.maps.event) {
    return () => {};
  }

  if (results.length === 0) {
    return animateMapCamera(map, SEOUL_CENTER, DEFAULT_ZOOM);
  }

  const bounds = new google.maps.LatLngBounds();
  for (const restaurant of results) {
    bounds.extend({ lat: restaurant.lat, lng: restaurant.lng });
  }

  const padding = getSearchResultPadding(options);
  map.fitBounds(bounds, padding);

  if (!options.isSingleResult) {
    return () => {};
  }

  const listener = google.maps.event.addListenerOnce(map, 'idle', () => {
    const currentZoom = map.getZoom();
    if (currentZoom !== undefined && currentZoom > SINGLE_SEARCH_RESULT_ZOOM) {
      map.setZoom(SINGLE_SEARCH_RESULT_ZOOM);
    }
  });

  return () => {
    google.maps.event.removeListener(listener);
  };
}

function getSearchResultPadding({
  isSingleResult,
  isBottomSheetOpen,
  isDetailPanelOpen,
}: {
  isSingleResult: boolean;
  isBottomSheetOpen: boolean;
  isDetailPanelOpen: boolean;
}): google.maps.Padding {
  const viewportHeight = window.innerHeight;
  const viewportWidth = window.innerWidth;
  const sidePadding = Math.round(Math.max(40, Math.min(88, viewportWidth * 0.08)));
  const topPadding = isSingleResult ? 132 : 148;
  const sheetRatio = isDetailPanelOpen ? 0.7 : isBottomSheetOpen ? 0.45 : 0;
  const desiredBottomPadding = Math.round(viewportHeight * sheetRatio + 24);
  const maxBottomPadding = Math.max(96, viewportHeight - topPadding - 72);

  return {
    top: topPadding,
    bottom: Math.min(Math.max(72, desiredBottomPadding), maxBottomPadding),
    left: sidePadding,
    right: sidePadding,
  };
}

function focusRestaurantInView(
  map: google.maps.Map,
  restaurant: Restaurant,
  options: {
    isDetailPanelOpen: boolean;
    maxZoom: number;
  },
): () => void {
  if (!globalThis.google?.maps?.LatLngBounds || !globalThis.google.maps.event) {
    return () => {};
  }

  const bounds = new google.maps.LatLngBounds();
  bounds.extend({ lat: restaurant.lat, lng: restaurant.lng });

  map.fitBounds(
    bounds,
    getSearchResultPadding({
      isSingleResult: true,
      isBottomSheetOpen: false,
      isDetailPanelOpen: options.isDetailPanelOpen,
    }),
  );

  const listener = google.maps.event.addListenerOnce(map, 'idle', () => {
    const currentZoom = map.getZoom();
    if (currentZoom !== undefined && currentZoom > options.maxZoom) {
      map.setZoom(options.maxZoom);
    }
  });

  return () => {
    google.maps.event.removeListener(listener);
  };
}

function createMarker(
  markerLib: google.maps.MarkerLibrary,
  restaurant: Restaurant,
  language: 'en' | 'ja' | 'zh',
  onSelect: (r: Restaurant) => void,
): google.maps.marker.AdvancedMarkerElement {
  const ratingStyle = getRestaurantRatingStyle(
    restaurant.rating,
    restaurant.rating_count,
  );

  const content = document.createElement('div');
  content.innerHTML = `
    <div style="
      display:flex;flex-direction:column;align-items:center;cursor:pointer;
    ">
      <div style="
        min-width:32px;height:28px;border-radius:14px;
        background:${ratingStyle.backgroundColor};color:${ratingStyle.color};
        display:flex;align-items:center;justify-content:center;
        font-weight:700;font-size:12px;
        padding:0 8px;
        border:2px solid white;
        box-shadow:0 2px 6px rgba(0,0,0,0.25);
      ">
        ${ratingStyle.displayText}
      </div>
      <div style="
        width:0;height:0;
        border-left:5px solid transparent;
        border-right:5px solid transparent;
        border-top:6px solid white;
        margin-top:-1px;
        filter:drop-shadow(0 1px 1px rgba(0,0,0,0.1));
      "></div>
    </div>
  `;

  const marker = new markerLib.AdvancedMarkerElement({
    position: { lat: restaurant.lat, lng: restaurant.lng },
    title: t(restaurant.translations, 'name', language),
    content,
  });

  marker.addListener('click', () => onSelect(restaurant));

  return marker;
}
