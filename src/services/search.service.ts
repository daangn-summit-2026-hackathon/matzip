import { supabase } from '@/lib/supabase';
import type { Restaurant, SupportedLanguage } from '@/types';
import { TAGS } from '@/constants/tags';

export async function searchRestaurants(
  query: string,
  lang: SupportedLanguage,
): Promise<Restaurant[]> {
  const { data, error } = await supabase
    .from('restaurants')
    .select('*')
    .or(
      `translations->name->>${lang}.ilike.%${query}%,translations->cuisine_type->>${lang}.ilike.%${query}%`,
    );

  if (error) throw error;
  return data ?? [];
}

export function getAutocompleteSuggestions(
  query: string,
  lang: SupportedLanguage,
  restaurants: Restaurant[],
): { type: 'restaurant' | 'tag' | 'cuisine'; id: string; label: string }[] {
  if (!query.trim()) return [];

  const lowerQuery = query.toLowerCase();
  const suggestions: { type: 'restaurant' | 'tag' | 'cuisine'; id: string; label: string }[] = [];

  // Match tags
  for (const tag of TAGS) {
    if (tag.label[lang].toLowerCase().includes(lowerQuery)) {
      suggestions.push({ type: 'tag', id: tag.id, label: `${tag.icon} ${tag.label[lang]}` });
    }
  }

  // Match restaurants from cached data
  for (const r of restaurants) {
    const name = r.translations?.name?.[lang] ?? r.translations?.name?.en ?? '';
    if (name.toLowerCase().includes(lowerQuery)) {
      suggestions.push({ type: 'restaurant', id: r.id, label: name });
    }
    if (suggestions.length >= 10) break;
  }

  return suggestions.slice(0, 10);
}

export function filterByTags(
  restaurants: Restaurant[],
  selectedTags: string[],
): Restaurant[] {
  if (selectedTags.length === 0) return restaurants;
  return restaurants.filter((r) =>
    selectedTags.every((tag) => r.tags.includes(tag)),
  );
}
