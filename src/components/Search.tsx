import { SearchProps } from '../types/SearchProps';
import styles from './Search.module.css';

export default function Search({ searchQuery, setSearchQuery }: SearchProps) {
  return (
    <input
      className={styles.search}
      type="text"
      placeholder="Busque por jogos..."
      value={searchQuery}
      onChange={(event) => {
        setSearchQuery(event.target.value);
      }}
    />
  );
}
