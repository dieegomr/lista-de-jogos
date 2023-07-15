import { createContext } from 'react';
import { Game } from '../../types/Game';

interface FavoritesContextType {
  favoriteGamesObjArray: Game[];
  addFavoriteGame: (id: number) => void;
  removeFavoriteGame: (id: number) => void;
  resetFavoriteGames: () => void;
  isGameFavorite: (gameId: number) => boolean;
  error: string;
}

export const FavoritesContext = createContext<FavoritesContextType>(
  {} as FavoritesContextType
);
