import {
  TmdbCollectionCategory,
  TmdbGenre,
  TmdbSeasonDetail,
  TmdbSeriesDetail,
  TmdbSeriesListResponse,
} from '../types/tmdb';

export function tmdbImageUrl(
  path: string | null | undefined,
  size: 'w185' | 'w300' | 'w500' | 'w780' | 'w1280' | 'original' = 'w500'
): string | null {
  if (!path) return null;
  return `https://image.tmdb.org/t/p/${size}${path}`;
}

export async function fetchTmdbGenres(): Promise<TmdbGenre[]> {
  const res = await fetch('/api/tmdb/genres');
  if (!res.ok) {
    throw new Error('Falha ao carregar gêneros do TMDB.');
  }
  const data = (await res.json()) as { genres?: TmdbGenre[] };
  return data.genres ?? [];
}

export async function fetchTmdbSeries(params: {
  category?: TmdbCollectionCategory;
  genre?: number | null;
  query?: string;
  page?: number;
}): Promise<TmdbSeriesListResponse> {
  const qs = new URLSearchParams();
  if (params.category) qs.set('category', params.category);
  if (params.genre) qs.set('genre', String(params.genre));
  if (params.query && params.query.trim()) qs.set('query', params.query.trim());
  qs.set('page', String(params.page ?? 1));

  const res = await fetch(`/api/tmdb/series?${qs.toString()}`);
  if (!res.ok) {
    throw new Error('Não foi possível carregar as séries do TMDB.');
  }
  return (await res.json()) as TmdbSeriesListResponse;
}

export async function fetchTmdbSeriesDetail(
  seriesId: number
): Promise<TmdbSeriesDetail> {
  const res = await fetch(`/api/tmdb/series/${seriesId}`);
  if (!res.ok) {
    throw new Error('Não foi possível carregar os detalhes da série.');
  }
  return (await res.json()) as TmdbSeriesDetail;
}

export async function fetchTmdbSeasonDetail(
  seriesId: number,
  seasonNumber: number
): Promise<TmdbSeasonDetail> {
  const res = await fetch(
    `/api/tmdb/series/${seriesId}/season/${seasonNumber}`
  );
  if (!res.ok) {
    throw new Error('Não foi possível carregar os episódios desta temporada.');
  }
  return (await res.json()) as TmdbSeasonDetail;
}
