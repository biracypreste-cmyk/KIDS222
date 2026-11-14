export interface TmdbGenre {
  id: number;
  name: string;
}

export interface TmdbSeriesSummary {
  id: number;
  name: string;
  original_name: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  first_air_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids?: number[];
}

export interface TmdbSeriesListResponse {
  page: number;
  results: TmdbSeriesSummary[];
  total_pages: number;
  total_results: number;
}

export interface TmdbCastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
  order: number;
  known_for_department?: string;
}

export interface TmdbSeasonSummary {
  id: number;
  name: string;
  overview: string;
  poster_path: string | null;
  season_number: number;
  episode_count: number;
  air_date: string | null;
}

export interface TmdbEpisode {
  id: number;
  name: string;
  overview: string;
  episode_number: number;
  season_number: number;
  still_path: string | null;
  air_date: string | null;
  runtime: number | null;
  vote_average: number;
}

export interface TmdbSeasonDetail {
  id: number;
  name: string;
  overview: string;
  season_number: number;
  air_date: string | null;
  poster_path: string | null;
  episodes: TmdbEpisode[];
}

export interface TmdbVideo {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
}

export interface TmdbSeriesDetail {
  id: number;
  name: string;
  original_name: string;
  tagline: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  first_air_date: string;
  last_air_date: string;
  status: string;
  number_of_seasons: number;
  number_of_episodes: number;
  episode_run_time: number[];
  vote_average: number;
  vote_count: number;
  genres: TmdbGenre[];
  networks: { id: number; name: string; logo_path: string | null }[];
  created_by: { id: number; name: string }[];
  seasons: TmdbSeasonSummary[];
  credits?: {
    cast: TmdbCastMember[];
  };
  videos?: {
    results: TmdbVideo[];
  };
  content_ratings?: {
    results: { iso_3166_1: string; rating: string }[];
  };
  recommendations?: {
    results: TmdbSeriesSummary[];
  };
}

export type TmdbCollectionCategory =
  | 'kids'
  | 'animation'
  | 'popular'
  | 'trending'
  | 'top_rated'
  | 'family'
  | 'on_the_air';
