export type RecurrenceType = "MONTHLY" | "WEEKLY" | "BI_WEEKLY" | "ONE_TIME";

export interface Account {
  id: number;
  name: string;
  startingBalance: number;
}

export interface ExpenseTemplate {
  id: number;
  name: string;
  amount: number;
  recurrenceType: RecurrenceType;
  dayOfMonth?: number;
  dayOfWeek?: number;
  biWeeklyStartDate?: string;
  active: boolean;
}

export interface ScheduledExpense {
  id: number;
  name: string;
  amount: number;
  scheduledDate: string;
  yearValue: number;
  monthValue: number;
  template?: ExpenseTemplate;
}

export interface ScheduledIncome {
  id: number;
  name: string;
  amount: number;
  scheduledDate: string;
  yearValue: number;
  monthValue: number;
}

export interface MonthlyBudgetData {
  expenses: ScheduledExpense[];
  income: ScheduledIncome[];
  dailyBalances: Record<string, number>;
}

export interface DayData {
  date: string;
  expenses: ScheduledExpense[];
  income: ScheduledIncome[];
  balance: number;
  dayNumber: number;
}

// Request/Response types
export interface CreateTemplateRequest {
  name: string;
  amount: number;
  recurrenceType: RecurrenceType;
  dayOfMonth?: number;
  dayOfWeek?: number;
  biWeeklyStartDate?: string;
}

export interface CreateFromTemplateRequest {
  templateId: number;
  scheduledDate: string;
}

export interface MoveTransactionRequest {
  newDate: string;
}

export interface UpdateExpenseRequest {
  name: string;
  amount: number;
  scheduledDate: string;
}

export interface UpdateIncomeRequest {
  name: string;
  amount: number;
  scheduledDate: string;
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

// Update operation types
export interface UpdateExpenseData {
  name?: string;
  amount?: number;
  scheduledDate?: string;
}

export interface UpdateIncomeData {
  name?: string;
  amount?: number;
  scheduledDate?: string;
}

export interface UpdateTemplateData {
  name?: string;
  amount?: number;
  recurrenceType?: RecurrenceType;
  dayOfMonth?: number;
  dayOfWeek?: number;
  biWeeklyStartDate?: string;
  active?: boolean;
}
