import React, { useCallback, useEffect, useMemo, useState } from 'react';
import lowerRainbowImg from './assets/images/lower_rainbow_characters_1794639094173.jpg';
import { CategoryStrip } from './components/CategoryStrip';
import { HeroBanner } from './components/HeroBanner';
import { SeriesDetailPage } from './components/SeriesDetailPage';
import { SeriesPage } from './components/SeriesPage';
import { ShowCarousel } from './components/ShowCarousel';
import { ShowDetailModal } from './components/ShowDetailModal';
import { SidebarNav } from './components/SidebarNav';
import { TopNavBar } from './components/TopNavBar';
import {
  NotificationsSection,
  ProfileSection,
  SearchSection,
  SubscriptionSection,
  WatchlistSection,
} from './components/UtilityViews';
import {
  CATEGORY_OPTIONS,
  HERO_SLIDES,
  INITIAL_NOTIFICATIONS,
  KID_PROFILES,
  KIDS_SHOWS,
  TOP_TABS,
} from './data/kidsCatalog';
import {
  CategoryId,
  KidProfile,
  KidsNotification,
  ShowItem,
  SidebarSection,
  TopTab,
} from './types/kids';
import { TmdbSeriesSummary } from './types/tmdb';

const WATCHLIST_STORAGE_KEY = 'mplus-kids-watchlist-v1';
const TMDB_WATCHLIST_STORAGE_KEY = 'mplus-kids-tmdb-watchlist-v1';
const PROGRESS_STORAGE_KEY = 'mplus-kids-progress-v1';

