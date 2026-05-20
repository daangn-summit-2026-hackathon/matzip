import { TAGS } from '@/constants/tags';
import { useAppStore } from '@/store/app-store';

export function TagBadges({ tagIds }: { tagIds: string[] }) {
  const { language } = useAppStore();

  return (
    <div className="flex flex-wrap gap-2">
      {tagIds.map((tagId) => {
        const tag = TAGS.find((t) => t.id === tagId);
        if (!tag) return null;
        return (
          <span
            key={tagId}
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${tag.color}`}
          >
            {tag.icon} {tag.label[language]}
          </span>
        );
      })}
    </div>
  );
}
