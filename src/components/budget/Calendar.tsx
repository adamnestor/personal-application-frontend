import React from "react";
import { DndContext, DragEndEvent, DragOverlay } from "@dnd-kit/core";
import { createPortal } from "react-dom";
import { MonthlyBudgetData, DragData, DropData } from "../../types/budget";
import { createMonthGrid } from "../../utils/dateUtils";
import { CALENDAR_CONFIG } from "../../utils/constants";
import MonthNavigation from "./MonthNavigation";
import CalendarDay from "./CalendarDay";
import CalendarItem from "./CalendarItem";

interface CalendarProps {
  year: number;
  month: number;
  monthlyData: MonthlyBudgetData | null;
  isLoading?: boolean;
  onMonthChange: (year: number, month: number) => void;
  onDragEnd: (event: DragEndEvent) => void;
  onUpdateExpense?: (id: number, data: any) => void;
  onDeleteExpense?: (id: number) => void;
  onUpdateIncome?: (id: number, data: any) => void;
  onDeleteIncome?: (id: number) => void;
  activeDragItem?: any; // The item being dragged
}

const Calendar: React.FC<CalendarProps> = ({
  year,
  month,
  monthlyData,
  isLoading = false,
  onMonthChange,
  onDragEnd,
  onUpdateExpense,
  onDeleteExpense,
  onUpdateIncome,
  onDeleteIncome,
  activeDragItem,
}) => {
  // Create calendar grid
  const days = monthlyData
    ? createMonthGrid(
        year,
        month,
        monthlyData.expenses,
        monthlyData.income,
        monthlyData.dailyBalances
      )
    : [];

  if (isLoading) {
    return (
      <div className="flex-1 p-6">
        <div className="h-8 bg-gray-200 rounded mb-6 animate-pulse"></div>
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="grid grid-cols-7 gap-0">
            {/* Calendar headers */}
            {CALENDAR_CONFIG.DAYS_OF_WEEK.map((day) => (
              <div
                key={day}
                className="bg-gray-100 p-4 text-center font-semibold text-gray-600 border-r border-b"
              >
                {day}
              </div>
            ))}
            {/* Loading skeleton */}
            {Array.from({ length: 35 }).map((_, i) => (
              <div
                key={i}
                className="h-32 bg-gray-50 border-r border-b animate-pulse"
              ></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <DndContext onDragEnd={onDragEnd}>
      <div className="flex-1 p-6 overflow-y-auto">
        {/* Month Navigation */}
        <MonthNavigation
          currentYear={year}
          currentMonth={month}
          onMonthChange={onMonthChange}
        />

        {/* Calendar Grid */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="grid grid-cols-7 gap-0">
            {/* Day of Week Headers */}
            {CALENDAR_CONFIG.DAYS_OF_WEEK.map((day) => (
              <div
                key={day}
                className="bg-gray-100 p-4 text-center font-semibold text-gray-600 text-sm border-r border-b border-gray-200"
              >
                {day}
              </div>
            ))}

            {/* Calendar Days */}
            {days.map((day, index) => (
              <CalendarDay
                key={day.date || `empty-${index}`}
                day={day}
                onUpdateExpense={onUpdateExpense}
                onDeleteExpense={onDeleteExpense}
                onUpdateIncome={onUpdateIncome}
                onDeleteIncome={onDeleteIncome}
              />
            ))}
          </div>
        </div>

        {/* Empty State */}
        {monthlyData &&
          monthlyData.expenses.length === 0 &&
          monthlyData.income.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <div className="text-6xl mb-4">📅</div>
              <h3 className="text-lg font-medium mb-2">
                No transactions scheduled
              </h3>
              <p className="text-sm">
                Drag templates from the left panel to schedule expenses and
                income
              </p>
            </div>
          )}
      </div>

      {/* Drag Overlay */}
      <DragOverlay>
        {activeDragItem ? (
          activeDragItem.type === "template" ? (
            <div className="bg-white border border-gray-300 rounded-lg p-3 shadow-lg opacity-90 transform rotate-2">
              <div className="font-medium text-sm">
                {activeDragItem.template?.name} $
                {activeDragItem.template?.amount}
              </div>
            </div>
          ) : activeDragItem.item ? (
            <CalendarItem
              item={activeDragItem.item}
              type={activeDragItem.itemType}
            />
          ) : null
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default Calendar;
