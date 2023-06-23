import styles from './NavBar.module.css';

export default function NavBar() {
  return (
    <nav className={styles.navBar}>
      <h1 className={styles.logo}>🕹️ Lista de Jogos 🕹️</h1>
      <input
        className={styles.search}
        type="text"
        placeholder="Busque por jogos..."
      />
    </nav>
  );
}
