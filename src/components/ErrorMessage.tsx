import { ErrorMessageProps } from '../types/ErrorMessageProps';
import styles from './ErrorMessage.module.css';

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className={styles.error}>
      <p className={styles.message}>{message}</p>
    </div>
  );
}
