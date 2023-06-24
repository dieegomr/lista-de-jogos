import GameItem from './GameItem';
import styles from './GameList.module.css';
import Loader from './Loader';
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
  gamesObj: {
    games: Game[];
    error: string;
    isLoading: boolean;
  };
};

export default function GameList({
  searchQuery,
  selectedGenre,
  gamesObj,
}: GameListProps) {
  const { games, error, isLoading } = gamesObj;

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
