import { useEffect, useState } from 'react';
import { fetchMenuItems } from '@/services/data.service';
import { useAppStore } from '@/store/app-store';
import { t } from '@/lib/translate';
import { useTranslation } from 'react-i18next';
import type { MenuItem } from '@/types';

export function MenuList({ restaurantId }: { restaurantId: string }) {
  const [items, setItems] = useState<MenuItem[]>([]);
  const { language } = useAppStore();
  const { t: i18nT } = useTranslation();

  useEffect(() => {
    fetchMenuItems(restaurantId).then(setItems).catch(() => {});
  }, [restaurantId]);

  if (items.length === 0) return null;

  return (
    <div>
      <h3 className="text-sm font-semibold text-gray-700 mb-2">
        {i18nT('detail.menu')}
      </h3>
      <div className="space-y-2">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center py-1.5 border-b border-gray-100 last:border-0"
          >
            <span className="text-sm text-gray-800">
              {t(item.translations, 'name', language)}
            </span>
            <span className="text-sm font-medium text-gray-600">
              ₩{item.price.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
