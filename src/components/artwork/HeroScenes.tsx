import React from 'react';
import { HeroSlide } from '../../types/kids';

interface HeroSceneProps {
  variant: HeroSlide['themeVariant'];
}

const PALETTES: Record<
  HeroSlide['themeVariant'],
  { skyTop: string; skyMid: string; skyBot: string; hill1: string; hill2: string; accent: string }
> = {
  wonderland: {
    skyTop: '#0B53D6',
    skyMid: '#2499FF',
    skyBot: '#6AD7FF',
    hill1: '#35C95A',
    hill2: '#1CA049',
    accent: '#FFD84D',
  },
  rescue: {
    skyTop: '#0E48BA',
    skyMid: '#1C8CFF',
    skyBot: '#8CE0FF',
    hill1: '#2EC46E',
    hill2: '#198E55',
    accent: '#FF7A28',
  },
  rainbow: {
    skyTop: '#2445D8',
    skyMid: '#43A3FF',
    skyBot: '#8BF0FF',
    hill1: '#42D46A',
    hill2: '#20A854',
    accent: '#FF58A8',
  },
  ocean: {
    skyTop: '#024E9A',
    skyMid: '#0A95E5',
    skyBot: '#4AE4F7',
    hill1: '#24C79B',
    hill2: '#11927E',
    accent: '#FFE548',
  },
  forest: {
    skyTop: '#0B5C8E',
    skyMid: '#26A7D4',
    skyBot: '#87F3D8',
    hill1: '#4CD259',
    hill2: '#239E3C',
    accent: '#FF6B93',
  },
  sitio: {
    skyTop: '#164BB8',
    skyMid: '#379EF8',
    skyBot: '#94E9A8',
    hill1: '#53D34A',
    hill2: '#289C35',
    accent: '#FFC72C',
  },
};

