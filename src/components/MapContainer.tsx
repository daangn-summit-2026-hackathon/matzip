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
      clustererRef.current = new MarkerClusterer({ map, markers: [] });
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
  const photoUrl = restaurant.translations?.photo_url?.en;

  // Create pin content
  const content = document.createElement('div');
  content.className = 'flex flex-col items-center cursor-pointer';
  content.innerHTML = `
    <div style="width:40px;height:40px;border-radius:50%;border:2px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.3);overflow:hidden;background:#e5e7eb;">
      <img src="${photoUrl || '/icon.png'}" style="width:100%;height:100%;object-fit:cover;" onerror="this.src='/icon.png'" />
    </div>
    <div style="width:0;height:0;border-left:6px solid transparent;border-right:6px solid transparent;border-top:8px solid white;margin-top:-1px;filter:drop-shadow(0 1px 1px rgba(0,0,0,0.1));"></div>
  `;

  const marker = new markerLib.AdvancedMarkerElement({
    position: { lat: restaurant.lat, lng: restaurant.lng },
    title: t(restaurant.translations, 'name', language),
    content,
  });

  marker.addListener('click', () => onSelect(restaurant));

  return marker;
}
