import { useSearchParams } from 'react-router-dom';
import { Game } from '../types/Game';
import { useRatedGames } from '../contexts/ratedGamesContext/hook';

export function useSort(gamesToSort: Game[]) {
  const [searchParams] = useSearchParams();
  const { ratedGames } = useRatedGames();

  const sortBy = searchParams.get('sortBy') || 'rate-desc';
  const [field, direction] = sortBy.split('-') as ['rate', 'asc' | 'desc'];

  const gamesWithRatings = gamesToSort.map((game) => {
    const isRated = ratedGames.find(
      (gameRated) => gameRated.gameId === game.id
    );
    return { ...game, rate: isRated ? isRated.rate : 0 };
  });

  const sortedGames = gamesWithRatings.sort((a, b) => {
    if (a[field] === b[field]) {
      return 0;
    } else if (a[field] === 0) {
      return 1;
    } else if (b[field] === 0) {
      return -1;
    } else if (direction === 'asc') {
      return a[field] < b[field] ? -1 : 1;
    } else {
      return a[field] < b[field] ? 1 : -1;
    }
  });

  return { sortedGames };
}
