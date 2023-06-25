import { SearchProps } from '../types/SearchProps';
import styles from './Search.module.css';

export default function Search({ searchQuery, setSearchQuery }: SearchProps) {
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
