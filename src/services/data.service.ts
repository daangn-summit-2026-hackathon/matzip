import { supabase } from '@/lib/supabase';
import type { Restaurant, RestaurantPhoto, MenuItem } from '@/types';

export async function fetchRestaurantsByDistrict(
  districtId: string,
): Promise<Restaurant[]> {
  const { data, error } = await supabase
    .from('restaurants')
    .select('*')
    .eq('district_id', districtId)
    .order('created_at');

  if (error) throw error;
  return data ?? [];
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
