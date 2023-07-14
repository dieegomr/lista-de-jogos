import { ReactNode } from 'react';
import styles from './ActionButton.module.css';

interface ActionButtonProps
  extends React.HtmlHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  isLoading?: boolean;
  type?: string;
}

export default function ActionButton({
  children,
  className = '',
  isLoading = false,
  type = '',
  ...rest
}: ActionButtonProps) {
  return (
    <button
      className={`${className} ${styles.actionBtn} ${
        isLoading ? styles['inative'] : ''
      } ${styles[type]}`}
      {...rest}
    >
      {children}
    </button>
  );
}
