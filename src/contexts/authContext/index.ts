import { createContext } from 'react';

interface AuthContextType {
  user: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => unknown;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);
