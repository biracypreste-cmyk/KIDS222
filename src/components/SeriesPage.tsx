import React, { useEffect, useState } from 'react';
import {
  Bookmark,
  Check,
  ChevronLeft,
  ChevronRight,
  Film,
  Loader2,
  Play,
  RotateCcw,
  Search,
  Star,
  Tv,
  X,
} from 'lucide-react';
import {
  fetchTmdbGenres,
  fetchTmdbSeries,
  tmdbImageUrl,
} from '../services/tmdbApi';
import {
  TmdbCollectionCategory,
  TmdbGenre,
  TmdbSeriesSummary,
} from '../types/tmdb';
import { TmdbImage } from './TmdbImage';

interface SeriesPageProps {
  onSelectSeries: (seriesId: number) => void;
  savedSeriesIds: number[];
  onToggleSavedSeries: (series: TmdbSeriesSummary) => void;
}

const COLLECTION_TABS: { id: TmdbCollectionCategory; label: string }[] = [
  { id: 'kids', label: 'Infantil & Kids' },
  { id: 'animation', label: 'Animações' },
  { id: 'popular', label: 'Populares' },
  { id: 'trending', label: 'Em Alta' },
  { id: 'top_rated', label: 'Melhores Notas' },
  { id: 'family', label: 'Família' },
  { id: 'on_the_air', label: 'No Ar Agora' },
];

