import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import firebase_app from 'src/config/firebase.config';

const auth = getAuth(firebase_app);

export const signIn = async (email: string, password: string) => {
  let result = null,
    error = null;
  try {
    result = await signInWithEmailAndPassword(auth, email, password);
  } catch (e) {
    error = e;
  }

  return { result, error };
};
