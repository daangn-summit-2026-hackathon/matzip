import { useEffect, useState } from 'react';
import { fetchRestaurantPhotos } from '@/services/data.service';
import type { RestaurantPhoto } from '@/types';

export function PhotoCarousel({ restaurantId }: { restaurantId: string }) {
  const [photos, setPhotos] = useState<RestaurantPhoto[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetchRestaurantPhotos(restaurantId).then(setPhotos).catch(() => {});
  }, [restaurantId]);

  if (photos.length === 0) {
    return (
      <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center">
        <span className="text-gray-400 text-4xl">🍽️</span>
      </div>
    );
  }

  if (photos.length === 1) {
    return (
      <img
        src={photos[0]!.url}
        alt=""
        className="w-full h-48 object-cover rounded-lg"
      />
    );
  }

  return (
    <div className="relative w-full h-48 overflow-hidden rounded-lg">
      <div
        className="flex transition-transform duration-300 h-full"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {photos.map((photo) => (
          <img
            key={photo.id}
            src={photo.url}
            alt=""
            className="w-full h-full object-cover flex-shrink-0"
          />
        ))}
      </div>

      {/* Dot indicators */}
      <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5">
        {photos.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`w-2 h-2 rounded-full transition-colors ${
              i === currentIndex ? 'bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>

      {/* Swipe areas */}
      <button
        onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
        className="absolute left-0 top-0 bottom-0 w-1/3"
        aria-label="Previous photo"
      />
      <button
        onClick={() =>
          setCurrentIndex(Math.min(photos.length - 1, currentIndex + 1))
        }
        className="absolute right-0 top-0 bottom-0 w-1/3"
        aria-label="Next photo"
      />
    </div>
  );
}
