import { useState } from 'react';
import styles from './HeartIcon.module.css';
import { Game } from '../types/Game';
import HeartIcon from './HeartIcon';
import { useFavorites } from '../contexts/favoritesContext/hook';
import { useAuth } from '../contexts/authContext/hook';
import LoginAlertMessage from './LoginAlertMessage';

interface FavoriteGameIconProps {
  game: Game;
}

export default function FavoriteGameIcon({ game }: FavoriteGameIconProps) {
  const [loginAlert, setLoginAlert] = useState(false);

  const [tempFull, setTempFull] = useState(false);

  const { favorites, addFavoriteGame, removeFavoriteGame } = useFavorites();
  const { isAuthenticated } = useAuth();

  const isFavorite = favorites
    .map((favoriteGame) => favoriteGame.id)
    .includes(game.id);

  async function handleClick(game: Game) {
    if (!isAuthenticated) {
      setLoginAlert(true);
    } else {
      isFavorite ? removeFavoriteGame(game.id) : addFavoriteGame(game);
    }
  }

  return (
    <>
      <LoginAlertMessage
        isOpen={loginAlert}
        closeAlert={() => setLoginAlert((loginAlert) => !loginAlert)}
      />
      <span
        className={styles.heartIcon}
        onMouseEnter={() => setTempFull(true)}
        onMouseLeave={() => setTempFull(false)}
        onClick={() => handleClick(game)}
        role="button"
      >
        {isAuthenticated && (
          <HeartIcon full={isFavorite ? isFavorite : tempFull} />
        )}
        {!isAuthenticated && <HeartIcon full={tempFull} />}
      </span>
    </>
  );
}
