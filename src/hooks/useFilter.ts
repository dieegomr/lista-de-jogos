import { Game } from '../types/Game';
import { filterGamesByGenre } from '../utils/helpers';
import { useGenres } from './useGenres';

export function useFilter(games: Game[]) {
  const { selectedGenre } = useGenres();
  const filteredGames = filterGamesByGenre(games, selectedGenre);

  return { filteredGames };
}
