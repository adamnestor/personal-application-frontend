import React, { useState } from "react";
import type { ExpenseTemplate, CreateTemplateRequest, UpdateTemplateData } from "../../types/budget";
import TemplateList from "../budget/TemplateList";
import Button from "../ui/Button";
import Modal from "../ui/Modal";

interface SidebarProps {
  templates: ExpenseTemplate[];
  isLoading?: boolean;
  onCreateTemplate: (templateData: CreateTemplateRequest) => void;
  onUpdateTemplate: (templateId: number, templateData: UpdateTemplateData) => void;
  onDeleteTemplate: (templateId: number) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  templates,
  isLoading = false,
  onCreateTemplate: _onCreateTemplate,
  onUpdateTemplate,
  onDeleteTemplate,
}) => {
  const [showCreateExpenseModal, setShowCreateExpenseModal] = useState(false);
  const [showCreateIncomeModal, setShowCreateIncomeModal] = useState(false);

  // For now, determine income templates based on naming convention
  // In the future, you might want to add an 'isIncome' field to the ExpenseTemplate interface
  const expenseTemplates = templates.filter((t) => {
    const name = t.name.toLowerCase();
    return !name.includes('salary') && !name.includes('income') && !name.includes('freelance');
  });
  const incomeTemplates = templates.filter((t) => {
    const name = t.name.toLowerCase();
    return name.includes('salary') || name.includes('income') || name.includes('freelance');
  });

  return (
    <aside className="w-80 bg-white border-r border-gray-200 overflow-y-auto">
      <div className="p-6">
        {/* Add Buttons */}
        <div className="space-y-3 mb-8">
          <Button
            variant="secondary"
            className="w-full justify-center border-2 border-dashed border-gray-300 hover:border-blue-400 hover:bg-blue-50 text-gray-600 hover:text-blue-600"
            onClick={() => setShowCreateExpenseModal(true)}
          >
            + Add Expense Template
          </Button>
          <Button
            variant="secondary"
            className="w-full justify-center border-2 border-dashed border-gray-300 hover:border-green-400 hover:bg-green-50 text-gray-600 hover:text-green-600"
            onClick={() => setShowCreateIncomeModal(true)}
          >
            + Add Income Template
          </Button>
        </div>

        {/* Expense Templates */}
        <div className="mb-8">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-4">
            Expense Templates
          </h3>
          {isLoading ? (
            <div className="space-y-2">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-16 bg-gray-100 rounded-lg animate-pulse"
                />
              ))}
            </div>
          ) : (
            <TemplateList
              templates={expenseTemplates}
              onUpdate={onUpdateTemplate}
              onDelete={onDeleteTemplate}
            />
          )}
        </div>

        {/* Income Templates */}
        <div>
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-4">
            Income Templates
          </h3>
          {isLoading ? (
            <div className="space-y-2">
              {[1, 2].map((i) => (
                <div
                  key={i}
                  className="h-16 bg-gray-100 rounded-lg animate-pulse"
                />
              ))}
            </div>
          ) : (
            <TemplateList
              templates={incomeTemplates}
              onUpdate={onUpdateTemplate}
              onDelete={onDeleteTemplate}
            />
          )}
        </div>
      </div>

      {/* Create Modals */}
      <Modal
        isOpen={showCreateExpenseModal}
        onClose={() => setShowCreateExpenseModal(false)}
        title="Create Expense Template"
        size="md"
      >
        <div className="text-center text-gray-500 py-8">
          Template creation form coming soon...
        </div>
      </Modal>

      <Modal
        isOpen={showCreateIncomeModal}
        onClose={() => setShowCreateIncomeModal(false)}
        title="Create Income Template"
        size="md"
      >
        <div className="text-center text-gray-500 py-8">
          Income template creation form coming soon...
        </div>
      </Modal>
    </aside>
  );
};

export default Sidebar;
