import { useEffect, useRef, useState } from 'react';
import { DISTRICTS } from '@/constants/districts';
import { useAppStore } from '@/store/app-store';
import { t } from '@/lib/translate';
import { AnimatePresence, LayoutGroup, motion } from 'motion/react';

const heroTransition = {
  type: 'spring',
  stiffness: 360,
  damping: 34,
  mass: 0.9,
} as const;
const transitionLockMs = 520;

export function DistrictNavigationBar() {
  const {
    language,
    activeDistrict,
    isDetailPanelOpen,
    setActiveDistrict,
    setDetailPanelOpen,
  } = useAppStore();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const transitionTimerRef = useRef<number | null>(null);
  const selectedDistrict = DISTRICTS.find(
    (district) => district.id === activeDistrict,
  );

  useEffect(() => {
    return () => {
      if (transitionTimerRef.current !== null) {
        window.clearTimeout(transitionTimerRef.current);
      }
    };
  }, []);

  const updateDistrict = (districtId: string | null) => {
    if (isTransitioning || activeDistrict === districtId) return;

    setIsTransitioning(true);
    if (transitionTimerRef.current !== null) {
      window.clearTimeout(transitionTimerRef.current);
    }
    transitionTimerRef.current = window.setTimeout(() => {
      setIsTransitioning(false);
      transitionTimerRef.current = null;
    }, transitionLockMs);
    if (districtId === null && isDetailPanelOpen) {
      setDetailPanelOpen(false);
    }
    setActiveDistrict(districtId);
  };

  return (
    <LayoutGroup id="district-navigation">
      <div className="relative overflow-visible py-1">
        <AnimatePresence initial={false} mode="popLayout">
          {selectedDistrict ? (
            <motion.div
              key={`district-hero-wrap-${selectedDistrict.id}`}
              className="px-4"
              initial={false}
              animate={{ opacity: 1 }}
              exit={{ opacity: 1 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
            >
              <motion.section
                layoutId={`district-surface-${selectedDistrict.id}`}
                transition={heroTransition}
                className="relative h-[124px] w-full overflow-hidden rounded-[28px] shadow-lg shadow-gray-900/12"
                aria-label={t(selectedDistrict.translations, 'name', language)}
              >
                <motion.div
                  layoutId={`district-image-${selectedDistrict.id}`}
                  transition={heroTransition}
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${selectedDistrict.image_url})`,
                    backgroundPosition: 'center center',
                    backgroundSize: 'cover',
                  }}
                />
                <motion.div
                  layoutId={`district-scrim-${selectedDistrict.id}`}
                  transition={heroTransition}
                  className="absolute inset-0"
                  style={{ backgroundColor: 'rgba(255, 255, 255, 0.48)' }}
                />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-white/82 via-white/58 to-white/22"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.22, ease: 'easeOut' }}
                />

                <div className="relative z-10 flex h-full items-center gap-3.5 px-4 text-gray-950">
                  <motion.button
                    type="button"
                    onClick={() => updateDistrict(null)}
                    disabled={isTransitioning}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/80 bg-white/78 text-2xl leading-none text-gray-950 shadow-md shadow-gray-900/10 backdrop-blur-md transition-colors hover:bg-white/92 active:bg-white"
                    aria-label="Back to district list"
                    initial={{ opacity: 0, x: -18, scale: 0.72 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -12, scale: 0.82 }}
                    transition={{ delay: 0.08, duration: 0.2, ease: 'easeOut' }}
                    whileTap={{ scale: 0.92 }}
                  >
                    <span aria-hidden="true">‹</span>
                  </motion.button>

                  <div className="min-w-0">
                    <motion.h2
                      layoutId={`district-title-${selectedDistrict.id}`}
                      transition={heroTransition}
                      className="text-xl font-bold leading-tight text-gray-950 drop-shadow-[0_1px_0_rgba(255,255,255,0.7)]"
                    >
                      {t(selectedDistrict.translations, 'name', language)}
                    </motion.h2>
                    <motion.p
                      className="mt-1 max-w-[24rem] text-sm leading-snug text-gray-800 drop-shadow-[0_1px_0_rgba(255,255,255,0.65)]"
                      initial={{ opacity: 0, y: 12, filter: 'blur(4px)' }}
                      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                      exit={{ opacity: 0, y: 8, filter: 'blur(4px)' }}
                      transition={{ delay: 0.12, duration: 0.24, ease: 'easeOut' }}
                    >
                      {t(selectedDistrict.translations, 'description', language)}
                    </motion.p>
                  </div>
                </div>
              </motion.section>
            </motion.div>
          ) : (
            <motion.div
              key="district-chip-strip"
              className="-mb-24 flex gap-2 overflow-x-auto px-4 pb-24 scrollbar-hide"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
            >
              {DISTRICTS.map((district) => (
                <motion.button
                  key={district.id}
                  type="button"
                  layoutId={`district-surface-${district.id}`}
                  transition={heroTransition}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => updateDistrict(district.id)}
                  disabled={isTransitioning}
                  className="relative flex h-[55px] min-w-[112px] items-center justify-center overflow-hidden rounded-full px-5 text-white shadow-md shadow-gray-900/18 transition-[box-shadow,filter] hover:brightness-105 active:brightness-95"
                >
                  <motion.span
                    layoutId={`district-image-${district.id}`}
                    transition={heroTransition}
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                      backgroundImage: `url(${district.image_url})`,
                      backgroundPosition: 'center center',
                      backgroundSize: 'cover',
                    }}
                  />
                  <motion.span
                    layoutId={`district-scrim-${district.id}`}
                    transition={heroTransition}
                    className="absolute inset-0"
                    style={{ backgroundColor: 'rgba(0, 0, 0, 0.28)' }}
                  />
                  <motion.span
                    layoutId={`district-title-${district.id}`}
                    transition={heroTransition}
                    className="relative z-10 text-sm font-semibold leading-none text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.65)]"
                  >
                    {t(district.translations, 'name', language)}
                  </motion.span>
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </LayoutGroup>
  );
}
