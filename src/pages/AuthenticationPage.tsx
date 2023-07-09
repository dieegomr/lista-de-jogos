import { useEffect, useState } from 'react';
import Logo from '../components/Logo';
import { useAuth } from '../contexts/authContext/hook';
import styles from './AuthenticationPage.module.css';
import { useNavigate } from 'react-router-dom';

export default function AuthenticationPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setError('');
    try {
      setIsSubmitting(true);
      if (!email || !password)
        throw new Error('Por favor, preencha e-mail e senha');

      await login(email, password);
      setIsSubmitting(false);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  useEffect(() => {
    if (isAuthenticated) navigate('/games', { replace: true });
  }, [isAuthenticated, navigate]);

  return (
    <div className={styles.container}>
      <main className={styles.login}>
        <Logo />
        <h2>Login</h2>
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
          <div className={styles.messageBox}>
            <span>{error}</span>
          </div>
          <div className={styles.actions}>
            <button disabled={isSubmitting} className={styles.btn}>
              Login
            </button>
            <button
              disabled={isSubmitting}
              className={styles.btn}
              onClick={() => navigate('/games')}
            >
              Cancel
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
