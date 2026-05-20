import { motion, AnimatePresence } from 'motion/react';
import { useAppStore } from '@/store/app-store';
import { t } from '@/lib/translate';
import { useTranslation } from 'react-i18next';
import { TagBadges } from './TagBadges';
import { RatingDisplay } from './RatingDisplay';
import { PhotoCarousel } from './PhotoCarousel';
import { MenuList } from './MenuList';

export function DetailPanel() {
  const { selectedRestaurant, isDetailPanelOpen, setDetailPanelOpen, language } =
    useAppStore();
  const { t: i18nT } = useTranslation();

  const handleClose = () => {
    setDetailPanelOpen(false);
    setTimeout(() => useAppStore.getState().setSelectedRestaurant(null), 300);
  };

  return (
    <AnimatePresence>
      {isDetailPanelOpen && selectedRestaurant && (
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          drag="y"
          dragConstraints={{ top: 0 }}
          onDragEnd={(_, info) => {
            if (info.offset.y > 100) handleClose();
          }}
          className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-2xl max-h-[70vh] overflow-y-auto z-50"
        >
          {/* Drag Handle */}
          <div className="flex justify-center pt-3 pb-2">
            <div className="w-10 h-1 bg-gray-300 rounded-full" />
          </div>

          <div className="px-4 pb-6 space-y-4">
            {/* Photos */}
            <PhotoCarousel restaurantId={selectedRestaurant.id} />

            {/* Name & Rating */}
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">
                {t(selectedRestaurant.translations, 'name', language)}
              </h2>
              <RatingDisplay
                rating={selectedRestaurant.rating}
                ratingCount={selectedRestaurant.rating_count}
              />
            </div>

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
                {t(selectedRestaurant.translations, 'operating_hours', language) ||
                  i18nT('detail.hoursUnavailable')}
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
        </motion.div>
      )}
    </AnimatePresence>
  );
}
