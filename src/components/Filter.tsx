import { FilterProps } from '../types/FilterProps';
import { getArrayOfUniqueGenres } from '../utils/helpers';
import styles from './Filter.module.css';

export default function Filter({
  games,
  selectedGenre,
  setSelectedGenre,
}: FilterProps) {
  const genresArray = getArrayOfUniqueGenres(games);
  const arrayOfOptions = ['All', ...genresArray];

  return (
    <select
      name="genre"
      value={selectedGenre}
      className={styles.genre}
      onChange={(event) => setSelectedGenre(event.target.value)}
    >
      {arrayOfOptions.map((option) => (
        <option value={option} key={option}>
          {option}
        </option>
      ))}
    </select>
  );
}
