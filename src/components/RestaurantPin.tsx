import { useState } from 'react';

interface RestaurantPinProps {
  photoUrl?: string;
}

const FALLBACK_ICON = '/icon.png';

export function RestaurantPin({ photoUrl }: RestaurantPinProps) {
  const [imgError, setImgError] = useState(false);
  const src = !photoUrl || imgError ? FALLBACK_ICON : photoUrl;

  return (
    <div className="flex flex-col items-center">
      <div className="w-10 h-10 rounded-full border-2 border-white shadow-lg overflow-hidden bg-gray-200">
        <img
          src={src}
          alt=""
          className="w-full h-full object-cover"
          onError={() => setImgError(true)}
        />
      </div>
      {/* Pin tail */}
      <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-l-transparent border-r-transparent border-t-white -mt-[1px] drop-shadow-sm" />
    </div>
  );
}
