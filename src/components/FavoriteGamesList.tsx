import { LuGamepad2 } from 'react-icons/lu';

import { useFavorites } from '../contexts/favoritesContext/hook';
import ErrorMessage from './ErrorMessage';
import styles from './FavoriteGamesList.module.css';
import GameItem from './GameItem';
import SortBy from './SortBy';
import { useSearch } from '../hooks/useSearch';
import { useFilter } from '../hooks/useFilter';
import { useSort } from '../hooks/useSort';

export default function FavoriteGamesList() {
  const { favorites } = useFavorites();

  const error = false;

  const { searchedGames } = useSearch(favorites);
  const { filteredGames } = useFilter(searchedGames);
  const { sortedGames } = useSort(filteredGames);

  if (!sortedGames.length)
    return <ErrorMessage message="Nenhum jogo encontrado 😕" />;

  return (
    <div className={styles.favoriteGamesList}>
      {!error && (
        <div className={styles.header}>
          <h1>Favorites</h1>
          <div className={styles.btn}>
            <SortBy />
          </div>
        </div>
      )}
      <ul className={styles.list}>
        {sortedGames.map((game) => (
          <GameItem game={game} key={game.id}>
            <a>
              Play Now
              <span className={styles.icon}>
                <LuGamepad2 size={17} />
              </span>
            </a>
          </GameItem>
        ))}
      </ul>
    </div>
  );
}
