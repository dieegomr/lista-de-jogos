import GameItem from './GameItem';
import styles from './GameList.module.css';
import Loader from './Loader';
import ErrorMessage from './ErrorMessage';
import { useGames } from '../hooks/useGames';

export default function GameList() {
  const { games, isLoading, error } = useGames();

  return (
    <ul className={styles.list}>
      {isLoading && !error && <Loader />}
      {!isLoading &&
        !error &&
        games.map((game) => <GameItem game={game} key={game.id} />)}
      {error && <ErrorMessage message={error} />}
    </ul>
  );
}
