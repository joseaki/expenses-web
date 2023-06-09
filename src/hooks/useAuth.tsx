import { useQueryClient } from '@tanstack/react-query';
import { User, getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { useRouter } from 'next/router';
import { PropsWithChildren, createContext, useContext, useEffect, useState } from 'react';
import firebase_app from 'src/config/firebase.config';
import { IUseAuth } from 'src/interfaces/hooks/auth.interface';

const AuthContext = createContext<IUseAuth | undefined>(undefined);
const auth = getAuth(firebase_app);

export const AuthProvider = (props: PropsWithChildren) => {
  const [user, setUser] = useState<User | undefined>(undefined);
  const queryClient = useQueryClient();

  const revokeToken = async () => {
    await signOut(auth);
    document.cookie = `token=; path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
    queryClient.clear();
    setUser(undefined);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
      if (fbUser) {
        const token = await fbUser.getIdToken();
        document.cookie = `token=${token}; path=/`;
        setUser(fbUser);
      } else {
        document.cookie = `token=; path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
        setUser(undefined);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, revokeToken }}>{props.children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth mush be used inside an AuthProvider');
  }

  return context;
};
