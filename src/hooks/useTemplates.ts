import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { templateService } from "../services/templateService";
import type { CreateTemplateRequest, UpdateTemplateData } from "../types/budget";

export const useTemplates = () => {
  const queryClient = useQueryClient();

  // Fetch all templates
  const templatesQuery = useQuery({
    queryKey: ["templates"],
    queryFn: templateService.getAllTemplates,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Create template mutation
  const createTemplateMutation = useMutation({
    mutationFn: templateService.createTemplate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["templates"] });
      queryClient.invalidateQueries({ queryKey: ["monthlyBudget"] });
    },
  });

  // Update template mutation
  const updateTemplateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateTemplateData }) =>
      templateService.updateTemplate(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["templates"] });
      queryClient.invalidateQueries({ queryKey: ["monthlyBudget"] });
    },
  });

  // Delete template mutation
  const deleteTemplateMutation = useMutation({
    mutationFn: ({
      id,
      deleteFutureInstances,
    }: {
      id: number;
      deleteFutureInstances: boolean;
    }) => templateService.deleteTemplate(id, deleteFutureInstances),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["templates"] });
      queryClient.invalidateQueries({ queryKey: ["monthlyBudget"] });
    },
  });

  // Check if template has instances for a month
  const useTemplateInstances = (
    templateId: number,
    year: number,
    month: number
  ) => {
    return useQuery({
      queryKey: ["templateInstances", templateId, year, month],
      queryFn: () =>
        templateService.hasInstancesInMonth(templateId, year, month),
      enabled: !!templateId,
    });
  };

  const createTemplate = async (data: CreateTemplateRequest) => {
    return createTemplateMutation.mutateAsync(data);
  };

  const updateTemplate = async (id: number, data: UpdateTemplateData) => {
    return updateTemplateMutation.mutateAsync({ id, data });
  };

  const deleteTemplate = async (
    id: number,
    deleteFutureInstances: boolean = true
  ) => {
    return deleteTemplateMutation.mutateAsync({ id, deleteFutureInstances });
  };

  return {
    // Data
    templates: templatesQuery.data || [],
    isLoading: templatesQuery.isLoading,
    error: templatesQuery.error,

    // Actions
    createTemplate,
    updateTemplate,
    deleteTemplate,

    // Loading states
    isCreating: createTemplateMutation.isPending,
    isUpdating: updateTemplateMutation.isPending,
    isDeleting: deleteTemplateMutation.isPending,

    // Utilities
    useTemplateInstances,
    refetch: templatesQuery.refetch,
  };
};
