import React from 'react';
import { TOP_TABS } from '../data/kidsCatalog';
import { TopTab } from '../types/kids';
import { KidsWordmark, MPlusMark } from './artwork/KidsBrandMarks';

interface TopNavBarProps {
  activeTab: TopTab;
  onSelectTab: (tab: TopTab) => void;
  onResetHome: () => void;
}

export const TopNavBar: React.FC<TopNavBarProps> = ({
  activeTab,
  onSelectTab,
  onResetHome,
}) => {
  const leftTabs = TOP_TABS.slice(0, 3);
  const rightTabs = TOP_TABS.slice(3, 6);

  return (
    <header className="glass-pill rounded-full px-4 sm:px-7 py-2 flex items-center justify-between gap-4 overflow-x-auto no-scrollbar">
      {/* Mobile M+ mark */}
      <button
        type="button"
        onClick={onResetHome}
        className="md:hidden shrink-0 cursor-pointer"
        aria-label="Início M+ Kids"
      >
        <MPlusMark className="w-9 h-6" />
      </button>

      {/* Left Links */}
      <nav aria-label="Categorias superiores esquerda" className="flex items-center gap-2 sm:gap-5 lg:gap-7 shrink-0">
        {leftTabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onSelectTab(tab.id)}
              className={`relative py-1.5 px-2 text-xs sm:text-sm font-extrabold uppercase tracking-wide whitespace-nowrap shrink-0 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-sky-300 rounded-lg ${
                isActive ? 'text-amber-300' : 'text-white/90 hover:text-sky-200'
              }`}
            >
              {tab.label}
              {isActive && (
                <span className="absolute left-2 right-2 -bottom-0.5 h-0.5 rounded-full bg-amber-300" />
              )}
            </button>
          );
        })}
      </nav>

      {/* Center Kids Brand Emblem */}
      <button
        type="button"
        onClick={onResetHome}
        className="shrink-0 mx-1 sm:mx-2 hover:scale-105 transition-transform cursor-pointer focus-visible:outline-2 focus-visible:outline-sky-300 rounded-xl"
        aria-label="Voltar para Recomendações Kids"
      >
        <KidsWordmark size="sm" showRays={true} />
      </button>

      {/* Right Links */}
      <nav aria-label="Categorias superiores direita" className="flex items-center gap-2 sm:gap-5 lg:gap-7 shrink-0">
        {rightTabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onSelectTab(tab.id)}
              className={`relative py-1.5 px-2 text-xs sm:text-sm font-extrabold uppercase tracking-wide whitespace-nowrap shrink-0 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-sky-300 rounded-lg ${
                isActive ? 'text-amber-300' : 'text-white/90 hover:text-sky-200'
              }`}
            >
              {tab.label}
              {isActive && (
                <span className="absolute left-2 right-2 -bottom-0.5 h-0.5 rounded-full bg-amber-300" />
              )}
            </button>
          );
        })}
      </nav>
    </header>
  );
};
