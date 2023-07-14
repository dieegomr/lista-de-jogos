import { useAuthForm } from '../hooks/useAuthForm';
import styles from './AuthForm.module.css';
import { Link, useNavigate } from 'react-router-dom';

interface AuthFormProps {
  isLoginMode: boolean;
}

export default function AuthForm({ isLoginMode }: AuthFormProps) {
  const {
    handleSubmit,
    setEmail,
    setPassword,
    setPasswordConfirm,
    error,
    isLoading,
  } = useAuthForm(isLoginMode);

  const navigate = useNavigate();

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
