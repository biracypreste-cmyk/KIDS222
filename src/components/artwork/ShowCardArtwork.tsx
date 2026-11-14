import React from 'react';
import { ShowArtworkId } from '../../types/kids';
import patrolPupsImg from '../../assets/images/show_patrol_pups_1794639094390.jpg';
import forestGirlImg from '../../assets/images/show_forest_girl_1794639096611.jpg';
import musicalTophatImg from '../../assets/images/show_musical_tophat_1794639096067.jpg';

interface ShowCardArtworkProps {
  artworkId: ShowArtworkId;
  title: string;
}

export const ShowCardArtwork: React.FC<ShowCardArtworkProps> = ({ artworkId, title }) => {
  if (artworkId === 'patrulha-canina') {
    return (
      <div className="relative h-full w-full overflow-hidden bg-sky-600">
        <img
          src={patrolPupsImg}
          alt={title}
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover object-left"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-900/20 to-blue-950/75"
          aria-hidden="true"
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-right drop-shadow-[0_3px_6px_rgba(2,12,38,0.9)]">
          <span className="block font-display font-black text-base sm:text-lg leading-none text-white tracking-tight">
            Patrulha
          </span>
          <span className="block font-display font-black text-base sm:text-lg leading-tight text-amber-300 tracking-tight">
            Canina
          </span>
        </div>
      </div>
    );
  }

  if (artworkId === 'masha-urso') {
    return (
      <div className="relative h-full w-full overflow-hidden bg-emerald-700">
        <img
          src={forestGirlImg}
          alt={title}
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover object-left"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-950/20 to-emerald-950/75"
          aria-hidden="true"
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-right drop-shadow-[0_3px_6px_rgba(2,12,38,0.9)]">
          <span className="block font-display font-black text-base sm:text-lg leading-none text-pink-300">
            Masha e
          </span>
          <span className="block font-display font-black text-base sm:text-lg leading-tight text-white">
            o Urso
          </span>
        </div>
      </div>
    );
  }

  if (artworkId === 'mundo-bita') {
    return (
      <div className="relative h-full w-full overflow-hidden bg-sky-500">
        <img
          src={musicalTophatImg}
          alt={title}
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover object-top"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-sky-900/15 to-blue-950/75"
          aria-hidden="true"
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-right drop-shadow-[0_3px_6px_rgba(2,12,38,0.9)]">
          <span className="block font-display font-black text-base sm:text-lg leading-none text-white">
            Mundo
          </span>
          <span className="block font-display font-black text-xl sm:text-2xl leading-tight text-amber-300">
            Bita
          </span>
        </div>
      </div>
    );
  }

  switch (artworkId) {
    case 'peppa-pig':
      return (
        <svg viewBox="0 0 320 180" className="h-full w-full" aria-label={title}>
          <defs>
            <linearGradient id="sky-peppa" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#60A5FA" />
              <stop offset="100%" stopColor="#BAE6FD" />
            </linearGradient>
          </defs>
          <rect width="320" height="180" fill="url(#sky-peppa)" />
          <path d="M0 132 Q160 112 320 135 L320 180 L0 180 Z" fill="#4ADE80" />
          <ellipse cx="135" cy="158" rx="45" ry="12" fill="#92400E" opacity="0.65" />
          <g transform="translate(42, 36)">
            <path d="M20 75 L75 75 L82 120 H14 Z" fill="#EF4444" />
            <ellipse cx="38" cy="16" rx="7" ry="12" fill="#F9A8D4" />
            <ellipse cx="56" cy="16" rx="7" ry="12" fill="#F9A8D4" />
            <circle cx="48" cy="48" r="28" fill="#F9A8D4" stroke="#F472B6" strokeWidth="3" />
            <ellipse cx="78" cy="42" rx="16" ry="11" fill="#F9A8D4" stroke="#F472B6" strokeWidth="3" />
            <circle cx="83" cy="40" r="2.5" fill="#DB2777" />
            <circle cx="90" cy="43" r="2.5" fill="#DB2777" />
            <circle cx="44" cy="42" r="5" fill="#FFF" />
            <circle cx="58" cy="42" r="5" fill="#FFF" />
            <circle cx="45" cy="42" r="2.5" fill="#0F172A" />
            <circle cx="59" cy="42" r="2.5" fill="#0F172A" />
            <circle cx="34" cy="54" r="6" fill="#F472B6" />
            <path d="M40 60 Q50 70 60 60" stroke="#DB2777" strokeWidth="3" fill="none" strokeLinecap="round" />
          </g>
          <text x="228" y="82" textAnchor="middle" fill="#FFFFFF" stroke="#0284C7" strokeWidth="5" paintOrder="stroke" fontFamily="Outfit, sans-serif" fontWeight="900" fontSize="34">
            Peppa
          </text>
          <text x="228" y="118" textAnchor="middle" fill="#F472B6" stroke="#FFFFFF" strokeWidth="5" paintOrder="stroke" fontFamily="Outfit, sans-serif" fontWeight="900" fontSize="34">
            Pig
          </text>
        </svg>
      );

    case 'bob-esponja':
      return (
        <svg viewBox="0 0 320 180" className="h-full w-full" aria-label={title}>
          <defs>
            <linearGradient id="bg-be" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#06B6D4" />
              <stop offset="100%" stopColor="#0369A1" />
            </linearGradient>
          </defs>
          <rect width="320" height="180" fill="url(#bg-be)" />
          <circle cx="30" cy="35" r="10" fill="#FFF" opacity="0.3" />
          <circle cx="150" cy="28" r="7" fill="#FFF" opacity="0.35" />
          <circle cx="290" cy="145" r="12" fill="#FFF" opacity="0.25" />
          <g transform="translate(36, 26)">
            <rect x="12" y="10" width="84" height="92" rx="14" fill="#FACC15" stroke="#CA8A04" strokeWidth="3" />
            <circle cx="26" cy="24" r="5" fill="#EAB308" />
            <circle cx="82" cy="84" r="6" fill="#EAB308" />
            <circle cx="40" cy="46" r="12" fill="#FFF" />
            <circle cx="68" cy="46" r="12" fill="#FFF" />
            <circle cx="42" cy="46" r="6" fill="#0EA5E9" />
            <circle cx="70" cy="46" r="6" fill="#0EA5E9" />
            <circle cx="42" cy="46" r="3" fill="#0F172A" />
            <circle cx="70" cy="46" r="3" fill="#0F172A" />
            <path d="M35 72 Q54 90 73 72 Z" fill="#BE123C" />
            <rect x="46" y="72" width="7" height="7" fill="#FFF" />
            <rect x="56" y="72" width="7" height="7" fill="#FFF" />
            <rect x="12" y="102" width="84" height="16" fill="#FFF" />
            <rect x="12" y="118" width="84" height="18" fill="#78350F" />
            <polygon points="50,102 58,102 54,120" fill="#EF4444" />
          </g>
          <text x="225" y="78" textAnchor="middle" fill="#FDE047" stroke="#1E3A8A" strokeWidth="6" paintOrder="stroke" fontFamily="Outfit, sans-serif" fontWeight="900" fontSize="30">
            Bob
          </text>
          <text x="225" y="112" textAnchor="middle" fill="#FDE047" stroke="#1E3A8A" strokeWidth="6" paintOrder="stroke" fontFamily="Outfit, sans-serif" fontWeight="900" fontSize="27">
            Esponja
          </text>
        </svg>
      );

    case 'super-wings':
      return (
        <svg viewBox="0 0 320 180" className="h-full w-full" aria-label={title}>
          <rect width="320" height="180" fill="#2563EB" />
          <circle cx="240" cy="90" r="85" fill="#38BDF8" opacity="0.3" />
          <ellipse cx="90" cy="40" rx="50" ry="16" fill="#FFF" opacity="0.45" />
          <g transform="translate(150, 38)">
            <ellipse cx="75" cy="65" rx="58" ry="38" fill="#EF4444" />
            <path d="M5 72 L52 52 L65 86 Z" fill="#DC2626" />
            <path d="M120 72 L156 54 L145 88 Z" fill="#DC2626" />
            <rect x="44" y="42" width="60" height="28" rx="12" fill="#0F172A" />
            <circle cx="62" cy="56" r="8" fill="#38BDF8" />
            <circle cx="88" cy="56" r="8" fill="#38BDF8" />
            <circle cx="64" cy="56" r="3.5" fill="#0F172A" />
            <circle cx="90" cy="56" r="3.5" fill="#0F172A" />
            <path d="M58 84 Q75 94 92 84" stroke="#FFFFFF" strokeWidth="4" fill="none" strokeLinecap="round" />
          </g>
          <text x="92" y="82" textAnchor="middle" fill="#FFFFFF" stroke="#1E3A8A" strokeWidth="6" paintOrder="stroke" fontFamily="Outfit, sans-serif" fontWeight="900" fontSize="28">
            SUPER
          </text>
          <text x="92" y="114" textAnchor="middle" fill="#FACC15" stroke="#1E3A8A" strokeWidth="6" paintOrder="stroke" fontFamily="Outfit, sans-serif" fontWeight="900" fontSize="28">
            WINGS
          </text>
        </svg>
      );

    case 'galinha-pintadinha':
      return (
        <svg viewBox="0 0 320 180" className="h-full w-full" aria-label={title}>
          <rect width="320" height="180" fill="#38BDF8" />
          <path d="M0 140 Q160 120 320 140 L320 180 L0 180 Z" fill="#4ADE80" />
          <g transform="translate(36, 24)">
            <ellipse cx="56" cy="86" rx="42" ry="46" fill="#0284C7" />
            <circle cx="38" cy="90" r="6" fill="#FFF" opacity="0.85" />
            <circle cx="72" cy="78" r="5" fill="#FFF" opacity="0.85" />
            <circle cx="58" cy="112" r="6" fill="#FFF" opacity="0.85" />
            <circle cx="48" cy="28" r="10" fill="#EF4444" />
            <circle cx="60" cy="24" r="11" fill="#EF4444" />
            <circle cx="71" cy="30" r="9" fill="#EF4444" />
            <circle cx="56" cy="56" r="28" fill="#0EA5E9" />
            <circle cx="47" cy="52" r="7" fill="#FFF" />
            <circle cx="67" cy="52" r="7" fill="#FFF" />
            <circle cx="48" cy="52" r="3.5" fill="#0F172A" />
            <circle cx="68" cy="52" r="3.5" fill="#0F172A" />
            <polygon points="50,62 64,62 57,74" fill="#FACC15" />
          </g>
          <text x="220" y="78" textAnchor="middle" fill="#FFFFFF" stroke="#0369A1" strokeWidth="6" paintOrder="stroke" fontFamily="Outfit, sans-serif" fontWeight="900" fontSize="28">
            Galinha
          </text>
          <text x="220" y="112" textAnchor="middle" fill="#FDE047" stroke="#0369A1" strokeWidth="6" paintOrder="stroke" fontFamily="Outfit, sans-serif" fontWeight="900" fontSize="26">
            Pintadinha
          </text>
        </svg>
      );

    case 'luccas-neto':
      return (
        <svg viewBox="0 0 320 180" className="h-full w-full" aria-label={title}>
          <rect width="320" height="180" fill="#0284C7" />
          <path d="M0 135 Q160 112 320 135 L320 180 L0 180 Z" fill="#22C55E" />
          <g transform="translate(32, 24)">
            <path d="M24 106 H88 L98 156 H14 Z" fill="#38BDF8" />
            <circle cx="56" cy="64" r="32" fill="#FED7AA" />
            <path d="M24 50 A34 26 0 0 1 88 50 Z" fill="#2563EB" />
            <ellipse cx="76" cy="50" rx="22" ry="7" fill="#1D4ED8" />
            <circle cx="44" cy="64" r="4.5" fill="#0F172A" />
            <circle cx="68" cy="64" r="4.5" fill="#0F172A" />
            <path d="M40 77 Q56 94 72 77 Z" fill="#FFFFFF" stroke="#E11D48" strokeWidth="2.5" />
          </g>
          <text x="218" y="82" textAnchor="middle" fill="#FDE047" stroke="#1E3A8A" strokeWidth="6" paintOrder="stroke" fontFamily="Outfit, sans-serif" fontWeight="900" fontSize="30">
            Luccas
          </text>
          <text x="218" y="116" textAnchor="middle" fill="#FFFFFF" stroke="#1E3A8A" strokeWidth="6" paintOrder="stroke" fontFamily="Outfit, sans-serif" fontWeight="900" fontSize="30">
            Neto
          </text>
        </svg>
      );

    case 'os-aventureiros':
      return (
        <svg viewBox="0 0 320 180" className="h-full w-full" aria-label={title}>
          <defs>
            <linearGradient id="bg-oa" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#1D4ED8" />
              <stop offset="100%" stopColor="#7C3AED" />
            </linearGradient>
          </defs>
          <rect width="320" height="180" fill="url(#bg-oa)" />
          <path d="M0 140 Q160 118 320 140 L320 180 L0 180 Z" fill="#22C55E" />
          <g transform="translate(22, 42)">
            <circle cx="44" cy="42" r="24" fill="#FED7AA" />
            <path d="M20 34 A24 20 0 0 1 68 34 Z" fill="#EF4444" />
            <path d="M22 68 H66 L74 128 H14 Z" fill="#2563EB" />
            <circle cx="36" cy="44" r="3.5" fill="#0F172A" />
            <circle cx="52" cy="44" r="3.5" fill="#0F172A" />
            <path d="M36 55 Q44 63 52 55" stroke="#E11D48" strokeWidth="3" fill="none" />
          </g>
          <g transform="translate(86, 56)">
            <circle cx="38" cy="36" r="20" fill="#FED7AA" />
            <path d="M18 30 A20 16 0 0 1 58 30 Z" fill="#EC4899" />
            <path d="M20 58 H56 L62 118 H14 Z" fill="#F43F5E" />
            <circle cx="31" cy="38" r="3" fill="#0F172A" />
            <circle cx="45" cy="38" r="3" fill="#0F172A" />
          </g>
          <text x="228" y="76" textAnchor="middle" fill="#FFFFFF" stroke="#1E1B4B" strokeWidth="6" paintOrder="stroke" fontFamily="Outfit, sans-serif" fontWeight="900" fontSize="23">
            Os
          </text>
          <text x="228" y="106" textAnchor="middle" fill="#FACC15" stroke="#1E1B4B" strokeWidth="6" paintOrder="stroke" fontFamily="Outfit, sans-serif" fontWeight="900" fontSize="22">
            Aventureiros
          </text>
        </svg>
      );

    case 'sitio-picapau':
      return (
        <svg viewBox="0 0 320 180" className="h-full w-full" aria-label={title}>
          <rect width="320" height="180" fill="#F59E0B" />
          <path d="M0 135 Q160 112 320 135 L320 180 L0 180 Z" fill="#16A34A" />
          <g transform="translate(34, 24)">
            <circle cx="36" cy="40" r="14" fill="#EF4444" />
            <circle cx="76" cy="40" r="14" fill="#FACC15" />
            <circle cx="56" cy="32" r="16" fill="#EF4444" />
            <circle cx="56" cy="58" r="28" fill="#FDE68A" />
            <circle cx="45" cy="55" r="4.5" fill="#0F172A" />
            <circle cx="67" cy="55" r="4.5" fill="#0F172A" />
            <circle cx="39" cy="64" r="5" fill="#FB7185" />
            <circle cx="73" cy="64" r="5" fill="#FB7185" />
            <path d="M46 69 Q56 78 66 69" stroke="#DC2626" strokeWidth="3.5" fill="none" strokeLinecap="round" />
            <path d="M30 88 H82 L94 148 H18 Z" fill="#EF4444" />
            <path d="M30 88 H56 L56 148 H18 Z" fill="#FACC15" />
          </g>
          <text x="220" y="72" textAnchor="middle" fill="#FFFFFF" stroke="#78350F" strokeWidth="5" paintOrder="stroke" fontFamily="Outfit, sans-serif" fontWeight="900" fontSize="24">
            Sítio do
          </text>
          <text x="220" y="99" textAnchor="middle" fill="#FEF08A" stroke="#78350F" strokeWidth="5" paintOrder="stroke" fontFamily="Outfit, sans-serif" fontWeight="900" fontSize="24">
            Picapau
          </text>
          <text x="220" y="126" textAnchor="middle" fill="#FEF08A" stroke="#78350F" strokeWidth="5" paintOrder="stroke" fontFamily="Outfit, sans-serif" fontWeight="900" fontSize="22">
            Amarelo
          </text>
        </svg>
      );

    case 'dora-aventureira':
      return (
        <svg viewBox="0 0 320 180" className="h-full w-full" aria-label={title}>
          <rect width="320" height="180" fill="#8B5CF6" />
          <path d="M0 135 Q160 112 320 135 L320 180 L0 180 Z" fill="#22C55E" />
          <g transform="translate(36, 28)">
            <ellipse cx="56" cy="52" rx="36" ry="34" fill="#451A03" />
            <circle cx="56" cy="58" r="26" fill="#FDBA74" />
            <path d="M30 46 Q56 32 82 46 Z" fill="#451A03" />
            <circle cx="46" cy="56" r="4.5" fill="#451A03" />
            <circle cx="66" cy="56" r="4.5" fill="#451A03" />
            <path d="M46 68 Q56 77 66 68" stroke="#E11D48" strokeWidth="3.5" fill="none" strokeLinecap="round" />
            <path d="M32 86 H80 L88 140 H24 Z" fill="#EC4899" />
            <rect x="26" y="88" width="14" height="44" rx="6" fill="#7E22CE" />
          </g>
          <text x="222" y="82" textAnchor="middle" fill="#FDE047" stroke="#581C87" strokeWidth="6" paintOrder="stroke" fontFamily="Outfit, sans-serif" fontWeight="900" fontSize="32">
            Dora
          </text>
          <text x="222" y="114" textAnchor="middle" fill="#FFFFFF" stroke="#581C87" strokeWidth="5" paintOrder="stroke" fontFamily="Outfit, sans-serif" fontWeight="900" fontSize="22">
            a Aventureira
          </text>
        </svg>
      );

    case 'turma-monica':
      return (
        <svg viewBox="0 0 320 180" className="h-full w-full" aria-label={title}>
          <rect width="320" height="180" fill="#FB923C" />
          <path d="M0 140 Q160 118 320 140 L320 180 L0 180 Z" fill="#16A34A" />
          <g transform="translate(36, 32)">
            <circle cx="55" cy="48" r="30" fill="#FED7AA" />
            <ellipse cx="32" cy="44" rx="10" ry="20" fill="#0F172A" />
            <ellipse cx="78" cy="44" rx="10" ry="20" fill="#0F172A" />
            <circle cx="45" cy="46" r="4.5" fill="#0F172A" />
            <circle cx="65" cy="46" r="4.5" fill="#0F172A" />
            <path d="M45 60 Q55 69 65 60" stroke="#DC2626" strokeWidth="3" fill="none" />
            <path d="M30 80 H80 L90 138 H20 Z" fill="#EF4444" />
          </g>
          <text x="222" y="76" textAnchor="middle" fill="#FFFFFF" stroke="#9A3412" strokeWidth="6" paintOrder="stroke" fontFamily="Outfit, sans-serif" fontWeight="900" fontSize="25">
            Turma da
          </text>
          <text x="222" y="108" textAnchor="middle" fill="#FEF08A" stroke="#9A3412" strokeWidth="6" paintOrder="stroke" fontFamily="Outfit, sans-serif" fontWeight="900" fontSize="30">
            Mônica
          </text>
        </svg>
      );

    case 'show-luna':
      return (
        <svg viewBox="0 0 320 180" className="h-full w-full" aria-label={title}>
          <rect width="320" height="180" fill="#6366F1" />
          <circle cx="255" cy="44" r="22" fill="#FDE047" opacity="0.85" />
          <g transform="translate(36, 30)">
            <circle cx="40" cy="38" r="14" fill="#1E293B" />
            <circle cx="74" cy="38" r="14" fill="#1E293B" />
            <circle cx="57" cy="58" r="28" fill="#FED7AA" />
            <circle cx="47" cy="56" r="4.5" fill="#0F172A" />
            <circle cx="67" cy="56" r="4.5" fill="#0F172A" />
            <path d="M48 68 Q57 77 66 68" stroke="#E11D48" strokeWidth="3" fill="none" />
            <path d="M34 86 H80 L88 136 H26 Z" fill="#F43F5E" />
          </g>
          <text x="220" y="80" textAnchor="middle" fill="#FFFFFF" stroke="#312E81" strokeWidth="6" paintOrder="stroke" fontFamily="Outfit, sans-serif" fontWeight="900" fontSize="25">
            O Show da
          </text>
          <text x="220" y="114" textAnchor="middle" fill="#38BDF8" stroke="#FFFFFF" strokeWidth="5" paintOrder="stroke" fontFamily="Outfit, sans-serif" fontWeight="900" fontSize="34">
            Luna!
          </text>
        </svg>
      );

    case 'carrossel-encantado':
    default:
      return (
        <svg viewBox="0 0 320 180" className="h-full w-full" aria-label={title}>
          <rect width="320" height="180" fill="#EC4899" />
          <circle cx="80" cy="90" r="65" fill="#FDE047" opacity="0.22" />
          <g transform="translate(40, 32)">
            <polygon points="48,8 8,36 88,36" fill="#FACC15" />
            <rect x="22" y="36" width="8" height="72" fill="#FFF" />
            <rect x="66" y="36" width="8" height="72" fill="#FFF" />
            <rect x="10" y="108" width="76" height="14" rx="7" fill="#38BDF8" />
          </g>
          <text x="218" y="82" textAnchor="middle" fill="#FFFFFF" stroke="#831843" strokeWidth="6" paintOrder="stroke" fontFamily="Outfit, sans-serif" fontWeight="900" fontSize="27">
            Carrossel
          </text>
          <text x="218" y="112" textAnchor="middle" fill="#FEF08A" stroke="#831843" strokeWidth="5" paintOrder="stroke" fontFamily="Outfit, sans-serif" fontWeight="900" fontSize="22">
            Encantado
          </text>
        </svg>
      );
  }
};
