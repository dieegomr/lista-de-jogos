import GameItem from './GameItem';
import styles from './GameList.module.css';
import ErrorMessage from './ErrorMessage';
import { GameListProps } from '../types/GameListProps';
import { filterGamesByGenre, searchGamesByQuery } from '../utils/helpers';
import { useGames } from '../contexts/gameContext/hook';

export default function GameList({
  searchQuery,
  selectedGenre,
}: GameListProps) {
  const { games } = useGames();

  const filteredGames = filterGamesByGenre(games, selectedGenre);

  const searchedGames = searchGamesByQuery(filteredGames, searchQuery);

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
