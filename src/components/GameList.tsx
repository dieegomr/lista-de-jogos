import GameItem from './GameItem';
import styles from './GameList.module.css';
import ErrorMessage from './ErrorMessage';
import { useGames } from '../contexts/gameContext/hook';
import Loader from '../ui/Loader';
import { useFilterAndSearchGames } from '../hooks/useFilterAndSearchGames';

export default function GameList() {
  const { games, isLoading, error } = useGames();
  const { filteredAndSearchedGames } = useFilterAndSearchGames(games);

  if (!isLoading && !error && !filteredAndSearchedGames.length)
    return <ErrorMessage message="Nenhum jogo encontrado 😕" />;

  return (
    <>
      {isLoading && !error && <Loader />}
      {error && !isLoading && <ErrorMessage message={error} />}
      {!isLoading && !error && (
        <ul className={styles.list}>
          {filteredAndSearchedGames.map((game) => (
            <GameItem game={game} key={game.id} />
          ))}
        </ul>
      )}
    </>
  );
}
