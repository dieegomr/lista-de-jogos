import { useState } from 'react';
import styles from './AuthForm.module.css';
import { useAuth } from '../contexts/authContext/hook';
import { Link, useNavigate } from 'react-router-dom';
import ActionButton from './ActionButton';

interface AuthFormProps {
  isLoginMode: boolean;
}

export default function AuthForm({ isLoginMode }: AuthFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [error, setError] = useState('');

  const { login, signup } = useAuth();

  const navigate = useNavigate();

  async function handleSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    try {
      if (!email || !password || (!isLoginMode && !passwordConfirm))
        throw new Error('Por favor, preencha e-mail e senha');

      if (!isLoginMode && password !== passwordConfirm)
        throw new Error('Os passwords não conferem');

      if (isLoginMode) {
        await login(email, password);
      }

      if (!isLoginMode && password === passwordConfirm) {
        await signup(email, password);
      }
    } catch (error) {
      if (error instanceof Error) setError(error.message);
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label htmlFor="email">Email address</label>
        <input
          type="email"
          id="email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {!isLoginMode && (
        <div className={styles.row}>
          <label htmlFor="passwordConfirm">Confirm Password</label>
          <input
            type="password"
            id="passwordConfirm"
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />
        </div>
      )}
      <div className={styles.messageBox}>
        <span>{error}</span>
      </div>
      <div className={styles.actions}>
        <ActionButton>{isLoginMode ? 'Login' : 'Sign up'}</ActionButton>
        <ActionButton
          onClick={() =>
            navigate(`/${isLoginMode ? 'games' : 'auth?mode=login'}`)
          }
        >
          Cancel
        </ActionButton>
        {isLoginMode && (
          <div className={styles.signup}>
            <span>Não possui uma conta?</span>
            <Link to={'?mode=signup'}>Sign up</Link>
          </div>
        )}
      </div>
    </form>
  );
}
