import { createContext } from 'react';
import { RatedGameType } from './provider';

interface RatedGamesContextType {
  ratedGames: RatedGameType[];
  rateGame: (ratedGame: RatedGameType) => void;
  getRate: (gameId: number) => number;
}

export const FavoritesContext = createContext<RatedGamesContextType>(
  {} as RatedGamesContextType
);
