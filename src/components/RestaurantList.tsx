import { useState } from 'react';
import { MapPin, Utensils } from 'lucide-react';
import { getRestaurantRatingStyle } from '@/lib/rating-style';
import { t as translate } from '@/lib/translate';
import type { Restaurant, SupportedLanguage } from '@/types';

interface RestaurantListProps {
  restaurants: Restaurant[];
  language: SupportedLanguage;
  onRestaurantClick: (restaurant: Restaurant) => void;
}

export function RestaurantList({
  restaurants,
  language,
  onRestaurantClick,
}: RestaurantListProps) {
  const [failedPhotoUrls, setFailedPhotoUrls] = useState<Set<string>>(
    () => new Set(),
  );

  return (
    <div className="space-y-2 pb-6">
      {restaurants.map((restaurant) => {
        const name = translate(restaurant.translations, 'name', language);
        const cuisine = translate(
          restaurant.translations,
          'cuisine_type',
          language,
        );
        const address = translate(restaurant.translations, 'address', language);
        const ratingStyle = getRestaurantRatingStyle(
          restaurant.rating,
          restaurant.rating_count,
        );
        const photoUrl = restaurant.primary_photo_url ?? undefined;
        const shouldShowPhoto =
          photoUrl !== undefined && !failedPhotoUrls.has(photoUrl);

        return (
          <button
            key={restaurant.id}
            type="button"
            onClick={() => onRestaurantClick(restaurant)}
            className="flex w-full items-center gap-3 rounded-lg px-2 py-2.5 text-left transition-colors hover:bg-gray-50 active:bg-gray-100"
          >
            {shouldShowPhoto ? (
              <img
                src={photoUrl}
                alt=""
                className="h-14 w-14 shrink-0 rounded-lg object-cover"
                loading="lazy"
                onError={() => {
                  setFailedPhotoUrls((current) => {
                    if (current.has(photoUrl)) {
                      return current;
                    }

                    const next = new Set(current);
                    next.add(photoUrl);
                    return next;
                  });
                }}
              />
            ) : (
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-500">
                <Utensils className="h-6 w-6" aria-hidden="true" />
              </div>
            )}

            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-2">
                <p className="min-w-0 flex-1 truncate text-sm font-semibold text-gray-950">
                  {name}
                </p>
                <span
                  className="inline-flex min-w-8 shrink-0 items-center justify-center rounded-full px-2 py-0.5 text-xs font-bold"
                  style={{
                    backgroundColor: ratingStyle.backgroundColor,
                    color: ratingStyle.color,
                  }}
                >
                  {ratingStyle.displayText}
                </span>
              </div>
              {cuisine && (
                <p className="mt-0.5 truncate text-xs font-medium text-gray-600">
                  {cuisine}
                </p>
              )}
              {address && (
                <p className="mt-1 flex items-center gap-1 truncate text-xs text-gray-500">
                  <MapPin
                    className="h-3.5 w-3.5 shrink-0"
                    aria-hidden="true"
                  />
                  <span className="truncate">{address}</span>
                </p>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
}
