import { Game } from '../types/Game';
import FavoriteGameIcon from './FavoriteGameIcon';
import styles from './FavoriteGameItem.module.css';
import StarRating from './StarRating';

interface FavoriteGameItemProps {
  game: Game;
}

export default function FavoriteGameItem({ game }: FavoriteGameItemProps) {
  return (
    <li className={styles.game}>
      <div className={styles.image}>
        <img src={game.thumbnail} />
      </div>
      <div className={styles.body}>
        <div className={styles.info}>
          <span className={styles.title}>{game.title}</span>
        </div>
        <div className={styles.actions}>
          <div className={styles.heartBox}>
            <FavoriteGameIcon game={game} />
          </div>
          <StarRating maxRating={4} gameId={game.id} />
        </div>
      </div>
    </li>
  );
}
