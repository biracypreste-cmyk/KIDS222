import React from 'react';
import {
  Bell,
  Bookmark,
  Hexagon,
  Home,
  Search,
  User,
} from 'lucide-react';
import { SidebarSection } from '../types/kids';
import { MPlusMark } from './artwork/KidsBrandMarks';

interface SidebarNavProps {
  activeSection: SidebarSection;
  onSelectSection: (section: SidebarSection) => void;
  unreadNotificationsCount: number;
  watchlistCount: number;
}

const NAV_ITEMS: {
  id: SidebarSection;
  label: string;
  shortLabel: string;
  Icon: React.FC<{ className?: string }>;
}[] = [
  { id: 'home', label: 'Home', shortLabel: 'Home', Icon: Home },
  { id: 'busca', label: 'Busca', shortLabel: 'Busca', Icon: Search },
  { id: 'notificacoes', label: 'Notificações', shortLabel: 'Alertas', Icon: Bell },
  { id: 'perfil', label: 'Perfil', shortLabel: 'Perfil', Icon: User },
  { id: 'assinatura', label: 'Assinatura', shortLabel: 'Plano', Icon: Hexagon },
  { id: 'minhas-listas', label: 'Minhas Listas', shortLabel: 'Listas', Icon: Bookmark },
];

export const SidebarNav: React.FC<SidebarNavProps> = ({
  activeSection,
  onSelectSection,
  unreadNotificationsCount,
}) => {
  return (
    <>
      {/* Desktop / Tablet Vertical Glass Rail matching reference */}
      <aside
        aria-label="Navegação principal"
        className="glass-panel hidden md:flex flex-col items-center w-[78px] shrink-0 rounded-[26px] py-4 px-1.5 sticky top-4 h-[calc(100vh-2rem)] z-30 border-sky-300/45"
      >
        <button
          type="button"
          onClick={() => onSelectSection('home')}
          className="flex items-center justify-center p-1 mb-5 rounded-xl hover:scale-105 transition-transform focus-visible:outline-2 focus-visible:outline-sky-300 cursor-pointer"
          aria-label="M+ Kids Início"
        >
          <MPlusMark className="w-11 h-7" />
        </button>

        <nav className="flex flex-col items-center gap-3.5 w-full">
          {NAV_ITEMS.map(({ id, label, Icon }) => {
            const isActive = activeSection === id;
            const showDot = id === 'notificacoes' && unreadNotificationsCount > 0;

            return (
              <button
                key={id}
                type="button"
                onClick={() => onSelectSection(id)}
                aria-current={isActive ? 'page' : undefined}
                className={`relative group flex flex-col items-center justify-center w-[62px] py-2.5 px-1 rounded-[16px] transition-all duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-sky-200 ${
                  isActive
                    ? 'bg-gradient-to-b from-amber-400 via-orange-500 to-orange-600 text-white shadow-[0_0_22px_rgba(249,115,22,0.75)] ring-1 ring-amber-200/80'
                    : 'text-sky-100/90 hover:text-white hover:bg-white/10'
                }`}
              >
                <Icon className="w-[21px] h-[21px] mb-1 shrink-0 stroke-[1.9]" />
                <span className="text-[9px] font-bold uppercase tracking-wider leading-tight text-center whitespace-nowrap max-w-[60px] truncate">
                  {label}
                </span>

                {showDot && !isActive && (
                  <span
                    className="absolute top-2 right-3.5 w-2 h-2 rounded-full bg-pink-500 ring-1 ring-white"
                    aria-label="Novas notificações"
                  />
                )}
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Mobile Bottom Compact Bar */}
      <nav
        aria-label="Navegação móvel"
        className="md:hidden fixed bottom-2 left-2 right-2 z-40 glass-pill rounded-2xl px-2 py-1.5 flex items-center justify-around"
      >
        {NAV_ITEMS.map(({ id, shortLabel, Icon }) => {
          const isActive = activeSection === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => onSelectSection(id)}
              aria-current={isActive ? 'page' : undefined}
              className={`relative flex flex-col items-center justify-center min-w-[48px] min-h-[44px] px-2 py-1 rounded-xl transition-colors cursor-pointer ${
                isActive
                  ? 'bg-gradient-to-b from-orange-400 to-orange-600 text-white shadow-md'
                  : 'text-sky-100/80 hover:text-white'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="text-[10px] font-semibold mt-0.5 whitespace-nowrap">
                {shortLabel}
              </span>
            </button>
          );
        })}
      </nav>
    </>
  );
};
