import styles from './Main.module.css';

type MainProps = {
  children?: React.ReactNode;
};

export default function Main({ children }: MainProps) {
  return <div className={styles.main}>{children}</div>;
}
