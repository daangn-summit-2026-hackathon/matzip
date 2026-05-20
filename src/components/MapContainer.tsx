import { APIProvider, Map, AdvancedMarker } from '@vis.gl/react-google-maps';
import { useEffect, useRef } from 'react';
import { useAppStore } from '@/store/app-store';
import { DISTRICTS } from '@/constants/districts';
import { filterByTags } from '@/services/search.service';
import { t } from '@/lib/translate';
import { RestaurantPin } from './RestaurantPin';

const SEOUL_CENTER = { lat: 37.5665, lng: 126.978 };
const DEFAULT_ZOOM = 12;

export function MapContainer() {
  const {
    restaurants,
    activeDistrict,
    selectedTags,
    setSelectedRestaurant,
    language,
  } = useAppStore();

  const mapRef = useRef<google.maps.Map | null>(null);

  const district = DISTRICTS.find((d) => d.id === activeDistrict);
  const visibleRestaurants = filterByTags(restaurants, selectedTags);

  // Pan to district when selected
  useEffect(() => {
    if (!mapRef.current) return;
    if (district) {
      mapRef.current.panTo({ lat: district.center_lat, lng: district.center_lng });
      mapRef.current.setZoom(district.zoom_level);
    } else {
      mapRef.current.panTo(SEOUL_CENTER);
      mapRef.current.setZoom(DEFAULT_ZOOM);
    }
  }, [district]);

  return (
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY ?? ''}>
      <Map
        mapId={import.meta.env.VITE_GOOGLE_MAPS_MAP_ID}
        defaultCenter={SEOUL_CENTER}
        defaultZoom={DEFAULT_ZOOM}
        gestureHandling="greedy"
        disableDefaultUI
        className="w-full h-full"
        onTilesLoaded={(e) => {
          if (e.map && !mapRef.current) mapRef.current = e.map;
        }}
      >
        {visibleRestaurants.map((restaurant) => {
          // Use first photo URL from translations or undefined
          const photoUrl = restaurant.translations?.photo_url?.en ?? undefined;

          return (
            <AdvancedMarker
              key={restaurant.id}
              position={{ lat: restaurant.lat, lng: restaurant.lng }}
              title={t(restaurant.translations, 'name', language)}
              onClick={() => setSelectedRestaurant(restaurant)}
            >
              <RestaurantPin photoUrl={photoUrl} />
            </AdvancedMarker>
          );
        })}
      </Map>
    </APIProvider>
  );
}
