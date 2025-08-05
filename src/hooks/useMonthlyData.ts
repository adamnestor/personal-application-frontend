import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { budgetService } from "../services/budgetService";
import {
  MonthlyBudgetData,
  CreateFromTemplateRequest,
  MoveTransactionRequest,
} from "../types/budget";

export const useMonthlyData = (year: number, month: number) => {
  const queryClient = useQueryClient();

  // Fetch monthly budget data
  const monthlyDataQuery = useQuery({
    queryKey: ["monthlyBudget", year, month],
    queryFn: () => budgetService.getMonthlyBudget(year, month),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });

  // Create expense from template mutation
  const createFromTemplateMutation = useMutation({
    mutationFn: budgetService.createExpenseFromTemplate,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["monthlyBudget", year, month],
      });
    },
  });

  // Move expense mutation
  const moveExpenseMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: MoveTransactionRequest }) =>
      budgetService.moveExpense(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["monthlyBudget"] });
    },
  });

  // Move income mutation
  const moveIncomeMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: MoveTransactionRequest }) =>
      budgetService.moveIncome(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["monthlyBudget"] });
    },
  });

  // Update expense mutation
  const updateExpenseMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: any }) =>
      budgetService.updateExpense(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["monthlyBudget"] });
    },
  });

  // Delete expense mutation
  const deleteExpenseMutation = useMutation({
    mutationFn: budgetService.deleteExpense,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["monthlyBudget"] });
    },
  });

  // Update income mutation
  const updateIncomeMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: any }) =>
      budgetService.updateIncome(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["monthlyBudget"] });
    },
  });

  // Delete income mutation
  const deleteIncomeMutation = useMutation({
    mutationFn: budgetService.deleteIncome,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["monthlyBudget"] });
    },
  });

  // Actions
  const createExpenseFromTemplate = async (data: CreateFromTemplateRequest) => {
    return createFromTemplateMutation.mutateAsync(data);
  };

  const moveExpense = async (id: number, newDate: string) => {
    return moveExpenseMutation.mutateAsync({ id, data: { newDate } });
  };

  const moveIncome = async (id: number, newDate: string) => {
    return moveIncomeMutation.mutateAsync({ id, data: { newDate } });
  };

  const updateExpense = async (id: number, data: any) => {
    return updateExpenseMutation.mutateAsync({ id, data });
  };

  const deleteExpense = async (id: number) => {
    return deleteExpenseMutation.mutateAsync(id);
  };

  const updateIncome = async (id: number, data: any) => {
    return updateIncomeMutation.mutateAsync({ id, data });
  };

  const deleteIncome = async (id: number) => {
    return deleteIncomeMutation.mutateAsync(id);
  };

  return {
    // Data
    monthlyData: monthlyDataQuery.data || null,
    isLoading: monthlyDataQuery.isLoading,
    error: monthlyDataQuery.error,

    // Actions
    createExpenseFromTemplate,
    moveExpense,
    moveIncome,
    updateExpense,
    deleteExpense,
    updateIncome,
    deleteIncome,

    // Loading states
    isCreatingFromTemplate: createFromTemplateMutation.isPending,
    isMovingExpense: moveExpenseMutation.isPending,
    isMovingIncome: moveIncomeMutation.isPending,
    isUpdatingExpense: updateExpenseMutation.isPending,
    isDeletingExpense: deleteExpenseMutation.isPending,
    isUpdatingIncome: updateIncomeMutation.isPending,
    isDeletingIncome: deleteIncomeMutation.isPending,

    // Utilities
    refetch: monthlyDataQuery.refetch,
  };
};
