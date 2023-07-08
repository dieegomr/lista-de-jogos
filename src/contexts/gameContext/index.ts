import { createContext } from 'react';
import { Game } from '../../types/Game';

interface GamesContextType {
  games: Game[];
  isLoading: boolean;
  error: string;
}

export const GamesContext = createContext<GamesContextType>({
  error: '',
  games: [],
  isLoading: false,
});
