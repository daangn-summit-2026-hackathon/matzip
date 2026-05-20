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
    <div className="flex gap-2 px-4 py-1 overflow-x-auto scrollbar-hide">
      {DISTRICTS.map((district) => {
        const isActive = activeDistrict === district.id;
        const count = districtCounts[district.id] ?? 0;

        return (
          <motion.button
            key={district.id}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleSelect(district.id)}
            className={`flex flex-col items-center justify-center px-4 rounded-full whitespace-nowrap min-h-[44px] transition-colors border shadow-md ${
              isActive
                ? 'bg-blue-600 text-white py-1.5 border-blue-700'
                : 'bg-white text-gray-700 hover:bg-gray-50 py-2 border-gray-200'
            }`}
          >
            {isActive ? (
              <>
                <span className="text-[11px] font-medium leading-none">
                  {t(district.translations, 'name', language)}
                </span>
                <span className="text-xs font-semibold leading-none opacity-80">📍{count}</span>
              </>
            ) : (
              <span className="text-sm font-medium">
                {t(district.translations, 'name', language)}
              </span>
            )}
          </motion.button>
        );
      })}
    </div>
  );
}
