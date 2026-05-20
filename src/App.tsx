import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppStore } from '@/store/app-store';
import { fetchRestaurantsByDistrict, fetchRestaurantCountsByDistrict } from '@/services/data.service';
import { DISTRICTS } from '@/constants/districts';
import { t } from '@/lib/translate';
import { motion, AnimatePresence } from 'motion/react';

import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { DistrictNavigationBar } from '@/components/DistrictNavigationBar';
import { MapContainer } from '@/components/MapContainer';
import { DetailPanel } from '@/components/DetailPanel';
import { TagFilterPanel } from '@/components/TagFilterPanel';
import { SearchBar } from '@/components/SearchBar';
import { SearchBottomSheet } from '@/components/SearchBottomSheet';

import type { SupportedLanguage } from '@/types';

export default function App() {
  const {
    activeDistrict,
    setRestaurants,
    setDistrictCounts,
    setLoading,
    setTagFilterOpen,
    language,
    setLanguage,
  } = useAppStore();
  const { i18n, t: i18nT } = useTranslation();

  // Initialize language from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('lang') as SupportedLanguage | null;
    if (saved && ['en', 'ja', 'zh'].includes(saved)) {
      setLanguage(saved);
      i18n.changeLanguage(saved);
    } else {
      const detected = i18n.language?.slice(0, 2) as SupportedLanguage;
      if (['ja', 'zh'].includes(detected)) {
        setLanguage(detected);
      } else {
        setLanguage('en');
      }
    }
  }, [i18n, setLanguage]);

  // Load district counts on mount
  useEffect(() => {
    fetchRestaurantCountsByDistrict()
      .then(setDistrictCounts)
      .catch(() => {});
  }, [setDistrictCounts]);

  // Load restaurants when district changes
  useEffect(() => {
    if (!activeDistrict) {
      setRestaurants([]);
      return;
    }

    setLoading(true);
    fetchRestaurantsByDistrict(activeDistrict)
      .then(setRestaurants)
      .catch(() => setRestaurants([]))
      .finally(() => setLoading(false));
  }, [activeDistrict, setRestaurants, setLoading]);

  const district = DISTRICTS.find((d) => d.id === activeDistrict);

  return (
    <div className="h-full relative">
      {/* Full-screen Map */}
      <div className="absolute inset-0">
        <MapContainer />
      </div>

      {/* Floating Header */}
      <div className="absolute top-0 left-0 right-0 z-20 pointer-events-none p-4 pt-[env(safe-area-inset-top,16px)]">
        <header className="flex items-center gap-3 pointer-events-auto">
          <SearchBar />
          <LanguageSwitcher />
        </header>

        <nav className="mt-2 pointer-events-auto">
          <DistrictNavigationBar />
        </nav>
      </div>

      {/* District Description Banner */}
      <AnimatePresence>
        {district && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-32 left-4 right-4 bg-white rounded-xl p-3 shadow-lg border border-gray-200 z-10"
          >
            <p className="text-sm text-gray-700">
              {t(district.translations, 'description', language)}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Select District Prompt */}
      {!activeDistrict && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="bg-white/90 backdrop-blur rounded-xl px-6 py-4 shadow-lg">
            <p className="text-gray-600 text-sm font-medium">
              {i18nT('district.selectPrompt')}
            </p>
          </div>
        </div>
      )}

      {/* Tag Filter FAB */}
      {activeDistrict && (
        <button
          onClick={() => setTagFilterOpen(true)}
          className="absolute bottom-6 right-4 w-12 h-12 rounded-full bg-white shadow-lg border border-gray-200 flex items-center justify-center z-10 active:scale-95 transition-transform"
          aria-label="Filter by tags"
        >
          <span className="text-xl">🏷️</span>
        </button>
      )}

      {/* Overlays */}
      <DetailPanel />
      <TagFilterPanel />
      <SearchBottomSheet />
    </div>
  );
}
