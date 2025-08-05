import React from "react";
import { useDroppable } from "@dnd-kit/core";
import { DayData } from "../../types/budget";
import { formatBalanceWithColor } from "../../utils/formatters";
import { isToday, isPast } from "../../utils/dateUtils";
import CalendarItem from "./CalendarItem";

interface CalendarDayProps {
  day: DayData;
  onUpdateExpense?: (id: number, data: any) => void;
  onDeleteExpense?: (id: number) => void;
  onUpdateIncome?: (id: number, data: any) => void;
  onDeleteIncome?: (id: number) => void;
}

const CalendarDay: React.FC<CalendarDayProps> = ({
  day,
  onUpdateExpense,
  onDeleteExpense,
  onUpdateIncome,
  onDeleteIncome,
}) => {
  const { isOver, setNodeRef } = useDroppable({
    id: `day-${day.date}`,
    data: { date: day.date },
  });

  // Empty day (before month starts)
  if (!day.date) {
    return <div className="min-h-[120px] bg-gray-50"></div>;
  }

  const { text: balanceText, colorClass: balanceColorClass } =
    formatBalanceWithColor(day.balance);
  const dayIsToday = isToday(day.date);
  const dayIsPast = isPast(day.date);

  return (
    <div
      ref={setNodeRef}
      className={`
        min-h-[120px] p-3 bg-white border-r border-b border-gray-200 relative
        transition-all duration-200
        ${
          isOver
            ? "bg-blue-50 border-blue-300 shadow-inner"
            : "hover:bg-gray-50"
        }
        ${dayIsToday ? "ring-2 ring-blue-400 ring-inset" : ""}
        ${dayIsPast ? "bg-gray-25" : ""}
      `}
    >
      {/* Day Number */}
      <div
        className={`
        font-semibold text-sm mb-3 flex items-center justify-between
        ${
          dayIsToday
            ? "text-blue-600"
            : dayIsPast
            ? "text-gray-400"
            : "text-gray-700"
        }
      `}
      >
        <span>{day.dayNumber}</span>
        {dayIsToday && (
          <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">
            Today
          </span>
        )}
      </div>

      {/* Scheduled Items */}
      <div className="space-y-1 mb-3">
        {day.expenses.map((expense) => (
          <CalendarItem
            key={`expense-${expense.id}`}
            item={expense}
            type="expense"
            onUpdate={onUpdateExpense}
            onDelete={onDeleteExpense}
          />
        ))}
        {day.income.map((income) => (
          <CalendarItem
            key={`income-${income.id}`}
            item={income}
            type="income"
            onUpdate={onUpdateIncome}
            onDelete={onDeleteIncome}
          />
        ))}
      </div>

      {/* Running Balance */}
      <div className="absolute bottom-2 right-2">
        <span
          className={`
          text-xs font-semibold px-2 py-1 rounded
          ${balanceColorClass}
        `}
        >
          {balanceText}
        </span>
      </div>

      {/* Drop Indicator */}
      {isOver && (
        <div className="absolute inset-2 border-2 border-dashed border-blue-400 rounded-lg bg-blue-50 bg-opacity-50 flex items-center justify-center">
          <div className="text-blue-600 text-sm font-medium">Drop here</div>
        </div>
      )}
    </div>
  );
};

export default CalendarDay;
