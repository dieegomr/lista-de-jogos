import { ReactNode } from 'react';
import styles from './ActionButton.module.css';

interface ActionButtonProps
  extends React.HtmlHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export default function ActionButton({ children, ...rest }: ActionButtonProps) {
  return (
    <button className={styles.actionBtn} {...rest}>
      {children}
    </button>
  );
}
