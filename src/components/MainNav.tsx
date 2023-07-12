import { NavLink } from 'react-router-dom';
import styles from './MainNav.module.css';
import { useAuth } from '../contexts/authContext/hook';

export default function MainNav() {
  const { isAuthenticated } = useAuth();

  const direction = isAuthenticated ? 'favorites' : 'auth?mode=login';

  function handleFavorites() {
    if (!isAuthenticated) alert('Voce precisa estar logado');
  }

  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <NavLink to="games">Games</NavLink>
        </li>
        <li>
          <NavLink to={direction} onClick={handleFavorites}>
            Favorites
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
