import styles from './HeartIcon.module.css';
import { Game } from '../types/Game';
import HeartIcon from './HeartIcon';
import { useAuth } from '../contexts/authContext/hook';
import LoginAlertMessage from './LoginAlertMessage';
import { useFavoriteGameIconState } from '../hooks/useFavoriteGameIconState';

interface FavoriteGameIconProps {
  game: Game;
}

export default function FavoriteGameIcon({ game }: FavoriteGameIconProps) {
  const { isAuthenticated } = useAuth();

  const {
    authenticationAlert,
    setAuthenticationAlert,
    vanishAnimation,
    shakeAnimation,
    handleClick,
    isFavorite,
  } = useFavoriteGameIconState(isAuthenticated, game.id);

  return (
    <>
      <LoginAlertMessage
        isOpen={authenticationAlert}
        closeAlert={() =>
          setAuthenticationAlert((authenticationAlert) => !authenticationAlert)
        }
      />
      <span
        className={`${styles.heartIcon} ${
          vanishAnimation ? styles.vanishAnimation : ''
        } ${shakeAnimation ? styles.shakeAnimation : ''}`}
        onClick={() => handleClick(game)}
        role="button"
      >
        {isAuthenticated && <HeartIcon full={isFavorite} />}
        {!isAuthenticated && <HeartIcon full={isFavorite} />}
      </span>
    </>
  );
}
