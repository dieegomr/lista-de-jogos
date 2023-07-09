import { useGenres } from '../hooks/useGenres';
import { useSlider } from '../hooks/useSlider';
import styles from './GenreSelector.module.css';

export default function GenreSelector() {
  const { handleSlideLeft, handleSlideRight, sliderRef } = useSlider();
  const { uniqueGenres, selectedGenre, setGenre } = useGenres();

  const genreSelectorOptions = ['All', ...uniqueGenres];

  return (
    <div className={styles.tabsContainer}>
      <div className={styles.leftArrow} onClick={handleSlideLeft}>
        <div className={styles.arrow}>&lt;</div>
      </div>
      <ul
        id="slider"
        className={genreSelectorOptions.length <= 3 ? `${styles.center}` : ''}
        ref={sliderRef}
      >
        {genreSelectorOptions.map((genre) => (
          <a
            href="#"
            key={genre}
            onClick={() => setGenre(genre)}
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
