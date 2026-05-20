import { supabase } from '@/lib/supabase';
import type { Restaurant, RestaurantPhoto, MenuItem } from '@/types';

type PrimaryRestaurantPhoto = Pick<
  RestaurantPhoto,
  'restaurant_id' | 'url' | 'display_order'
>;

export function attachPrimaryPhotoUrls(
  restaurants: Restaurant[],
  photos: PrimaryRestaurantPhoto[],
): Restaurant[] {
  const primaryPhotos = new Map<
    string,
    Pick<PrimaryRestaurantPhoto, 'url' | 'display_order'>
  >();

  for (const photo of photos) {
    const current = primaryPhotos.get(photo.restaurant_id);
    if (!current || photo.display_order < current.display_order) {
      primaryPhotos.set(photo.restaurant_id, {
        url: photo.url,
        display_order: photo.display_order,
      });
    }
  }

  return restaurants.map((restaurant) => ({
    ...restaurant,
    primary_photo_url: primaryPhotos.get(restaurant.id)?.url ?? null,
  }));
}

export async function fetchRestaurantsByDistrict(
  districtId: string,
): Promise<Restaurant[]> {
  const { data, error } = await supabase
    .from('restaurants')
    .select('*')
    .eq('district_id', districtId)
    .order('created_at');

  if (error) throw error;

  const restaurants = (data ?? []) as Restaurant[];
  if (restaurants.length === 0) return [];

  const { data: photos, error: photosError } = await supabase
    .from('restaurant_photos')
    .select('restaurant_id, url, display_order')
    .in(
      'restaurant_id',
      restaurants.map((restaurant) => restaurant.id),
    )
    .order('display_order');

  if (photosError) throw photosError;
  return attachPrimaryPhotoUrls(restaurants, photos ?? []);
}

export async function fetchRestaurantPhotos(
  restaurantId: string,
): Promise<RestaurantPhoto[]> {
  const { data, error } = await supabase
    .from('restaurant_photos')
    .select('*')
    .eq('restaurant_id', restaurantId)
    .order('display_order');

  if (error) throw error;
  return data ?? [];
}

export async function fetchMenuItems(
  restaurantId: string,
): Promise<MenuItem[]> {
  const { data, error } = await supabase
    .from('menu_items')
    .select('*')
    .eq('restaurant_id', restaurantId)
    .order('display_order');

  if (error) throw error;
  return data ?? [];
}

export async function fetchRestaurantCountsByDistrict(): Promise<
  Record<string, number>
> {
  const { data, error } = await supabase
    .from('restaurants')
    .select('district_id');

  if (error) throw error;

  const counts: Record<string, number> = {};
  for (const row of data ?? []) {
    counts[row.district_id] = (counts[row.district_id] ?? 0) + 1;
  }
  return counts;
}
