import type { Tag } from '@/types';

export const TAGS: Tag[] = [
  {
    id: 'delicious',
    label: { en: 'Delicious', ja: '美味しい', zh: '好吃' },
    color: 'bg-red-100 text-red-700',
    icon: '🔥',
  },
  {
    id: 'great-atmosphere',
    label: { en: 'Great Atmosphere', ja: '雰囲気◎', zh: '氛围好' },
    color: 'bg-purple-100 text-purple-700',
    icon: '✨',
  },
  {
    id: 'good-value',
    label: { en: 'Good Value', ja: 'コスパ◎', zh: '性价比高' },
    color: 'bg-green-100 text-green-700',
    icon: '💰',
  },
  {
    id: 'japanese-menu',
    label: { en: 'Japanese Menu', ja: '日本語メニュー', zh: '日语菜单' },
    color: 'bg-blue-100 text-blue-700',
    icon: '🇯🇵',
  },
  {
    id: 'chinese-menu',
    label: { en: 'Chinese Menu', ja: '中国語メニュー', zh: '中文菜单' },
    color: 'bg-amber-100 text-amber-700',
    icon: '🇨🇳',
  },
];
