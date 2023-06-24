import { ErrorMessageProps } from '../types/ErrorMessageProps';
import styles from './ErrorMessage.module.css';

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return <p className={styles.error}>{message}</p>;
}
