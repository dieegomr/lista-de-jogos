import styles from './NavBar.module.css';

import Logo from '../components/Logo';
import Search from '../components/Search';
import ActionButton from '../components/ActionButton';
import { useAuth } from '../contexts/authContext/hook';
import { useNavigate } from 'react-router-dom';
import { useFavorites } from '../contexts/favoritesContext/hook';
import { useRatedGames } from '../contexts/ratedGamesContext/hook';

export default function NavBar() {
  const { logout, isAuthenticated } = useAuth();
  const { resetFavoriteGames } = useFavorites();
  const { resetRatedGames } = useRatedGames();
  const navigate = useNavigate();

  function handleAuth() {
    if (isAuthenticated) {
      logout();
      resetFavoriteGames();
      resetRatedGames();
      navigate('/games');
    } else {
      navigate('/auth?mode=login');
    }
  }

  return (
    <nav className={styles.navBar}>
      <div className={styles.top}>
        <Logo />
        <div className={styles.btn}>
          <ActionButton type="authBtn" onClick={handleAuth}>
            {isAuthenticated ? 'Logout' : 'Login'}
          </ActionButton>
        </div>
      </div>
      <div className={styles.search}>
        <Search />
      </div>
    </nav>
  );
}
