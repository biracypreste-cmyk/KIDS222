import React, { useRef } from 'react';
import {
  Bookmark,
  Check,
  ChevronLeft,
  ChevronRight,
  Flame,
  Play,
  Sparkles,
  Tv,
} from 'lucide-react';
import { ShowItem } from '../types/kids';
import { ShowCardArtwork } from './artwork/ShowCardArtwork';

interface ShowCarouselProps {
  title: string;
  accentWord?: string;
  iconType: 'flame' | 'tv' | 'sparkles';
  shows: ShowItem[];
  progressMap: Record<string, number>;
  watchlist: string[];
  showProgress?: boolean;
  showRank?: boolean;
  showScrollArrows?: boolean;
  compactCards?: boolean;
  viewAllLabel?: string;
  onViewAll?: () => void;
  onSelectShow: (show: ShowItem, autoPlay?: boolean) => void;
  onToggleWatchlist: (showId: string) => void;
  layout?: 'carousel' | 'grid';
}

const RANK_BADGE_STYLES: Record<number, string> = {
  1: 'from-amber-300 via-yellow-400 to-amber-500 text-amber-950 border-amber-100',
  2: 'from-sky-100 via-sky-300 to-blue-400 text-slate-900 border-white',
  3: 'from-amber-300 via-orange-400 to-amber-600 text-white border-amber-100',
  4: 'from-sky-300 via-blue-500 to-indigo-600 text-white border-sky-100',
  5: 'from-slate-100 via-slate-300 to-slate-400 text-slate-900 border-white',
};