export const SeriesPage: React.FC<SeriesPageProps> = ({
  onSelectSeries,
  savedSeriesIds,
  onToggleSavedSeries,
}) => {
  const [category, setCategory] = useState<TmdbCollectionCategory>('kids');
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
  const [searchInput, setSearchInput] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [page, setPage] = useState(1);

  const [genres, setGenres] = useState<TmdbGenre[]>([]);
  const [seriesList, setSeriesList] = useState<TmdbSeriesSummary[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadNonce, setReloadNonce] = useState(0);

  // Debounce search query
  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDebouncedQuery(searchInput.trim());
      setPage(1);
    }, 350);
    return () => window.clearTimeout(timer);
  }, [searchInput]);

  // Fetch TMDB genres once
  useEffect(() => {
    let active = true;
    fetchTmdbGenres()
      .then((list) => {
        if (active) setGenres(list);
      })
      .catch(() => {
        // non-blocking
      });
    return () => {
      active = false;
    };
  }, []);

  // Fetch TMDB series whenever filter/page changes
  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(null);

    fetchTmdbSeries({
      category,
      genre: selectedGenre,
      query: debouncedQuery,
      page,
    })
      .then((data) => {
        if (!active) return;
        setSeriesList(data.results ?? []);
        setTotalPages(Math.min(data.total_pages || 1, 500));
        setTotalResults(data.total_results || 0);
        setLoading(false);
      })
      .catch((err) => {
        if (!active) return;
        setError(
          err instanceof Error ? err.message : 'Erro ao carregar séries do TMDB.'
        );
        setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [category, selectedGenre, debouncedQuery, page, reloadNonce]);

  const featuredSeries =
    seriesList.find((s) => s.backdrop_path) ?? seriesList[0] ?? null;

  const isFeaturedSaved = featuredSeries
    ? savedSeriesIds.includes(featuredSeries.id)
    : false;

  const handleResetFilters = () => {
    setCategory('kids');
    setSelectedGenre(null);
    setSearchInput('');
    setDebouncedQuery('');
    setPage(1);
  };

  return (
    <div className="space-y-5">
      {/* Featured Series Spotlight (TMDB Backdrop) */}
      {featuredSeries && !debouncedQuery && (
        <section
          aria-label="Série em destaque"
          className="relative overflow-hidden rounded-[26px] border border-sky-300/45 shadow-[0_24px_56px_-12px_rgba(2,12,38,0.85)] min-h-[340px] sm:min-h-[390px] flex items-end sm:items-center bg-[#041e55]"
        >
          <TmdbImage
            src={tmdbImageUrl(featuredSeries.backdrop_path, 'w1280')}
            alt={featuredSeries.name}
            fallbackType="backdrop"
            className="absolute inset-0 z-0 h-full w-full object-cover object-center"
          />

          <div
            className="absolute inset-0 z-10 bg-gradient-to-r from-[#031642]/95 via-[#052669]/75 to-transparent"
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 z-10 bg-gradient-to-t from-[#031642]/90 via-transparent to-transparent"
            aria-hidden="true"
          />

          <div className="relative z-20 w-full max-w-[620px] px-6 sm:px-10 py-8 space-y-3.5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-950/75 border border-sky-300/45 backdrop-blur-md">
              <Tv className="w-3.5 h-3.5 text-amber-300 shrink-0" />
              <span className="text-[11px] font-bold uppercase tracking-wider text-sky-50">
                SÉRIE EM DESTAQUE
              </span>
            </div>

            <h1 className="font-display text-2xl sm:text-4xl font-black text-white leading-tight drop-shadow [text-wrap:balance]">
              {featuredSeries.name}
            </h1>

            <p className="text-xs sm:text-sm font-bold text-amber-300 flex items-center gap-2">
              {featuredSeries.first_air_date && (
                <span>{featuredSeries.first_air_date.slice(0, 4)}</span>
              )}
              {featuredSeries.first_air_date && <span aria-hidden="true">·</span>}
              <span className="inline-flex items-center gap-1 tabular-nums">
                <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
                {featuredSeries.vote_average.toFixed(1)}
              </span>
              <span aria-hidden="true">·</span>
              <span>Temporadas e Episódios</span>
            </p>

            <p className="text-sm text-sky-100/90 leading-relaxed line-clamp-3 max-w-lg">
              {featuredSeries.overview ||
                'Clique para conferir temporadas completas, episódios detalhados e elenco principal desta série.'}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                type="button"
                onClick={() => onSelectSeries(featuredSeries.id)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-display font-extrabold text-xs sm:text-sm uppercase tracking-wider shadow-[0_8px_24px_rgba(99,102,241,0.55)] ring-1 ring-sky-200/60 transition-transform hover:scale-[1.02] cursor-pointer"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Ver Temporadas e Elenco</span>
              </button>

              <button
                type="button"
                onClick={() => onToggleSavedSeries(featuredSeries)}
                className={`inline-flex items-center gap-2 px-5 py-3 rounded-full font-display font-bold text-xs sm:text-sm uppercase tracking-wider border backdrop-blur-md transition-colors cursor-pointer ${
                  isFeaturedSaved
                    ? 'bg-emerald-500/85 border-emerald-200 text-white'
                    : 'bg-blue-950/65 hover:bg-blue-900/80 border-sky-200/50 text-white'
                }`}
              >
                {isFeaturedSaved ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Na Minha Lista</span>
                  </>
                ) : (
                  <>
                    <Bookmark className="w-4 h-4" />
                    <span>Minha Lista</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Search, Collections & Genres Panel */}
      <section className="glass-panel rounded-[26px] p-4 sm:p-6 space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-sky-400/20 border border-sky-300/40 flex items-center justify-center">
              <Film className="w-4 h-4 text-amber-300" />
            </div>
            <div>
              <h2 className="font-display text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                Catálogo de Séries
              </h2>
              <p className="text-xs text-sky-200/85">
                Explore séries com temporadas, episódios e elenco completo
              </p>
            </div>
          </div>

          {/* Search Input */}
          <div className="relative w-full lg:w-80">
            <Search className="w-4 h-4 text-sky-200 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="search"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Buscar série por nome..."
              aria-label="Buscar série no catálogo"
              className="w-full pl-10 pr-10 py-2.5 rounded-full bg-blue-950/75 border border-sky-300/40 text-sm text-white placeholder:text-sky-200/60 focus:outline-none focus:ring-2 focus:ring-amber-300"
            />
            {searchInput && (
              <button
                type="button"
                onClick={() => setSearchInput('')}
                aria-label="Limpar busca de séries"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Collection Tabs */}
        <div className="flex flex-wrap items-center gap-2">
          {COLLECTION_TABS.map((tab) => {
            const active =
              !debouncedQuery && selectedGenre === null && category === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  setCategory(tab.id);
                  setSelectedGenre(null);
                  setSearchInput('');
                  setDebouncedQuery('');
                  setPage(1);
                }}
                className={`px-4 py-2 rounded-full text-xs font-extrabold uppercase tracking-wide border transition-all whitespace-nowrap cursor-pointer ${
                  active
                    ? 'bg-gradient-to-r from-orange-400 to-orange-600 border-amber-200 text-white shadow-[0_6px_18px_rgba(249,115,22,0.5)]'
                    : 'bg-blue-950/60 hover:bg-blue-800/70 border-sky-300/30 text-sky-100'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* TMDB Genres Filter Strip */}
        {genres.length > 0 && (
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            <span className="text-xs font-bold text-sky-200/80 whitespace-nowrap shrink-0 mr-1">
              Gêneros:
            </span>
            {genres.map((g) => {
              const active = !debouncedQuery && selectedGenre === g.id;
              return (
                <button
                  key={g.id}
                  type="button"
                  onClick={() => {
                    setSelectedGenre(active ? null : g.id);
                    setSearchInput('');
                    setDebouncedQuery('');
                    setPage(1);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap shrink-0 border transition-colors cursor-pointer ${
                    active
                      ? 'bg-sky-400 text-slate-950 border-white'
                      : 'bg-white/10 hover:bg-white/20 border-sky-300/25 text-sky-100'
                  }`}
                >
                  {g.name}
                </button>
              );
            })}
          </div>
        )}
      </section>

      {/* Series Results Grid */}
      <section className="glass-panel rounded-[26px] p-4 sm:p-6 space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm font-bold text-sky-100">
            {debouncedQuery
              ? `Resultados para "${debouncedQuery}"`
              : selectedGenre
              ? `Gênero: ${genres.find((g) => g.id === selectedGenre)?.name ?? 'Selecionado'}`
              : COLLECTION_TABS.find((c) => c.id === category)?.label}
            {!loading && totalResults > 0 && (
              <span className="text-sky-200/75 font-medium ml-2 tabular-nums">
                ({totalResults.toLocaleString('pt-BR')} séries)
              </span>
            )}
          </p>

          {(debouncedQuery || selectedGenre !== null) && (
            <button
              type="button"
              onClick={handleResetFilters}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-sky-300/30 text-xs font-bold text-white cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Limpar filtros</span>
            </button>
          )}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {Array.from({ length: 10 }).map((_, idx) => (
              <div
                key={idx}
                className="aspect-[2/3] rounded-2xl bg-blue-900/50 border border-sky-300/20 animate-pulse flex items-center justify-center"
              >
                <Loader2 className="w-6 h-6 text-sky-300/50 animate-spin" />
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="py-12 text-center space-y-3">
            <p className="font-display text-lg font-bold text-white">{error}</p>
            <button
              type="button"
              onClick={() => setReloadNonce((n) => n + 1)}
              className="px-5 py-2.5 rounded-full bg-orange-500 hover:bg-orange-400 text-white font-bold text-sm cursor-pointer"
            >
              Tentar novamente
            </button>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && seriesList.length === 0 && (
          <div className="py-12 text-center space-y-3">
            <p className="font-display text-lg font-bold text-white">
              Nenhuma série encontrada para esta busca.
            </p>
            <button
              type="button"
              onClick={handleResetFilters}
              className="px-5 py-2.5 rounded-full bg-orange-500 hover:bg-orange-400 text-white font-bold text-sm cursor-pointer"
            >
              Ver séries em destaque
            </button>
          </div>
        )}

        {/* Series Poster Cards */}
        {!loading && !error && seriesList.length > 0 && (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {seriesList.map((series) => {
                const isSaved = savedSeriesIds.includes(series.id);
                const year = series.first_air_date
                  ? series.first_air_date.slice(0, 4)
                  : 'Série';

                return (
                  <article key={series.id} className="group flex flex-col">
                    <div
                      onClick={() => onSelectSeries(series.id)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          onSelectSeries(series.id);
                        }
                      }}
                      className="relative aspect-[2/3] w-full rounded-2xl overflow-hidden kids-card-shadow border border-sky-200/35 bg-blue-950 transition-transform duration-200 group-hover:-translate-y-1 cursor-pointer focus-visible:outline-2 focus-visible:outline-amber-300"
                    >
                      <TmdbImage
                        src={tmdbImageUrl(series.poster_path, 'w500')}
                        alt={series.name}
                        fallbackType="poster"
                        fallbackLabel={series.name}
                        className="h-full w-full object-cover"
                      />

                      {/* TMDB Rating badge */}
                      <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-lg bg-blue-950/85 border border-sky-300/40 backdrop-blur-sm flex items-center gap-1 text-xs font-extrabold text-amber-300 tabular-nums">
                        <Star className="w-3 h-3 fill-amber-300 text-amber-300" />
                        <span>{series.vote_average.toFixed(1)}</span>
                      </div>

                      {/* Watchlist toggle button */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleSavedSeries(series);
                        }}
                        aria-label={
                          isSaved
                            ? `Remover ${series.name} da Minha Lista`
                            : `Adicionar ${series.name} à Minha Lista`
                        }
                        className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center border transition-colors cursor-pointer ${
                          isSaved
                            ? 'bg-emerald-500 border-emerald-200 text-white'
                            : 'bg-blue-950/80 border-sky-300/45 text-white hover:bg-blue-800'
                        }`}
                      >
                        {isSaved ? (
                          <Check className="w-4 h-4" />
                        ) : (
                          <Bookmark className="w-4 h-4" />
                        )}
                      </button>

                      {/* Hover Overlay CTA */}
                      <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-[#03153d]/95 via-[#03153d]/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                        <span className="inline-flex w-full items-center justify-center gap-1.5 py-2 rounded-full bg-orange-500 text-white text-xs font-extrabold uppercase tracking-wide shadow-md">
                          <Play className="w-3.5 h-3.5 fill-white" />
                          <span>Detalhes e Episódios</span>
                        </span>
                      </div>
                    </div>

                    <div className="pt-2.5 px-0.5">
                      <h3 className="font-display text-sm font-bold text-white truncate group-hover:text-amber-300 transition-colors">
                        {series.name}
                      </h3>
                      <p className="text-xs font-medium text-sky-200/80 tabular-nums">
                        {year} · ★ {series.vote_average.toFixed(1)}
                      </p>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-3 pt-4 border-t border-sky-300/20">
                <button
                  type="button"
                  disabled={page <= 1}
                  onClick={() => {
                    setPage((p) => Math.max(1, p - 1));
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-blue-950/70 hover:bg-blue-800 disabled:opacity-40 disabled:pointer-events-none border border-sky-300/35 text-xs font-bold text-white cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Anterior</span>
                </button>

                <span className="text-xs font-bold text-sky-100 tabular-nums px-2">
                  Página {page} de {totalPages}
                </span>

                <button
                  type="button"
                  disabled={page >= totalPages}
                  onClick={() => {
                    setPage((p) => Math.min(totalPages, p + 1));
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-blue-950/70 hover:bg-blue-800 disabled:opacity-40 disabled:pointer-events-none border border-sky-300/35 text-xs font-bold text-white cursor-pointer"
                >
                  <span>Próxima</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
};
