import { APIProvider, Map, AdvancedMarker } from '@vis.gl/react-google-maps';
import { useAppStore } from '@/store/app-store';
import { DISTRICTS } from '@/constants/districts';
import { filterByTags } from '@/services/search.service';
import { t } from '@/lib/translate';

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

  const district = DISTRICTS.find((d) => d.id === activeDistrict);
  const center = district
    ? { lat: district.center_lat, lng: district.center_lng }
    : SEOUL_CENTER;
  const zoom = district ? district.zoom_level : DEFAULT_ZOOM;

  const visibleRestaurants = filterByTags(restaurants, selectedTags);

  return (
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY ?? ''}>
      <Map
        mapId={import.meta.env.VITE_GOOGLE_MAPS_MAP_ID}
        center={center}
        zoom={zoom}
        gestureHandling="greedy"
        disableDefaultUI
        className="w-full h-full"
      >
        {visibleRestaurants.map((restaurant) => (
          <AdvancedMarker
            key={restaurant.id}
            position={{ lat: restaurant.lat, lng: restaurant.lng }}
            title={t(restaurant.translations, 'name', language)}
            onClick={() => setSelectedRestaurant(restaurant)}
          />
        ))}
      </Map>
    </APIProvider>
  );
}
