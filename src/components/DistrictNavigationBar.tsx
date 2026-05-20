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
    <div className="flex gap-2 px-4 py-2 overflow-x-auto bg-white/90 backdrop-blur-sm scrollbar-hide">
      {DISTRICTS.map((district) => {
        const isActive = activeDistrict === district.id;
        const count = districtCounts[district.id] ?? 0;

        return (
          <motion.button
            key={district.id}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleSelect(district.id)}
            className={`flex flex-col items-center px-4 py-2 rounded-full text-sm whitespace-nowrap min-h-[44px] transition-colors ${
              isActive
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <span className="font-medium">
              {t(district.translations, 'name', language)}
            </span>
            {isActive && (
              <span className="text-xs opacity-80">
                {count} {count === 1 ? 'restaurant' : 'restaurants'}
              </span>
            )}
          </motion.button>
        );
      })}
    </div>
  );
}
