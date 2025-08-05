// Main type exports
export * from './auth';
export * from './budget';

// Common utility types
export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface ApiError {
  message: string;
  status?: number;
}

// Drag and drop types
export interface DragData {
  type: 'template' | 'scheduled';
  template?: ExpenseTemplate;
  item?: ScheduledExpense | ScheduledIncome;
  itemType?: 'expense' | 'income';
}

export interface DropData {
  date: string;
}