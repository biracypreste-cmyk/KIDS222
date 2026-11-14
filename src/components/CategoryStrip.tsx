import React from 'react';
import {
  Baby,
  Clapperboard,
  Gamepad2,
  GraduationCap,
  Music,
  PawPrint,
  RotateCcw,
  Star,
  Tv,
  Users,
} from 'lucide-react';
import { CATEGORY_OPTIONS } from '../data/kidsCatalog';
import { CategoryId, CategoryOption } from '../types/kids';

interface CategoryStripProps {
  selectedCategory: CategoryId;
  onSelectCategory: (category: CategoryId) => void;
  compactRow?: boolean;
}

const CategoryIcon: React.FC<{ name: CategoryOption['iconName'] }> = ({ name }) => {
  const cls = 'w-5 h-5 text-white shrink-0';
  switch (name) {
    case 'film':
      return <Clapperboard className={cls} />;
    case 'tv':
      return <Tv className={cls} />;
    case 'paw':
      return <PawPrint className={cls} />;
    case 'gamepad':
      return <Gamepad2 className={cls} />;
    case 'graduation':
      return <GraduationCap className={cls} />;
    case 'music':
      return <Music className={cls} />;
    case 'baby':
      return <Baby className={cls} />;
    case 'users':
      return <Users className={cls} />;
  }
};

export const CategoryStrip: React.FC<CategoryStripProps> = ({
  selectedCategory,
  onSelectCategory,
  compactRow = false,
}) => {
  const displayedOptions = compactRow
    ? CATEGORY_OPTIONS.slice(0, 6)
    : CATEGORY_OPTIONS;

  return (
    <section aria-labelledby="categorias-heading" className="space-y-3">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-amber-400/20 border border-amber-300/40 flex items-center justify-center">
            <Star className="w-4 h-4 text-amber-300 fill-amber-300" />
          </div>
          <h2
            id="categorias-heading"
            className="font-display text-lg sm:text-xl font-extrabold text-white tracking-tight"
          >
            Explore por Categoria
          </h2>
        </div>

        {selectedCategory !== 'all' && (
          <button
            type="button"
            onClick={() => onSelectCategory('all')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/15 hover:bg-white/25 border border-sky-300/40 text-xs font-bold text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Mostrar tudo</span>
          </button>
        )}
      </div>

      <div
        className={`grid gap-3 ${
          compactRow
            ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-6'
            : 'grid-cols-2 sm:grid-cols-4 lg:grid-cols-8'
        }`}
      >
        {displayedOptions.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => onSelectCategory(isActive ? 'all' : cat.id)}
              aria-pressed={isActive}
              className={`group relative flex items-center justify-center gap-2.5 px-4 py-3 rounded-2xl bg-gradient-to-b ${cat.gradient} border ${
                isActive
                  ? 'border-white ring-2 ring-amber-300 scale-[1.03] shadow-[0_10px_24px_rgba(251,191,36,0.4)]'
                  : 'border-sky-200/45 opacity-95 hover:opacity-100 hover:-translate-y-0.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.3),0_10px_20px_-8px_rgba(2,12,38,0.65)]'
              } transition-all duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-white`}
            >
              <CategoryIcon name={cat.iconName} />
              <span className="font-display text-xs sm:text-sm font-extrabold text-white leading-tight whitespace-nowrap truncate">
                {cat.label}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
};
