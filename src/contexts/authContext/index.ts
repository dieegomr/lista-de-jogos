import { UserCredential } from 'firebase/auth';
import { createContext } from 'react';

export interface User {
  email: string;
  uid: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<UserCredential>;
  logout: () => void;
  signup: (email: string, password: string) => Promise<UserCredential>;
}

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);
