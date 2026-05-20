export function getRestaurantRatingStyle(
  rating: number | null,
  ratingCount: number,
) {
  if (rating !== null && ratingCount >= 3 && rating >= 4.5) {
    return {
      backgroundColor: '#16a34a',
      color: '#ffffff',
      displayText: rating.toFixed(1),
    } as const;
  }

  if (rating !== null && ratingCount >= 3 && rating >= 4.0) {
    return {
      backgroundColor: '#86efac',
      color: '#166534',
      displayText: rating.toFixed(1),
    } as const;
  }

  return {
    backgroundColor: '#fde047',
    color: '#713f12',
    displayText: '★',
  } as const;
}
