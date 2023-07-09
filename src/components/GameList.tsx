import GameItem from './GameItem';
import styles from './GameList.module.css';
import ErrorMessage from './ErrorMessage';
import { filterGamesByGenre, searchGamesByQuery } from '../utils/helpers';
import { useGames } from '../contexts/gameContext/hook';
import { useSearchQuery } from '../contexts/searchContext/hook';
import Loader from '../ui/Loader';
import { useGenres } from '../hooks/useGenres';

export default function GameList() {
  const { games, isLoading, error } = useGames();
  const { searchQuery } = useSearchQuery();
  const { selectedGenre } = useGenres();

  const filteredGames = filterGamesByGenre(games, selectedGenre);

  const searchedGames = searchGamesByQuery(filteredGames, searchQuery);

  if (!isLoading && !error && !searchedGames.length)
    return <ErrorMessage message="Nenhum jogo encontrado 😕" />;

  return (
    <>
      {isLoading && !error && <Loader />}
      {error && !isLoading && <ErrorMessage message={error} />}
      {!isLoading && !error && (
        <ul className={styles.list}>
          {searchedGames.map((game) => (
            <GameItem game={game} key={game.id} />
          ))}
        </ul>
      )}
    </>
  );
}
