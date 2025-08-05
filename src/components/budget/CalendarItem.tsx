import React, { useState } from 'react';
import { useDraggable } from '@dnd-kit/core';
import { ScheduledExpense, ScheduledIncome } from '../../types/budget';
import { formatCurrency } from '../../utils/formatters';
import Modal from '../ui/Modal';
import Button from '../ui/Button';

interface CalendarItemProps {
  item: ScheduledExpense | ScheduledIncome;
  type: 'expense' | 'income';
  onUpdate?: (id: number, data: any) => void;
  onDelete?: (id: number) => void;
}

const CalendarItem: React.FC<CalendarItemProps> = ({
  item,
  type,
  onUpdate,
  onDelete,
}) => {
  const [showEditModal, setShowEditModal] = useState(false);

  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: `${type}-${item.id}`,
    data: { type: 'scheduled', item, itemType: type }
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  const bgColorClass = type === 'expense' 
    ? 'bg-red-100 border-red-200 text-red-800 hover:bg-red-150' 
    : 'bg-green-100 border-green-200 text-green-800 hover:bg-green-150';

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowEditModal(true);
  };

  const handleUpdate = () => {
    // This would contain form logic
    onUpdate?.(item.id, {
      name: item.name,
      amount: item.amount,
      scheduledDate: item.scheduledDate,
    });
    setShowEditModal(false);
  };

  const handleDelete = () => {
    onDelete?.(item.id);
    setShowEditModal(false);
  };

  return (
    <>
      <div
        ref={setNodeRef}
        style={style}
        {...listeners}
        {...attributes}
        onClick={handleClick}
        className={`
          px-2 py-1 rounded text-xs font-medium cursor-grab active:cursor-grabbing
          transition-all duration-200 border group
          ${isDragging ? 'opacity-50 scale-105 rotate-1' : 'hover:shadow-sm hover:-translate-y-0.5'}
          ${bgColorClass}
        `}
      >
        <div className="truncate">
          {item.name} {formatCurrency(item.amount)}
        </div>
      </div>

      {/* Edit Modal */}
      <Modal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        title={`Edit ${type === 'expense' ? 'Expense' : 'Income'}`}
        size="md"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date
            </label>
            <input
              type="date"
              defaultValue={item.scheduledDate}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              variant="secondary"
              onClick={() => setShowEditModal(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={handleDelete}
              size="sm"
            >
              Delete
            </Button>
            <Button
              variant="primary"
              onClick={handleUpdate}
              className="flex-1"
            >
              Save Changes
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default CalendarItem;mb-1">
              Name
            </label>
            <input
              type="text"
              defaultValue={item.name}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Amount
            </label>
            <input
              type="number"
              defaultValue={item.amount}
              step="0.01"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700