import { APIProvider, Map, useMap, useMapsLibrary } from '@vis.gl/react-google-maps';
import { useEffect, useRef } from 'react';
import { MarkerClusterer } from '@googlemaps/markerclusterer';
import { useAppStore } from '@/store/app-store';
import { DISTRICTS } from '@/constants/districts';
import { filterByTags } from '@/services/search.service';
import { t } from '@/lib/translate';
import type { Restaurant } from '@/types';

const SEOUL_CENTER = { lat: 37.5665, lng: 126.978 };
const DEFAULT_ZOOM = 12;

export function MapContainer() {
  const { activeDistrict } = useAppStore();
  const district = DISTRICTS.find((d) => d.id === activeDistrict);

  return (
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY ?? ''}>
      <Map
        mapId={import.meta.env.VITE_GOOGLE_MAPS_MAP_ID}
        defaultCenter={SEOUL_CENTER}
        defaultZoom={DEFAULT_ZOOM}
        gestureHandling="greedy"
        disableDefaultUI
        className="w-full h-full"
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
    selectedTags,
    setSelectedRestaurant,
    language,
  } = useAppStore();

  const clustererRef = useRef<MarkerClusterer | null>(null);
  const markersRef = useRef<google.maps.marker.AdvancedMarkerElement[]>([]);

  const visibleRestaurants = filterByTags(restaurants, selectedTags);

  // Pan to district when selected
  useEffect(() => {
    if (!map) return;
    if (district) {
      map.panTo({ lat: district.center_lat, lng: district.center_lng });
      map.setZoom(district.zoom_level);
    } else {
      map.panTo(SEOUL_CENTER);
      map.setZoom(DEFAULT_ZOOM);
    }
  }, [district, map]);

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

function createMarker(
  markerLib: google.maps.MarkerLibrary,
  restaurant: Restaurant,
  language: 'en' | 'ja' | 'zh',
  onSelect: (r: Restaurant) => void,
): google.maps.marker.AdvancedMarkerElement {
  const rating = restaurant.rating;
  const ratingCount = restaurant.rating_count;

  // Determine color based on rating
  let bgColor: string;
  let textColor: string;
  if (rating !== null && ratingCount >= 3 && rating >= 4.5) {
    bgColor = '#16a34a'; // green-600
    textColor = '#ffffff';
  } else if (rating !== null && ratingCount >= 3 && rating >= 4.0) {
    bgColor = '#86efac'; // green-300
    textColor = '#166534';
  } else {
    bgColor = '#fde047'; // yellow-300
    textColor = '#713f12';
  }

  // Display text
  const displayText = rating !== null && ratingCount >= 3
    ? rating.toFixed(1)
    : '★';

  const content = document.createElement('div');
  content.innerHTML = `
    <div style="
      display:flex;flex-direction:column;align-items:center;cursor:pointer;
    ">
      <div style="
        min-width:32px;height:28px;border-radius:14px;
        background:${bgColor};color:${textColor};
        display:flex;align-items:center;justify-content:center;
        font-weight:700;font-size:12px;
        padding:0 8px;
        border:2px solid white;
        box-shadow:0 2px 6px rgba(0,0,0,0.25);
      ">
        ${displayText}
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
