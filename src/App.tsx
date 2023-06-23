import Filter from './components/Filter';
import GameList from './components/GameList';
import Logo from './components/Logo';
import NavBar from './components/NavBar';
import Search from './components/Search';
import Layout from './ui/Layout';

export default function App() {
  return (
    <Layout>
      <NavBar>
        <Logo />
        <Search />
        <Filter />
      </NavBar>
      <GameList />
    </Layout>
  );
}
