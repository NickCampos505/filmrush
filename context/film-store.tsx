import React, { createContext, useContext, useMemo, useState } from 'react';
import { FILMS } from '@/data/films';

type FilmStoreContextType = {
  watchedIds: Set<string>;
  toggleWatched: (id: string) => void;
  totalPoints: number;
  watchedCount: number;
};

const FilmStoreContext = createContext<FilmStoreContextType | null>(null);

export function FilmStoreProvider({ children }: { children: React.ReactNode }) {
  const [watchedIds, setWatchedIds] = useState<Set<string>>(new Set());

  function toggleWatched(id: string) {
    setWatchedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  const totalPoints = useMemo(
    () =>
      Array.from(watchedIds).reduce((sum, id) => {
        const film = FILMS.find((f) => f.id === id);
        return sum + (film?.points ?? 0);
      }, 0),
    [watchedIds]
  );

  return (
    <FilmStoreContext.Provider
      value={{ watchedIds, toggleWatched, totalPoints, watchedCount: watchedIds.size }}
    >
      {children}
    </FilmStoreContext.Provider>
  );
}

export function useFilmStore() {
  const ctx = useContext(FilmStoreContext);
  if (!ctx) throw new Error('useFilmStore must be used within FilmStoreProvider');
  return ctx;
}
