import { createContext, FC, useState, useContext, useEffect } from 'react';
import { FirebaseApp } from 'firebase/app';
import {
  getAuth,
  User,
  // signInWithEmailAndPassword,
  browserLocalPersistence,
} from 'firebase/auth';

interface IAuthContext {
  isAuthorized: boolean | null,
  user: User | null;
}

interface IAuthProviderProps {
  firebaseApp: FirebaseApp;
  children: React.ReactNode;
}

export const AuthContext = createContext<IAuthContext>({
  isAuthorized: false,
  user: null,
});

export const useAuth = (): IAuthContext => {
  return useContext(AuthContext);
};

export const AuthProvider: FC<IAuthProviderProps> = ({ firebaseApp, children }: IAuthProviderProps) => {
  const [isAuthorized, setIsAuthorized] = useState<IAuthContext['isAuthorized']>(null);
  const [user, setUser] = useState<IAuthContext['user']>(null);
  const [auth] = useState(getAuth(firebaseApp));

  useEffect(() => {
    auth.setPersistence(browserLocalPersistence);
    // signInWithEmailAndPassword(auth, 'todo-admin@mail.com', 'admin123');

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
    <AuthContext.Provider value={{ isAuthorized, user }}>
      {children}
    </AuthContext.Provider>
  );
};