export const ShowCarousel: React.FC<ShowCarouselProps> = ({
  title,
  accentWord,
  iconType,
  shows,
  progressMap,
  watchlist,
  showProgress = false,
  showRank = false,
  showScrollArrows = false,
  compactCards = false,
  viewAllLabel,
  onViewAll,
  onSelectShow,
  onToggleWatchlist,
  layout = 'carousel',
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollByAmount = (direction: 'left' | 'right') => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const distance = Math.max(320, el.clientWidth * 0.72);
    el.scrollBy({
      left: direction === 'left' ? -distance : distance,
      behavior: 'smooth',
    });
  };

  if (shows.length === 0) return null;

  return (
    <section className="space-y-3">
      {/* Section Header matching Screenshot 2 */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-7 h-7 rounded-lg bg-blue-950/50 border border-sky-300/35 flex items-center justify-center shrink-0">
            {iconType === 'flame' && (
              <Flame className="w-4 h-4 text-orange-400 fill-orange-400" />
            )}
            {iconType === 'tv' && <Tv className="w-4 h-4 text-amber-300" />}
            {iconType === 'sparkles' && (
              <Sparkles className="w-4 h-4 text-sky-300" />
            )}
          </div>
          <h2 className="font-display text-lg sm:text-xl font-extrabold text-white tracking-tight truncate drop-shadow-sm">
            {title}{' '}
            {accentWord && (
              <span className="text-amber-300 italic font-extrabold">
                {accentWord}
              </span>
            )}
          </h2>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {viewAllLabel && onViewAll && (
            <button
              type="button"
              onClick={onViewAll}
              className="inline-flex items-center gap-1 text-xs font-bold text-sky-100/90 hover:text-amber-300 transition-colors whitespace-nowrap cursor-pointer"
            >
              <span>{viewAllLabel}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          )}

          {layout === 'carousel' && showScrollArrows && (
            <div className="hidden sm:flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => scrollByAmount('left')}
                aria-label={`Rolar ${title} para a esquerda`}
                className="w-7 h-7 rounded-full bg-blue-950/70 hover:bg-blue-800 border border-sky-300/40 text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => scrollByAmount('right')}
                aria-label={`Rolar ${title} para a direita`}
                className="w-7 h-7 rounded-full bg-blue-950/70 hover:bg-blue-800 border border-sky-300/40 text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Cards Row (5-up on desktop matching reference) */}
      <div
        ref={scrollContainerRef}
        className={
          layout === 'grid'
            ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5'
            : 'grid grid-flow-col auto-cols-[200px] sm:auto-cols-[220px] lg:auto-cols-[calc((100%-3.5rem)/5)] gap-3.5 overflow-x-auto no-scrollbar pb-1 scroll-smooth snap-x snap-mandatory'
        }
      >
        {shows.map((show, idx) => {
          const progress = progressMap[show.id] ?? show.defaultProgress ?? 0;
          const isSaved = watchlist.includes(show.id);
          const rankNumber = show.featuredRank ?? idx + 1;
          const rankStyle =
            RANK_BADGE_STYLES[rankNumber] ?? RANK_BADGE_STYLES[4];

          return (
            <article key={show.id} className="group relative flex flex-col snap-start">
              {/* Artwork Card Container */}
              <div
                onClick={() => onSelectShow(show, false)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelectShow(show, false);
                  }
                }}
                aria-label={`Abrir detalhes de ${show.title}`}
                className="relative aspect-video w-full rounded-[18px] overflow-hidden kids-card-shadow border border-sky-200/40 transition-all duration-200 group-hover:-translate-y-1 cursor-pointer focus-visible:outline-2 focus-visible:outline-amber-300 bg-blue-950"
              >
                <ShowCardArtwork artworkId={show.artworkId} title={show.title} />

                {/* Top Left Rank Ribbon (1-5) */}
                {showRank && (
                  <div
                    className={`absolute top-1.5 left-1.5 w-7 h-8 rounded-b-lg rounded-t-md bg-gradient-to-b ${rankStyle} border shadow-lg flex items-center justify-center font-display font-black text-sm tabular-nums`}
                  >
                    {rankNumber}
                  </div>
                )}

                {/* Hover Action Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#03153d]/90 via-[#03153d]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-150 flex items-end justify-between p-2.5">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectShow(show, true);
                    }}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-orange-500 hover:bg-orange-400 text-white text-[11px] font-extrabold uppercase tracking-wide shadow-md cursor-pointer"
                  >
                    <Play className="w-3 h-3 fill-white" />
                    <span>Assistir</span>
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleWatchlist(show.id);
                    }}
                    aria-label={
                      isSaved
                        ? `Remover ${show.title} da Minha Lista`
                        : `Adicionar ${show.title} à Minha Lista`
                    }
                    className={`w-7 h-7 rounded-full flex items-center justify-center border transition-colors cursor-pointer ${
                      isSaved
                        ? 'bg-emerald-500 border-emerald-200 text-white'
                        : 'bg-blue-950/80 border-sky-300/50 text-white hover:bg-blue-800'
                    }`}
                  >
                    {isSaved ? (
                      <Check className="w-3.5 h-3.5" />
                    ) : (
                      <Bookmark className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>

                {/* Progress Bar tucked at bottom edge matching Screenshot 2 */}
                {showProgress && progress > 0 && (
                  <div
                    className="absolute bottom-2 left-2.5 right-2.5 h-1.5 rounded-full bg-white/40 overflow-hidden shadow-inner"
                    aria-label={`Progresso: ${progress}%`}
                  >
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-red-600 via-red-500 to-orange-400 transition-all duration-300"
                      style={{ width: `${Math.min(100, Math.max(8, progress))}%` }}
                    />
                  </div>
                )}
              </div>

              {/* Optional metadata below card when not in compact shelf mode */}
              {!compactCards && (
                <div className="pt-2 px-0.5 flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <h3 className="font-display text-sm font-bold text-white truncate group-hover:text-amber-300 transition-colors">
                      {show.title}
                    </h3>
                    <p className="text-[11px] font-medium text-sky-200/80 truncate">
                      {show.type} · {show.ageRating}
                    </p>
                  </div>
                </div>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
};
