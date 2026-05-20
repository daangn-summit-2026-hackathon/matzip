import type { TranslationMap, SupportedLanguage } from '@/types';

export function t(
  translations: TranslationMap | undefined | null,
  field: string,
  lang: SupportedLanguage,
): string {
  if (!translations) return '';
  return translations[field]?.[lang] ?? translations[field]?.['en'] ?? '';
}
