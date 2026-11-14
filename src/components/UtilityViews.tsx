import React, { useState } from 'react';
import {
  Bell,
  Bookmark,
  Check,
  CheckCircle2,
  Crown,
  Play,
  Search,
  ShieldCheck,
  Sparkles,
  UserCheck,
  X,
} from 'lucide-react';
import { KID_PROFILES } from '../data/kidsCatalog';
import { tmdbImageUrl } from '../services/tmdbApi';
import { KidProfile, KidsNotification, ShowItem } from '../types/kids';
import { TmdbSeriesSummary } from '../types/tmdb';
import { ShowCarousel } from './ShowCarousel';
import { TmdbImage } from './TmdbImage';

interface SearchSectionProps {
  allShows: ShowItem[];
  progressMap: Record<string, number>;
  watchlist: string[];
  onSelectShow: (show: ShowItem, autoPlay?: boolean) => void;
  onToggleWatchlist: (showId: string) => void;
}

const QUICK_TERMS = ['Patrulha', 'Bita', 'Peppa', 'Aventura', 'Musical', 'Sítio'];

export const SearchSection: React.FC<SearchSectionProps> = ({
  allShows,
  progressMap,
  watchlist,
  onSelectShow,
  onToggleWatchlist,
}) => {
  const [query, setQuery] = useState('');

  const normalized = query.trim().toLowerCase();
  const filtered = normalized
    ? allShows.filter(
        (s) =>
          s.title.toLowerCase().includes(normalized) ||
          s.type.toLowerCase().includes(normalized) ||
          s.synopsis.toLowerCase().includes(normalized)
      )
    : allShows;

  return (
    <section className="space-y-6">
      <div className="glass-panel rounded-[28px] p-5 sm:p-7 space-y-4">
        <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
          Buscar no M+ Kids
        </h1>
        <div className="relative">
          <Search className="w-5 h-5 text-sky-200 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Digite o nome do desenho, filme ou personagem..."
            aria-label="Buscar conteúdo infantil"
            className="w-full pl-12 pr-12 py-3.5 rounded-2xl bg-blue-950/75 border border-sky-300/40 text-white placeholder:text-sky-200/60 focus:outline-none focus:ring-2 focus:ring-amber-300 text-sm sm:text-base"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              aria-label="Limpar busca"
              className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-sky-200 mr-1">
            Buscas rápidas:
          </span>
          {QUICK_TERMS.map((term) => (
            <button
              key={term}
              type="button"
              onClick={() => setQuery(term)}
              className="px-3 py-1 rounded-xl bg-white/10 hover:bg-orange-500/80 border border-sky-300/30 text-xs font-bold text-white transition-colors cursor-pointer"
            >
              {term}
            </button>
          ))}
        </div>
      </div>

      {filtered.length > 0 ? (
        <ShowCarousel
          title={normalized ? `Resultados para "${query}"` : 'Todo o Catálogo Kids'}
          iconType="sparkles"
          shows={filtered}
          progressMap={progressMap}
          watchlist={watchlist}
          layout="grid"
          onSelectShow={onSelectShow}
          onToggleWatchlist={onToggleWatchlist}
        />
      ) : (
        <div className="glass-panel rounded-3xl p-10 text-center space-y-3">
          <p className="font-display text-xl font-bold text-white">
            Nenhum título encontrado para "{query}"
          </p>
          <p className="text-sm text-sky-200">
            Tente buscar por Patrulha Canina, Mundo Bita, Peppa Pig ou Filmes.
          </p>
          <button
            type="button"
            onClick={() => setQuery('')}
            className="px-5 py-2.5 rounded-full bg-orange-500 hover:bg-orange-400 text-white font-bold text-sm cursor-pointer"
          >
            Ver todos os títulos
          </button>
        </div>
      )}
    </section>
  );
};

interface NotificationsSectionProps {
  notifications: KidsNotification[];
  allShows: ShowItem[];
  onMarkAllRead: () => void;
  onOpenShow: (show: ShowItem) => void;
}

