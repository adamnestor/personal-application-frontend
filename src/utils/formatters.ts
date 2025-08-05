/**
 * Format number as currency
 */
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

/**
 * Format currency with color classes based on positive/negative
 */
export const formatBalanceWithColor = (
  balance: number
): { text: string; colorClass: string } => {
  const text = formatCurrency(balance);
  const colorClass =
    balance >= 0 ? "text-green-700 bg-green-100" : "text-red-700 bg-red-100";

  return { text, colorClass };
};

/**
 * Format date as readable string
 */
export const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

/**
 * Format month/year for navigation
 */
export const formatMonthYear = (year: number, month: number): string => {
  const date = new Date(year, month - 1);
  return date.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
};

/**
 * Get day number from date string
 */
export const getDayNumber = (dateStr: string): number => {
  return new Date(dateStr).getDate();
};

/**
 * Parse amount from string input
 */
export const parseAmount = (input: string): number => {
  // Remove currency symbols and whitespace
  const cleaned = input.replace(/[$,\s]/g, "");
  const parsed = parseFloat(cleaned);
  return isNaN(parsed) ? 0 : parsed;
};
