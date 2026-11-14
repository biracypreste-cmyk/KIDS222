import React from 'react';

export const MPlusMark: React.FC<{ className?: string }> = ({ className = 'w-11 h-8' }) => (
  <svg
    viewBox="0 0 88 56"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-label="M+"
  >
    <defs>
      <linearGradient id="mplus-grad" x1="0" y1="0" x2="88" y2="56" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FF5232" />
        <stop offset="55%" stopColor="#EF1E26" />
        <stop offset="100%" stopColor="#FF8A00" />
      </linearGradient>
      <filter id="mplus-shadow" x="-10%" y="-10%" width="120%" height="130%">
        <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#020B24" floodOpacity="0.65" />
      </filter>
    </defs>
    <g filter="url(#mplus-shadow)">
      <path
        d="M8 46L17 11H28.5L36.5 31.5L47.5 11H58.5L51 46H40.5L45 25L35 42.5H28.5L22.5 25L18 46H8Z"
        fill="url(#mplus-grad)"
        stroke="#FFFFFF"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path
        d="M65 21H73V13H80V21H87.5V28H80V36H73V28H65V21Z"
        fill="#FFFFFF"
        stroke="#FF4D2E"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </g>
  </svg>
);

export const KidsWordmark: React.FC<{
  size?: 'sm' | 'lg';
  showRays?: boolean;
}> = ({ size = 'lg', showRays = true }) => {
  const dimensions =
    size === 'sm' ? 'h-9 w-auto' : 'h-20 sm:h-24 md:h-28 w-auto';

  return (
    <svg
      viewBox="0 0 340 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={dimensions}
      aria-label="Kids"
    >
      <defs>
        <linearGradient id="k-grad" x1="50" y1="20" x2="105" y2="105" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FF9100" />
          <stop offset="50%" stopColor="#FF4500" />
          <stop offset="100%" stopColor="#D91B0C" />
        </linearGradient>
        <linearGradient id="i-grad" x1="130" y1="18" x2="155" y2="105" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFF56B" />
          <stop offset="55%" stopColor="#FFCB05" />
          <stop offset="100%" stopColor="#F58200" />
        </linearGradient>
        <linearGradient id="d-grad" x1="170" y1="20" x2="225" y2="105" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#7CFF4F" />
          <stop offset="50%" stopColor="#12C94B" />
          <stop offset="100%" stopColor="#008E3B" />
        </linearGradient>
        <linearGradient id="s-grad" x1="230" y1="30" x2="285" y2="105" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#58E3FF" />
          <stop offset="55%" stopColor="#0B8BFF" />
          <stop offset="100%" stopColor="#1B38D8" />
        </linearGradient>
        <filter id="kids-pop" x="-10%" y="-12%" width="120%" height="135%">
          <feDropShadow dx="0" dy="6" stdDeviation="4" floodColor="#03153D" floodOpacity="0.55" />
        </filter>
      </defs>

      {showRays && (
        <g stroke="#FFE44D" strokeWidth="6" strokeLinecap="round">
          <line x1="28" y1="34" x2="11" y2="23" />
          <line x1="24" y1="58" x2="5" y2="58" />
          <line x1="30" y1="82" x2="13" y2="94" />
          <line x1="312" y1="34" x2="329" y2="23" />
          <line x1="316" y1="58" x2="335" y2="58" />
          <line x1="310" y1="82" x2="327" y2="94" />
        </g>
      )}

      <g filter="url(#kids-pop)">
        {/* K */}
        <path
          d="M52 24C52 19 56 16 61 16H71C76 16 80 19 80 24V49L100 21C103 17 108 16 113 18L121 23C126 26 127 32 123 37L102 60L125 87C129 92 127 99 121 102L112 106C106 108 101 106 98 102L80 76V98C80 103 76 107 71 107H61C56 107 52 103 52 98V24Z"
          fill="url(#k-grad)"
          stroke="#FFFFFF"
          strokeWidth="5"
          strokeLinejoin="round"
        />
        {/* Gloss highlight on K */}
        <path
          d="M60 25C60 23 62 21 65 21H69"
          stroke="#FFD2A6"
          strokeWidth="3.5"
          strokeLinecap="round"
        />

        {/* i */}
        <circle
          cx="148"
          cy="25"
          r="12"
          fill="url(#i-grad)"
          stroke="#FFFFFF"
          strokeWidth="4.5"
        />
        <rect
          x="136"
          y="43"
          width="24"
          height="63"
          rx="12"
          fill="url(#i-grad)"
          stroke="#FFFFFF"
          strokeWidth="4.5"
        />

        {/* d */}
        <path
          d="M210 16C215 16 219 20 219 25V95C219 101 215 106 209 106H201C197 106 194 103 193 99C188 104 182 107 175 107C158 107 148 93 148 75C148 56 159 42 175 42C182 42 188 45 193 49V25C193 20 197 16 202 16H210ZM184 63C176 63 171 68 171 75C171 82 176 87 184 87C191 87 196 82 196 75C196 68 191 63 184 63Z"
          fill="url(#d-grad)"
          stroke="#FFFFFF"
          strokeWidth="4.5"
          strokeLinejoin="round"
          transform="translate(12, 0)"
        />

        {/* s */}
        <path
          d="M286 53C283 45 273 41 261 41C244 41 234 50 234 62C234 74 244 79 258 81C267 83 271 85 271 88C271 91 267 93 261 93C254 93 249 90 245 86C241 83 236 84 233 88L230 93C227 97 228 102 233 105C240 109 250 111 261 111C280 111 292 101 292 87C292 75 282 69 267 66C258 64 255 62 255 60C255 57 258 55 264 55C269 55 274 57 277 60C280 63 285 62 287 58L286 53Z"
          fill="url(#s-grad)"
          stroke="#FFFFFF"
          strokeWidth="4.5"
          strokeLinejoin="round"
          transform="translate(8, 0)"
        />
      </g>
    </svg>
  );
};