export const NotificationsSection: React.FC<NotificationsSectionProps> = ({
  notifications,
  allShows,
  onMarkAllRead,
  onOpenShow,
}) => {
  return (
    <section className="glass-panel rounded-[28px] p-5 sm:p-8 space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-orange-500/25 border border-orange-300/50 flex items-center justify-center">
            <Bell className="w-5 h-5 text-amber-300" />
          </div>
          <div>
            <h1 className="font-display text-2xl font-extrabold text-white">
              Notificações Kids
            </h1>
            <p className="text-xs sm:text-sm text-sky-200">
              Novidades, estreias e novos episódios dos seus favoritos
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onMarkAllRead}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-sky-300/35 text-xs font-bold text-white cursor-pointer"
        >
          <CheckCircle2 className="w-4 h-4 text-emerald-300" />
          <span>Marcar tudo como lido</span>
        </button>
      </div>

      <div className="space-y-3">
        {notifications.map((item) => {
          const targetShow = allShows.find((s) => s.id === item.showId);
          return (
            <div
              key={item.id}
              className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl border transition-colors ${
                item.unread
                  ? 'bg-blue-800/45 border-amber-300/50'
                  : 'bg-blue-950/50 border-sky-300/20'
              }`}
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h2 className="font-display font-bold text-base text-white">
                    {item.title}
                  </h2>
                  {item.unread && (
                    <span className="text-[11px] font-bold text-amber-300">
                      · Novo
                    </span>
                  )}
                </div>
                <p className="text-sm text-sky-100/85">{item.detail}</p>
                <p className="text-xs text-sky-200/70">{item.timeAgo}</p>
              </div>

              {targetShow && (
                <button
                  type="button"
                  onClick={() => onOpenShow(targetShow)}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-orange-500 hover:bg-orange-400 text-white text-xs font-extrabold uppercase tracking-wide shrink-0 cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-white" />
                  <span>Assistir</span>
                </button>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

interface ProfileSectionProps {
  activeProfile: KidProfile;
  onSelectProfile: (profile: KidProfile) => void;
  safeAgeFilter: 'all' | '0-3' | '4-7';
  onChangeAgeFilter: (mode: 'all' | '0-3' | '4-7') => void;
}

export const ProfileSection: React.FC<ProfileSectionProps> = ({
  activeProfile,
  onSelectProfile,
  safeAgeFilter,
  onChangeAgeFilter,
}) => {
  return (
    <section className="glass-panel rounded-[28px] p-5 sm:p-8 space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-2xl bg-sky-400/20 border border-sky-300/40 flex items-center justify-center">
          <UserCheck className="w-5 h-5 text-sky-200" />
        </div>
        <div>
          <h1 className="font-display text-2xl font-extrabold text-white">
            Perfis e Controle Parental
          </h1>
          <p className="text-xs sm:text-sm text-sky-200">
            Escolha quem está assistindo para adaptar o catálogo por faixa etária
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {KID_PROFILES.map((profile) => {
          const isSelected = activeProfile.id === profile.id;
          return (
            <button
              key={profile.id}
              type="button"
              onClick={() => {
                onSelectProfile(profile);
                onChangeAgeFilter(profile.maxAgeFilter);
              }}
              className={`flex items-center gap-4 p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                isSelected
                  ? 'bg-orange-500/20 border-amber-300 ring-2 ring-amber-300/60'
                  : 'bg-blue-950/55 hover:bg-blue-900/60 border-sky-300/30'
              }`}
            >
              <div
                className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${profile.avatarBg} flex items-center justify-center font-display text-2xl font-black text-white shadow-lg shrink-0`}
              >
                {profile.name.charAt(0)}
              </div>
              <div className="min-w-0">
                <p className="font-display font-extrabold text-lg text-white truncate">
                  {profile.name}
                </p>
                <p className="text-xs font-bold text-amber-300">
                  {profile.ageLabel}
                </p>
                <p className="text-xs text-sky-100/80 truncate mt-0.5">
                  {profile.favoriteTheme}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      <div className="p-5 rounded-2xl bg-blue-950/60 border border-sky-300/30 space-y-3">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-300" />
          <h2 className="font-display font-bold text-base text-white">
            Filtro de Faixa Etária Ativo
          </h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'all' as const, label: 'Catálogo Completo (Livre e 6+)' },
            { id: '4-7' as const, label: 'Infantil (Livre até 5 anos)' },
            { id: '0-3' as const, label: 'Primeira Infância (0–3 anos)' },
          ].map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => onChangeAgeFilter(opt.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                safeAgeFilter === opt.id
                  ? 'bg-emerald-500 border-emerald-200 text-white'
                  : 'bg-white/10 hover:bg-white/20 border-sky-300/30 text-sky-100'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export const SubscriptionSection: React.FC<{ onGoHome: () => void }> = ({
  onGoHome,
}) => {
  const [selectedPlan, setSelectedPlan] = useState<'mensal' | 'anual'>('anual');
  const [confirmed, setConfirmed] = useState(false);

  return (
    <section className="glass-panel rounded-[28px] p-5 sm:p-8 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-400/20 border border-amber-300/50 flex items-center justify-center">
            <Crown className="w-5 h-5 text-amber-300" />
          </div>
          <div>
            <h1 className="font-display text-2xl font-extrabold text-white">
              Assinatura M+ Kids Família
            </h1>
            <p className="text-xs sm:text-sm text-sky-200">
              Ambiente 100% seguro, sem anúncios e com controle parental
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          {
            id: 'mensal' as const,
            name: 'Plano Mensal Kids',
            price: 'R$ 24,90/mês',
            perks: [
              'Acesso completo a filmes, séries e desenhos',
              'Até 3 perfis infantis simultâneos',
              'Qualidade Full HD sem propagandas',
            ],
          },
          {
            id: 'anual' as const,
            name: 'Plano Família Anual',
            price: 'R$ 19,90/mês',
            perks: [
              'Economia de 20% no pacote anual',
              'Perfis infantis ilimitados + modo offline',
              'Lançamentos antecipados e shows musicais em 4K',
            ],
          },
        ].map((plan) => {
          const active = selectedPlan === plan.id;
          return (
            <div
              key={plan.id}
              onClick={() => {
                setSelectedPlan(plan.id);
                setConfirmed(false);
              }}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSelectedPlan(plan.id);
                  setConfirmed(false);
                }
              }}
              className={`p-5 rounded-2xl border transition-all cursor-pointer space-y-3 ${
                active
                  ? 'bg-gradient-to-br from-orange-500/20 to-amber-500/10 border-amber-300 ring-2 ring-amber-300/60'
                  : 'bg-blue-950/55 border-sky-300/30 hover:bg-blue-900/60'
              }`}
            >
              <div className="flex items-center justify-between">
                <h2 className="font-display font-extrabold text-lg text-white">
                  {plan.name}
                </h2>
                <span className="font-display font-black text-lg text-amber-300 tabular-nums">
                  {plan.price}
                </span>
              </div>
              <ul className="space-y-1.5 text-sm text-sky-100/90">
                {plan.perks.map((perk) => (
                  <li key={perk} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-300 shrink-0" />
                    <span>{perk}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => setConfirmed(true)}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-white font-display font-extrabold text-sm uppercase tracking-wide shadow-lg cursor-pointer"
        >
          <Sparkles className="w-4 h-4" />
          <span>
            {confirmed
              ? 'Plano Atualizado com Sucesso!'
              : `Confirmar ${selectedPlan === 'anual' ? 'Plano Anual' : 'Plano Mensal'}`}
          </span>
        </button>

        <button
          type="button"
          onClick={onGoHome}
          className="px-5 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-sky-300/35 text-sm font-bold text-white cursor-pointer"
        >
          Voltar para Home
        </button>
      </div>
    </section>
  );
};

interface WatchlistSectionProps {
  shows: ShowItem[];
  progressMap: Record<string, number>;
  watchlist: string[];
  savedTmdbSeries: TmdbSeriesSummary[];
  onSelectShow: (show: ShowItem, autoPlay?: boolean) => void;
  onToggleWatchlist: (showId: string) => void;
  onSelectTmdbSeries: (seriesId: number) => void;
  onRemoveTmdbSeries: (series: TmdbSeriesSummary) => void;
  onGoHome: () => void;
}

export const WatchlistSection: React.FC<WatchlistSectionProps> = ({
  shows,
  progressMap,
  watchlist,
  savedTmdbSeries,
  onSelectShow,
  onToggleWatchlist,
  onSelectTmdbSeries,
  onRemoveTmdbSeries,
  onGoHome,
}) => {
  const savedShows = shows.filter((s) => watchlist.includes(s.id));
  const totalSaved = savedShows.length + savedTmdbSeries.length;

  return (
    <section className="space-y-5">
      <div className="glass-panel rounded-[28px] p-5 sm:p-7 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-400/20 border border-emerald-300/40 flex items-center justify-center">
            <Bookmark className="w-5 h-5 text-emerald-300" />
          </div>
          <div>
            <h1 className="font-display text-2xl font-extrabold text-white">
              Minhas Listas
            </h1>
            <p className="text-xs sm:text-sm text-sky-200 tabular-nums">
              {totalSaved} {totalSaved === 1 ? 'título salvo' : 'títulos salvos'} para assistir quando quiser
            </p>
          </div>
        </div>
      </div>

      {totalSaved > 0 ? (
        <div className="space-y-6">
          {savedShows.length > 0 && (
            <ShowCarousel
              title="Favoritos Kids"
              iconType="sparkles"
              shows={savedShows}
              progressMap={progressMap}
              watchlist={watchlist}
              showProgress={true}
              layout="grid"
              onSelectShow={onSelectShow}
              onToggleWatchlist={onToggleWatchlist}
            />
          )}

          {savedTmdbSeries.length > 0 && (
            <div className="glass-panel rounded-[26px] p-5 sm:p-6 space-y-4">
              <h2 className="font-display text-lg sm:text-xl font-extrabold text-white">
                Séries Salvas
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {savedTmdbSeries.map((series) => (
                  <article key={series.id} className="group flex flex-col">
                    <div
                      onClick={() => onSelectTmdbSeries(series.id)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          onSelectTmdbSeries(series.id);
                        }
                      }}
                      className="relative aspect-[2/3] rounded-2xl overflow-hidden border border-sky-300/35 kids-card-shadow bg-blue-950 cursor-pointer"
                    >
                      <TmdbImage
                        src={tmdbImageUrl(series.poster_path, 'w500')}
                        alt={series.name}
                        fallbackType="poster"
                        fallbackLabel={series.name}
                        className="h-full w-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onRemoveTmdbSeries(series);
                        }}
                        aria-label={`Remover ${series.name} da Minha Lista`}
                        className="absolute top-2 right-2 w-8 h-8 rounded-full bg-emerald-500 border border-emerald-200 text-white flex items-center justify-center cursor-pointer"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                    </div>
                    <h3 className="pt-2 font-display text-sm font-bold text-white truncate">
                      {series.name}
                    </h3>
                  </article>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="glass-panel rounded-3xl p-10 text-center space-y-3">
          <p className="font-display text-xl font-bold text-white">
            Sua lista está vazia por enquanto
          </p>
          <p className="text-sm text-sky-200">
            Clique em "+ Minha Lista" em qualquer filme, série ou desenho para guardar aqui.
          </p>
          <button
            type="button"
            onClick={onGoHome}
            className="px-5 py-2.5 rounded-full bg-orange-500 hover:bg-orange-400 text-white font-bold text-sm cursor-pointer"
          >
            Explorar Destaques Kids
          </button>
        </div>
      )}
    </section>
  );
};
