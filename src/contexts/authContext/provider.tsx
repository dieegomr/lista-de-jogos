import { ReactNode, useReducer } from 'react';
import { AuthContext, User } from '.';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from '../../firebase';

interface AuthProviderProps {
  children: ReactNode;
}

const initialState = {
  user: null,
  isAuthenticated: false,
};

type ACTIONTYPE = { type: 'login'; payload: User } | { type: 'logout' };

function reducer(
  state: { user: User | null; isAuthenticated: boolean },
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

  async function signup(email: string, password: string) {
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        dispatch({
          type: 'login',
          payload: { email: user.email as string, uid: user.uid },
        });
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  }

  async function login(email: string, password: string) {
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        dispatch({
          type: 'login',
          payload: { email: user.email as string, uid: user.uid },
        });
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  }

  async function logout() {
    await auth.signOut();
    dispatch({ type: 'logout' });
  }

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, login, logout, signup }}
    >
      {children}
    </AuthContext.Provider>
  );
}
