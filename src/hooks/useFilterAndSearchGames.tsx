import { useSearchParams } from 'react-router-dom';
import { useRatedGames } from '../contexts/ratedGamesContext/hook';
import { useSearchQuery } from '../contexts/searchContext/hook';
import { Game } from '../types/Game';
import { filterGamesByGenre, searchGamesByQuery } from '../utils/helpers';
import { useGenres } from './useGenres';

export function useFilterAndSearchGames(games: Game[]) {
  const [searchParams] = useSearchParams();

  const { ratedGames } = useRatedGames();

  const { selectedGenre } = useGenres();

  const { searchQuery } = useSearchQuery();

  const filteredGames = filterGamesByGenre(games, selectedGenre);

  const filteredAndSearchedGames = searchGamesByQuery(
    filteredGames,
    searchQuery
  );

  const sortBy = searchParams.get('sortBy') || 'rate-desc';
  const [field, direction] = sortBy.split('-') as ['rate', 'asc' | 'desc'];
  const modifier = direction === 'asc' ? 1 : -1;

  const gamesWithRatings = filteredAndSearchedGames.map((game) => {
    const rating = ratedGames.find((rated) => rated.gameId === game.id);
    return { ...game, rate: rating ? rating.rate : 0 };
  });

  const sorted = gamesWithRatings.sort((a, b) => {
    if (a.rate === 0 || b.rate === 0) return 0;
    return (a[field] - b[field]) * modifier;
  });

  return { sorted };
}
