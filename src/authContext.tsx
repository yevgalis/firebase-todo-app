import { createContext, FC, useState, useContext, useEffect } from 'react';
import { FirebaseApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  User,
  UserCredential,
  browserLocalPersistence,
} from 'firebase/auth';

interface IAuthContext {
  isAuthorized: boolean | null;
  user: User | null;
  loginWithEmail: (email: string, password: string) => Promise<UserCredential | null>;
}

interface IAuthProviderProps {
  firebaseApp: FirebaseApp;
  children: React.ReactNode;
}

export const AuthContext = createContext<IAuthContext>({
  isAuthorized: false,
  user: null,
  loginWithEmail: () => Promise.resolve(null),
});

export const useAuth = (): IAuthContext => {
  return useContext(AuthContext);
};

export const AuthProvider: FC<IAuthProviderProps> = ({ firebaseApp, children }: IAuthProviderProps) => {
  const [isAuthorized, setIsAuthorized] = useState<IAuthContext['isAuthorized']>(null);
  const [user, setUser] = useState<IAuthContext['user']>(null);
  const [auth] = useState(getAuth(firebaseApp));

  const loginWithEmail = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        return result;
      })
      .catch((error) => {
        console.error('signInWithEmailAndPassword: ', error);
        throw new Error(error);
      });
  };

  useEffect(() => {
    auth.setPersistence(browserLocalPersistence);

    auth.onAuthStateChanged((user) => {
      if (user) {
        setIsAuthorized(true);
        setUser(user);
      } else {
        setIsAuthorized(false);
        setUser(null);
      }
    });
  }, [auth]);

  return (
    <AuthContext.Provider value={{ isAuthorized, user, loginWithEmail }}>
      {children}
    </AuthContext.Provider>
  );
};
