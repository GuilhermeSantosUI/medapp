/* eslint-disable react-refresh/only-export-components */
import { createContext, ReactNode, useContext, useState } from 'react';
import { localStorageKeys } from '../config/local-storage-keys';
import { AuthResponseProps } from '../models';

type AuthContextType = {
  user: User | null;
  token: string | null;
  handleLogin: (props: AuthResponseProps) => void;
  handleLogout: () => void;
  isTokenExpired: boolean;
  isAuth: boolean;
};

type User = {
  id: number;
  name: string;
  email: string;
};

type AuthProviderProps = {
  children: ReactNode;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isTokenExpired, setIsTokenExpired] = useState(false);
  const [isAuth, setIsAuth] = useState(false);

  function handleLogin(props: AuthResponseProps) {
    const userData = {
      id: props.id,
      name: props.name,
      email: props.email,
    };
    setUser(userData);
    setToken(props.api_token);
    setIsAuth(true);
    localStorage.setItem(localStorageKeys.USER_DATA, JSON.stringify(userData));
    localStorage.setItem(localStorageKeys.ACCESS_TOKEN, props.api_token);
  }

  function handleLogout() {
    setUser(null);
    setToken(null);
    setIsTokenExpired(true);
    localStorage.removeItem(localStorageKeys.USER_DATA);
    localStorage.removeItem(localStorageKeys.ACCESS_TOKEN);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        handleLogin,
        handleLogout,
        isTokenExpired,
        isAuth,
      }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
