import { useEffect, useMemo, useRef, useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { fetchRestaurantPhotos } from '@/services/data.service';
import type { RestaurantPhoto } from '@/types';

export function PhotoCarousel({ restaurantId }: { restaurantId: string }) {
  const [photos, setPhotos] = useState<RestaurantPhoto[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const suppressNextOpen = useRef(false);

  const slides = useMemo(
    () => photos.map((photo) => ({ src: photo.url })),
    [photos],
  );

  useEffect(() => {
    setCurrentIndex(0);
    setIsLightboxOpen(false);
    fetchRestaurantPhotos(restaurantId).then(setPhotos).catch(() => {});
  }, [restaurantId]);

  const handleTouchStart = (e: React.TouchEvent) => {
    const startX = e.touches[0]!.clientX;
    touchStartX.current = startX;
    touchEndX.current = startX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0]!.clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    const threshold = 50;

    if (Math.abs(diff) <= threshold) return;

    suppressNextOpen.current = true;
    window.setTimeout(() => {
      suppressNextOpen.current = false;
    }, 250);

    if (diff > threshold) {
      setCurrentIndex((index) => Math.min(photos.length - 1, index + 1));
    } else if (diff < -threshold) {
      setCurrentIndex((index) => Math.max(0, index - 1));
    }
  };

  const openLightbox = (index: number) => {
    if (suppressNextOpen.current) return;
    setCurrentIndex(index);
    setIsLightboxOpen(true);
  };

  const lightbox = (
    <Lightbox
      open={isLightboxOpen}
      close={() => setIsLightboxOpen(false)}
      index={currentIndex}
      slides={slides}
      controller={{
        closeOnBackdropClick: true,
        closeOnPullDown: true,
      }}
      on={{
        view: ({ index }) => setCurrentIndex(index),
      }}
      render={{
        buttonClose: () => (
          <button
            type="button"
            aria-label="Close gallery"
            onClick={() => setIsLightboxOpen(false)}
            className="fixed left-4 top-[calc(env(safe-area-inset-top)+1rem)] z-[10001] flex h-11 w-11 items-center justify-center rounded-full bg-black/60 text-lg font-medium text-white shadow-lg backdrop-blur transition-colors hover:bg-black/75 focus:outline-none focus:ring-2 focus:ring-white/80"
          >
            X
          </button>
        ),
      }}
    />
  );

  if (photos.length === 0) {
    return null;
  }

  if (photos.length === 1) {
    return (
      <>
        <button
          type="button"
          aria-label="Open photo gallery"
          onClick={() => openLightbox(0)}
          onPointerDown={(e) => e.stopPropagation()}
          className="block h-48 w-full cursor-zoom-in overflow-hidden rounded-lg bg-gray-100 p-0"
        >
          <img
            src={photos[0]!.url}
            alt=""
            draggable={false}
            className="h-full w-full object-cover"
          />
        </button>
        {lightbox}
      </>
    );
  }

  return (
    <>
      <div
        className="relative h-48 w-full overflow-hidden rounded-lg touch-pan-y bg-gray-100"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="flex h-full transition-transform duration-300 ease-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {photos.map((photo, index) => (
            <button
              key={photo.id}
              type="button"
              aria-label={`Open photo ${index + 1} of ${photos.length}`}
              onClick={() => openLightbox(index)}
              onPointerDown={(e) => e.stopPropagation()}
              className="block h-full w-full shrink-0 cursor-zoom-in p-0"
            >
              <img
                src={photo.url}
                alt=""
                draggable={false}
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>

        <div className="absolute inset-x-0 bottom-2 flex justify-center gap-1.5">
          {photos.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Show photo ${i + 1}`}
              onClick={() => setCurrentIndex(i)}
              onPointerDown={(e) => e.stopPropagation()}
              className={`h-2 w-2 rounded-full transition-colors ${
                i === currentIndex ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>
      {lightbox}
    </>
  );
}
