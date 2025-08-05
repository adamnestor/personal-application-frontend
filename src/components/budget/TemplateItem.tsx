import React, { useState } from "react";
import { useDraggable } from "@dnd-kit/core";
import type { ExpenseTemplate, UpdateTemplateData } from "../../types/budget";
import { formatCurrency } from "../../utils/formatters";
import Button from "../ui/Button";
import Modal from "../ui/Modal";

interface TemplateItemProps {
  template: ExpenseTemplate;
  hasInstances?: boolean;
  onUpdate?: (templateId: number, data: UpdateTemplateData) => void;
  onDelete: (templateId: number) => void;
}

const TemplateItem: React.FC<TemplateItemProps> = ({
  template,
  hasInstances = false,
  onDelete,
}) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: `template-${template.id}`,
      data: { type: "template", template },
    });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  // Determine if this is an income template (you might want to add this to your backend)
  const isIncome =
    template.name.toLowerCase().includes("salary") ||
    template.name.toLowerCase().includes("income") ||
    template.name.toLowerCase().includes("freelance");

  const gradientClass = isIncome
    ? "bg-gradient-to-r from-green-50 to-green-100 border-green-200 hover:from-green-100 hover:to-green-150"
    : "bg-gradient-to-r from-red-50 to-red-100 border-red-200 hover:from-red-100 hover:to-red-150";

  const getIcon = (name: string) => {
    const lowercaseName = name.toLowerCase();
    if (lowercaseName.includes("mortgage") || lowercaseName.includes("rent"))
      return "🏠";
    if (lowercaseName.includes("groceries") || lowercaseName.includes("food"))
      return "🛒";
    if (lowercaseName.includes("gas") || lowercaseName.includes("fuel"))
      return "⛽";
    if (
      lowercaseName.includes("utilities") ||
      lowercaseName.includes("electric")
    )
      return "💡";
    if (lowercaseName.includes("salary") || lowercaseName.includes("income"))
      return "💼";
    if (lowercaseName.includes("freelance")) return "🎨";
    return "💳";
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowEditModal(true);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    onDelete(template.id);
    setShowDeleteModal(false);
  };

  return (
    <>
      <div
        ref={setNodeRef}
        style={style}
        {...listeners}
        {...attributes}
        className={`
          flex items-center gap-3 p-3 rounded-lg cursor-grab active:cursor-grabbing
          transition-all duration-200 border group
          ${
            isDragging
              ? "opacity-50 scale-105 rotate-2"
              : "hover:shadow-md hover:-translate-y-0.5"
          }
          ${gradientClass}
        `}
      >
        {/* Icon */}
        <div className="text-lg flex-shrink-0">{getIcon(template.name)}</div>

        {/* Template Info */}
        <div className="flex-1 min-w-0">
          <div className="font-medium text-sm text-gray-800 truncate">
            {template.name}
          </div>
          <div className="font-bold text-sm text-gray-900">
            {formatCurrency(template.amount)}
          </div>
        </div>

        {/* Status & Actions */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {hasInstances && (
            <div
              className="text-gray-500 text-sm"
              title="Has scheduled instances"
            >
              📅
            </div>
          )}

          {/* Edit/Delete buttons - shown on hover */}
          <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
            <button
              onClick={handleEdit}
              className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
              title="Edit template"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </button>
            <button
              onClick={handleDelete}
              className="p-1 text-gray-400 hover:text-red-600 transition-colors"
              title="Delete template"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      <Modal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        title={`Edit ${template.name}`}
        size="md"
      >
        <div className="text-center text-gray-500 py-8">
          Edit template form coming soon...
        </div>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Delete Template"
        size="sm"
      >
        <div className="text-center">
          <div className="text-red-600 text-4xl mb-4">⚠️</div>
          <p className="text-gray-700 mb-6">
            Are you sure you want to delete the "{template.name}" template? This
            will also remove all future scheduled instances.
          </p>
          <div className="flex gap-3 justify-center">
            <Button
              variant="secondary"
              onClick={() => setShowDeleteModal(false)}
            >
              Cancel
            </Button>
            <Button variant="danger" onClick={confirmDelete}>
              Delete Template
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default TemplateItem;
