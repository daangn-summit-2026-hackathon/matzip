import { useState, useRef, useCallback, useEffect } from 'react';
import { useAppStore } from '@/store/app-store';
import { t } from '@/lib/translate';
import { useTranslation } from 'react-i18next';
import { TagBadges } from './TagBadges';
import { RatingDisplay } from './RatingDisplay';
import { PhotoCarousel } from './PhotoCarousel';
import { MenuList } from './MenuList';

type SheetMode = 'half' | 'full' | 'closed';

function getSnapY(mode: SheetMode) {
  const vh = window.innerHeight;
  if (mode === 'full') return vh * 0.05;
  if (mode === 'half') return vh * 0.3;
  return vh; // closed
}

export function DetailPanel() {
  const { selectedRestaurant, isDetailPanelOpen, setDetailPanelOpen, language } =
    useAppStore();
  const { t: i18nT } = useTranslation();
  const [mode, setMode] = useState<SheetMode>('closed');
  const [translateY, setTranslateY] = useState(window.innerHeight);
  const [isAnimating, setIsAnimating] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const dragStartY = useRef(0);
  const dragCurrentY = useRef(0);
  const isDragging = useRef(false);
  const sheetRef = useRef<HTMLDivElement>(null);

  // 열릴 때
  useEffect(() => {
    if (isDetailPanelOpen && selectedRestaurant) {
      setTranslateY(window.innerHeight);
      requestAnimationFrame(() => {
        setIsAnimating(true);
        setMode('half');
        setTranslateY(getSnapY('half'));
      });
    } else if (!isDetailPanelOpen) {
      setIsAnimating(true);
      setMode('closed');
      setTranslateY(window.innerHeight);
    }
  }, [isDetailPanelOpen, selectedRestaurant]);

  const handleClose = useCallback(() => {
    setIsAnimating(true);
    setMode('closed');
    setTranslateY(window.innerHeight);
    setTimeout(() => {
      setDetailPanelOpen(false);
      useAppStore.getState().setSelectedRestaurant(null);
    }, 300);
  }, [setDetailPanelOpen]);

  const snapTo = useCallback((targetMode: SheetMode) => {
    setIsAnimating(true);
    setMode(targetMode);
    setTranslateY(getSnapY(targetMode));
  }, []);

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

  if (!isDetailPanelOpen && !selectedRestaurant) return null;

  return (
    <div
      ref={sheetRef}
      className="fixed inset-x-0 top-0 bottom-0 z-50 flex flex-col bg-white rounded-t-2xl shadow-2xl"
      style={{
        transform: `translateY(${translateY}px)`,
        transition: isAnimating ? 'transform 0.35s cubic-bezier(0.32, 0.72, 0, 1)' : 'none',
        willChange: 'transform',
      }}
      onTransitionEnd={() => setIsAnimating(false)}
    >
      {/* 드래그 핸들 영역 (핸들 + 제목까지 넓은 터치 영역) */}
      <div
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className="cursor-grab active:cursor-grabbing shrink-0 touch-none select-none pt-4 pb-3"
      >
        <div className="flex justify-center mb-3">
          <div className="w-10 h-1.5 bg-gray-300 rounded-full" />
        </div>
        {selectedRestaurant && (
          <div className="flex items-center justify-between px-4">
            <h2 className="text-xl font-bold">
              {t(selectedRestaurant.translations, 'name', language)}
            </h2>
            <RatingDisplay
              rating={selectedRestaurant.rating}
              ratingCount={selectedRestaurant.rating_count}
            />
          </div>
        )}
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
        {selectedRestaurant && (
          <div className="px-4 pb-6 space-y-4">
            {/* Photos */}
            <PhotoCarousel restaurantId={selectedRestaurant.id} />

            {/* Address */}
            <p className="text-sm text-gray-500">
              {t(selectedRestaurant.translations, 'address', language) ||
                i18nT('detail.addressUnavailable')}
            </p>

            {/* Tags */}
            <TagBadges tagIds={selectedRestaurant.tags} />

            {/* Hours */}
            <div className="text-sm">
              <span className="font-medium text-gray-700">
                {i18nT('detail.hours')}:{' '}
              </span>
              <span className="text-gray-500">
                {t(
                  selectedRestaurant.translations,
                  'operating_hours',
                  language,
                ) || i18nT('detail.hoursUnavailable')}
              </span>
            </div>

            {/* Phone */}
            {selectedRestaurant.phone_number && (
              <div className="text-sm">
                <span className="font-medium text-gray-700">
                  {i18nT('detail.phone')}:{' '}
                </span>
                <a
                  href={`tel:${selectedRestaurant.phone_number}`}
                  className="text-blue-600"
                >
                  {selectedRestaurant.phone_number}
                </a>
              </div>
            )}

            {/* Menu */}
            <MenuList restaurantId={selectedRestaurant.id} />
          </div>
        )}

        {/* 하단 여백 - 바운스 시 흰색 배경 유지 */}
        <div className="h-20 bg-white" />
      </div>
    </div>
  );
}
