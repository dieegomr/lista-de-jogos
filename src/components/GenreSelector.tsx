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
  const slider = document.getElementById('slider') as HTMLElement;

  function handleSlideLeft() {
    slider.scrollLeft = slider.scrollLeft - 200;
  }

  function handleSlideRight() {
    slider.scrollLeft = slider.scrollLeft + 200;
    console.log(slider.scrollLeft);
  }

  return (
    <div className={styles.tabsContainer}>
      <div className={styles.leftArrow} onClick={handleSlideLeft}>
        <div className={styles.arrow}>&lt;</div>
      </div>
      <ul id="slider">
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