export default function App() {
  const [activeSidebar, setActiveSidebar] = useState<SidebarSection>('home');
  const [activeTopTab, setActiveTopTab] = useState<TopTab>('recomendacoes');
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('all');
  const [selectedTmdbSeriesId, setSelectedTmdbSeriesId] = useState<number | null>(null);

  const [heroIndex, setHeroIndex] = useState(0);
  const [showAllContinue, setShowAllContinue] = useState(false);

  const [activeProfile, setActiveProfile] = useState<KidProfile>(KID_PROFILES[0]);
  const [safeAgeFilter, setSafeAgeFilter] = useState<'all' | '0-3' | '4-7'>('all');

  const [notifications, setNotifications] = useState<KidsNotification[]>(
    INITIAL_NOTIFICATIONS
  );

  const [watchlist, setWatchlist] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(WATCHLIST_STORAGE_KEY);
      if (stored) return JSON.parse(stored) as string[];
    } catch {
      // ignore storage errors
    }
    return ['patrulha-canina', 'mundo-bita'];
  });

  const [savedTmdbSeries, setSavedTmdbSeries] = useState<TmdbSeriesSummary[]>(() => {
    try {
      const stored = localStorage.getItem(TMDB_WATCHLIST_STORAGE_KEY);
      if (stored) return JSON.parse(stored) as TmdbSeriesSummary[];
    } catch {
      // ignore storage errors
    }
    return [];
  });

  const [progressMap, setProgressMap] = useState<Record<string, number>>(() => {
    const defaults: Record<string, number> = {};
    KIDS_SHOWS.forEach((s) => {
      if (s.defaultProgress) defaults[s.id] = s.defaultProgress;
    });
    try {
      const stored = localStorage.getItem(PROGRESS_STORAGE_KEY);
      if (stored) {
        return { ...defaults, ...(JSON.parse(stored) as Record<string, number>) };
      }
    } catch {
      // ignore storage errors
    }
    return defaults;
  });

  const [modalState, setModalState] = useState<{
    show: ShowItem | null;
    autoPlay: boolean;
  }>({ show: null, autoPlay: false });

  useEffect(() => {
    try {
      localStorage.setItem(WATCHLIST_STORAGE_KEY, JSON.stringify(watchlist));
    } catch {
      // ignore
    }
  }, [watchlist]);

  useEffect(() => {
    try {
      localStorage.setItem(
        TMDB_WATCHLIST_STORAGE_KEY,
        JSON.stringify(savedTmdbSeries)
      );
    } catch {
      // ignore
    }
  }, [savedTmdbSeries]);

  useEffect(() => {
    try {
      localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(progressMap));
    } catch {
      // ignore
    }
  }, [progressMap]);

  const ageFilteredShows = useMemo(() => {
    if (safeAgeFilter === '0-3') {
      return KIDS_SHOWS.filter((s) => s.ageRating === '0–3 anos');
    }
    if (safeAgeFilter === '4-7') {
      return KIDS_SHOWS.filter((s) => s.ageRating !== '6+ anos');
    }
    return KIDS_SHOWS;
  }, [safeAgeFilter]);

  const visibleCatalog = useMemo(() => {
    return ageFilteredShows.filter((show) => {
      const matchesTab =
        activeTopTab === 'recomendacoes' || show.topTabs.includes(activeTopTab);
      const matchesCat =
        selectedCategory === 'all' || show.categories.includes(selectedCategory);
      return matchesTab && matchesCat;
    });
  }, [ageFilteredShows, activeTopTab, selectedCategory]);

  const continueWatchingShows = useMemo(() => {
    return ageFilteredShows.filter((s) => (progressMap[s.id] ?? 0) > 0);
  }, [ageFilteredShows, progressMap]);

  const topWeeklyShows = useMemo(() => {
    return [...ageFilteredShows]
      .filter((s) => typeof s.featuredRank === 'number')
      .sort((a, b) => (a.featuredRank ?? 99) - (b.featuredRank ?? 99));
  }, [ageFilteredShows]);

  const toggleWatchlist = useCallback((showId: string) => {
    setWatchlist((prev) =>
      prev.includes(showId)
        ? prev.filter((id) => id !== showId)
        : [...prev, showId]
    );
  }, []);

  const toggleSavedTmdbSeries = useCallback((series: TmdbSeriesSummary) => {
    setSavedTmdbSeries((prev) => {
      const exists = prev.some((s) => s.id === series.id);
      if (exists) return prev.filter((s) => s.id !== series.id);
      return [series, ...prev];
    });
  }, []);

  const updateProgress = useCallback((showId: string, pct: number) => {
    setProgressMap((prev) => ({
      ...prev,
      [showId]: Math.max(0, Math.min(100, pct)),
    }));
  }, []);

  const handleOpenShow = useCallback((show: ShowItem, autoPlay = false) => {
    setModalState({ show, autoPlay });
  }, []);

  const handleWatchFromHero = useCallback((showId: string) => {
    const found = KIDS_SHOWS.find((s) => s.id === showId) ?? KIDS_SHOWS[0];
    setModalState({ show: found, autoPlay: true });
  }, []);

  const handleResetHome = useCallback(() => {
    setActiveSidebar('home');
    setActiveTopTab('recomendacoes');
    setSelectedCategory('all');
    setSelectedTmdbSeriesId(null);
    setShowAllContinue(false);
  }, []);

  const handleSelectTopTab = useCallback((tab: TopTab) => {
    setActiveSidebar('home');
    setSelectedTmdbSeriesId(null);
    setActiveTopTab(tab);
    if (tab !== 'series') {
      setSelectedCategory('all');
    }
  }, []);

  const handleSelectSidebar = useCallback((section: SidebarSection) => {
    setActiveSidebar(section);
    setSelectedTmdbSeriesId(null);
    if (section === 'home') {
      setActiveTopTab('recomendacoes');
    }
  }, []);

  const handleSelectCategory = useCallback((category: CategoryId) => {
    if (category === 'series') {
      setActiveSidebar('home');
      setActiveTopTab('series');
      setSelectedTmdbSeriesId(null);
      setSelectedCategory('all');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    setSelectedCategory(category);
  }, []);

  const handleOpenTmdbSeriesDetail = useCallback((seriesId: number) => {
    setActiveSidebar('home');
    setActiveTopTab('series');
    setSelectedTmdbSeriesId(seriesId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const unreadCount = notifications.filter((n) => n.unread).length;
  const activeTabLabel =
    TOP_TABS.find((t) => t.id === activeTopTab)?.label ?? 'Recomendações';
  const activeCategoryLabel =
    CATEGORY_OPTIONS.find((c) => c.id === selectedCategory)?.label ?? '';

  const isFilteredView =
    (activeTopTab !== 'recomendacoes' && activeTopTab !== 'series') ||
    selectedCategory !== 'all';

  const savedSeriesIds = useMemo(
    () => savedTmdbSeries.map((s) => s.id),
    [savedTmdbSeries]
  );

  return (
    <div className="min-h-screen w-full text-slate-50 pb-20 md:pb-6">
      <div className="max-w-[1440px] mx-auto px-3 sm:px-5 lg:px-6 pt-3 sm:pt-4 flex gap-4 items-start">
        {/* Left Vertical Glass Navigation */}
        <SidebarNav
          activeSection={activeSidebar}
          onSelectSection={handleSelectSidebar}
          unreadNotificationsCount={unreadCount}
          watchlistCount={watchlist.length + savedTmdbSeries.length}
        />

        {/* Main Content Workspace */}
        <div className="flex-1 min-w-0 space-y-4 sm:space-y-5">
          {/* Top Glass Pill Bar */}
          <TopNavBar
            activeTab={activeTopTab}
            onSelectTab={handleSelectTopTab}
            onResetHome={handleResetHome}
          />

          {/* Main Home or Dedicated Series / Series Detail Pages */}
          {activeSidebar === 'home' && activeTopTab === 'series' && (
            <main>
              {selectedTmdbSeriesId !== null ? (
                <SeriesDetailPage
                  seriesId={selectedTmdbSeriesId}
                  onBack={() => {
                    setSelectedTmdbSeriesId(null);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  onSelectRelatedSeries={handleOpenTmdbSeriesDetail}
                  isSaved={savedSeriesIds.includes(selectedTmdbSeriesId)}
                  onToggleSaved={toggleSavedTmdbSeries}
                />
              ) : (
                <SeriesPage
                  onSelectSeries={handleOpenTmdbSeriesDetail}
                  savedSeriesIds={savedSeriesIds}
                  onToggleSavedSeries={toggleSavedTmdbSeries}
                />
              )}
            </main>
          )}

          {activeSidebar === 'home' && activeTopTab !== 'series' && (
            <main className="space-y-5">
              {/* Hero Wonderland Banner (Screenshot 1) */}
              <HeroBanner
                slides={HERO_SLIDES}
                currentIndex={heroIndex}
                onPrev={() =>
                  setHeroIndex(
                    (prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length
                  )
                }
                onNext={() =>
                  setHeroIndex((prev) => (prev + 1) % HERO_SLIDES.length)
                }
                onSelectIndex={setHeroIndex}
                onWatchNow={handleWatchFromHero}
                onToggleWatchlist={toggleWatchlist}
                isInWatchlist={(id) => watchlist.includes(id)}
              />

              {/* Lower Illustrated Showcase Container (Screenshot 2) */}
              <div className="relative overflow-hidden rounded-[28px] border border-sky-300/40 shadow-[0_24px_60px_-14px_rgba(2,12,38,0.85)] bg-[#041e55]">
                {/* Full-bleed Lower Rainbow & Characters Scene */}
                <img
                  src={lowerRainbowImg}
                  alt="Personagens M+ Kids celebrando no arco-íris"
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 z-0 h-full w-full object-cover object-bottom select-none"
                />
                <div
                  className="absolute inset-0 z-0 bg-gradient-to-b from-[#041e55]/60 via-[#062d78]/25 to-transparent"
                  aria-hidden="true"
                />

                <div className="relative z-10 p-4 sm:p-6 lg:px-10 lg:pt-7 pb-44 sm:pb-56 lg:pb-64">
                  <div className="rounded-[24px] border border-sky-300/45 bg-gradient-to-b from-[#08388d]/75 via-[#07317b]/72 to-[#062766]/78 backdrop-blur-md p-4 sm:p-6 space-y-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.22),0_18px_40px_rgba(2,12,38,0.55)]">
                    {isFilteredView ? (
                      <div className="space-y-5">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                          <p className="text-sm font-semibold text-sky-100">
                            Exibindo:{' '}
                            <span className="font-extrabold text-amber-300">
                              {activeTabLabel}
                              {activeCategoryLabel
                                ? ` · ${activeCategoryLabel}`
                                : ''}
                            </span>{' '}
                            ({visibleCatalog.length}{' '}
                            {visibleCatalog.length === 1 ? 'título' : 'títulos'})
                          </p>
                          <button
                            type="button"
                            onClick={handleResetHome}
                            className="px-4 py-1.5 rounded-full bg-white/15 hover:bg-white/25 text-xs font-bold text-white cursor-pointer"
                          >
                            Limpar filtros
                          </button>
                        </div>

                        {visibleCatalog.length > 0 ? (
                          <ShowCarousel
                            title="Resultados no Catálogo"
                            iconType="sparkles"
                            shows={visibleCatalog}
                            progressMap={progressMap}
                            watchlist={watchlist}
                            showProgress={true}
                            layout="grid"
                            onSelectShow={handleOpenShow}
                            onToggleWatchlist={toggleWatchlist}
                          />
                        ) : (
                          <div className="py-8 text-center space-y-3">
                            <p className="font-display text-lg font-bold text-white">
                              Nenhum título encontrado para esta combinação.
                            </p>
                            <button
                              type="button"
                              onClick={handleResetHome}
                              className="px-5 py-2.5 rounded-full bg-orange-500 hover:bg-orange-400 text-white font-bold text-xs uppercase tracking-wide cursor-pointer"
                            >
                              Voltar para Recomendações
                            </button>
                          </div>
                        )}

                        <CategoryStrip
                          selectedCategory={selectedCategory}
                          onSelectCategory={handleSelectCategory}
                          compactRow={true}
                        />
                      </div>
                    ) : (
                      <>
                        {/* 1. Continue Assistindo */}
                        <ShowCarousel
                          title="Continue"
                          accentWord="Assistindo"
                          iconType="tv"
                          shows={continueWatchingShows.slice(0, showAllContinue ? 14 : 5)}
                          progressMap={progressMap}
                          watchlist={watchlist}
                          showProgress={true}
                          compactCards={true}
                          viewAllLabel={showAllContinue ? 'Ver 5' : 'Ver tudo'}
                          onViewAll={() => setShowAllContinue((prev) => !prev)}
                          layout={showAllContinue ? 'grid' : 'carousel'}
                          onSelectShow={handleOpenShow}
                          onToggleWatchlist={toggleWatchlist}
                        />

                        {/* 2. Mais Assistidos da Semana (1–5) */}
                        <ShowCarousel
                          title="Mais Assistidos da Semana"
                          iconType="flame"
                          shows={topWeeklyShows}
                          progressMap={progressMap}
                          watchlist={watchlist}
                          showRank={true}
                          showProgress={true}
                          compactCards={true}
                          onSelectShow={handleOpenShow}
                          onToggleWatchlist={toggleWatchlist}
                        />

                        {/* 3. Explore por Categoria */}
                        <CategoryStrip
                          selectedCategory={selectedCategory}
                          onSelectCategory={handleSelectCategory}
                          compactRow={true}
                        />
                      </>
                    )}
                  </div>
                </div>
              </div>
            </main>
          )}

          {activeSidebar === 'busca' && (
            <SearchSection
              allShows={ageFilteredShows}
              progressMap={progressMap}
              watchlist={watchlist}
              onSelectShow={handleOpenShow}
              onToggleWatchlist={toggleWatchlist}
            />
          )}

          {activeSidebar === 'notificacoes' && (
            <NotificationsSection
              notifications={notifications}
              allShows={KIDS_SHOWS}
              onMarkAllRead={() =>
                setNotifications((prev) =>
                  prev.map((n) => ({ ...n, unread: false }))
                )
              }
              onOpenShow={(show) => handleOpenShow(show, false)}
            />
          )}

          {activeSidebar === 'perfil' && (
            <ProfileSection
              activeProfile={activeProfile}
              onSelectProfile={setActiveProfile}
              safeAgeFilter={safeAgeFilter}
              onChangeAgeFilter={setSafeAgeFilter}
            />
          )}

          {activeSidebar === 'assinatura' && (
            <SubscriptionSection onGoHome={handleResetHome} />
          )}

          {activeSidebar === 'minhas-listas' && (
            <WatchlistSection
              shows={KIDS_SHOWS}
              progressMap={progressMap}
              watchlist={watchlist}
              savedTmdbSeries={savedTmdbSeries}
              onSelectShow={handleOpenShow}
              onToggleWatchlist={toggleWatchlist}
              onSelectTmdbSeries={handleOpenTmdbSeriesDetail}
              onRemoveTmdbSeries={toggleSavedTmdbSeries}
              onGoHome={handleResetHome}
            />
          )}
        </div>
      </div>

      {/* Show Details & Interactive Kids Player Modal */}
      <ShowDetailModal
        show={modalState.show}
        initialPlayMode={modalState.autoPlay}
        progress={modalState.show ? progressMap[modalState.show.id] ?? 0 : 0}
        isInWatchlist={
          modalState.show ? watchlist.includes(modalState.show.id) : false
        }
        onClose={() => setModalState({ show: null, autoPlay: false })}
        onToggleWatchlist={toggleWatchlist}
        onUpdateProgress={updateProgress}
      />
    </div>
  );
}
