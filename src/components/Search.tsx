import { useSearchQuery } from '../contexts/searchContext/hook';
import styles from './Search.module.css';

export default function Search() {
  const { searchQuery, setSearchQuery } = useSearchQuery();

  return (
    <div className={styles.searchContainer}>
      <input
        id="search"
        className={styles.search}
        type="text"
        placeholder="Busque por jogos..."
        value={searchQuery}
        onChange={(event) => {
          setSearchQuery(event.target.value);
        }}
      />
    </div>
  );
}
