import { useContext } from 'react';
import { AuthContext } from '.';

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error('Auth context was used outside the AuthProvider');
  return context;
}
