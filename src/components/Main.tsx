import { MainProps } from '../types/MainProps';
import styles from './Main.module.css';

export default function Main({ children }: MainProps) {
  return <div className={styles.main}>{children}</div>;
}
