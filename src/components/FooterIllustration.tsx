import React from 'react';
import { KidsWordmark } from './artwork/KidsBrandMarks';

interface FooterIllustrationProps {
  onSelectCategory: () => void;
}

export const FooterIllustration: React.FC<FooterIllustrationProps> = ({
  onSelectCategory,
}) => {
  return (
    <footer className="relative mt-6 overflow-hidden rounded-[28px] border border-sky-300/30 bg-gradient-to-b from-[#083582]/80 to-[#041d52]/95">
      {/* Decorative Rainbow Wave & Friendly Mascot Strip */}
      <div className="relative h-28 sm:h-36 w-full overflow-hidden">
        <svg
          viewBox="0 0 1200 160"
          preserveAspectRatio="xMidYMax slice"
          className="w-full h-full"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="footer-rainbow" x1="0" y1="0" x2="1200" y2="0" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FF5252" />
              <stop offset="20%" stopColor="#FFB300" />
              <stop offset="40%" stopColor="#FFEE58" />
              <stop offset="60%" stopColor="#4CE870" />
              <stop offset="80%" stopColor="#38BDF8" />
              <stop offset="100%" stopColor="#A855F7" />
            </linearGradient>
          </defs>

          {/* Glowing Rainbow Stream */}
          <path
            d="M 0 128 Q 300 72 600 122 T 1200 105"
            fill="none"
            stroke="url(#footer-rainbow)"
            strokeWidth="22"
            strokeLinecap="round"
            opacity="0.88"
          />

          {/* Cute Panda waving */}
          <g transform="translate(210, 46)">
            <circle cx="38" cy="36" r="28" fill="#FFF" />
            <circle cx="16" cy="18" r="10" fill="#1E293B" />
            <circle cx="60" cy="18" r="10" fill="#1E293B" />
            <path d="M12 34 A26 26 0 0 1 64 34" fill="none" stroke="#22C55E" strokeWidth="6" />
            <circle cx="28" cy="34" r="6" fill="#1E293B" />
            <circle cx="48" cy="34" r="6" fill="#1E293B" />
            <circle cx="29" cy="33" r="2.2" fill="#FFF" />
            <circle cx="49" cy="33" r="2.2" fill="#FFF" />
            <path d="M30 48 Q38 56 46 48 Z" fill="#F43F5E" />
          </g>

          {/* Happy Lion Cub */}
          <g transform="translate(380, 42)">
            <circle cx="40" cy="40" r="34" fill="#D97706" />
            <circle cx="40" cy="42" r="25" fill="#FBBF24" />
            <circle cx="31" cy="38" r="4" fill="#1E293B" />
            <circle cx="49" cy="38" r="4" fill="#1E293B" />
            <polygon points="36,46 44,46 40,51" fill="#92400E" />
            <path d="M32 54 Q40 62 48 54" stroke="#92400E" strokeWidth="3" fill="none" strokeLinecap="round" />
          </g>

          {/* Bunny with Pink Backpack */}
          <g transform="translate(560, 28)">
            <ellipse cx="28" cy="24" rx="8" ry="20" fill="#FFF" />
            <ellipse cx="48" cy="24" rx="8" ry="20" fill="#FFF" />
            <ellipse cx="28" cy="25" rx="4" ry="12" fill="#FBCFE8" />
            <ellipse cx="48" cy="25" rx="4" ry="12" fill="#FBCFE8" />
            <circle cx="38" cy="54" r="24" fill="#FFF" />
            <rect x="20" y="34" width="36" height="8" rx="4" fill="#F97316" />
            <circle cx="30" cy="54" r="4" fill="#1E293B" />
            <circle cx="46" cy="54" r="4" fill="#1E293B" />
            <path d="M32 64 Q38 70 44 64" stroke="#F43F5E" strokeWidth="2.5" fill="none" />
          </g>

          {/* Smiling Robot */}
          <g transform="translate(740, 44)">
            <rect x="14" y="16" width="52" height="40" rx="16" fill="#F8FAFC" />
            <rect x="20" y="22" width="40" height="28" rx="10" fill="#0F172A" />
            <path d="M27 36 Q32 30 37 36" stroke="#38BDF8" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M43 36 Q48 30 53 36" stroke="#38BDF8" strokeWidth="3" fill="none" strokeLinecap="round" />
            <rect x="24" y="58" width="32" height="32" rx="10" fill="#E2E8F0" />
          </g>

          {/* Smiling Fox with Goggles */}
          <g transform="translate(910, 40)">
            <polygon points="16,32 24,8 36,24" fill="#F97316" />
            <polygon points="64,32 56,8 44,24" fill="#F97316" />
            <ellipse cx="40" cy="48" rx="28" ry="24" fill="#F97316" />
            <ellipse cx="40" cy="56" rx="22" ry="14" fill="#FFF7ED" />
            <rect x="18" y="24" width="18" height="11" rx="5" fill="#0EA5E9" stroke="#FFF" strokeWidth="2" />
            <rect x="44" y="24" width="18" height="11" rx="5" fill="#0EA5E9" stroke="#FFF" strokeWidth="2" />
            <circle cx="30" cy="46" r="4" fill="#1E293B" />
            <circle cx="50" cy="46" r="4" fill="#1E293B" />
            <circle cx="40" cy="54" r="4" fill="#1E293B" />
          </g>
        </svg>
      </div>

      {/* Quiet Footer Links */}
      <div className="px-6 py-4 border-t border-sky-300/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-sky-200/80">
        <div className="flex items-center gap-3">
          <KidsWordmark size="sm" showRays={false} />
          <span>Ambiente seguro e livre de anúncios para toda a família.</span>
        </div>

        <div className="flex items-center gap-5 font-semibold">
          <button
            type="button"
            onClick={onSelectCategory}
            className="hover:text-amber-300 transition-colors cursor-pointer"
          >
            Explorar Catálogo
          </button>
          <span>Classificação Indicativa Verificada</span>
        </div>
      </div>
    </footer>
  );
};
