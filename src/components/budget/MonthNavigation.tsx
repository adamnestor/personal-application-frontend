import React from "react";
import { formatMonthYear } from "../../utils/formatters";
import { getPreviousMonth, getNextMonth } from "../../utils/dateUtils";
import Button from "../ui/Button";

interface MonthNavigationProps {
  currentYear: number;
  currentMonth: number;
  onMonthChange: (year: number, month: number) => void;
}

const MonthNavigation: React.FC<MonthNavigationProps> = ({
  currentYear,
  currentMonth,
  onMonthChange,
}) => {
  const handlePreviousMonth = () => {
    const { year, month } = getPreviousMonth(currentYear, currentMonth);
    onMonthChange(year, month);
  };

  const handleNextMonth = () => {
    const { year, month } = getNextMonth(currentYear, currentMonth);
    onMonthChange(year, month);
  };

  const handleToday = () => {
    const now = new Date();
    onMonthChange(now.getFullYear(), now.getMonth() + 1);
  };

  const isCurrentMonth = () => {
    const now = new Date();
    return (
      currentYear === now.getFullYear() && currentMonth === now.getMonth() + 1
    );
  };

  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-4">
        {/* Previous Month Button */}
        <Button
          variant="ghost"
          onClick={handlePreviousMonth}
          className="p-2 hover:bg-gray-100"
          title="Previous month"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </Button>

        {/* Current Month/Year */}
        <h2 className="text-2xl font-bold text-gray-900 min-w-[200px] text-center">
          {formatMonthYear(currentYear, currentMonth)}
        </h2>

        {/* Next Month Button */}
        <Button
          variant="ghost"
          onClick={handleNextMonth}
          className="p-2 hover:bg-gray-100"
          title="Next month"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Button>
      </div>

      {/* Today Button */}
      {!isCurrentMonth() && (
        <Button variant="secondary" onClick={handleToday} size="sm">
          Today
        </Button>
      )}
    </div>
  );
};

export default MonthNavigation;
