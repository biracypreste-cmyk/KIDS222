import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowLeft,
  Bookmark,
  Calendar,
  Check,
  Clock,
  Film,
  Layers,
  Loader2,
  Play,
  Star,
  Tv,
  Users,
  X,
} from 'lucide-react';
import {
  fetchTmdbSeasonDetail,
  fetchTmdbSeriesDetail,
  tmdbImageUrl,
} from '../services/tmdbApi';
import {
  TmdbEpisode,
  TmdbSeasonDetail,
  TmdbSeriesDetail,
  TmdbSeriesSummary,
} from '../types/tmdb';
import { TmdbImage } from './TmdbImage';

interface SeriesDetailPageProps {
  seriesId: number;
  onBack: () => void;
  onSelectRelatedSeries: (seriesId: number) => void;
  isSaved: boolean;
  onToggleSaved: (series: TmdbSeriesSummary) => void;
}

export const SeriesDetailPage: React.FC<SeriesDetailPageProps> = ({
  seriesId,
  onBack,
  onSelectRelatedSeries,
  isSaved,
  onToggleSaved,
}) => {
  const [detail, setDetail] = useState<TmdbSeriesDetail | null>(null);
  const [loadingDetail, setLoadingDetail] = useState(true);
  const [errorDetail, setErrorDetail] = useState<string | null>(null);

  const [selectedSeasonNumber, setSelectedSeasonNumber] = useState<number>(1);
  const [seasonDetail, setSeasonDetail] = useState<TmdbSeasonDetail | null>(null);
  const [loadingSeason, setLoadingSeason] = useState(false);
  const [seasonError, setSeasonError] = useState<string | null>(null);

  const [playerModal, setPlayerModal] = useState<{
    mode: 'trailer' | 'episode';
    title: string;
    subtitle: string;
    youtubeKey?: string;
    stillPath?: string | null;
    overview?: string;
  } | null>(null);

  // Load series details
  useEffect(() => {
    let active = true;
    setLoadingDetail(true);
    setErrorDetail(null);
    setDetail(null);
    setSeasonDetail(null);

    fetchTmdbSeriesDetail(seriesId)
      .then((data) => {
        if (!active) return;
        setDetail(data);
        const regularSeasons = (data.seasons ?? []).filter(
          (s) => s.season_number > 0
        );
        const initialSeason =
          regularSeasons[0]?.season_number ??
          data.seasons?.[0]?.season_number ??
          1;
        setSelectedSeasonNumber(initialSeason);
        setLoadingDetail(false);
      })
      .catch((err) => {
        if (!active) return;
        setErrorDetail(
          err instanceof Error ? err.message : 'Erro ao carregar série.'
        );
        setLoadingDetail(false);
      });

    return () => {
      active = false;
    };
  }, [seriesId]);

  // Load selected season episodes
  useEffect(() => {
    if (!detail) return;
    let active = true;
    setLoadingSeason(true);
    setSeasonError(null);

    fetchTmdbSeasonDetail(detail.id, selectedSeasonNumber)
      .then((data) => {
        if (!active) return;
        setSeasonDetail(data);
        setLoadingSeason(false);
      })
      .catch((err) => {
        if (!active) return;
        setSeasonError(
          err instanceof Error
            ? err.message
            : 'Não foi possível carregar os episódios.'
        );
        setLoadingSeason(false);
      });

    return () => {
      active = false;
    };
  }, [detail, selectedSeasonNumber]);

  const sortedSeasons = useMemo(() => {
    if (!detail?.seasons) return [];
    const regular = detail.seasons.filter((s) => s.season_number > 0);
    const specials = detail.seasons.filter((s) => s.season_number === 0);
    return [...regular, ...specials];
  }, [detail]);

  const trailerVideo = useMemo(() => {
    const videos = detail?.videos?.results ?? [];
    return (
      videos.find((v) => v.site === 'YouTube' && v.type === 'Trailer') ??
      videos.find((v) => v.site === 'YouTube') ??
      null
    );
  }, [detail]);

  const ageRating = useMemo(() => {
    const list = detail?.content_ratings?.results ?? [];
    const br = list.find((r) => r.iso_3166_1 === 'BR');
    const us = list.find((r) => r.iso_3166_1 === 'US');
    return br?.rating || us?.rating || 'Livre';
  }, [detail]);

  const castList = useMemo(
    () => (detail?.credits?.cast ?? []).slice(0, 18),
    [detail]
  );

  const recommendations = useMemo(
    () => (detail?.recommendations?.results ?? []).slice(0, 10),
    [detail]
  );

  if (loadingDetail) {
    return (
      <div className="glass-panel rounded-[26px] p-12 flex flex-col items-center justify-center gap-4 min-h-[420px]">
        <Loader2 className="w-10 h-10 text-amber-300 animate-spin" />
        <p className="font-display font-bold text-lg text-white">
          Carregando detalhes, temporadas e elenco...
        </p>
      </div>
    );
  }

  if (errorDetail || !detail) {
    return (
      <div className="glass-panel rounded-[26px] p-10 text-center space-y-4">
        <p className="font-display text-xl font-bold text-white">
          {errorDetail ?? 'Série não encontrada.'}
        </p>
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-orange-500 hover:bg-orange-400 text-white font-bold text-sm cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar para Séries</span>
        </button>
      </div>
    );
  }

  const firstYear = detail.first_air_date
    ? detail.first_air_date.slice(0, 4)
    : '—';
  const summaryForWatchlist: TmdbSeriesSummary = {
    id: detail.id,
    name: detail.name,
    original_name: detail.original_name,
    overview: detail.overview,
    poster_path: detail.poster_path,
    backdrop_path: detail.backdrop_path,
    first_air_date: detail.first_air_date,
    vote_average: detail.vote_average,
    vote_count: detail.vote_count,
  };

  const handleWatchEpisode = (ep: TmdbEpisode) => {
    setPlayerModal({
      mode: 'episode',
      title: `T${String(ep.season_number).padStart(2, '0')} · E${String(
        ep.episode_number
      ).padStart(2, '0')} — ${ep.name}`,
      subtitle: `${detail.name} · ${ep.runtime ? `${ep.runtime} min` : 'Episódio Completo'}`,
      stillPath: ep.still_path ?? detail.backdrop_path,
      overview: ep.overview,
    });
  };

  return (
    <div className="space-y-6">
      {/* Top Back Bar */}
      <div className="flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-pill hover:bg-blue-700/80 text-xs sm:text-sm font-extrabold text-white transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-amber-300" />
          <span>Voltar para Séries</span>
        </button>

        <span className="text-xs font-bold text-sky-200/80 hidden sm:inline">
          Dados atualizados via TMDB
        </span>
      </div>

      {/* Main Hero Detail Banner */}
      <section className="relative overflow-hidden rounded-[28px] border border-sky-300/45 shadow-[0_24px_60px_-14px_rgba(2,12,38,0.9)] bg-[#041e55]">
        <TmdbImage
          src={tmdbImageUrl(detail.backdrop_path, 'original')}
          alt={detail.name}
          fallbackType="backdrop"
          className="absolute inset-0 z-0 h-full w-full object-cover object-center"
        />

        <div
          className="absolute inset-0 z-10 bg-gradient-to-r from-[#03153d]/96 via-[#052568]/85 to-[#062d78]/65"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 z-10 bg-gradient-to-t from-[#03153d] via-transparent to-transparent"
          aria-hidden="true"
        />

        <div className="relative z-20 p-5 sm:p-8 lg:p-10 flex flex-col md:flex-row gap-6 lg:gap-8 items-start">
          {/* Poster Card */}
          <div className="w-40 sm:w-48 lg:w-56 shrink-0 aspect-[2/3] rounded-2xl overflow-hidden border-2 border-sky-200/50 shadow-2xl bg-blue-950 mx-auto md:mx-0">
            <TmdbImage
              src={tmdbImageUrl(detail.poster_path, 'w500')}
              alt={`Pôster de ${detail.name}`}
              fallbackType="poster"
              fallbackLabel={detail.name}
              className="h-full w-full object-cover"
            />
          </div>

          {/* Series Metadata & Synopsis */}
          <div className="flex-1 min-w-0 space-y-4">
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2.5 text-xs font-bold text-amber-300">
                <span className="inline-flex items-center gap-1 tabular-nums">
                  <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
                  {detail.vote_average.toFixed(1)}
                </span>
                <span aria-hidden="true">·</span>
                <span className="tabular-nums">{firstYear}</span>
                <span aria-hidden="true">·</span>
                <span className="tabular-nums">
                  {detail.number_of_seasons}{' '}
                  {detail.number_of_seasons === 1 ? 'Temporada' : 'Temporadas'}
                </span>
                <span aria-hidden="true">·</span>
                <span className="tabular-nums">
                  {detail.number_of_episodes} Episódios
                </span>
                <span aria-hidden="true">·</span>
                <span>Classificação: {ageRating}</span>
              </div>

              <h1 className="font-display text-2xl sm:text-4xl lg:text-5xl font-black text-white leading-tight [text-wrap:balance]">
                {detail.name}
              </h1>

              {detail.original_name && detail.original_name !== detail.name && (
                <p className="text-xs sm:text-sm font-medium text-sky-200/80">
                  Título original: {detail.original_name}
                </p>
              )}

              {detail.tagline && (
                <p className="text-sm italic text-amber-200/95 pt-0.5">
                  "{detail.tagline}"
                </p>
              )}
            </div>

            {/* Clean unboxed genres & networks */}
            {detail.genres.length > 0 && (
              <p className="text-xs sm:text-sm font-semibold text-sky-100">
                {detail.genres.map((g) => g.name).join(' · ')}
              </p>
            )}

            <p className="text-sm sm:text-base text-sky-50/90 leading-relaxed max-w-3xl">
              {detail.overview ||
                'Sinopse em português ainda não disponível no TMDB para este título.'}
            </p>

            {/* Creators & Networks */}
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-sky-200/85">
              {detail.created_by.length > 0 && (
                <span>
                  <strong className="text-white">Criação:</strong>{' '}
                  {detail.created_by.map((c) => c.name).join(', ')}
                </span>
              )}
              {detail.networks.length > 0 && (
                <span>
                  <strong className="text-white">Exibição:</strong>{' '}
                  {detail.networks.map((n) => n.name).join(', ')}
                </span>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              {seasonDetail?.episodes?.[0] ? (
                <button
                  type="button"
                  onClick={() => handleWatchEpisode(seasonDetail.episodes[0])}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-display font-extrabold text-xs sm:text-sm uppercase tracking-wider shadow-[0_8px_24px_rgba(99,102,241,0.55)] ring-1 ring-sky-200/60 transition-transform hover:scale-[1.02] cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>Assistir Episódio 1</span>
                </button>
              ) : null}

              {trailerVideo && (
                <button
                  type="button"
                  onClick={() =>
                    setPlayerModal({
                      mode: 'trailer',
                      title: `${detail.name} — Trailer Oficial`,
                      subtitle: trailerVideo.name,
                      youtubeKey: trailerVideo.key,
                    })
                  }
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-orange-500 hover:bg-orange-400 text-white font-display font-extrabold text-xs sm:text-sm uppercase tracking-wider shadow-lg cursor-pointer"
                >
                  <Film className="w-4 h-4" />
                  <span>Ver Trailer</span>
                </button>
              )}

              <button
                type="button"
                onClick={() => onToggleSaved(summaryForWatchlist)}
                className={`inline-flex items-center gap-2 px-5 py-3 rounded-full font-display font-bold text-xs sm:text-sm uppercase tracking-wider border backdrop-blur-md transition-colors cursor-pointer ${
                  isSaved
                    ? 'bg-emerald-500/85 border-emerald-200 text-white'
                    : 'bg-blue-950/65 hover:bg-blue-900/80 border-sky-200/50 text-white'
                }`}
              >
                {isSaved ? (
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
        </div>
      </section>

      {/* Temporadas e Episódios Section */}
      <section
        aria-labelledby="temporadas-heading"
        className="glass-panel rounded-[26px] p-5 sm:p-7 space-y-5"
      >
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-400/20 border border-amber-300/40 flex items-center justify-center">
              <Layers className="w-4 h-4 text-amber-300" />
            </div>
            <div>
              <h2
                id="temporadas-heading"
                className="font-display text-xl sm:text-2xl font-extrabold text-white"
              >
                Temporadas e Episódios
              </h2>
              <p className="text-xs text-sky-200/85">
                Selecione uma temporada para ver todos os episódios
              </p>
            </div>
          </div>

          {seasonDetail && (
            <span className="text-xs font-bold text-amber-300 tabular-nums">
              {seasonDetail.episodes.length}{' '}
              {seasonDetail.episodes.length === 1 ? 'episódio' : 'episódios'}
            </span>
          )}
        </div>

        {/* Season Selector Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          {sortedSeasons.map((season) => {
            const active = season.season_number === selectedSeasonNumber;
            const label =
              season.season_number === 0
                ? 'Especiais'
                : `Temporada ${season.season_number}`;

            return (
              <button
                key={season.id}
                type="button"
                onClick={() => setSelectedSeasonNumber(season.season_number)}
                aria-pressed={active}
                className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-extrabold whitespace-nowrap shrink-0 border transition-all cursor-pointer ${
                  active
                    ? 'bg-gradient-to-r from-orange-400 to-orange-600 border-amber-200 text-white shadow-[0_6px_18px_rgba(249,115,22,0.5)]'
                    : 'bg-blue-950/65 hover:bg-blue-800/75 border-sky-300/30 text-sky-100'
                }`}
              >
                {label}{' '}
                <span className="opacity-80 font-semibold tabular-nums ml-1">
                  ({season.episode_count})
                </span>
              </button>
            );
          })}
        </div>

        {/* Season Loading / Error / Episodes List */}
        {loadingSeason && (
          <div className="py-10 flex items-center justify-center gap-3 text-sky-100">
            <Loader2 className="w-6 h-6 text-amber-300 animate-spin" />
            <span className="font-semibold text-sm">
              Carregando episódios da temporada...
            </span>
          </div>
        )}

        {!loadingSeason && seasonError && (
          <div className="py-8 text-center text-sm text-rose-200">
            {seasonError}
          </div>
        )}

        {!loadingSeason && !seasonError && seasonDetail && (
          <div className="space-y-3">
            {seasonDetail.episodes.length === 0 ? (
              <p className="py-8 text-center text-sm text-sky-200">
                Nenhum episódio cadastrado para esta temporada.
              </p>
            ) : (
              seasonDetail.episodes.map((ep) => (
                <article
                  key={ep.id}
                  className="group flex flex-col sm:flex-row gap-4 p-3.5 sm:p-4 rounded-2xl bg-blue-950/60 hover:bg-blue-900/65 border border-sky-300/25 hover:border-sky-300/55 transition-colors"
                >
                  {/* Episode Still Thumbnail */}
                  <div
                    onClick={() => handleWatchEpisode(ep)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleWatchEpisode(ep);
                      }
                    }}
                    className="relative w-full sm:w-52 aspect-video rounded-xl overflow-hidden shrink-0 bg-blue-950 border border-sky-300/30 cursor-pointer"
                  >
                    <TmdbImage
                      src={tmdbImageUrl(ep.still_path, 'w300')}
                      alt={ep.name}
                      fallbackType="episode"
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-slate-950/35 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="w-11 h-11 rounded-full bg-orange-500 text-white flex items-center justify-center shadow-lg">
                        <Play className="w-5 h-5 fill-white ml-0.5" />
                      </span>
                    </div>
                  </div>

                  {/* Episode Details */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between gap-2">
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h3 className="font-display font-extrabold text-base text-white">
                          <span className="text-amber-300 tabular-nums mr-1.5">
                            E{String(ep.episode_number).padStart(2, '0')}
                          </span>
                          {ep.name}
                        </h3>

                        <div className="flex items-center gap-3 text-xs font-semibold text-sky-200/85 tabular-nums">
                          {ep.runtime ? (
                            <span className="inline-flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5" />
                              {ep.runtime} min
                            </span>
                          ) : null}
                          {ep.air_date ? (
                            <span className="inline-flex items-center gap-1">
                              <Calendar className="w-3.5 h-3.5" />
                              {new Date(ep.air_date).toLocaleDateString('pt-BR')}
                            </span>
                          ) : null}
                          {ep.vote_average > 0 ? (
                            <span className="inline-flex items-center gap-1 text-amber-300">
                              <Star className="w-3.5 h-3.5 fill-amber-300" />
                              {ep.vote_average.toFixed(1)}
                            </span>
                          ) : null}
                        </div>
                      </div>

                      <p className="text-xs sm:text-sm text-sky-100/85 leading-relaxed line-clamp-3">
                        {ep.overview ||
                          'Sinopse do episódio não informada em português no TMDB.'}
                      </p>
                    </div>

                    <div>
                      <button
                        type="button"
                        onClick={() => handleWatchEpisode(ep)}
                        className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/10 hover:bg-orange-500 border border-sky-300/35 hover:border-orange-300 text-xs font-bold text-white transition-colors cursor-pointer"
                      >
                        <Play className="w-3.5 h-3.5 fill-white" />
                        <span>Assistir Episódio</span>
                      </button>
                    </div>
                  </div>
                </article>
              ))
            )}
          </div>
        )}
      </section>

      {/* Elenco Principal (Cast) Section */}
      <section
        aria-labelledby="elenco-heading"
        className="glass-panel rounded-[26px] p-5 sm:p-7 space-y-4"
      >
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-sky-400/20 border border-sky-300/40 flex items-center justify-center">
            <Users className="w-4 h-4 text-sky-200" />
          </div>
          <div>
            <h2
              id="elenco-heading"
              className="font-display text-xl sm:text-2xl font-extrabold text-white"
            >
              Elenco Principal
            </h2>
            <p className="text-xs text-sky-200/85">
              Atores, dubladores e personagens da série
            </p>
          </div>
        </div>

        {castList.length === 0 ? (
          <p className="text-sm text-sky-200 py-4">
            Informações de elenco não disponíveis para esta série no TMDB.
          </p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5">
            {castList.map((member) => (
              <article
                key={`${member.id}-${member.character}`}
                className="rounded-2xl overflow-hidden bg-blue-950/65 border border-sky-300/30 flex flex-col"
              >
                <div className="aspect-[3/4] w-full bg-blue-900/50 overflow-hidden">
                  <TmdbImage
                    src={tmdbImageUrl(member.profile_path, 'w185')}
                    alt={member.name}
                    fallbackType="person"
                    fallbackLabel={member.name}
                    className="h-full w-full object-cover object-top"
                  />
                </div>
                <div className="p-2.5 space-y-0.5">
                  <h3 className="font-display text-xs sm:text-sm font-bold text-white truncate">
                    {member.name}
                  </h3>
                  <p className="text-[11px] text-amber-200/90 truncate">
                    {member.character || member.known_for_department || 'Elenco'}
                  </p>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* Séries Semelhantes / Recomendações */}
      {recommendations.length > 0 && (
        <section
          aria-labelledby="semelhantes-heading"
          className="glass-panel rounded-[26px] p-5 sm:p-7 space-y-4"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-purple-400/20 border border-purple-300/40 flex items-center justify-center">
              <Tv className="w-4 h-4 text-purple-200" />
            </div>
            <h2
              id="semelhantes-heading"
              className="font-display text-xl sm:text-2xl font-extrabold text-white"
            >
              Séries Relacionadas
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3.5">
            {recommendations.map((rec) => (
              <button
                key={rec.id}
                type="button"
                onClick={() => {
                  onSelectRelatedSeries(rec.id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="group text-left flex flex-col cursor-pointer focus-visible:outline-2 focus-visible:outline-amber-300 rounded-2xl"
              >
                <div className="relative aspect-[2/3] w-full rounded-2xl overflow-hidden border border-sky-300/35 kids-card-shadow bg-blue-950 transition-transform group-hover:-translate-y-1">
                  <TmdbImage
                    src={tmdbImageUrl(rec.poster_path, 'w500')}
                    alt={rec.name}
                    fallbackType="poster"
                    fallbackLabel={rec.name}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded-lg bg-blue-950/85 text-xs font-extrabold text-amber-300 flex items-center gap-1 tabular-nums">
                    <Star className="w-3 h-3 fill-amber-300" />
                    {rec.vote_average.toFixed(1)}
                  </div>
                </div>
                <span className="pt-2 font-display text-xs sm:text-sm font-bold text-white truncate group-hover:text-amber-300">
                  {rec.name}
                </span>
              </button>
            ))}
          </div>
        </section>
      )}

      {/* Episode / Trailer Player Modal */}
      {playerModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#020e2b]/85 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          onClick={() => setPlayerModal(null)}
        >
          <div
            className="glass-panel relative w-full max-w-4xl rounded-[28px] p-4 sm:p-6 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-display text-lg sm:text-xl font-extrabold text-white">
                  {playerModal.title}
                </h3>
                <p className="text-xs sm:text-sm text-sky-200">
                  {playerModal.subtitle}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setPlayerModal(null)}
                aria-label="Fechar reprodução"
                className="w-9 h-9 rounded-full bg-blue-950/80 hover:bg-orange-500 border border-sky-300/40 text-white flex items-center justify-center shrink-0 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-sky-300/35 bg-black">
              {playerModal.mode === 'trailer' && playerModal.youtubeKey ? (
                <iframe
                  title={playerModal.title}
                  src={`https://www.youtube.com/embed/${playerModal.youtubeKey}?autoplay=1`}
                  allow="autoplay; encrypted-media; picture-in-picture"
                  allowFullScreen
                  className="h-full w-full border-0"
                />
              ) : (
                <div className="relative h-full w-full">
                  <TmdbImage
                    src={tmdbImageUrl(playerModal.stillPath, 'w1280')}
                    alt={playerModal.title}
                    fallbackType="episode"
                    className="h-full w-full object-cover opacity-50"
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 bg-[#03153d]/55 space-y-3">
                    <div className="w-16 h-16 rounded-full bg-orange-500 flex items-center justify-center shadow-[0_0_30px_rgba(249,115,22,0.7)]">
                      <Play className="w-7 h-7 fill-white text-white ml-1" />
                    </div>
                    <p className="font-display font-bold text-lg text-white max-w-lg">
                      {playerModal.title}
                    </p>
                    {playerModal.overview && (
                      <p className="text-xs sm:text-sm text-sky-100/90 max-w-xl line-clamp-3">
                        {playerModal.overview}
                      </p>
                    )}
                    <span className="text-xs font-bold text-amber-300">
                      Reprodução pronta · Áudio Português (BR)
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
