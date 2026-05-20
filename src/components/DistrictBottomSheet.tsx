import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { DISTRICTS } from '@/constants/districts';
import { t as translate } from '@/lib/translate';
import { filterByTags } from '@/services/search.service';
import { useAppStore } from '@/store/app-store';
import { RestaurantList } from '@/components/RestaurantList';
import type { Restaurant } from '@/types';

type SheetMode = 'half' | 'full' | 'closed';

function getSnapY(mode: SheetMode) {
  const vh = window.innerHeight;
  if (mode === 'full') return vh * 0.08;
  if (mode === 'half') return vh * 0.42;
  return vh;
}

export function DistrictBottomSheet() {
  const {
    activeDistrict,
    isDistrictBottomSheetOpen,
    isLoading,
    language,
    restaurants,
    selectedTags,
    setDistrictBottomSheetOpen,
    setSelectedRestaurant,
  } = useAppStore();
  const { t } = useTranslation();
  const [mode, setMode] = useState<SheetMode>('closed');
  const [translateY, setTranslateY] = useState(window.innerHeight);
  const [isAnimating, setIsAnimating] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const dragStartY = useRef(0);
  const dragCurrentY = useRef(0);
  const isDragging = useRef(false);

  const district = DISTRICTS.find((item) => item.id === activeDistrict);
  const visibleRestaurants = useMemo(
    () => filterByTags(restaurants, selectedTags),
    [restaurants, selectedTags],
  );

  useEffect(() => {
    if (isDistrictBottomSheetOpen && activeDistrict) {
      setTranslateY(window.innerHeight);
      requestAnimationFrame(() => {
        setIsAnimating(true);
        setMode('half');
        setTranslateY(getSnapY('half'));
      });
    } else {
      setIsAnimating(true);
      setMode('closed');
      setTranslateY(window.innerHeight);
    }
  }, [activeDistrict, isDistrictBottomSheetOpen]);

  const handleClose = useCallback(() => {
    setIsAnimating(true);
    setMode('closed');
    setTranslateY(window.innerHeight);
    setTimeout(() => {
      setDistrictBottomSheetOpen(false);
    }, 300);
  }, [setDistrictBottomSheetOpen]);

  const snapTo = useCallback((targetMode: SheetMode) => {
    setIsAnimating(true);
    setMode(targetMode);
    setTranslateY(getSnapY(targetMode));
  }, []);

  const handleResultClick = (restaurant: Restaurant) => {
    setSelectedRestaurant(restaurant);
  };

  const handlePointerDown = useCallback(
    (event: React.PointerEvent) => {
      setIsAnimating(false);
      isDragging.current = true;
      dragStartY.current = event.clientY;
      dragCurrentY.current = translateY;
      (event.target as HTMLElement).setPointerCapture(event.pointerId);
    },
    [translateY],
  );

  const handlePointerMove = useCallback((event: React.PointerEvent) => {
    if (!isDragging.current) return;
    const delta = event.clientY - dragStartY.current;
    const newY = Math.max(0, dragCurrentY.current + delta);
    setTranslateY(newY);
  }, []);

  const handlePointerUp = useCallback(
    (event: React.PointerEvent) => {
      if (!isDragging.current) return;
      isDragging.current = false;
      (event.target as HTMLElement).releasePointerCapture(event.pointerId);

      const currentY = translateY;
      const halfY = getSnapY('half');
      const fullY = getSnapY('full');

      if (mode === 'half') {
        if (currentY < halfY - 80) {
          snapTo('full');
        } else if (currentY > halfY + 100) {
          handleClose();
        } else {
          snapTo('half');
        }
      } else if (mode === 'full') {
        if (currentY > fullY + 100) {
          snapTo('half');
        } else {
          snapTo('full');
        }
      }
    },
    [handleClose, mode, snapTo, translateY],
  );

  if (!isDistrictBottomSheetOpen || !activeDistrict) return null;

  const districtName = district
    ? translate(district.translations, 'name', language)
    : '';

  return (
    <div
      className="fixed inset-x-0 top-0 z-50 mx-auto flex w-full max-w-[480px] flex-col rounded-t-2xl bg-white shadow-2xl"
      style={{
        transform: `translateY(${translateY}px)`,
        height: `calc(100dvh - ${translateY}px)`,
        transition: isAnimating
          ? 'transform 0.35s cubic-bezier(0.32, 0.72, 0, 1), height 0.35s cubic-bezier(0.32, 0.72, 0, 1)'
          : 'none',
        willChange: 'transform, height',
      }}
      onTransitionEnd={() => setIsAnimating(false)}
    >
      <div
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className="shrink-0 cursor-grab touch-none select-none px-4 pb-4 pt-4 active:cursor-grabbing"
      >
        <div className="mb-4 flex justify-center">
          <div className="h-1.5 w-10 rounded-full bg-gray-300" />
        </div>
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h2 className="truncate text-xl font-bold text-gray-950">
              {districtName}
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              {visibleRestaurants.length} {t('district.restaurants')}
            </p>
          </div>
          <button
            type="button"
            onClick={handleClose}
            onPointerDown={(event) => event.stopPropagation()}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors hover:bg-gray-200 active:bg-gray-300"
            aria-label="Close district restaurants"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto overscroll-contain px-4"
        style={{
          WebkitOverflowScrolling: 'touch',
          overscrollBehaviorY: 'contain',
        }}
      >
        {isLoading ? (
          <div className="flex min-h-40 items-center justify-center text-sm font-medium text-gray-500">
            {t('loading.data')}
          </div>
        ) : visibleRestaurants.length === 0 ? (
          <div className="flex min-h-40 items-center justify-center text-center text-sm text-gray-500">
            {t('district.emptyState')}
          </div>
        ) : (
          <RestaurantList
            restaurants={visibleRestaurants}
            language={language}
            onRestaurantClick={handleResultClick}
          />
        )}

        <div className="h-20 bg-white" />
      </div>
    </div>
  );
}
