import GameItem from './GameItem';
import styles from './GameList.module.css';
import ErrorMessage from './ErrorMessage';
import { useGames } from '../contexts/gameContext/hook';
import Loader from '../ui/Loader';
import { useSort } from '../hooks/useSort';
import { useSearch } from '../hooks/useSearch';
import { useFilter } from '../hooks/useFilter';

export default function GameList() {
  const { games, isLoading, error } = useGames();

  const { searchedGames } = useSearch(games);
  const { filteredGames } = useFilter(searchedGames);
  const { sortedGames } = useSort(filteredGames);

  if (!isLoading && !error && !sortedGames.length)
    return <ErrorMessage message="Nenhum jogo encontrado 😕" />;

  return (
    <>
      {isLoading && !error && <Loader />}
      {error && !isLoading && <ErrorMessage message={error} />}
      {!isLoading && !error && (
        <ul className={styles.list}>
          {sortedGames.map((game) => (
            <GameItem game={game} key={game.id} />
          ))}
        </ul>
      )}
    </>
  );
}
