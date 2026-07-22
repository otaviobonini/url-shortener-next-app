"use client";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { AuthUser, LoginUserInput as LoginInput, CreateUserInput as RegisterInput } from "@/schemas/user.schema";
import {
  login as loginRequest,
  register as registerRequest,
  renewAccessToken as refreshAccessToken,
    logout as logoutRequest,

} from "../services/auth.service";

interface AuthContextType {
  user:  AuthUser | null;
  token: string | null;
  isLoading: boolean;
  login: (data: LoginInput) => Promise<void>;
  register: (data: RegisterInput) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Bootstrap: tenta restaurar sessão via cookie httpOnly, sem tocar em localStorage
  useEffect(() => {
    (async () => {
      try {
        const { token: newToken, ...user } = await refreshAccessToken();
        setToken(newToken);
        setUser(user);
      } catch {
        // sem cookie válido — segue deslogado, é o esperado
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  // Renova o access token ~60s antes de expirar, sem depender de nada em disco
  useEffect(() => {
    if (!token) return;
    const payload = JSON.parse(atob(token.split(".")[1]));
    const msUntilRenew = payload.exp * 1000 - Date.now() - 60_000;

    const renew = async () => {
      try {
        const { token: newToken, ...user } = await refreshAccessToken();
        setToken(newToken);
        setUser(user);
      } catch {
        logout();
      }
    };

    if (msUntilRenew <= 0) {
      renew();
      return;
    }
    const timer = setTimeout(renew, msUntilRenew);
    return () => clearTimeout(timer);
  }, [token]);

  async function login(data: LoginInput) {
    const response = await loginRequest(data);
    setToken(response.token);
    setUser({
      id: response.id,
      email: response.email,
      username: response.username,
    });
  }

  async function register(data: RegisterInput) {
    await registerRequest(data);
    await login({ email: data.email, password: data.password });
  }

  async function logout() {
    await logoutRequest(); 
    setToken(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{ user, token, isLoading, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("No context");
  return context;
}