import { useFavorites } from '../contexts/favoritesContext/hook';
import ErrorMessage from './ErrorMessage';
import FavoriteGameItem from './FavoriteGameItem';
import styles from './FavoriteGamesList.module.css';

export default function FavoriteGamesList() {
  const { favorites } = useFavorites();

  if (!favorites.length)
    return <ErrorMessage message="Nenhum jogo encontrado 😕" />;

  return (
    <ul className={styles.list}>
      {favorites.map((game) => (
        <FavoriteGameItem game={game} key={game.id} />
      ))}
    </ul>
  );
}
