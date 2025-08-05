import { useState, useEffect } from "react";
import { LoginRequest, RegisterRequest, User } from "../types/auth";
import { authService } from "../services/authService";
import { STORAGE_KEYS } from "../utils/constants";

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize auth state from localStorage
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const storedToken = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
        const storedUser = localStorage.getItem(STORAGE_KEYS.USER_DATA);

        if (storedToken && storedUser) {
          // Validate token with backend
          const validation = await authService.validateToken(storedToken);

          if (validation.valid) {
            setToken(storedToken);
            setUser(JSON.parse(storedUser));
          } else {
            // Token is invalid, clear storage
            localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
            localStorage.removeItem(STORAGE_KEYS.USER_DATA);
          }
        }
      } catch (error) {
        console.error("Auth initialization error:", error);
        // Clear invalid data
        localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
        localStorage.removeItem(STORAGE_KEYS.USER_DATA);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (credentials: LoginRequest): Promise<void> => {
    try {
      const response = await authService.login(credentials);

      const userData: User = {
        id: 1, // This would come from the JWT or a separate user endpoint
        username: response.username,
        email: "", // This would also come from user data
      };

      // Store auth data
      localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, response.token);
      localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(userData));

      setToken(response.token);
      setUser(userData);
    } catch (error) {
      throw error;
    }
  };

  const register = async (data: RegisterRequest): Promise<void> => {
    try {
      await authService.register(data);
      // Registration successful, but user needs to login
      // Could auto-login here if desired
    } catch (error) {
      throw error;
    }
  };

  const logout = (): void => {
    // Clear localStorage
    localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER_DATA);

    // Clear state
    setToken(null);
    setUser(null);
  };

  const isAuthenticated = Boolean(token && user);

  return {
    user,
    token,
    login,
    register,
    logout,
    isAuthenticated,
    isLoading,
  };
};
