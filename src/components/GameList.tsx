import GameItem from './GameItem';
import styles from './GameList.module.css';
import ErrorMessage from './ErrorMessage';

type Game = {
  id: number;
  title: string;
  thumbnail: string;
  short_description: string;
  game_url: string;
  genre: string;
  platform: string;
  publisher: string;
  developer: string;
  release_date: string;
  freetogame_profile_url: string;
};

type GameListProps = {
  searchQuery: string;
  selectedGenre: string;
  games: Game[];
};

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
