import { useState } from 'react';

import GameList from './components/GameList';
import Logo from './components/Logo';
import NavBar from './components/NavBar';
import Search from './components/Search';
import Layout from './ui/Layout';
import { useGames } from './hooks/useGames';
import Main from './components/Main';
import ErrorMessage from './components/ErrorMessage';
import GenreSelector from './components/GenreSelector';
import Loader from './ui/Loader';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');

  const { games, isLoading, error } = useGames();

  return (
    <Layout>
      <NavBar>
        <Logo />
        <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      </NavBar>
      <section>
        <GenreSelector
          games={games}
          selectedGenre={selectedGenre}
          setSelectedGenre={setSelectedGenre}
        />
      </section>
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
