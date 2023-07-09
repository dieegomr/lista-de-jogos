import { ReactNode, useState } from 'react';
import { Game } from '../../types/Game';
import { FavoritesContext } from '.';

interface FavoritesProviderProps {
  children: ReactNode;
}

export function FavoritesProvider({ children }: FavoritesProviderProps) {
  const [favorites, setFavorites] = useState<Game[]>([]);

  return (
    <FavoritesContext.Provider value={{ favorites }}>
      {children}
    </FavoritesContext.Provider>
  );
}
