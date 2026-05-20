import { useAppStore } from '@/store/app-store';
import { useTranslation } from 'react-i18next';
import type { SupportedLanguage } from '@/types';

const LANGUAGES: SupportedLanguage[] = ['en', 'ja', 'zh'];

export function LanguageSwitcher() {
  const { language, setLanguage } = useAppStore();
  const { i18n } = useTranslation();

  const handleSwitch = () => {
    const currentIndex = LANGUAGES.indexOf(language);
    const nextLang = LANGUAGES[(currentIndex + 1) % LANGUAGES.length]!;
    setLanguage(nextLang);
    i18n.changeLanguage(nextLang);
    localStorage.setItem('lang', nextLang);
  };

  return (
    <button
      onClick={handleSwitch}
      className="px-3 py-1.5 rounded-full border border-gray-300 text-sm font-medium bg-white hover:bg-gray-50 active:scale-95 transition-transform min-w-[44px] min-h-[44px] flex items-center justify-center"
      aria-label="Switch language"
    >
      {language.toUpperCase()}
    </button>
  );
}
