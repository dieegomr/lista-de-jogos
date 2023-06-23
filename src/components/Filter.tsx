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
};

export default function Filter({ games }: FilterProps) {
  const genresArray = games
    ? ['All', ...new Set(games.map((game) => game.genre))]
    : ['All'];

  return (
    <select name="genre" className={styles.genre}>
      {/* <option value="all">All</option>
      <option value="shooter">shooter</option>
      <option value="arpg">arpg</option>
      <option value="fighting">fighting</option>
      <option value="action">Action</option> */}
      {genresArray.map((genre) => (
        <option value={genre} key={genre}>
          {genre}
        </option>
      ))}
    </select>
  );
}
