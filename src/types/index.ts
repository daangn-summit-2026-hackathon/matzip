export type SupportedLanguage = 'en' | 'ja' | 'zh';

export type TranslationMap = Record<string, Partial<Record<SupportedLanguage, string>>>;

export interface District {
  id: string;
  center_lat: number;
  center_lng: number;
  zoom_level: number;
  image_url: string;
  boundary: { lat: number; lng: number }[];
  translations: TranslationMap;
}

export interface Restaurant {
  id: string;
  district_id: string;
  lat: number;
  lng: number;
  tags: string[];
  rating: number | null;
  rating_count: number;
  phone_number: string | null;
  created_at: string;
  translations: TranslationMap;
  primary_photo_url?: string | null;
}

export interface RestaurantPhoto {
  id: string;
  restaurant_id: string;
  url: string;
  display_order: number;
  translations: TranslationMap;
}

export interface MenuItem {
  id: string;
  restaurant_id: string;
  price: number;
  display_order: number;
  translations: TranslationMap;
}

export interface Tag {
  id: string;
  label: Record<SupportedLanguage, string>;
  color: string;
  icon: string;
}

export interface SearchSuggestion {
  type: 'restaurant' | 'tag' | 'cuisine';
  id: string;
  label: string;
}
