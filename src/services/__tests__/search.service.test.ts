import { describe, it, expect } from 'vitest';
import { filterByTags, getAutocompleteSuggestions } from '../search.service';
import type { Restaurant } from '@/types';

const mockRestaurants: Restaurant[] = [
  {
    id: '1',
    district_id: 'd1',
    lat: 37.5,
    lng: 127.0,
    tags: ['delicious', 'good-value'],
    rating: 4.5,
    rating_count: 10,
    phone_number: null,
    created_at: '',
    translations: {
      name: { en: 'Korean BBQ House', ja: '韓国BBQハウス', zh: '韩国烤肉屋' },
      cuisine_type: { en: 'Korean BBQ', ja: '韓国BBQ', zh: '韩国烤肉' },
    },
  },
  {
    id: '2',
    district_id: 'd1',
    lat: 37.51,
    lng: 127.01,
    tags: ['great-atmosphere', 'japanese-menu'],
    rating: 4.0,
    rating_count: 5,
    phone_number: null,
    created_at: '',
    translations: {
      name: { en: 'Sushi Place', ja: '寿司屋', zh: '寿司店' },
      cuisine_type: { en: 'Japanese', ja: '日本料理', zh: '日本料理' },
    },
  },
  {
    id: '3',
    district_id: 'd1',
    lat: 37.52,
    lng: 127.02,
    tags: ['delicious', 'great-atmosphere', 'good-value'],
    rating: null,
    rating_count: 1,
    phone_number: null,
    created_at: '',
    translations: {
      name: { en: 'Bibimbap Corner', ja: 'ビビンバコーナー', zh: '拌饭角' },
      cuisine_type: { en: 'Korean', ja: '韓国料理', zh: '韩国料理' },
    },
  },
];

describe('filterByTags', () => {
  it('returns all restaurants when no tags selected', () => {
    expect(filterByTags(mockRestaurants, [])).toHaveLength(3);
  });

  it('filters by single tag', () => {
    const result = filterByTags(mockRestaurants, ['delicious']);
    expect(result).toHaveLength(2);
    expect(result.map((r) => r.id)).toEqual(['1', '3']);
  });

  it('uses AND logic for multiple tags', () => {
    const result = filterByTags(mockRestaurants, ['delicious', 'great-atmosphere']);
    expect(result).toHaveLength(1);
    expect(result[0]!.id).toBe('3');
  });

  it('returns empty array when no match', () => {
    const result = filterByTags(mockRestaurants, ['chinese-menu']);
    expect(result).toHaveLength(0);
  });
});

describe('getAutocompleteSuggestions', () => {
  it('returns empty for empty query', () => {
    expect(getAutocompleteSuggestions('', 'en', mockRestaurants)).toHaveLength(0);
    expect(getAutocompleteSuggestions('  ', 'en', mockRestaurants)).toHaveLength(0);
  });

  it('matches restaurant names case-insensitively', () => {
    const results = getAutocompleteSuggestions('korean', 'en', mockRestaurants);
    expect(results.some((r) => r.id === '1')).toBe(true);
  });

  it('matches tag labels', () => {
    const results = getAutocompleteSuggestions('Delicious', 'en', mockRestaurants);
    expect(results.some((r) => r.type === 'tag' && r.id === 'delicious')).toBe(true);
  });

  it('matches in Japanese', () => {
    const results = getAutocompleteSuggestions('寿司', 'ja', mockRestaurants);
    expect(results.some((r) => r.id === '2')).toBe(true);
  });

  it('returns max 10 suggestions', () => {
    const results = getAutocompleteSuggestions('a', 'en', mockRestaurants);
    expect(results.length).toBeLessThanOrEqual(10);
  });
});
