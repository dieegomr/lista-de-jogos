import GameItem from './GameItem';
import styles from './GameList.module.css';
import ErrorMessage from './ErrorMessage';
import { useGames } from '../contexts/gameContext/hook';
import Loader from '../ui/Loader';
import { useSort } from '../hooks/useSort';
import { useSearch } from '../hooks/useSearch';
import { useFilter } from '../hooks/useFilter';
import { useAuth } from '../contexts/authContext/hook';
import SortBy from './SortBy';

export default function GameList() {
  const { games, isLoading, error } = useGames();
  const { isAuthenticated } = useAuth();

  const { searchedGames } = useSearch(games);
  const { filteredGames } = useFilter(searchedGames);
  const { sortedGames } = useSort(filteredGames);

  const gamesToRender = isAuthenticated ? sortedGames : filteredGames;

  if (!isLoading && !error && !gamesToRender.length)
    return <ErrorMessage message="Nenhum jogo encontrado 😕" />;

  return (
    <div className={styles.gameList}>
      <div className={styles.header}>
        <h1>Games</h1>
        <SortBy />
      </div>
      {isLoading && !error && <Loader />}
      {error && !isLoading && <ErrorMessage message={error} />}
      {!isLoading && !error && (
        <ul className={styles.list}>
          {gamesToRender.map((game) => (
            <GameItem game={game} key={game.id} />
          ))}
        </ul>
      )}
    </div>
  );
}
