import { motion, AnimatePresence } from 'motion/react';
import { useAppStore } from '@/store/app-store';
import { useTranslation } from 'react-i18next';
import { t as translate } from '@/lib/translate';

export function SearchBottomSheet() {
  const {
    isSearchBottomSheetOpen,
    setSearchBottomSheetOpen,
    searchResults,
    setSelectedRestaurant,
    language,
  } = useAppStore();
  const { t } = useTranslation();

  const handleResultClick = (restaurantId: string) => {
    const restaurant = searchResults.find((r) => r.id === restaurantId);
    if (restaurant) {
      setSearchBottomSheetOpen(false);
      setSelectedRestaurant(restaurant);
    }
  };

  return (
    <AnimatePresence>
      {isSearchBottomSheetOpen && (
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          drag="y"
          dragConstraints={{ top: 0 }}
          onDragEnd={(_, info) => {
            if (info.offset.y > 100) setSearchBottomSheetOpen(false);
          }}
          className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-2xl max-h-[60vh] overflow-y-auto z-50"
        >
          <div className="flex justify-center pt-3 pb-2">
            <div className="w-10 h-1 bg-gray-300 rounded-full" />
          </div>

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
                        {translate(restaurant.translations, 'name', language)}
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
        </motion.div>
      )}
    </AnimatePresence>
  );
}
