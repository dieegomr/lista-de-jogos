import { createContext } from 'react';

interface FavoritesContextType {
  favorites: number[];
  addFavoriteGame: (id: number) => void;
  removeFavoriteGame: (id: number) => void;
  resetFavoriteGames: () => void;
  isGameFavorite: (gameId: number) => boolean;
  error: string;
}

export const FavoritesContext = createContext<FavoritesContextType>(
  {} as FavoritesContextType
);
