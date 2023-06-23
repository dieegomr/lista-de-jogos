import { useState } from 'react';

import Filter from './components/Filter';
import GameList from './components/GameList';
import Logo from './components/Logo';
import NavBar from './components/NavBar';
import Search from './components/Search';
import Layout from './ui/Layout';

export default function App() {
  const [query, setQuery] = useState('');

  return (
    <Layout>
      <NavBar>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <Filter />
      </NavBar>
      <GameList query={query} />
    </Layout>
  );
}
