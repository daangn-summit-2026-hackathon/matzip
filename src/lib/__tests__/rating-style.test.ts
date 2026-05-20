import { describe, expect, it } from 'vitest';
import { getRestaurantRatingStyle } from '../rating-style';

describe('getRestaurantRatingStyle', () => {
  it('shows numeric ratings below 4.0 instead of the fallback star', () => {
    expect(getRestaurantRatingStyle(3.8, 12).displayText).toBe('3.8');
  });

  it('uses the fallback star only when no rating exists', () => {
    expect(getRestaurantRatingStyle(null, 0).displayText).toBe('★');
  });
});
