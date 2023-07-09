import { createContext } from 'react';
import { Game } from '../../types/Game';

interface FavoritesContextType {
  favorites: Game[];
  addFavoriteGame: (game: Game) => void;
}

export const FavoritesContext = createContext<FavoritesContextType>(
  {} as FavoritesContextType
);
