import { useState } from 'react';
import styles from './AuthForm.module.css';
import { useAuth } from '../contexts/authContext/hook';
import { Link, useNavigate } from 'react-router-dom';
import { getErrorMessage } from '../utils/helpers';

interface AuthFormProps {
  isLoginMode: boolean;
}

export default function AuthForm({ isLoginMode }: AuthFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { login, signup } = useAuth();

  const navigate = useNavigate();

  async function handleSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      if (!email || !password || (!isLoginMode && !passwordConfirm))
        throw new Error('Missing field');

      if (!isLoginMode && password !== passwordConfirm)
        throw new Error('Password mismatch');

      if (isLoginMode) {
        await login(email, password);
      }

      if (!isLoginMode && password === passwordConfirm) {
        await signup(email, password);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
        const message = getErrorMessage(error.message);
        setError(message);
      } else {
        setError('Um erro inesperado ocorreu');
      }
    } finally {
      setIsLoading(false);
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
        <button disabled={isLoading}>
          {isLoginMode ? 'Login' : 'Sign up'}
        </button>
        <button
          onClick={() =>
            navigate(`/${isLoginMode ? 'games' : 'auth?mode=login'}`)
          }
        >
          Cancel
        </button>
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
