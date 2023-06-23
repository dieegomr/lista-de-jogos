import Filter from './Filter';
import styles from './NavBar.module.css';
import Search from './Search';

export default function NavBar() {
  return (
    <nav className={styles.navBar}>
      <h1 className={styles.logo}>🕹️ Lista de Jogos 🕹️</h1>
      <Search />
      <Filter />
    </nav>
  );
}
