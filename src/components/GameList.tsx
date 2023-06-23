import GameItem from './GameItem';
import styles from './GameList.module.css';
import Loader from './Loader';
import ErrorMessage from './ErrorMessage';
import { useGames } from '../hooks/useGames';

export default function GameList() {
  const { games, isLoading, error } = useGames();

  if (error) return <ErrorMessage message={error} />;

  if (isLoading) return <Loader />;

  if (!games.length)
    return <ErrorMessage message="Nenhum jogo encontrado 😕" />;

  return (
    <ul className={styles.list}>
      {games.map((game) => (
        <GameItem game={game} key={game.id} />
      ))}
    </ul>
  );
}
