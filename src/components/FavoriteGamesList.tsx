import { useFavorites } from '../contexts/favoritesContext/hook';
import { useFilterAndSearchGames } from '../hooks/useFilterAndSearchGames';
import ActionButton from './ActionButton';
import ErrorMessage from './ErrorMessage';
import styles from './FavoriteGamesList.module.css';

export default function FavoriteGamesList() {
  const { favorites, removeFavoriteGame } = useFavorites();

  const { filteredAndSearchedGames } = useFilterAndSearchGames(favorites);

  function handleOnClick(id: number) {
    removeFavoriteGame(id);
  }

  if (!filteredAndSearchedGames.length)
    return <ErrorMessage message="Nenhum jogo encontrado 😕" />;

  return (
    <ul className={styles.list}>
      {filteredAndSearchedGames.map((game) => (
        <li className={styles.game} key={game.id}>
          <div className={styles.image}>
            <img src={game.thumbnail} />
          </div>
          <div className={styles.info}>
            <span className={styles.title}>{game.title}</span>
            <span>{game.genre}</span>
          </div>
          <div className={styles.actions}>
            <ActionButton onClick={() => handleOnClick(game.id)}>
              X
            </ActionButton>
          </div>
        </li>
      ))}
    </ul>
  );
}
