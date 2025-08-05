import { apiClient } from "./api";
import type {
  MonthlyBudgetData,
  ScheduledExpense,
  ScheduledIncome,
  CreateFromTemplateRequest,
  MoveTransactionRequest,
  UpdateExpenseRequest,
  UpdateIncomeRequest,
} from "../types/budget";

export const budgetService = {
  /**
   * Get monthly budget data (expenses, income, daily balances)
   */
  getMonthlyBudget: async (
    year: number,
    month: number
  ): Promise<MonthlyBudgetData> => {
    return apiClient.get<MonthlyBudgetData>(`/budget/month/${year}/${month}`);
  },

  /**
   * Get only daily balances for a month
   */
  getDailyBalances: async (
    year: number,
    month: number
  ): Promise<Record<string, number>> => {
    return apiClient.get<Record<string, number>>(
      `/budget/balances/${year}/${month}`
    );
  },

  /**
   * Create expense instance from template (drag from palette)
   */
  createExpenseFromTemplate: async (
    data: CreateFromTemplateRequest
  ): Promise<ScheduledExpense> => {
    return apiClient.post<ScheduledExpense>(
      "/budget/expense/from-template",
      data
    );
  },

  /**
   * Move expense to different date (drag within calendar)
   */
  moveExpense: async (
    expenseId: number,
    data: MoveTransactionRequest
  ): Promise<ScheduledExpense> => {
    return apiClient.put<ScheduledExpense>(
      `/budget/expense/${expenseId}/move`,
      data
    );
  },

  /**
   * Move income to different date
   */
  moveIncome: async (
    incomeId: number,
    data: MoveTransactionRequest
  ): Promise<ScheduledIncome> => {
    return apiClient.put<ScheduledIncome>(
      `/budget/income/${incomeId}/move`,
      data
    );
  },

  /**
   * Create one-time expense
   */
  createExpense: async (data: {
    name: string;
    amount: number;
    scheduledDate: string;
  }): Promise<ScheduledExpense> => {
    return apiClient.post<ScheduledExpense>("/expenses", data);
  },

  /**
   * Update specific expense instance
   */
  updateExpense: async (
    expenseId: number,
    data: Partial<UpdateExpenseRequest>
  ): Promise<ScheduledExpense> => {
    return apiClient.patch<ScheduledExpense>(`/expenses/${expenseId}`, data);
  },

  /**
   * Delete expense
   */
  deleteExpense: async (expenseId: number): Promise<void> => {
    return apiClient.delete<void>(`/expenses/${expenseId}`);
  },

  /**
   * Create scheduled income
   */
  createIncome: async (data: {
    name: string;
    amount: number;
    scheduledDate: string;
  }): Promise<ScheduledIncome> => {
    return apiClient.post<ScheduledIncome>("/income", data);
  },

  /**
   * Update specific income instance
   */
  updateIncome: async (
    incomeId: number,
    data: Partial<UpdateIncomeRequest>
  ): Promise<ScheduledIncome> => {
    return apiClient.patch<ScheduledIncome>(`/income/${incomeId}`, data);
  },

  /**
   * Delete income
   */
  deleteIncome: async (incomeId: number): Promise<void> => {
    return apiClient.delete<void>(`/income/${incomeId}`);
  },
};
