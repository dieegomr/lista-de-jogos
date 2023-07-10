import { GameItemProps } from '../types/GameItemProps';
import FavoriteGameIcon from './FavoriteGameIcon';
import styles from './GameItem.module.css';
import StarRating from './StarRating';

export default function GameItem({ game }: GameItemProps) {
  const { thumbnail, title, short_description: description, genre } = game;

  return (
    <li className={styles.game}>
      <div className={styles.genreBox}>
        <h3 className={styles.genre}>{genre}</h3>
      </div>
      <img
        src={thumbnail}
        alt={`cartaz do jogo ${title}`}
        className={styles.img}
      />
      <div className={styles.actionContainer}>
        <div className={styles.heartBox}>
          <FavoriteGameIcon game={game} />
        </div>
        <div className={styles.starsBox}>
          <StarRating maxRating={4} />
        </div>
      </div>
      <div className={styles.body}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.description}>{description}</p>
      </div>
    </li>
  );
}
