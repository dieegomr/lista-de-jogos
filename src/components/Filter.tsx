import { FilterProps } from '../types/FilterProps';
import styles from './Filter.module.css';

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
