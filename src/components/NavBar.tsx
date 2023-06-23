import Filter from './Filter';
import Logo from './Logo';
import styles from './NavBar.module.css';
import Search from './Search';

export default function NavBar() {
  return (
    <nav className={styles.navBar}>
      <Logo />
      <Search />
      <Filter />
    </nav>
  );
}
