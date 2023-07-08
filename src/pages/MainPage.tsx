import { Outlet } from 'react-router-dom';
import GenreSelector from '../components/GenreSelector';
import Logo from '../components/Logo';
import Main from '../components/Main';
import NavBar from '../components/NavBar';
import Search from '../components/Search';
import styles from './MainPage.module.css';

interface MainPageProps {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  selectedGenre: string;
  setSelectedGenre: React.Dispatch<React.SetStateAction<string>>;
}

export default function MainPage({
  searchQuery,
  setSearchQuery,
  selectedGenre,
  setSelectedGenre,
}: MainPageProps) {
  return (
    <div className={styles.app}>
      <NavBar>
        <Logo />
        <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      </NavBar>
      <GenreSelector
        selectedGenre={selectedGenre}
        setSelectedGenre={setSelectedGenre}
      />
      <Main>
        <Outlet />
      </Main>
    </div>
  );
}
