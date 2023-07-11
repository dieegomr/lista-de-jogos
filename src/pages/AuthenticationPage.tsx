import { useEffect } from 'react';
import Logo from '../components/Logo';
import { useAuth } from '../contexts/authContext/hook';
import styles from './AuthenticationPage.module.css';
import { useNavigate, useSearchParams } from 'react-router-dom';
import AuthForm from '../components/AuthForm';

export default function AuthenticationPage() {
  const [searchParams] = useSearchParams();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const isLoginMode = searchParams.get('mode') === 'login';

  useEffect(() => {
    if (isAuthenticated) navigate('/games', { replace: true });
  }, [isAuthenticated, navigate]);

  return (
    <div className={styles.container}>
      <main className={styles.login}>
        <Logo />
        <h2>{isLoginMode ? 'Login' : 'Signup'}</h2>
        <AuthForm isLoginMode={isLoginMode} />
      </main>
    </div>
  );
}
