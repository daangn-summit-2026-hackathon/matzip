# Unit Test Instructions - matzip-map

## Test Framework

- **Vitest** for unit tests
- **fast-check** for property-based tests

## Running Tests

```bash
# Run all tests once
pnpm test

# Watch mode
pnpm test:watch
```

## Test Coverage Areas

### 1. Translation Helper (`lib/translate.ts`)
- Returns correct value for given language
- Falls back to English when target language missing
- Returns empty string when field missing
- Handles null/undefined translations gracefully

### 2. Tag Filtering (`services/search.service.ts`)
- Empty tag selection returns all restaurants
- Single tag filters correctly
- Multiple tags use AND logic (intersection)
- Non-existent tag returns empty array

### 3. Rating Display Logic
- rating_count >= 3 shows numeric rating
- rating_count < 3 shows "New"
- null rating shows "New"
- Rating value clamped between 1.0 and 5.0

### 4. Autocomplete Suggestions
- Empty query returns no suggestions
- Matches restaurant names (case-insensitive)
- Matches tag labels in current language
- Returns max 10 suggestions
- No duplicates in results

### 5. District Constants
- All districts have valid UUID format
- All districts have translations for all 3 languages
- All districts have valid coordinates (Seoul area)

## Property-Based Tests

Property tests use fast-check to verify correctness properties:

| Property | File | Description |
|----------|------|-------------|
| P1 | translate.property.test.ts | Localization consistency |
| P2 | translate.property.test.ts | Language preference round-trip |
| P3 | translate.property.test.ts | Browser language detection mapping |
| P7 | rating.property.test.ts | Rating display rules |
| P8 | filter.property.test.ts | Tag filter AND semantics |

## Example Test File

```typescript
// src/lib/__tests__/translate.test.ts
import { describe, it, expect } from 'vitest';
import { t } from '../translate';

describe('translate helper', () => {
  const translations = {
    name: { en: 'Hello', ja: 'こんにちは', zh: '你好' },
  };

  it('returns value for selected language', () => {
    expect(t(translations, 'name', 'ja')).toBe('こんにちは');
  });

  it('falls back to English', () => {
    const partial = { name: { en: 'Hello' } };
    expect(t(partial, 'name', 'ja')).toBe('Hello');
  });

  it('returns empty string for missing field', () => {
    expect(t(translations, 'missing', 'en')).toBe('');
  });

  it('handles null translations', () => {
    expect(t(null, 'name', 'en')).toBe('');
  });
});
```
