import { useState } from 'react';
import styles from './HeartIcon.module.css';
import { Game } from '../types/Game';
import HeartIcon from './HeartIcon';
import { useFavorites } from '../contexts/favoritesContext/hook';
import { useAuth } from '../contexts/authContext/hook';
import { useNavigate } from 'react-router-dom';

interface FavoriteGameIconProps {
  game: Game;
}

export default function FavoriteGameIcon({ game }: FavoriteGameIconProps) {
  const navigate = useNavigate();

  const [tempFull, setTempFull] = useState(false);

  const { favorites, addFavoriteGame, removeFavoriteGame } = useFavorites();
  const { isAuthenticated } = useAuth();

  const isFavorite = favorites
    .map((favoriteGame) => favoriteGame.id)
    .includes(game.id);

  async function handleClick(game: Game) {
    if (!isAuthenticated) {
      alert('voce precisa estar logado');
      navigate('/auth');
    } else {
      isFavorite ? removeFavoriteGame(game.id) : addFavoriteGame(game);
    }
  }

  return (
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
  );
}
