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
  const { favoriteGamesObjArray } = useFavorites();

  const { searchedGames } = useSearch(favoriteGamesObjArray);
  const { filteredGames } = useFilter(searchedGames);
  const sortedGames = useSort(filteredGames);

  const gamesToRender = !sortedGames ? filteredGames : sortedGames;

  if (!gamesToRender.length)
    return <ErrorMessage message="Nenhum jogo encontrado 😕" />;

  return (
    <div className={styles.favoriteGamesList}>
      <div className={styles.header}>
        <h1>Favorites</h1>
        <div className={styles.btn}>
          <SortBy />
        </div>
      </div>
      <ul className={styles.list}>
        {gamesToRender.map((game) => (
          <GameItem game={game} key={game.id}>
            <a href={game.game_url} target="_blank" className={styles.btn}>
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
