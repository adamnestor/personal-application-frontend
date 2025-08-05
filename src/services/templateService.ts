import { apiClient } from "./api";
import { ExpenseTemplate, CreateTemplateRequest } from "../types/budget";

export interface UpdateTemplateRequest extends CreateTemplateRequest {
  updateFutureOnly?: boolean;
}

export const templateService = {
  /**
   * Get all active expense templates
   */
  getAllTemplates: async (): Promise<ExpenseTemplate[]> => {
    return apiClient.get<ExpenseTemplate[]>("/templates");
  },

  /**
   * Get specific template by ID
   */
  getTemplate: async (templateId: number): Promise<ExpenseTemplate> => {
    return apiClient.get<ExpenseTemplate>(`/templates/${templateId}`);
  },

  /**
   * Create new expense template
   */
  createTemplate: async (
    data: CreateTemplateRequest
  ): Promise<ExpenseTemplate> => {
    return apiClient.post<ExpenseTemplate>("/templates", data);
  },

  /**
   * Update existing template
   */
  updateTemplate: async (
    templateId: number,
    data: UpdateTemplateRequest
  ): Promise<ExpenseTemplate> => {
    return apiClient.put<ExpenseTemplate>(`/templates/${templateId}`, data);
  },

  /**
   * Delete template
   */
  deleteTemplate: async (
    templateId: number,
    deleteFutureInstances: boolean = true
  ): Promise<void> => {
    return apiClient.delete<void>(
      `/templates/${templateId}?deleteFutureInstances=${deleteFutureInstances}`
    );
  },

  /**
   * Check if template has instances in a specific month
   */
  hasInstancesInMonth: async (
    templateId: number,
    year: number,
    month: number
  ): Promise<boolean> => {
    return apiClient.get<boolean>(
      `/templates/${templateId}/has-instances/${year}/${month}`
    );
  },
};
