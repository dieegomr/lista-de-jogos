import { createContext } from 'react';
import { Game } from '../../types/Game';

interface FavoritesContextType {
  favorites: Game[];
  addFavoriteGame: (game: Game) => void;
  removeFavoriteGame: (id: number) => void;
  resetFavoriteGames: () => void;
  isGameFavorite: (gameId: number) => boolean;
}

export const FavoritesContext = createContext<FavoritesContextType>(
  {} as FavoritesContextType
);
