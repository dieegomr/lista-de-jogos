import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase, ref } from 'firebase/database';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PRJECT_ID,
  appId: import.meta.env.VITE_APP_ID,
  databaseURL: import.meta.env.VITE_DATABASE_URL,
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const databaseRef = ref(getDatabase());
export const database = getDatabase(app);
export default app;
