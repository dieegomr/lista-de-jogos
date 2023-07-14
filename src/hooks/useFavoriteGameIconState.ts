import { useState } from 'react';
import { Game } from '../types/Game';
import { useFavorites } from '../contexts/favoritesContext/hook';

export function useFavoriteGameIconState(
  isAuthenticated: boolean,
  gameId: number
) {
  const [authenticationAlert, setAuthenticationAlert] = useState(false);
  const [vanishAnimation, setVanishAnimation] = useState(false);
  const [shakeAnimation, setShakeAnimation] = useState(false);

  const { addFavoriteGame, removeFavoriteGame, isGameFavorite } =
    useFavorites();

  const isFavorite = isGameFavorite(gameId);

  async function handleClick(game: Game) {
    if (!isAuthenticated) {
      setAuthenticationAlert(true);
    } else {
      if (!isFavorite) {
        addFavoriteGame(game);
        setShakeAnimation(true);
        setTimeout(() => {
          setShakeAnimation(false);
        }, 600);
      } else {
        setVanishAnimation(true);
        setTimeout(() => {
          setVanishAnimation(false);
        }, 600);
        setTimeout(() => {
          removeFavoriteGame(game.id);
        }, 300);
      }
    }
  }

  return {
    vanishAnimation,
    shakeAnimation,
    isFavorite,
    authenticationAlert,
    setAuthenticationAlert,
    handleClick,
  };
}
