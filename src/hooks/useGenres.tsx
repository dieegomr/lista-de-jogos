import { useSearchParams } from 'react-router-dom';
import { useGames } from '../contexts/gameContext/hook';
import { getArrayOfUniqueGenres } from '../utils/helpers';
import { Genre } from '../types/Genre';

export function useGenres() {
  const { games } = useGames();

  const [searchParams, setSearchParams] = useSearchParams();

  let selectedGenre = searchParams.get('genre');
  if (!selectedGenre) selectedGenre = 'All';

  const uniqueGenres = getArrayOfUniqueGenres(games);

  function setGenre(genre: Genre) {
    searchParams.set('genre', genre);
    setSearchParams(searchParams);
  }

  return { uniqueGenres, selectedGenre, setGenre };
}
