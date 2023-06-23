import GameItem from './GameItem';
import styles from './GameList.module.css';
import Loader from './Loader';
import ErrorMessage from './ErrorMessage';
import { useGames } from '../hooks/useGames';

type GameListProps = {
  query: string;
};

export default function GameList({ query }: GameListProps) {
  const { games, isLoading, error } = useGames();

  const searchedGames =
    query.length > 0
      ? games.filter((game) =>
          `${game.title}`.toLowerCase().includes(query.toLowerCase())
        )
      : games;

  console.log(searchedGames);

  if (error) return <ErrorMessage message={error} />;

  if (isLoading) return <Loader />;

  if (!searchedGames.length)
    return <ErrorMessage message="Nenhum jogo encontrado 😕" />;

  return (
    <ul className={styles.list}>
      {searchedGames.map((game) => (
        <GameItem game={game} key={game.id} />
      ))}
    </ul>
  );
}
