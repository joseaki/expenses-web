import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import firebase_app from 'src/config/firebase.config';

const auth = getAuth(firebase_app);

export const signUp = async (email: string, password: string) => {
  let result = null,
    error = null;
  try {
    result = await createUserWithEmailAndPassword(auth, email, password);
  } catch (e: any) {
    error = e;
  }

  return { result, error };
};
