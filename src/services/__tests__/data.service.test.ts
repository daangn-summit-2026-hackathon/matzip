import { describe, expect, it } from 'vitest';
import { attachPrimaryPhotoUrls } from '../data.service';
import type { Restaurant, RestaurantPhoto } from '@/types';

const baseRestaurant = (id: string): Restaurant => ({
  id,
  district_id: 'district-1',
  lat: 37.5,
  lng: 127,
  tags: [],
  rating: null,
  rating_count: 0,
  phone_number: null,
  created_at: '',
  translations: {
    name: { en: id },
  },
});

const photo = (
  restaurantId: string,
  url: string,
  displayOrder: number,
): Pick<RestaurantPhoto, 'restaurant_id' | 'url' | 'display_order'> => ({
  restaurant_id: restaurantId,
  url,
  display_order: displayOrder,
});

describe('attachPrimaryPhotoUrls', () => {
  it('adds the first restaurant photo URL to the matching restaurant', () => {
    const restaurants = [baseRestaurant('r-1'), baseRestaurant('r-2')];
    const photos = [
      photo('r-1', 'https://example.com/second.jpg', 2),
      photo('r-1', 'https://example.com/first.jpg', 1),
      photo('r-2', 'https://example.com/other.jpg', 1),
    ];

    expect(attachPrimaryPhotoUrls(restaurants, photos)).toEqual([
      expect.objectContaining({
        id: 'r-1',
        primary_photo_url: 'https://example.com/first.jpg',
      }),
      expect.objectContaining({
        id: 'r-2',
        primary_photo_url: 'https://example.com/other.jpg',
      }),
    ]);
  });

  it('keeps restaurants without photos renderable with a null primary photo URL', () => {
    const restaurants = [baseRestaurant('r-1')];

    expect(attachPrimaryPhotoUrls(restaurants, [])).toEqual([
      expect.objectContaining({
        id: 'r-1',
        primary_photo_url: null,
      }),
    ]);
  });
});
