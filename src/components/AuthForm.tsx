import { useAuthForm } from '../hooks/useAuthForm';
import styles from './AuthForm.module.css';
import { Link, useNavigate } from 'react-router-dom';
import FormInput from './FormInput';
import ActionButton from './ActionButton';
import { MouseEventHandler } from 'react';

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

  function handleCancel(event: React.SyntheticEvent) {
    event.preventDefault();
    navigate(`/${isLoginMode ? 'games' : 'auth?mode=login'}`);
  }
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <FormInput
        id="email"
        label="Email"
        type="email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <FormInput
        id="password"
        label="Senha"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      {!isLoginMode && (
        <FormInput
          id="passwordConfirm"
          label="Confirmar senha"
          type="password"
          onChange={(e) => setPasswordConfirm(e.target.value)}
        />
      )}
      <div className={styles.messageBox}>
        <span>{error}</span>
      </div>
      <div className={styles.actions}>
        <ActionButton isLoading={isLoading} type="authBtn">
          {isLoginMode ? 'Login' : 'Sign up'}
        </ActionButton>
        <ActionButton onClick={handleCancel} isLoading={isLoading}>
          Cancelar
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
