import GameItem from './GameItem';
import styles from './GameList.module.css';
import ErrorMessage from './ErrorMessage';
import { GameListProps } from '../types/GameListProps';
import { filterGamesByGenre, searchGamesByQuery } from '../utils/helpers';
import { useGames } from '../contexts/gameContext/hook';
import { useSearchQuery } from '../contexts/searchContext/hook';
import Loader from '../ui/Loader';

export default function GameList({ selectedGenre }: GameListProps) {
  const { games, isLoading, error } = useGames();
  const { searchQuery } = useSearchQuery();

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
