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

  return (
    <nav className={styles.navBar}>
      <div className={styles.top}>
        <Logo />
        <div className={styles.btn}>
          <ActionButton onClick={handleAuth}>
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
