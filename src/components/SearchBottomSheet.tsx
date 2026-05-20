import { useState, useRef, useCallback, useEffect } from 'react';
import { useAppStore } from '@/store/app-store';
import { useTranslation } from 'react-i18next';
import { t as translate } from '@/lib/translate';

type SheetMode = 'half' | 'full' | 'closed';

function getSnapY(mode: SheetMode) {
  const vh = window.innerHeight;
  if (mode === 'full') return vh * 0.05;
  if (mode === 'half') return vh * 0.4;
  return vh; // closed
}

export function SearchBottomSheet() {
  const {
    isSearchBottomSheetOpen,
    setSearchBottomSheetOpen,
    searchResults,
    setSelectedRestaurant,
    language,
  } = useAppStore();
  const { t } = useTranslation();
  const [mode, setMode] = useState<SheetMode>('closed');
  const [translateY, setTranslateY] = useState(window.innerHeight);
  const [isAnimating, setIsAnimating] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const dragStartY = useRef(0);
  const dragCurrentY = useRef(0);
  const isDragging = useRef(false);

  useEffect(() => {
    if (isSearchBottomSheetOpen) {
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
  }, [isSearchBottomSheetOpen]);

  const handleClose = useCallback(() => {
    setIsAnimating(true);
    setMode('closed');
    setTranslateY(window.innerHeight);
    setTimeout(() => {
      setSearchBottomSheetOpen(false);
    }, 300);
  }, [setSearchBottomSheetOpen]);

  const snapTo = useCallback((targetMode: SheetMode) => {
    setIsAnimating(true);
    setMode(targetMode);
    setTranslateY(getSnapY(targetMode));
  }, []);

  const handleResultClick = (restaurantId: string) => {
    const restaurant = searchResults.find((r) => r.id === restaurantId);
    if (restaurant) {
      setSearchBottomSheetOpen(false);
      setSelectedRestaurant(restaurant);
    }
  };

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      setIsAnimating(false);
      isDragging.current = true;
      dragStartY.current = e.clientY;
      dragCurrentY.current = translateY;
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    },
    [translateY],
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging.current) return;
      const delta = e.clientY - dragStartY.current;
      const newY = Math.max(0, dragCurrentY.current + delta);
      setTranslateY(newY);
    },
    [],
  );

  const handlePointerUp = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging.current) return;
      isDragging.current = false;
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);

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
    [translateY, mode, snapTo, handleClose],
  );

  if (!isSearchBottomSheetOpen) return null;

  return (
    <div
      className="fixed inset-x-0 top-0 z-50 flex flex-col bg-white rounded-t-2xl shadow-2xl sm:max-w-md sm:right-4 sm:left-auto sm:rounded-2xl"
      style={{
        transform: `translateY(${translateY}px)`,
        height: `calc(100dvh - ${translateY}px)`,
        transition: isAnimating ? 'transform 0.35s cubic-bezier(0.32, 0.72, 0, 1), height 0.35s cubic-bezier(0.32, 0.72, 0, 1)' : 'none',
        willChange: 'transform, height',
      }}
      onTransitionEnd={() => setIsAnimating(false)}
    >
      {/* 드래그 핸들 영역 (넓은 터치 영역) */}
      <div
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className="cursor-grab active:cursor-grabbing shrink-0 touch-none select-none pt-4 pb-6"
      >
        <div className="flex justify-center">
          <div className="w-10 h-1.5 bg-gray-300 rounded-full" />
        </div>
      </div>

      {/* 스크롤 콘텐츠 영역 */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto overscroll-contain"
        style={{
          WebkitOverflowScrolling: 'touch',
          overscrollBehaviorY: 'contain',
        }}
      >
        <div className="px-4 pb-6">
          {searchResults.length === 0 ? (
            <p className="text-center text-gray-500 py-8">
              {t('search.noResults')}
            </p>
          ) : (
            <div className="space-y-1">
              {searchResults.map((restaurant) => (
                <button
                  key={restaurant.id}
                  onClick={() => handleResultClick(restaurant.id)}
                  className="w-full flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-gray-50 text-left"
                >
                  <span className="text-2xl">🍽️</span>
                  <div>
                    <p className="text-sm font-medium">
                      {translate(
                        restaurant.translations,
                        'name',
                        language,
                      )}
                    </p>
                    <p className="text-xs text-gray-500">
                      {translate(
                        restaurant.translations,
                        'cuisine_type',
                        language,
                      )}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 하단 여백 - 바운스 시 흰색 배경 유지 */}
        <div className="h-20 bg-white" />
      </div>
    </div>
  );
}
