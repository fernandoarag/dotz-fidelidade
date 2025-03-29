import type React from "react";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { LoginUseCase } from "../../application/useCases/auth/LoginUseCase";
import { RegisterUseCase } from "../../application/useCases/auth/RegisterUseCase";
import type { User } from "../../core/domain/entities/User";
import { UserRepository } from "../../infrastructure/repositories/UserRepository";

interface AuthContextData {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: {
    name: string;
    email: string;
    password: string;
    phone: string;
  }) => Promise<void>;
  logout: () => void;
  updateUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<
  React.PropsWithChildren<Record<string, unknown>>
> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const userRepository = useMemo(() => new UserRepository(), []);
  const loginUseCase = new LoginUseCase(userRepository);
  const registerUseCase = new RegisterUseCase(userRepository);

  useEffect(() => {
    // Verificar se o usuário já está logado
    const token = localStorage.getItem("token");
    if (token) {
      userRepository
        .getProfile()
        .then((user) => setUser(user))
        .catch(() => localStorage.removeItem("token"))
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, [userRepository]);

  const login = async (email: string, password: string) => {
    const { user } = await loginUseCase.execute(email, password);
    setUser(user);
  };

  const register = async (userData: {
    name: string;
    email: string;
    password: string;
    phone: string;
  }) => {
    await registerUseCase.execute(userData);
    // Após o registro, fazer login do usuário
    await login(userData.email, userData.password);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const updateUser = (updatedUser: User) => {
    setUser(updatedUser);
  };

  return (
    <AuthContext.Provider
      value={{ user, isLoading, login, register, logout, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
