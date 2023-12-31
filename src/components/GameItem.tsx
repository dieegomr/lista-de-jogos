import { GameItemProps } from '../types/GameItemProps';
import ActionsContainer from '../ui/ActionsContainer';
import FavoriteGameIcon from './FavoriteGameIcon';
import styles from './GameItem.module.css';
import StarRating from './StarRating';

export default function GameItem({ game, children }: GameItemProps) {
  const { thumbnail, title, genre } = game;

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
      <ActionsContainer>
        <div className={styles.heartBox}>
          <FavoriteGameIcon game={game} />
        </div>
        <div className={styles.starsBox}>
          <StarRating maxRating={4} gameId={game.id} />
        </div>
      </ActionsContainer>
      <div className={styles.body}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.description}>{children}</div>
      </div>
    </li>
  );
}
