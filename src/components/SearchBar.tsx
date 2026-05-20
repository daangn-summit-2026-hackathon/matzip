import { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAppStore } from '@/store/app-store';
import { useTranslation } from 'react-i18next';
import { searchRestaurants, getAutocompleteSuggestions } from '@/services/search.service';

export function SearchBar() {
  const {
    searchQuery,
    setSearchQuery,
    setSearchResults,
    setSearchBottomSheetOpen,
    restaurants,
    language,
    setSelectedRestaurant,
  } = useAppStore();
  const { t } = useTranslation();
  const [suggestions, setSuggestions] = useState<
    { type: string; id: string; label: string }[]
  >([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(null);

  const handleChange = useCallback(
    (value: string) => {
      setSearchQuery(value);

      if (debounceRef.current) clearTimeout(debounceRef.current);

      if (!value.trim()) {
        setSuggestions([]);
        setShowSuggestions(false);
        return;
      }

      debounceRef.current = setTimeout(() => {
        const results = getAutocompleteSuggestions(value, language, restaurants);
        setSuggestions(results);
        setShowSuggestions(results.length > 0);
      }, 300);
    },
    [language, restaurants, setSearchQuery],
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuggestions(false);
    if (!searchQuery.trim()) return;

    try {
      const results = await searchRestaurants(searchQuery, language);
      setSearchResults(results);
      setSearchBottomSheetOpen(true);
    } catch {
      setSearchResults([]);
      setSearchBottomSheetOpen(true);
    }
  };

  const handleSuggestionClick = (suggestion: { type: string; id: string }) => {
    setShowSuggestions(false);
    if (suggestion.type === 'restaurant') {
      const restaurant = restaurants.find((r) => r.id === suggestion.id);
      if (restaurant) setSelectedRestaurant(restaurant);
    } else if (suggestion.type === 'tag') {
      useAppStore.getState().toggleTag(suggestion.id);
    }
  };

  // Close suggestions on outside click
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={containerRef} className="relative flex-1">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => handleChange(e.target.value)}
          onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
          placeholder={t('search.placeholder')}
          className="w-full px-4 py-2.5 bg-gray-100 rounded-full text-sm outline-none focus:ring-2 focus:ring-blue-300"
        />
      </form>

      <AnimatePresence>
        {showSuggestions && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="absolute top-full mt-1 left-0 right-0 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-30"
          >
            {suggestions.map((s) => (
              <button
                key={`${s.type}-${s.id}`}
                onClick={() => handleSuggestionClick(s)}
                className="w-full px-4 py-3 text-left text-sm hover:bg-gray-50 border-b border-gray-50 last:border-0"
              >
                {s.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
