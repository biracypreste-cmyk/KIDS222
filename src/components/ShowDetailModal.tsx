import React, { useEffect, useState } from 'react';
import {
  Bookmark,
  Check,
  Clock,
  Pause,
  Play,
  RotateCcw,
  Volume2,
  VolumeX,
  X,
} from 'lucide-react';
import { EpisodeItem, ShowItem } from '../types/kids';
import { ShowCardArtwork } from './artwork/ShowCardArtwork';

interface ShowDetailModalProps {
  show: ShowItem | null;
  initialPlayMode: boolean;
  progress: number;
  isInWatchlist: boolean;
  onClose: () => void;
  onToggleWatchlist: (showId: string) => void;
  onUpdateProgress: (showId: string, progressPercent: number) => void;
}

export const ShowDetailModal: React.FC<ShowDetailModalProps> = ({
  show,
  initialPlayMode,
  progress,
  isInWatchlist,
  onClose,
  onToggleWatchlist,
  onUpdateProgress,
}) => {
  const [isPlayingScreen, setIsPlayingScreen] = useState(initialPlayMode);
  const [isPlaybackRunning, setIsPlaybackRunning] = useState(initialPlayMode);
  const [activeEpisode, setActiveEpisode] = useState<EpisodeItem | null>(null);
  const [muted, setMuted] = useState(false);
  const [localProgress, setLocalProgress] = useState(progress || 15);

  useEffect(() => {
    if (!show) return;
    setActiveEpisode(show.episodes[0] ?? null);
    setIsPlayingScreen(initialPlayMode);
    setIsPlaybackRunning(initialPlayMode);
    setLocalProgress(progress > 0 ? progress : 12);
  }, [show, initialPlayMode, progress]);

  // Simulate gentle real-time playback when player is active
  useEffect(() => {
    if (!show || !isPlayingScreen || !isPlaybackRunning) return;
    const timer = window.setInterval(() => {
      setLocalProgress((prev) => {
        const next = prev >= 100 ? 100 : prev + 1;
        onUpdateProgress(show.id, next);
        return next;
      });
    }, 1000);
    return () => window.clearInterval(timer);
  }, [show, isPlayingScreen, isPlaybackRunning, onUpdateProgress]);

  if (!show) return null;

  const handleStartEpisode = (episode: EpisodeItem) => {
    setActiveEpisode(episode);
    setIsPlayingScreen(true);
    setIsPlaybackRunning(true);
    const startPct = Math.max(15, localProgress);
    setLocalProgress(startPct);
    onUpdateProgress(show.id, startPct);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#020e2b]/85 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-show-title"
      onClick={onClose}
    >
      <div
        className="glass-panel relative w-full max-w-4xl max-h-[90vh] overflow-y-auto no-scrollbar rounded-[28px] p-4 sm:p-6 text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar janela"
          className="absolute top-4 right-4 z-30 w-10 h-10 rounded-full bg-blue-950/80 hover:bg-orange-500 border border-sky-300/40 text-white flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Media / Video Player Viewport */}
        <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-sky-300/35 bg-[#031338] shadow-2xl">
          <ShowCardArtwork artworkId={show.artworkId} title={show.title} />

          {!isPlayingScreen ? (
            <div className="absolute inset-0 bg-gradient-to-t from-[#03153d]/95 via-[#03153d]/40 to-transparent flex flex-col justify-end p-5 sm:p-7">
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() =>
                    handleStartEpisode(activeEpisode ?? show.episodes[0])
                  }
                  className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-white font-display font-extrabold text-sm uppercase tracking-wide shadow-lg cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>
                    {localProgress > 5 ? 'Continuar Episódio' : 'Assistir Agora'}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => onToggleWatchlist(show.id)}
                  className={`inline-flex items-center gap-2 px-5 py-3 rounded-full font-display font-bold text-sm uppercase tracking-wide border transition-colors cursor-pointer ${
                    isInWatchlist
                      ? 'bg-emerald-500/90 border-emerald-200 text-white'
                      : 'bg-blue-950/75 hover:bg-blue-800/80 border-sky-300/40 text-white'
                  }`}
                >
                  {isInWatchlist ? (
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
          ) : (
            /* Interactive Simulated Kids Video Player */
            <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-[2px] flex flex-col justify-between p-4 sm:p-6">
              <div className="flex items-center justify-between pr-12">
                <div className="px-3.5 py-1.5 rounded-full bg-blue-950/80 border border-sky-300/35 text-xs font-bold text-sky-100">
                  Reproduzindo · Ep. {activeEpisode?.number ?? 1}:{' '}
                  {activeEpisode?.title ?? show.title}
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-500/85 text-white text-[11px] font-bold">
                  Áudio: Português (BR)
                </span>
              </div>

              <div className="flex items-center justify-center">
                <button
                  type="button"
                  onClick={() => setIsPlaybackRunning((prev) => !prev)}
                  aria-label={isPlaybackRunning ? 'Pausar vídeo' : 'Reproduzir vídeo'}
                  className="w-16 h-16 rounded-full bg-orange-500/95 hover:bg-orange-400 text-white flex items-center justify-center shadow-[0_0_30px_rgba(249,115,22,0.7)] transition-transform hover:scale-105 cursor-pointer"
                >
                  {isPlaybackRunning ? (
                    <Pause className="w-7 h-7 fill-white" />
                  ) : (
                    <Play className="w-7 h-7 fill-white ml-1" />
                  )}
                </button>
              </div>

              {/* Scrubber & Controls */}
              <div className="space-y-2 bg-blue-950/85 border border-sky-300/30 rounded-2xl p-3">
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={localProgress}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    setLocalProgress(val);
                    onUpdateProgress(show.id, val);
                  }}
                  aria-label="Linha do tempo do episódio"
                  className="w-full accent-orange-400 cursor-pointer"
                />
                <div className="flex items-center justify-between text-xs font-semibold text-sky-100">
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setIsPlaybackRunning((prev) => !prev)}
                      className="hover:text-amber-300 cursor-pointer"
                    >
                      {isPlaybackRunning ? 'Pausar' : 'Continuar'}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setLocalProgress(0);
                        onUpdateProgress(show.id, 5);
                      }}
                      className="inline-flex items-center gap-1 hover:text-amber-300 cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Reiniciar</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setMuted((prev) => !prev)}
                      aria-label={muted ? 'Ativar som' : 'Silenciar'}
                      className="hover:text-amber-300 cursor-pointer"
                    >
                      {muted ? (
                        <VolumeX className="w-4 h-4" />
                      ) : (
                        <Volume2 className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  <span className="tabular-nums text-amber-300">
                    {localProgress}% assistido ·{' '}
                    {activeEpisode?.durationMinutes ?? 20} min
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Show Info & Episodes */}
        <div className="mt-5 space-y-5">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2
                id="modal-show-title"
                className="font-display text-2xl sm:text-3xl font-extrabold text-white"
              >
                {show.title}
              </h2>
              <span className="text-xs font-bold text-amber-300">
                {show.type} · {show.year} · Classificação {show.ageRating}
              </span>
            </div>
            <p className="text-sm sm:text-base text-sky-100/90 leading-relaxed">
              {show.synopsis}
            </p>
          </div>

          {/* Episode List */}
          <div className="space-y-2.5">
            <h3 className="font-display text-base font-extrabold text-white">
              Episódios Disponíveis ({show.episodes.length})
            </h3>
            <div className="space-y-2">
              {show.episodes.map((ep) => {
                const isSelected = activeEpisode?.id === ep.id && isPlayingScreen;
                return (
                  <button
                    key={ep.id}
                    type="button"
                    onClick={() => handleStartEpisode(ep)}
                    className={`w-full flex items-center justify-between gap-4 p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-orange-500/20 border-orange-300/70'
                        : 'bg-blue-950/55 hover:bg-blue-900/70 border-sky-300/25'
                    }`}
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center font-display font-black text-white shrink-0">
                        {ep.number}
                      </div>
                      <div className="min-w-0">
                        <p className="font-display font-bold text-sm text-white truncate">
                          {ep.title}
                        </p>
                        <p className="text-xs text-sky-200/80 line-clamp-1">
                          {ep.synopsis}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <span className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold text-sky-200 tabular-nums">
                        <Clock className="w-3.5 h-3.5" />
                        {ep.durationMinutes} min
                      </span>
                      <span className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center text-white">
                        <Play className="w-4 h-4 fill-white" />
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
