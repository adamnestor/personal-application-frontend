import type { DayData, ScheduledExpense, ScheduledIncome } from "../types/budget";

/**
 * Get the current year and month
 */
export const getCurrentYearMonth = (): { year: number; month: number } => {
  const now = new Date();
  return {
    year: now.getFullYear(),
    month: now.getMonth() + 1, // JavaScript months are 0-based
  };
};

/**
 * Get previous month
 */
export const getPreviousMonth = (
  year: number,
  month: number
): { year: number; month: number } => {
  if (month === 1) {
    return { year: year - 1, month: 12 };
  }
  return { year, month: month - 1 };
};

/**
 * Get next month
 */
export const getNextMonth = (
  year: number,
  month: number
): { year: number; month: number } => {
  if (month === 12) {
    return { year: year + 1, month: 1 };
  }
  return { year, month: month + 1 };
};

/**
 * Get number of days in a month
 */
export const getDaysInMonth = (year: number, month: number): number => {
  return new Date(year, month, 0).getDate();
};

/**
 * Get the day of week for the first day of the month (0 = Sunday)
 */
export const getFirstDayOfWeek = (year: number, month: number): number => {
  return new Date(year, month - 1, 1).getDay();
};

/**
 * Create calendar grid data for a month
 */
export const createMonthGrid = (
  year: number,
  month: number,
  expenses: ScheduledExpense[] = [],
  income: ScheduledIncome[] = [],
  dailyBalances: Record<string, number> = {}
): DayData[] => {
  const daysInMonth = getDaysInMonth(year, month);
  const firstDayOfWeek = getFirstDayOfWeek(year, month);
  const days: DayData[] = [];

  // Add empty cells for days before the first day of the month
  for (let i = 0; i < firstDayOfWeek; i++) {
    days.push({
      date: "",
      expenses: [],
      income: [],
      balance: 0,
      dayNumber: 0,
    });
  }

  // Add actual days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const dateStr = `${year}-${month.toString().padStart(2, "0")}-${day
      .toString()
      .padStart(2, "0")}`;

    const dayExpenses = expenses.filter((e) => e.scheduledDate === dateStr);
    const dayIncome = income.filter((i) => i.scheduledDate === dateStr);
    const balance = dailyBalances[dateStr] || 0;

    days.push({
      date: dateStr,
      expenses: dayExpenses,
      income: dayIncome,
      balance,
      dayNumber: day,
    });
  }

  return days;
};

/**
 * Format date for API calls (YYYY-MM-DD)
 */
export const formatDateForAPI = (date: Date): string => {
  return date.toISOString().split("T")[0];
};

/**
 * Check if a date is today
 */
export const isToday = (dateStr: string): boolean => {
  const today = new Date();
  const date = new Date(dateStr);
  return date.toDateString() === today.toDateString();
};

/**
 * Check if a date is in the past
 */
export const isPast = (dateStr: string): boolean => {
  const today = new Date();
  const date = new Date(dateStr);
  today.setHours(0, 0, 0, 0);
  date.setHours(0, 0, 0, 0);
  return date < today;
};
