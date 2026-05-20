import { useEffect, useState, useRef } from 'react';
import { fetchRestaurantPhotos } from '@/services/data.service';
import type { RestaurantPhoto } from '@/types';

export function PhotoCarousel({ restaurantId }: { restaurantId: string }) {
  const [photos, setPhotos] = useState<RestaurantPhoto[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  useEffect(() => {
    setCurrentIndex(0);
    fetchRestaurantPhotos(restaurantId).then(setPhotos).catch(() => {});
  }, [restaurantId]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0]!.clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0]!.clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    const threshold = 50;

    if (diff > threshold && currentIndex < photos.length - 1) {
      // Swipe left → next
      setCurrentIndex(currentIndex + 1);
    } else if (diff < -threshold && currentIndex > 0) {
      // Swipe right → prev
      setCurrentIndex(currentIndex - 1);
    }
  };

  if (photos.length === 0) {
    return null;
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
    <div
      className="relative w-full h-48 overflow-hidden rounded-lg touch-pan-y"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className="flex h-full transition-transform duration-300 ease-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {photos.map((photo) => (
          <img
            key={photo.id}
            src={photo.url}
            alt=""
            className="w-full h-full object-cover shrink-0"
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

      {/* Click areas for desktop */}
      <button
        onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
        className="absolute left-0 top-0 bottom-0 w-1/4 opacity-0"
        aria-label="Previous photo"
      />
      <button
        onClick={() =>
          setCurrentIndex(Math.min(photos.length - 1, currentIndex + 1))
        }
        className="absolute right-0 top-0 bottom-0 w-1/4 opacity-0"
        aria-label="Next photo"
      />
    </div>
  );
}
