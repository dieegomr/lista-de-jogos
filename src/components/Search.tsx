import styles from './Search.module.css';

type SearchProps = {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
};

export default function Search({ query, setQuery }: SearchProps) {
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
