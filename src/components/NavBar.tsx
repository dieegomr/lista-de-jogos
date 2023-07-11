import styles from './NavBar.module.css';

import Logo from '../components/Logo';
import Search from '../components/Search';
import ActionButton from '../components/ActionButton';
import { useAuth } from '../contexts/authContext/hook';
import { useNavigate } from 'react-router-dom';

export default function NavBar() {
  const { logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  function handleAuth() {
    if (isAuthenticated) {
      logout();
      navigate('/');
    } else {
      navigate('/auth');
    }
  }

  function handleFavorites() {
    isAuthenticated
      ? navigate('/favorites')
      : alert('é necessario logar para acessar os favoritos');
  }

  function handleGames() {
    navigate('/games');
  }

  return (
    <nav className={styles.navBar}>
      <div className={styles.top}>
        <Logo />
        <ActionButton onClick={handleAuth}>
          {isAuthenticated ? 'Logout' : 'Login'}
        </ActionButton>
      </div>
      <div className={styles.search}>
        <Search />
      </div>
      <div className={styles.actions}>
        <ActionButton onClick={handleGames}>Games</ActionButton>
        <ActionButton onClick={handleFavorites}>Favorites</ActionButton>
      </div>
    </nav>
  );
}
