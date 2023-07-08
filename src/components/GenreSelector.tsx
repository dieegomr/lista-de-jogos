import { useSlider } from '../hooks/useSlider';
import { FilterProps } from '../types/FilterProps';
import { getArrayOfUniqueGenres } from '../utils/helpers';
import styles from './GenreSelector.module.css';

export default function GenreSelector({
  games,
  selectedGenre,
  setSelectedGenre,
}: FilterProps) {
  const allGenresArray = getArrayOfUniqueGenres(games);
  const uniqueGenresArray = ['All', ...allGenresArray];

  const { handleSlideLeft, handleSlideRight, sliderRef } = useSlider();

  return (
    <div className={styles.tabsContainer}>
      <div className={styles.leftArrow} onClick={handleSlideLeft}>
        <div className={styles.arrow}>&lt;</div>
      </div>
      <ul
        id="slider"
        className={games.length <= 3 ? `${styles.center}` : ''}
        ref={sliderRef}
      >
        {uniqueGenresArray.map((genre) => (
          <a
            href="#"
            key={genre}
            onClick={() => setSelectedGenre(genre)}
            className={styles[`${genre === selectedGenre ? 'active' : ''}`]}
          >
            {genre}
          </a>
        ))}
      </ul>
      <div className={styles.rightArrow}>
        <div className={styles.arrow} onClick={handleSlideRight}>
          &gt;
        </div>
      </div>
    </div>
  );
}
