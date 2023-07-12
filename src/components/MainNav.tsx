import { NavLink } from 'react-router-dom';
import styles from './MainNav.module.css';
import { useAuth } from '../contexts/authContext/hook';
import LoginAlertMessage from './LoginAlertMessage';
import { useState } from 'react';

export default function MainNav() {
  const { isAuthenticated } = useAuth();
  const [loginAlert, setLoginAlert] = useState(false);

  const direction = isAuthenticated ? 'favorites' : 'auth?mode=login';

  function handleFavorites(event: React.SyntheticEvent) {
    if (!isAuthenticated) {
      event.preventDefault();
      setLoginAlert(true);
    }
  }

  return (
    <>
      <LoginAlertMessage
        isOpen={loginAlert}
        closeAlert={() => setLoginAlert((loginAlert) => !loginAlert)}
      />
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
    </>
  );
}
