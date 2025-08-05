import { apiClient } from "./api";
import type { LoginRequest, RegisterRequest, AuthResponse } from "../types/auth";

export const authService = {
  /**
   * Login user
   */
  login: async (credentials: LoginRequest): Promise<AuthResponse> => {
    return apiClient.post<AuthResponse>("/auth/login", credentials);
  },

  /**
   * Register new user
   */
  register: async (data: RegisterRequest): Promise<{ message: string }> => {
    return apiClient.post<{ message: string }>("/auth/register", data);
  },

  /**
   * Validate current token
   */
  validateToken: async (
    token: string
  ): Promise<{ valid: boolean; username: string | null }> => {
    return apiClient.get<{ valid: boolean; username: string | null }>(
      "/auth/validate",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  },

  /**
   * Get security question for username
   */
  getSecurityQuestion: async (
    username: string
  ): Promise<{ securityQuestion: string }> => {
    return apiClient.post<{ securityQuestion: string }>(
      "/auth/security-question",
      { username }
    );
  },

  /**
   * Reset password using security question
   */
  resetPassword: async (data: {
    username: string;
    securityAnswer: string;
    newPassword: string;
  }): Promise<{ message: string }> => {
    return apiClient.post<{ message: string }>("/auth/reset-password", data);
  },
};
