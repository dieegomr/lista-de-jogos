import { useState } from 'react';
import styles from './Search.module.css';

export default function Search() {
  const [query, setQuery] = useState('');
  console.log(query);

  return (
    <input
      className={styles.search}
      type="text"
      placeholder="Busque por jogos..."
      value={query}
      onChange={(event) => {
        setQuery(event.target.value);
      }}
    />
  );
}
