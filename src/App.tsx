import GameList from './components/GameList';
import NavBar from './components/NavBar';
import Layout from './ui/Layout';

export default function App() {
  return (
    <Layout>
      <NavBar />
      <GameList />
    </Layout>
  );
}
