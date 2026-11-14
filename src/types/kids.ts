export type SidebarSection =
  | 'home'
  | 'busca'
  | 'notificacoes'
  | 'perfil'
  | 'assinatura'
  | 'minhas-listas';

export type TopTab =
  | 'recomendacoes'
  | 'filmes'
  | 'series'
  | 'animacoes'
  | 'recem-adicionados'
  | 'novelas';

export type CategoryId =
  | 'all'
  | 'filmes'
  | 'series'
  | 'animacoes'
  | 'aventura'
  | 'educativo'
  | 'musicais'
  | 'primeira-infancia'
  | 'familia';

export type ShowArtworkId =
  | 'patrulha-canina'
  | 'masha-urso'
  | 'peppa-pig'
  | 'bob-esponja'
  | 'super-wings'
  | 'mundo-bita'
  | 'galinha-pintadinha'
  | 'luccas-neto'
  | 'os-aventureiros'
  | 'sitio-picapau'
  | 'dora-aventureira'
  | 'turma-monica'
  | 'show-luna'
  | 'carrossel-encantado';

export interface EpisodeItem {
  id: string;
  number: number;
  title: string;
  durationMinutes: number;
  synopsis: string;
}

export interface ShowItem {
  id: string;
  title: string;
  artworkId: ShowArtworkId;
  ageRating: 'Livre' | '0–3 anos' | '4+ anos' | '6+ anos';
  year: number;
  type: 'Animação' | 'Série' | 'Filme' | 'Musical' | 'Novela';
  categories: CategoryId[];
  topTabs: TopTab[];
  synopsis: string;
  featuredRank?: number;
  isFeaturedHighlight?: boolean;
  isNewRelease?: boolean;
  defaultProgress?: number; // 0 to 100
  episodes: EpisodeItem[];
}

export interface HeroSlide {
  id: string;
  showId: string;
  badgeText: string;
  title: string;
  subtitle: string;
  description: string;
  themeVariant: 'wonderland' | 'rescue' | 'rainbow' | 'ocean' | 'forest' | 'sitio';
  primaryCtaLabel: string;
}

export interface CategoryOption {
  id: CategoryId;
  label: string;
  sublabel?: string;
  gradient: string;
  borderGlow: string;
  iconName:
    | 'film'
    | 'tv'
    | 'paw'
    | 'gamepad'
    | 'graduation'
    | 'music'
    | 'baby'
    | 'users';
}

export interface KidProfile {
  id: string;
  name: string;
  ageLabel: string;
  avatarBg: string;
  maxAgeFilter: 'all' | '0-3' | '4-7';
  favoriteTheme: string;
}

export interface KidsNotification {
  id: string;
  title: string;
  detail: string;
  timeAgo: string;
  showId: string;
  unread: boolean;
}
