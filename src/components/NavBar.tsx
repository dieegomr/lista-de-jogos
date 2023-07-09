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

  return (
    <nav className={styles.navBar}>
      <Logo />
      <Search />
      <ActionButton onClick={handleAuth}>
        {isAuthenticated ? 'Logout' : 'Login'}
      </ActionButton>
      <ActionButton onClick={handleFavorites}>Favorites</ActionButton>
    </nav>
  );
}
