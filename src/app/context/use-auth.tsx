/* eslint-disable react-refresh/only-export-components */
import { localStorageKeys } from '@/app/config/local-storage-keys';
import { AuthProps } from '@/app/models';
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from 'react';
import { toast } from 'sonner';
import { authService } from '../services/auth';

type AuthContextType = {
  user: User | null;
  token: string | null;
  signIn: (props: AuthProps) => Promise<void>;
  signOut: () => void;
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

  const signIn = useCallback(async (params: AuthProps) => {
    const props = await authService.auth(params);

    if (!props) {
      toast.error('Falha na autenticação');
      throw new Error('Authentication failed: props is null');
    }

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
  }, []);

  const signOut = useCallback(() => {
    setUser(null);
    setToken(null);
    setIsTokenExpired(true);
    setIsAuth(false);
    localStorage.removeItem(localStorageKeys.USER_DATA);
    localStorage.removeItem(localStorageKeys.ACCESS_TOKEN);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        signIn,
        signOut,
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
