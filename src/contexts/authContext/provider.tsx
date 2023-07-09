import { ReactNode, useReducer } from 'react';
import { AuthContext } from '.';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';

interface AuthProviderProps {
  children: ReactNode;
}

const initialState = {
  user: null,
  isAuthenticated: false,
};

type ACTIONTYPE = { type: 'login'; payload: string } | { type: 'logout' };

function reducer(
  state: { user: string | null; isAuthenticated: boolean },
  action: ACTIONTYPE
) {
  switch (action.type) {
    case 'login':
      return { ...state, user: action.payload, isAuthenticated: true };
    case 'logout':
      return { ...state, user: null, isAuthenticated: false };
    default:
      throw new Error('Unknown action');
  }
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState
  );

  async function login(email: string, password: string) {
    await signInWithEmailAndPassword(auth, email, password);
    dispatch({ type: 'login', payload: email });
  }

  function logout() {
    dispatch({ type: 'logout' });
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
