import { describe, it, expect } from 'vitest';
import { t } from '../translate';

describe('translate helper', () => {
  const translations = {
    name: { en: 'Hello', ja: 'こんにちは', zh: '你好' },
    address: { en: '123 Main St' },
  };

  it('returns value for selected language', () => {
    expect(t(translations, 'name', 'ja')).toBe('こんにちは');
    expect(t(translations, 'name', 'zh')).toBe('你好');
    expect(t(translations, 'name', 'en')).toBe('Hello');
  });

  it('falls back to English when target language missing', () => {
    expect(t(translations, 'address', 'ja')).toBe('123 Main St');
    expect(t(translations, 'address', 'zh')).toBe('123 Main St');
  });

  it('returns empty string for missing field', () => {
    expect(t(translations, 'missing', 'en')).toBe('');
  });

  it('handles null translations', () => {
    expect(t(null, 'name', 'en')).toBe('');
    expect(t(undefined, 'name', 'en')).toBe('');
  });
});
