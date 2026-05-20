import { useTranslation } from 'react-i18next';

interface RatingDisplayProps {
  rating: number | null;
  ratingCount: number;
}

export function RatingDisplay({ rating, ratingCount }: RatingDisplayProps) {
  const { t } = useTranslation();

  if (ratingCount < 3 || rating === null) {
    return (
      <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium">
        {t('rating.new')}
      </span>
    );
  }

  return (
    <div className="flex items-center gap-1">
      <span className="text-amber-500">★</span>
      <span className="text-sm font-medium">{rating.toFixed(1)}</span>
      <span className="text-xs text-gray-400">({ratingCount})</span>
    </div>
  );
}