export const HeroSceneIllustration: React.FC<HeroSceneProps> = ({ variant }) => {
  const p = PALETTES[variant];

  return (
    <svg
      viewBox="0 0 1200 520"
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full select-none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`sky-${variant}`} x1="0" y1="0" x2="1200" y2="520" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={p.skyTop} />
          <stop offset="55%" stopColor={p.skyMid} />
          <stop offset="100%" stopColor={p.skyBot} />
        </linearGradient>
        <linearGradient id="rainbow-arc" x1="420" y1="260" x2="960" y2="80" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FF5252" stopOpacity="0.88" />
          <stop offset="22%" stopColor="#FFB300" stopOpacity="0.88" />
          <stop offset="45%" stopColor="#FFEE58" stopOpacity="0.88" />
          <stop offset="68%" stopColor="#4CE870" stopOpacity="0.88" />
          <stop offset="86%" stopColor="#38BDF8" stopOpacity="0.88" />
          <stop offset="100%" stopColor="#A855F7" stopOpacity="0.88" />
        </linearGradient>
        <linearGradient id="waterfall-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#E0F7FF" />
          <stop offset="50%" stopColor="#67E8F9" />
          <stop offset="100%" stopColor="#0EA5E9" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="castle-wall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFF7ED" />
          <stop offset="100%" stopColor="#FDE68A" />
        </linearGradient>
        <radialGradient id="sun-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
          <stop offset="35%" stopColor="#FEF08A" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#38BDF8" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Sky Backdrop */}
      <rect width="1200" height="520" fill={`url(#sky-${variant})`} />
      <circle cx="760" cy="145" r="240" fill="url(#sun-glow)" />

      {/* Fluffy Clouds */}
      <g fill="#FFFFFF" opacity="0.88">
        <ellipse cx="420" cy="90" rx="75" ry="28" />
        <ellipse cx="465" cy="80" rx="50" ry="26" />
        <ellipse cx="1010" cy="88" rx="90" ry="30" />
        <ellipse cx="1065" cy="78" rx="55" ry="24" />
        <ellipse cx="590" cy="215" rx="85" ry="24" opacity="0.55" />
      </g>

      {/* Giant Rainbow */}
      <path
        d="M 465 320 A 235 215 0 0 1 925 265"
        fill="none"
        stroke="url(#rainbow-arc)"
        strokeWidth="36"
        strokeLinecap="round"
        opacity="0.72"
      />

      {/* Left Floating Island & Waterfall */}
      <g transform="translate(380, 128)">
        <path d="M 10 38 Q 60 65 112 38 L 96 76 Q 60 98 26 76 Z" fill="#6D4C41" />
        <ellipse cx="61" cy="36" rx="54" ry="16" fill={p.hill1} />
        <circle cx="38" cy="20" r="14" fill="#22C55E" />
        <circle cx="52" cy="16" r="16" fill="#4ADE80" />
        <rect x="70" y="34" width="16" height="115" rx="8" fill="url(#waterfall-grad)" />
      </g>

      {/* Center Floating Castle Island */}
      <g transform="translate(650, 52)">
        {/* Island rock */}
        <path d="M 30 142 Q 125 180 220 142 L 178 212 Q 125 245 72 212 Z" fill="#7C523B" />
        <ellipse cx="125" cy="140" rx="102" ry="22" fill={p.hill1} />
        {/* Waterfall */}
        <rect x="112" y="140" width="28" height="165" rx="12" fill="url(#waterfall-grad)" />
        {/* Fairytale Castle */}
        <rect x="65" y="72" width="120" height="68" rx="6" fill="url(#castle-wall)" />
        <rect x="52" y="55" width="28" height="85" rx="4" fill="#FFEDD5" />
        <rect x="170" y="55" width="28" height="85" rx="4" fill="#FFEDD5" />
        <rect x="104" y="32" width="42" height="108" rx="6" fill="#FFFBEB" />
        {/* Roofs */}
        <polygon points="48,57 66,20 84,57" fill="#3B82F6" />
        <polygon points="166,57 184,20 202,57" fill="#3B82F6" />
        <polygon points="98,35 125,-6 152,35" fill="#EC4899" />
        {/* Flags */}
        <line x1="66" y1="20" x2="66" y2="6" stroke="#FBBF24" strokeWidth="2.5" />
        <polygon points="66,6 82,11 66,16" fill="#F43F5E" />
        <line x1="125" y1="-6" x2="125" y2="-22" stroke="#FBBF24" strokeWidth="3" />
        <polygon points="125,-22 145,-16 125,-10" fill="#F43F5E" />
        {/* Castle Gate */}
        <path d="M 111 140 V 112 A 14 14 0 0 1 139 112 V 140 Z" fill="#92400E" />
      </g>

      {/* Hot Air Balloon */}
      <g transform="translate(535, 80)">
        <ellipse cx="28" cy="30" rx="26" ry="31" fill="#FACC15" />
        <path d="M 28 -1 C 12 2 8 44 28 61 C 48 44 44 2 28 -1 Z" fill="#EC4899" />
        <path d="M 28 -1 C 21 5 20 45 28 61 C 36 45 35 5 28 -1 Z" fill="#FB923C" />
        <line x1="18" y1="60" x2="21" y2="75" stroke="#FFF" strokeWidth="1.8" />
        <line x1="38" y1="60" x2="35" y2="75" stroke="#FFF" strokeWidth="1.8" />
        <rect x="19" y="75" width="18" height="12" rx="3" fill="#B45309" />
      </g>

      {/* Right Floating Island */}
      <g transform="translate(1035, 165)">
        <path d="M 0 32 Q 55 58 110 32 L 90 78 Q 55 96 20 78 Z" fill="#6D4C41" />
        <ellipse cx="55" cy="30" rx="58" ry="15" fill={p.hill1} />
        <rect x="44" y="32" width="18" height="120" rx="8" fill="url(#waterfall-grad)" />
      </g>

      {/* Foreground Rolling Meadow */}
      <path
        d="M 0 435 Q 280 390 580 435 T 1200 410 L 1200 520 L 0 520 Z"
        fill={p.hill2}
      />
      <path
        d="M 0 465 Q 340 420 680 460 T 1200 445 L 1200 520 L 0 520 Z"
        fill={p.hill1}
      />

      {/* Glowing Magic Crystals */}
      <g opacity="0.92">
        <polygon points="355,480 375,425 400,480" fill="#A855F7" />
        <polygon points="375,425 400,480 388,485" fill="#D8B4FE" opacity="0.7" />
        <polygon points="405,492 422,448 442,492" fill="#38BDF8" />
        <polygon points="1070,485 1094,422 1122,485" fill="#F472B6" />
        <polygon points="1115,495 1138,446 1160,495" fill="#FACC15" />
      </g>

      {/* CHARACTER CAST CLUSTER (Right Side, Matching Reference Style) */}
      {/* 1. Smiling Panda with Green Headphones */}
      <g transform="translate(495, 210)">
        <circle cx="52" cy="52" r="42" fill="#FFFFFF" />
        {/* Ears */}
        <circle cx="20" cy="22" r="14" fill="#1E293B" />
        <circle cx="84" cy="22" r="14" fill="#1E293B" />
        {/* Headphones */}
        <path d="M 14 48 A 40 40 0 0 1 90 48" fill="none" stroke="#22C55E" strokeWidth="8" strokeLinecap="round" />
        <rect x="4" y="40" width="14" height="26" rx="7" fill="#4ADE80" />
        <rect x="86" y="40" width="14" height="26" rx="7" fill="#4ADE80" />
        {/* Eye patches & eyes */}
        <ellipse cx="36" cy="48" rx="11" ry="14" transform="rotate(-12 36 48)" fill="#1E293B" />
        <ellipse cx="68" cy="48" rx="11" ry="14" transform="rotate(12 68 48)" fill="#1E293B" />
        <circle cx="37" cy="47" r="4.5" fill="#FFFFFF" />
        <circle cx="67" cy="47" r="4.5" fill="#FFFFFF" />
        <circle cx="38" cy="47" r="2" fill="#0F172A" />
        <circle cx="66" cy="47" r="2" fill="#0F172A" />
        {/* Nose & Happy Mouth */}
        <ellipse cx="52" cy="60" rx="6" ry="4" fill="#1E293B" />
        <path d="M 41 68 Q 52 80 63 68 Z" fill="#F43F5E" />
        {/* Body */}
        <ellipse cx="52" cy="116" rx="44" ry="38" fill="#1E293B" />
        <ellipse cx="52" cy="118" rx="28" ry="26" fill="#FFFFFF" />
        <ellipse cx="12" cy="96" rx="12" ry="22" transform="rotate(-35 12 96)" fill="#1E293B" />
      </g>

      {/* 2. Happy Girl in Pink Jacket & Cap */}
      <g transform="translate(830, 175)">
        {/* Hair back */}
        <ellipse cx="62" cy="65" rx="46" ry="48" fill="#78350F" />
        {/* Pink Jacket & Waving Arms */}
        <path d="M 10 105 Q 40 92 62 105 L 88 158 L 32 158 Z" fill="#EC4899" />
        <path d="M 90 105 L 132 72" stroke="#EC4899" strokeWidth="18" strokeLinecap="round" />
        <circle cx="136" cy="68" r="10" fill="#FDBA74" />
        {/* Face */}
        <circle cx="62" cy="58" r="34" fill="#FED7AA" />
        {/* Cap */}
        <path d="M 28 46 A 35 30 0 0 1 96 46 Z" fill="#F472B6" />
        <ellipse cx="78" cy="44" rx="24" ry="8" fill="#EC4899" />
        {/* Eyes & Big Smile */}
        <circle cx="48" cy="58" r="5.5" fill="#1E293B" />
        <circle cx="76" cy="58" r="5.5" fill="#1E293B" />
        <circle cx="49" cy="56" r="2" fill="#FFFFFF" />
        <circle cx="77" cy="56" r="2" fill="#FFFFFF" />
        <circle cx="39" cy="66" r="5" fill="#FB7185" opacity="0.45" />
        <circle cx="85" cy="66" r="5" fill="#FB7185" opacity="0.45" />
        <path d="M 50 71 Q 62 84 74 71 Z" fill="#E11D48" />
      </g>

      {/* 3. Flying Cute Blue Baby Dragon */}
      <g transform="translate(970, 88)" className="animate-float-slow">
        {/* Wings */}
        <path d="M 35 45 L 2 10 Q 25 22 45 36 Z" fill="#38BDF8" stroke="#0284C7" strokeWidth="2" />
        <path d="M 75 45 L 112 14 Q 90 30 70 42 Z" fill="#38BDF8" stroke="#0284C7" strokeWidth="2" />
        {/* Body & Tail */}
        <ellipse cx="58" cy="68" rx="26" ry="22" fill="#0EA5E9" />
        <ellipse cx="58" cy="70" rx="15" ry="14" fill="#BAE6FD" />
        {/* Head */}
        <circle cx="58" cy="40" r="25" fill="#0EA5E9" />
        {/* Horns */}
        <polygon points="44,20 49,5 55,18" fill="#FBBF24" />
        <polygon points="62,18 68,5 73,20" fill="#FBBF24" />
        {/* Eyes & Smile */}
        <circle cx="49" cy="38" r="5" fill="#FFFFFF" />
        <circle cx="67" cy="38" r="5" fill="#FFFFFF" />
        <circle cx="50" cy="38" r="2.8" fill="#0F172A" />
        <circle cx="68" cy="38" r="2.8" fill="#0F172A" />
        <path d="M 48 48 Q 58 58 68 48 Z" fill="#FB7185" />
      </g>

      {/* 4. Central Adventurer Boy with Orange Goggles & Blue Hoodie */}
      <g transform="translate(650, 178)">
        {/* Hair */}
        <path
          d="M 35 55 C 25 22 65 4 98 15 C 122 8 145 30 132 58 Z"
          fill="#6B3410"
        />
        {/* Blue Hoodie & Backpack Straps */}
        <path d="M 34 128 Q 84 112 134 128 L 152 248 L 16 248 Z" fill="#2563EB" />
        <path d="M 60 126 L 108 126 L 104 248 L 64 248 Z" fill="#F8FAFC" />
        <rect x="42" y="132" width="14" height="82" rx="7" fill="#F97316" />
        <rect x="112" y="132" width="14" height="82" rx="7" fill="#F97316" />
        {/* Waving Hand */}
        <path d="M 34 152 L -16 175" stroke="#2563EB" strokeWidth="24" strokeLinecap="round" />
        <circle cx="-22" cy="178" r="18" fill="#FDBA74" />
        {/* Head */}
        <circle cx="84" cy="72" r="44" fill="#FED7AA" />
        {/* Goggles on Forehead */}
        <rect x="44" y="24" width="36" height="22" rx="10" fill="#F97316" stroke="#FFEDD5" strokeWidth="3" />
        <rect x="88" y="24" width="36" height="22" rx="10" fill="#F97316" stroke="#FFEDD5" strokeWidth="3" />
        <rect x="50" y="29" width="24" height="12" rx="6" fill="#38BDF8" />
        <rect x="94" y="29" width="24" height="12" rx="6" fill="#38BDF8" />
        {/* Big Expressive Eyes */}
        <circle cx="67" cy="72" r="7.5" fill="#1E293B" />
        <circle cx="101" cy="72" r="7.5" fill="#1E293B" />
        <circle cx="69" cy="69" r="2.8" fill="#FFFFFF" />
        <circle cx="103" cy="69" r="2.8" fill="#FFFFFF" />
        {/* Rosy cheeks & Laughing Mouth */}
        <circle cx="52" cy="82" r="6" fill="#FB7185" opacity="0.45" />
        <circle cx="116" cy="82" r="6" fill="#FB7185" opacity="0.45" />
        <path d="M 66 89 Q 84 108 102 89 Z" fill="#E11D48" />
        <path d="M 71 90 Q 84 96 97 90 Z" fill="#FFFFFF" />
      </g>

      {/* 5. Playful Golden Puppy */}
      <g transform="translate(505, 305)">
        <ellipse cx="62" cy="95" rx="38" ry="30" fill="#D97706" />
        <ellipse cx="62" cy="100" rx="22" ry="20" fill="#FEF3C7" />
        {/* Floppy Ears */}
        <ellipse cx="25" cy="48" rx="15" ry="28" transform="rotate(20 25 48)" fill="#92400E" />
        <ellipse cx="99" cy="48" rx="15" ry="28" transform="rotate(-20 99 48)" fill="#92400E" />
        {/* Head */}
        <circle cx="62" cy="48" r="34" fill="#F59E0B" />
        <ellipse cx="62" cy="56" rx="22" ry="18" fill="#FEF3C7" />
        {/* Collar */}
        <rect x="40" y="75" width="44" height="10" rx="5" fill="#EF4444" />
        <circle cx="62" cy="85" r="7" fill="#FACC15" />
        {/* Eyes & Nose */}
        <circle cx="49" cy="42" r="6" fill="#1E293B" />
        <circle cx="75" cy="42" r="6" fill="#1E293B" />
        <circle cx="50" cy="40" r="2" fill="#FFFFFF" />
        <circle cx="76" cy="40" r="2" fill="#FFFFFF" />
        <ellipse cx="62" cy="52" rx="7" ry="5" fill="#1E293B" />
        <path d="M 55 62 Q 62 74 69 62 Z" fill="#FB7185" />
      </g>

      {/* 6. Cute White Robot with Glowing Screen & Play Icon */}
      <g transform="translate(815, 315)">
        {/* Antennas */}
        <circle cx="58" cy="6" r="6" fill="#38BDF8" />
        <line x1="58" y1="12" x2="58" y2="22" stroke="#CBD5E1" strokeWidth="4" />
        {/* Head */}
        <rect x="18" y="20" width="80" height="58" rx="24" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="3" />
        <rect x="27" y="28" width="62" height="42" rx="16" fill="#0F172A" />
        {/* Glowing Cyan Happy Eyes */}
        <path d="M 38 49 Q 45 40 52 49" fill="none" stroke="#38BDF8" strokeWidth="4.5" strokeLinecap="round" />
        <path d="M 64 49 Q 71 40 78 49" fill="none" stroke="#38BDF8" strokeWidth="4.5" strokeLinecap="round" />
        {/* Body */}
        <rect x="30" y="82" width="56" height="58" rx="18" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="3" />
        <rect x="42" y="96" width="32" height="28" rx="8" fill="#0EA5E9" />
        <polygon points="54,103 65,110 54,117" fill="#FFFFFF" />
        {/* Arms */}
        <path d="M 28 96 L 8 112" stroke="#E2E8F0" strokeWidth="12" strokeLinecap="round" />
        <path d="M 88 96 L 112 82" stroke="#E2E8F0" strokeWidth="12" strokeLinecap="round" />
      </g>

      {/* 7. Magical Rainbow Unicorn */}
      <g transform="translate(995, 255)">
        {/* Mane */}
        <circle cx="48" cy="40" r="14" fill="#F472B6" />
        <circle cx="40" cy="56" r="13" fill="#FACC15" />
        <circle cx="38" cy="72" r="12" fill="#38BDF8" />
        {/* Body */}
        <ellipse cx="68" cy="118" rx="34" ry="28" fill="#FFFFFF" />
        {/* Head */}
        <circle cx="72" cy="55" r="28" fill="#FFFFFF" />
        {/* Golden Horn */}
        <polygon points="68,28 75,-4 82,28" fill="#FBBF24" />
        {/* Ear */}
        <polygon points="48,36 52,16 62,32" fill="#FCE7F3" />
        {/* Eye & Smile */}
        <circle cx="80" cy="52" r="6" fill="#0284C7" />
        <circle cx="82" cy="50" r="2.2" fill="#FFFFFF" />
        <path d="M 74 66 Q 82 74 90 66" fill="none" stroke="#F43F5E" strokeWidth="3" strokeLinecap="round" />
      </g>

      {/* Twinkling Star Sparkles */}
      <g fill="#FEF08A">
        <path d="M 480 120 L 484 130 L 494 134 L 484 138 L 480 148 L 476 138 L 466 134 L 476 130 Z" />
        <path d="M 920 125 L 923 132 L 930 135 L 923 138 L 920 145 L 917 138 L 910 135 L 917 132 Z" />
        <path d="M 1110 105 L 1114 114 L 1123 118 L 1114 122 L 1110 131 L 1106 122 L 1097 118 L 1106 114 Z" />
      </g>
    </svg>
  );
};
