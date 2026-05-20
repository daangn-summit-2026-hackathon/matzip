import { DISTRICTS } from '@/constants/districts';
import { useAppStore } from '@/store/app-store';
import { t } from '@/lib/translate';
import { motion } from 'motion/react';

export function DistrictNavigationBar() {
  const { language, activeDistrict, setActiveDistrict } = useAppStore();

  const handleSelect = (districtId: string) => {
    if (activeDistrict === districtId) {
      setActiveDistrict(null);
    } else {
      setActiveDistrict(districtId);
    }
  };

  return (
    <div className="flex gap-2 px-4 py-1 overflow-x-auto scrollbar-hide">
      {DISTRICTS.map((district) => {
        const isActive = activeDistrict === district.id;

        return (
          <motion.button
            key={district.id}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleSelect(district.id)}
            aria-pressed={isActive}
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.42), rgba(0, 0, 0, 0.42)), url(${district.image_url})`,
            }}
            className={`flex h-[55px] min-w-[112px] items-center justify-center rounded-full border bg-cover bg-center px-5 text-white shadow-md transition-[border-color,box-shadow,filter] hover:brightness-105 active:brightness-95 ${
              isActive
                ? 'border-white/90 shadow-lg ring-2 ring-blue-500/85 ring-offset-2 ring-offset-white'
                : 'border-white/45 hover:border-white/75'
            }`}
          >
            <span className="text-sm font-semibold leading-none drop-shadow-[0_1px_2px_rgba(0,0,0,0.65)]">
              {t(district.translations, 'name', language)}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}
