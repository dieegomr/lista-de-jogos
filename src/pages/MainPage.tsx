import { Outlet, useNavigate } from 'react-router-dom';
import GenreSelector from '../components/GenreSelector';
import Logo from '../components/Logo';
import Main from '../components/Main';
import NavBar from '../components/NavBar';
import Search from '../components/Search';
import styles from './MainPage.module.css';
import ActionButton from '../components/ActionButton';
import { useAuth } from '../contexts/authContext/hook';

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
    <div className={styles.app}>
      <NavBar>
        <Logo />
        <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <ActionButton onClick={handleAuth}>
          {isAuthenticated ? 'Logout' : 'Login'}
        </ActionButton>
        <ActionButton onClick={handleFavorites}>Favorites</ActionButton>
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
