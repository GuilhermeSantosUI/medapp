/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

type AuthContextType = {
  user: User | null;
  token: string | null;
  handleLogin: (userData: User, token: string, tokenExpiration: string) => void;
  handleLogout: () => void;
  isTokenExpired: boolean;
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
  const [tokenExpiration, setTokenExpiration] = useState<string | null>(null);
  const [isTokenExpired, setIsTokenExpired] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedExpiration = localStorage.getItem('tokenExpiration');
    const storedUser = localStorage.getItem('user');

    if (storedToken && storedExpiration && storedUser) {
      const expirationTime = new Date(storedExpiration);
      if (new Date() > expirationTime) {
        handleLogout();
      } else {
        setToken(storedToken);
        setTokenExpiration(storedExpiration);
        setUser(JSON.parse(storedUser));
      }
    }

    function checkTokenExpiration() {
      if (tokenExpiration && new Date() > new Date(tokenExpiration)) {
        handleLogout();
      }
    }

    const interval = setInterval(checkTokenExpiration, 30000);

    return () => clearInterval(interval);
  }, [tokenExpiration]);

  function handleLogin(userData: User, token: string, tokenExpiration: string) {
    setUser(userData);
    setToken(token);
    setTokenExpiration(tokenExpiration);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', token);
    localStorage.setItem('tokenExpiration', tokenExpiration);
  }

  function handleLogout() {
    setUser(null);
    setToken(null);
    setTokenExpiration(null);
    setIsTokenExpired(true);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('tokenExpiration');
  }

  return (
    <AuthContext.Provider
      value={{ user, token, handleLogin, handleLogout, isTokenExpired }}>
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
