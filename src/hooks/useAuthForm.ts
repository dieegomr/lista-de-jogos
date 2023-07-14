import { useState } from 'react';
import { useAuth } from '../contexts/authContext/hook';
import { getErrorMessage } from '../utils/helpers';

export function useAuthForm(isLoginMode: boolean) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { login, signup } = useAuth();

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
  return {
    setEmail,
    setPassword,
    setPasswordConfirm,
    error,
    isLoading,
    handleSubmit,
  };
}
