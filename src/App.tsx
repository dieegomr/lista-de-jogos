import { useState } from 'react';

import Filter from './components/Filter';
import GameList from './components/GameList';
import Logo from './components/Logo';
import NavBar from './components/NavBar';
import Search from './components/Search';
import Layout from './ui/Layout';
import { useGames } from './hooks/useGames';
import Main from './components/Main';
import Loader from './components/Loader';
import ErrorMessage from './components/ErrorMessage';
import GenreSelector from './components/GenreSelector';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');

  const { games, isLoading, error } = useGames();

  return (
    <Layout>
      <NavBar>
        <Logo />
        <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <GenreSelector
          games={games}
          selectedGenre={selectedGenre}
          setSelectedGenre={setSelectedGenre}
        />
      </NavBar>
      <Main>
        {isLoading && !error && <Loader />}
        {error && !isLoading && <ErrorMessage message={error} />}
        {!isLoading && !error && (
          <GameList
            searchQuery={searchQuery}
            selectedGenre={selectedGenre}
            games={games}
          />
        )}
      </Main>
    </Layout>
  );
}
