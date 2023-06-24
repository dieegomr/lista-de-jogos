import GameItem from './GameItem';
import styles from './GameList.module.css';
import ErrorMessage from './ErrorMessage';
import { GameListProps } from '../types/GameListProps';

export default function GameList({
  searchQuery,
  selectedGenre,
  games,
}: GameListProps) {
  const filteredGames =
    selectedGenre !== 'All'
      ? games.filter((game) => game.genre === selectedGenre)
      : games;

  const searchedGames =
    searchQuery.length > 0
      ? filteredGames.filter((game) =>
          `${game.title}`.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : filteredGames;

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
