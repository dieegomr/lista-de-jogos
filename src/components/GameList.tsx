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
import { useFavorites } from '../contexts/favoritesContext/hook';
import { useRatedGames } from '../contexts/ratedGamesContext/hook';

export default function GameList() {
  const { games, isLoading, error } = useGames();
  const { isAuthenticated } = useAuth();
  const { error: favoritesError } = useFavorites();
  const { error: rateGamesError } = useRatedGames();

  const { searchedGames } = useSearch(games);
  const { filteredGames } = useFilter(searchedGames);
  const sortedGames = useSort(filteredGames);

  const gamesToRender =
    !isAuthenticated || !sortedGames ? filteredGames : sortedGames;

  if (!isLoading && !error && !gamesToRender.length)
    return <ErrorMessage message="Nenhum jogo encontrado 😕" />;

  return (
    <div className={styles.gameList}>
      {!isLoading && !error && !favoritesError && !rateGamesError && (
        <div className={styles.header}>
          <h1>Games</h1>
          <div className={styles.btn}>
            <SortBy />
          </div>
        </div>
      )}
      {isLoading && !error && !favoritesError && !rateGamesError && <Loader />}
      {error && !isLoading && <ErrorMessage message={error} />}
      {favoritesError && !isLoading && !error && (
        <ErrorMessage message={favoritesError} />
      )}
      {rateGamesError && !isLoading && !error && (
        <ErrorMessage message={rateGamesError} />
      )}
      {!isLoading && !error && !favoritesError && !rateGamesError && (
        <ul className={styles.list}>
          {gamesToRender.map((game) => (
            <GameItem game={game} key={game.id}>
              <p>{game.short_description}</p>
            </GameItem>
          ))}
        </ul>
      )}
    </div>
  );
}
