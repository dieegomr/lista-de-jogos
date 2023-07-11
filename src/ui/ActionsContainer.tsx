import { ReactNode } from 'react';
import styles from './ActionsContainer.module.css';

interface ActionsContainerProps {
  children: ReactNode;
}

export default function ActionsContainer({ children }: ActionsContainerProps) {
  return <div className={styles.actionContainer}>{children}</div>;
}
