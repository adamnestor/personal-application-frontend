import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import type { DragEndEvent } from "@dnd-kit/core";

// Components
import Header from "./components/layout/Header";
import Sidebar from "./components/layout/Sidebar";
import Calendar from "./components/budget/Calendar";
import LoginForm from "./components/auth/LoginForm";
import CalendarItem from "./components/budget/CalendarItem";

// Context
import { AuthProvider, useAuth } from "./context/AuthContext";

// Hooks
import { useTemplates } from "./hooks/useTemplates";
import { useMonthlyData } from "./hooks/useMonthlyData";
import { getCurrentYearMonth } from "./utils/dateUtils";

// Types
import type { DragData, DropData } from "./types";
import type { DragStartEvent } from "@dnd-kit/core";

// Create query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 2 * 60 * 1000, // 2 minutes
    },
  },
});

// Main Budget App Component
const BudgetApp: React.FC = () => {
  const { user, logout } = useAuth();
  const { year: currentYear, month: currentMonth } = getCurrentYearMonth();

  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [activeDragItem, setActiveDragItem] = useState<DragData | null>(null);

  // Hooks
  const {
    templates,
    isLoading: templatesLoading,
    createTemplate,
    updateTemplate,
    deleteTemplate,
  } = useTemplates();

  const {
    monthlyData,
    isLoading: monthlyLoading,
    createExpenseFromTemplate,
    moveExpense,
    moveIncome,
    updateExpense,
    deleteExpense,
    updateIncome,
    deleteIncome,
  } = useMonthlyData(selectedYear, selectedMonth);

  // Handle month navigation
  const handleMonthChange = (year: number, month: number) => {
    setSelectedYear(year);
    setSelectedMonth(month);
  };

  // Handle drag and drop
  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setActiveDragItem((active.data.current as DragData) || null);
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveDragItem(null);

    if (!over) return;

    const dragData = active.data.current as DragData;
    const dropData = over.data.current as DropData;

    try {
      if (dragData.type === "template" && dragData.template) {
        // Dragging template to calendar - create new instance
        await createExpenseFromTemplate({
          templateId: dragData.template.id,
          scheduledDate: dropData.date,
        });
      } else if (dragData.type === "scheduled" && dragData.item) {
        // Moving existing item to new date
        if (dragData.itemType === "expense") {
          await moveExpense(dragData.item.id, dropData.date);
        } else if (dragData.itemType === "income") {
          await moveIncome(dragData.item.id, dropData.date);
        }
      }
    } catch (error) {
      console.error("Drag and drop failed:", error);
      // You could show a toast notification here
    }
  };

  // Calculate current balance (simplified - would come from account service)
  const currentBalance = monthlyData
    ? Object.values(monthlyData.dailyBalances).pop() || 0
    : 0;

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="h-screen flex flex-col bg-gray-50">
        {/* Header */}
        <Header
          currentBalance={currentBalance}
          username={user?.username}
          onLogout={logout}
        />

        {/* Main Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Sidebar */}
          <Sidebar
            templates={templates}
            isLoading={templatesLoading}
            onCreateTemplate={createTemplate}
            onUpdateTemplate={updateTemplate}
            onDeleteTemplate={deleteTemplate}
          />

          {/* Calendar */}
          <Calendar
            year={selectedYear}
            month={selectedMonth}
            monthlyData={monthlyData}
            isLoading={monthlyLoading}
            onMonthChange={handleMonthChange}
            onDragEnd={handleDragEnd}
            onUpdateExpense={updateExpense}
            onDeleteExpense={deleteExpense}
            onUpdateIncome={updateIncome}
            onDeleteIncome={deleteIncome}
            activeDragItem={activeDragItem}
          />
        </div>
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
          ) : activeDragItem.item && activeDragItem.itemType ? (
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

// Auth wrapper component
const AuthenticatedApp: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">💰</div>
          <div className="text-xl font-semibold text-gray-700">
            Loading BudgetFlow...
          </div>
        </div>
      </div>
    );
  }

  return isAuthenticated ? <BudgetApp /> : <LoginForm />;
};

// Root App Component
const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AuthenticatedApp />
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
