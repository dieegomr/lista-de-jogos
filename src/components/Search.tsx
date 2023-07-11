import { useEffect, useRef } from 'react';
import { useSearchQuery } from '../contexts/searchContext/hook';
import styles from './Search.module.css';

export default function Search() {
  const { searchQuery, setSearchQuery } = useSearchQuery();

  const inputEl = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputEl.current?.focus();
  }, []);

  return (
    <div className={styles.searchContainer}>
      <input
        id="search"
        className={styles.search}
        type="text"
        placeholder="Busque por jogos..."
        value={searchQuery}
        ref={inputEl}
        onChange={(event) => {
          setSearchQuery(event.target.value);
        }}
      />
    </div>
  );
}
