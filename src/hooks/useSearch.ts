import { useSearchQuery } from '../contexts/searchContext/hook';
import { Game } from '../types/Game';
import { searchGamesByQuery } from '../utils/helpers';

export function useSearch(games: Game[]) {
  const { searchQuery } = useSearchQuery();
  const searchedGames = searchGamesByQuery(games, searchQuery);

  return { searchedGames };
}
