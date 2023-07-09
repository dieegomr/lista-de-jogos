import { createContext } from 'react';
import { Game } from '../../types/Game';

interface FavoritesContextType {
  favorites: Game[];
}

export const FavoritesContext = createContext<FavoritesContextType>(
  {} as FavoritesContextType
);
