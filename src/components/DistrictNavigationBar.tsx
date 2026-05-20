import { DISTRICTS } from '@/constants/districts';
import { useAppStore } from '@/store/app-store';
import { t } from '@/lib/translate';
import { motion } from 'motion/react';

export function DistrictNavigationBar() {
  const { language, activeDistrict, setActiveDistrict, districtCounts } =
    useAppStore();

  const handleSelect = (districtId: string) => {
    if (activeDistrict === districtId) {
      setActiveDistrict(null);
    } else {
      setActiveDistrict(districtId);
    }
  };

  return (
    <div className="flex gap-2 px-4 py-2 overflow-x-auto scrollbar-hide">
      {DISTRICTS.map((district) => {
        const isActive = activeDistrict === district.id;
        const count = districtCounts[district.id] ?? 0;

        return (
          <motion.button
            key={district.id}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleSelect(district.id)}
            className={`flex items-center justify-center px-4 rounded-full whitespace-nowrap min-h-[44px] transition-colors shadow-sm ${
              isActive
                ? 'bg-blue-600 text-white gap-1.5 py-1.5'
                : 'bg-white/95 backdrop-blur text-gray-700 hover:bg-white py-2'
            }`}
          >
            <span className={isActive ? 'text-xs font-semibold' : 'text-sm font-medium'}>
              {t(district.translations, 'name', language)}
            </span>
            {isActive && (
              <span className="text-[10px] leading-tight opacity-80">
                📍{count}
              </span>
            )}
          </motion.button>
        );
      })}
    </div>
  );
}
