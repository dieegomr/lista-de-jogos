import { useState } from 'react';

import Filter from './components/Filter';
import GameList from './components/GameList';
import Logo from './components/Logo';
import NavBar from './components/NavBar';
import Search from './components/Search';
import Layout from './ui/Layout';
import { useGames } from './hooks/useGames';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');

  const { games, isLoading, error } = useGames();

  const gamesObj = {
    games,
    isLoading,
    error,
  };

  return (
    <Layout>
      <NavBar>
        <Logo />
        <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <Filter
          games={games}
          selectedGenre={selectedGenre}
          setSelectedGenre={setSelectedGenre}
        />
      </NavBar>
      <GameList
        searchQuery={searchQuery}
        selectedGenre={selectedGenre}
        gamesObj={gamesObj}
      />
    </Layout>
  );
}
