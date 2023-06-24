import styles from './Filter.module.css';

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

type FilterProps = {
  games: Game[];
  selectedGenre: string;
  setSelectedGenre: React.Dispatch<React.SetStateAction<string>>;
};

export default function Filter({
  games,
  selectedGenre,
  setSelectedGenre,
}: FilterProps) {
  const genresArray = games
    ? ['All', ...new Set(games.map((game) => game.genre))]
    : ['All'];

  return (
    <select
      name="genre"
      value={selectedGenre}
      className={styles.genre}
      onChange={(event) => setSelectedGenre(event.target.value)}
    >
      {genresArray.map((genre) => (
        <option value={genre} key={genre}>
          {genre}
        </option>
      ))}
    </select>
  );
}
