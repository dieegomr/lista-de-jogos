import { useState } from 'react';
import styles from './HeartIcon.module.css';
import { Game } from '../types/Game';
import HeartIcon from './HeartIcon';
import { useFavorites } from '../contexts/favoritesContext/hook';

interface FavoriteGameIconProps {
  game: Game;
}

export default function FavoriteGameIcon({ game }: FavoriteGameIconProps) {
  const [tempFull, setTempFull] = useState(false);

  const { favorites, addFavoriteGame } = useFavorites();

  const isFavorite = favorites
    .map((favoriteGame) => favoriteGame.id)
    .includes(game.id);

  async function handleClick(game: Game) {
    addFavoriteGame(game);
  }

  return (
    <span
      className={styles.heartIcon}
      onMouseEnter={() => setTempFull(true)}
      onMouseLeave={() => setTempFull(false)}
      onClick={() => handleClick(game)}
    >
      <HeartIcon full={isFavorite ? isFavorite : tempFull} />
    </span>
  );
}
