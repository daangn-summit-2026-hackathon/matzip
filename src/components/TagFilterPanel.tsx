import { motion, AnimatePresence } from 'motion/react';
import { useAppStore } from '@/store/app-store';
import { TAGS } from '@/constants/tags';
import { filterByTags } from '@/services/search.service';
import { useTranslation } from 'react-i18next';

export function TagFilterPanel() {
  const {
    isTagFilterOpen,
    setTagFilterOpen,
    selectedTags,
    toggleTag,
    clearTags,
    restaurants,
    language,
  } = useAppStore();
  const { t } = useTranslation();

  const matchingCount = filterByTags(restaurants, selectedTags).length;

  const handleApply = () => {
    setTagFilterOpen(false);
  };

  return (
    <AnimatePresence>
      {isTagFilterOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setTagFilterOpen(false)}
            className="fixed inset-0 bg-black/40 z-40"
          />

          {/* Panel */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-x-0 bottom-0 z-50 mx-auto w-full max-w-[480px] bg-white rounded-t-2xl p-6"
          >
            <h3 className="text-lg font-bold mb-4">{t('filter.title')}</h3>

            <div className="flex flex-wrap gap-3 mb-6">
              {TAGS.map((tag) => {
                const isSelected = selectedTags.includes(tag.id);
                return (
                  <motion.button
                    key={tag.id}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => toggleTag(tag.id)}
                    className={`px-4 py-2.5 rounded-full text-sm font-medium transition-colors min-h-[44px] ${
                      isSelected
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {tag.icon} {tag.label[language]}
                  </motion.button>
                );
              })}
            </div>

            <div className="flex gap-3">
              <button
                onClick={clearTags}
                className="flex-1 py-3 rounded-xl border border-gray-300 text-sm font-medium text-gray-700 min-h-[44px]"
              >
                {t('filter.clear')}
              </button>
              <button
                onClick={handleApply}
                disabled={matchingCount === 0}
                className="flex-1 py-3 rounded-xl bg-blue-600 text-white text-sm font-medium min-h-[44px] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {t('filter.showResults')} ({matchingCount})
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
