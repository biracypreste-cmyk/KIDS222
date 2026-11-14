import React, { useState } from 'react';
import { Film, Tv, User } from 'lucide-react';

interface TmdbImageProps {
  src: string | null;
  alt: string;
  className?: string;
  fallbackType?: 'poster' | 'backdrop' | 'person' | 'episode';
  fallbackLabel?: string;
}

export const TmdbImage: React.FC<TmdbImageProps> = ({
  src,
  alt,
  className = '',
  fallbackType = 'poster',
  fallbackLabel,
}) => {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    const initials = fallbackLabel
      ? fallbackLabel
          .split(' ')
          .slice(0, 2)
          .map((w) => w.charAt(0).toUpperCase())
          .join('')
      : '';

    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-blue-900 via-[#0a368a] to-indigo-950 text-sky-200/80 p-3 text-center select-none ${className}`}
        aria-label={alt}
      >
        {fallbackType === 'person' ? (
          initials ? (
            <span className="font-display font-black text-xl text-white/90">
              {initials}
            </span>
          ) : (
            <User className="w-8 h-8 opacity-75" />
          )
        ) : fallbackType === 'episode' ? (
          <Film className="w-7 h-7 opacity-75" />
        ) : (
          <>
            <Tv className="w-8 h-8 opacity-75 mb-1.5" />
            {fallbackLabel && (
              <span className="text-[11px] font-bold text-white/85 line-clamp-2">
                {fallbackLabel}
              </span>
            )}
          </>
        )}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className={className}
      loading="lazy"
    />
  );
};
