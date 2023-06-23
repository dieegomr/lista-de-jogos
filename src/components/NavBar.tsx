import styles from './NavBar.module.css';

interface Props {
  children?: React.ReactNode;
}

export default function NavBar({ children }: Props) {
  return <nav className={styles.navBar}>{children}</nav>;
}
