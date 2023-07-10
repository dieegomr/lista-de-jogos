import { createContext } from 'react';
import { RatedGameType } from './provider';

interface RatedGamesContextType {
  ratedGames: RatedGameType[];
  addRatedGame: (ratedGame: RatedGameType) => void;
}

export const FavoritesContext = createContext<RatedGamesContextType>(
  {} as RatedGamesContextType
);
