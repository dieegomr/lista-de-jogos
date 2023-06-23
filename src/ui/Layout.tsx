import styles from './Layout.module.css';

interface Props {
  children?: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return <div className={styles.app}>{children}</div>;
}
