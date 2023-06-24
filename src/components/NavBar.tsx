import { NavBarProps } from '../types/NavBarProps';
import styles from './NavBar.module.css';

export default function NavBar({ children }: NavBarProps) {
  return <nav className={styles.navBar}>{children}</nav>;
}
