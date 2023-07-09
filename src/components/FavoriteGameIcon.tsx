import { useState } from 'react';
import styles from './HeartIcon.module.css';
import { Game } from '../types/Game';
import HeartIcon from './HeartIcon';

interface FavoriteGameIconProps {
  game: Game;
}

export default function FavoriteGameIcon({ game }: FavoriteGameIconProps) {
  const [tempFull, setTempFull] = useState(false);

  function handleClick(game: Game) {
    // add or delete favorite
  }

  return (
    <span
      className={styles.heartIcon}
      onMouseEnter={() => setTempFull(true)}
      onMouseLeave={() => setTempFull(false)}
      onClick={() => handleClick(game)}
    >
      <HeartIcon full={tempFull} />
    </span>
  );
}
