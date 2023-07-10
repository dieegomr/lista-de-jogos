import { useSearchQuery } from '../contexts/searchContext/hook';
import { Game } from '../types/Game';
import { filterGamesByGenre, searchGamesByQuery } from '../utils/helpers';
import { useGenres } from './useGenres';

export function useFilterAndSearchGames(games: Game[]) {
  const { selectedGenre } = useGenres();

  const { searchQuery } = useSearchQuery();

  const filteredGames = filterGamesByGenre(games, selectedGenre);

  const filteredAndSearchedGames = searchGamesByQuery(
    filteredGames,
    searchQuery
  );

  return { filteredAndSearchedGames };
}
