import { Outlet } from 'react-router-dom';
import GenreSelector from '../components/GenreSelector';
import Main from '../components/Main';
import NavBar from '../components/NavBar';

import styles from './MainPage.module.css';

export default function MainPage() {
  return (
    <div className={styles.app}>
      <NavBar />
      <GenreSelector />
      <Main>
        <Outlet />
      </Main>
    </div>
  );
}
