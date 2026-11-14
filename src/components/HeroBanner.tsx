import React from 'react';
import { Check, ChevronLeft, ChevronRight, Play, Plus, Star } from 'lucide-react';
import { HeroSlide } from '../types/kids';
import { KidsWordmark } from './artwork/KidsBrandMarks';
import heroWonderlandImg from '../assets/images/hero_kids_wonderland_1794639093900.jpg';

interface HeroBannerProps {
  slides: HeroSlide[];
  currentIndex: number;
  onPrev: () => void;
  onNext: () => void;
  onSelectIndex: (index: number) => void;
  onWatchNow: (showId: string) => void;
  onToggleWatchlist: (showId: string) => void;
  isInWatchlist: (showId: string) => boolean;
}

const SLIDE_OVERLAY_TINT: Record<HeroSlide['themeVariant'], string> = {
  wonderland: 'from-[#041d55]/92 via-[#072b76]/55 to-transparent',
  rescue: 'from-[#03235c]/92 via-[#094191]/60 to-sky-500/10',
  rainbow: 'from-[#1a165e]/90 via-[#3b1c80]/55 to-pink-500/10',
  ocean: 'from-[#03284f]/92 via-[#045b8f]/60 to-cyan-400/10',
  forest: 'from-[#062d47]/92 via-[#0c5652]/55 to-emerald-400/10',
  sitio: 'from-[#1f225c]/92 via-[#154c79]/55 to-amber-400/10',
};

export const HeroBanner: React.FC<HeroBannerProps> = ({
  slides,
  currentIndex,
  onPrev,
  onNext,
  onWatchNow,
  onToggleWatchlist,
  isInWatchlist,
}) => {
  const slide = slides[currentIndex] ?? slides[0];
  const saved = isInWatchlist(slide.showId);
  const tintClass = SLIDE_OVERLAY_TINT[slide.themeVariant];

  return (
    <section
      aria-label="Destaques Kids"
      className="relative w-full overflow-hidden rounded-[26px] border border-sky-300/45 shadow-[0_24px_56px_-12px_rgba(2,12,38,0.85)] min-h-[380px] sm:min-h-[430px] lg:min-h-[470px] flex items-center bg-[#041e55]"
    >
      {/* Full-bleed 3D Pixar-style Magical Wonderland Illustration */}
      <img
        src={heroWonderlandImg}
        alt="Universo mágico M+ Kids com personagens, castelo e arco-íris"
        referrerPolicy="no-referrer"
        className="absolute inset-0 z-0 h-full w-full object-cover object-right select-none transition-transform duration-700"
      />

      {/* Measured Contrast Scrim for Left Typography */}
      <div
        className={`absolute inset-0 z-10 bg-gradient-to-r ${tintClass}`}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 z-10 bg-gradient-to-t from-[#031642]/70 via-transparent to-transparent"
        aria-hidden="true"
      />

      {/* Left Content Stack matching Screenshot 1 */}
      <div className="relative z-20 w-full max-w-[540px] px-6 sm:px-10 lg:px-12 py-8 sm:py-10 flex flex-col items-start gap-3">
        {/* Highlight Kicker Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-950/70 border border-sky-300/45 backdrop-blur-md shadow-sm">
          <Star className="w-3.5 h-3.5 text-amber-300 fill-amber-300 shrink-0" />
          <span className="text-[11px] font-bold uppercase tracking-wider text-sky-50 whitespace-nowrap">
            {slide.badgeText}
          </span>
        </div>

        {/* Giant Colorful 3D Kids Wordmark */}
        <div className="my-0.5">
          <KidsWordmark size="lg" showRays={true} />
        </div>

        {/* Show Title for non-default slides */}
        {currentIndex !== 0 && (
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-white leading-tight drop-shadow">
            {slide.title}
          </h1>
        )}

        {/* Clean Unboxed Metadata */}
        <p className="text-[11px] sm:text-xs font-extrabold uppercase tracking-[0.14em] text-white/95 drop-shadow-sm">
          {slide.subtitle}
        </p>

        {/* Description */}
        <p className="text-sm sm:text-[15px] text-sky-50/90 leading-relaxed max-w-[390px] drop-shadow-sm">
          {slide.description}
        </p>

        {/* CTA Row: Blue-to-Purple ASSISTIR AGORA + Glass + MINHA LISTA */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            type="button"
            onClick={() => onWatchNow(slide.showId)}
            className="inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-display font-extrabold text-xs sm:text-sm uppercase tracking-wider shadow-[0_8px_26px_rgba(99,102,241,0.6)] ring-1 ring-sky-200/60 transition-all duration-150 hover:scale-[1.03] active:scale-[0.98] whitespace-nowrap cursor-pointer focus-visible:outline-2 focus-visible:outline-white"
          >
            <Play className="w-4 h-4 fill-white shrink-0" />
            <span>{slide.primaryCtaLabel}</span>
          </button>

          <button
            type="button"
            onClick={() => onToggleWatchlist(slide.showId)}
            className={`inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full font-display font-bold text-xs sm:text-sm uppercase tracking-wider border backdrop-blur-md transition-all duration-150 whitespace-nowrap cursor-pointer focus-visible:outline-2 focus-visible:outline-sky-200 ${
              saved
                ? 'bg-emerald-500/85 border-emerald-200 text-white shadow-[0_8px_20px_rgba(16,185,129,0.45)]'
                : 'bg-blue-950/60 hover:bg-blue-900/80 border-sky-200/50 text-white'
            }`}
          >
            {saved ? (
              <>
                <Check className="w-4 h-4 shrink-0" />
                <span>Na Minha Lista</span>
              </>
            ) : (
              <>
                <Plus className="w-4 h-4 shrink-0" />
                <span>Minha Lista</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Bottom Right Glass Pill Slide Counter: 01 / 06 < > */}
      <div className="absolute bottom-4 right-5 z-20 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/70 border border-sky-300/40 backdrop-blur-md shadow-lg">
        <span className="text-xs font-bold text-white tabular-nums tracking-wider pr-1">
          {String(currentIndex + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
        </span>

        <button
          type="button"
          onClick={onPrev}
          aria-label="Destaque anterior"
          className="w-7 h-7 rounded-full bg-white/15 hover:bg-white/30 border border-white/25 text-white flex items-center justify-center transition-colors cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={onNext}
          aria-label="Próximo destaque"
          className="w-7 h-7 rounded-full bg-white/15 hover:bg-white/30 border border-white/25 text-white flex items-center justify-center transition-colors cursor-pointer"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
};
