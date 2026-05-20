import { APIProvider, Map, AdvancedMarker, useMap } from '@vis.gl/react-google-maps';
import { useEffect, useRef, useCallback } from 'react';
import { MarkerClusterer } from '@googlemaps/markerclusterer';
import { useAppStore } from '@/store/app-store';
import { DISTRICTS } from '@/constants/districts';
import { filterByTags } from '@/services/search.service';
import { t } from '@/lib/translate';
import { RestaurantPin } from './RestaurantPin';
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
        <MapContent district={district} />
      </Map>
    </APIProvider>
  );
}

function MapContent({ district }: { district: typeof DISTRICTS[number] | undefined }) {
  const map = useMap();
  const {
    restaurants,
    selectedTags,
    setSelectedRestaurant,
    language,
  } = useAppStore();

  const clustererRef = useRef<MarkerClusterer | null>(null);
  const markersRef = useRef<globalThis.Map<string, google.maps.marker.AdvancedMarkerElement>>(new globalThis.Map());

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

  // Initialize clusterer
  useEffect(() => {
    if (!map) return;
    if (!clustererRef.current) {
      clustererRef.current = new MarkerClusterer({ map, markers: [] });
    }
    return () => {
      clustererRef.current?.clearMarkers();
    };
  }, [map]);

  // Update clusterer markers when restaurants change
  useEffect(() => {
    if (!clustererRef.current) return;
    clustererRef.current.clearMarkers();
    const markers = Array.from(markersRef.current.values());
    clustererRef.current.addMarkers(markers);
  }, [visibleRestaurants]);

  const setMarkerRef = useCallback(
    (marker: google.maps.marker.AdvancedMarkerElement | null, id: string) => {
      if (marker) {
        markersRef.current.set(id, marker);
      } else {
        markersRef.current.delete(id);
      }
    },
    [],
  );

  return (
    <>
      {visibleRestaurants.map((restaurant: Restaurant) => {
        const photoUrl = restaurant.translations?.photo_url?.en ?? undefined;

        return (
          <AdvancedMarker
            key={restaurant.id}
            position={{ lat: restaurant.lat, lng: restaurant.lng }}
            title={t(restaurant.translations, 'name', language)}
            onClick={() => setSelectedRestaurant(restaurant)}
            ref={(marker) => setMarkerRef(marker, restaurant.id)}
          >
            <RestaurantPin photoUrl={photoUrl} />
          </AdvancedMarker>
        );
      })}
    </>
  );
}
