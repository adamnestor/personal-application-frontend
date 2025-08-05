import { apiClient } from "./api";
import { Account } from "../types/budget";

export const accountService = {
  /**
   * Get primary account information
   */
  getPrimaryAccount: async (): Promise<Account> => {
    return apiClient.get<Account>("/account");
  },

  /**
   * Get starting balance
   */
  getStartingBalance: async (): Promise<number> => {
    return apiClient.get<number>("/account/starting-balance");
  },

  /**
   * Update starting balance
   */
  updateStartingBalance: async (startingBalance: number): Promise<Account> => {
    return apiClient.put<Account>("/account/starting-balance", {
      startingBalance,
    });
  },

  /**
   * Update account name
   */
  updateAccountName: async (name: string): Promise<Account> => {
    return apiClient.put<Account>("/account/name", { name });
  },

  /**
   * Initialize account (first-time setup)
   */
  initializeAccount: async (data: {
    startingBalance: number;
    accountName?: string;
  }): Promise<Account> => {
    return apiClient.post<Account>("/account/initialize", data);
  },
};
