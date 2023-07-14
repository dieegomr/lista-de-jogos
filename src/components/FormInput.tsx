import { ChangeEvent } from 'react';
import styles from './FormInput.module.css';

interface FormInputProps extends React.HtmlHTMLAttributes<HTMLInputElement> {
  label: string;
  type: string;
  id: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function FormInput({
  label,
  type,
  id,
  onChange,
}: FormInputProps) {
  return (
    <div className={styles.row}>
      <label htmlFor="email">{label}</label>
      <input type={type} id={id} onChange={onChange} />
    </div>
  );
}
