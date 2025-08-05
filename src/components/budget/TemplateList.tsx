import React from "react";
import { ExpenseTemplate } from "../../types/budget";
import TemplateItem from "./TemplateItem";

interface TemplateListProps {
  templates: ExpenseTemplate[];
  templateInstances?: Record<number, boolean>; // templateId -> hasInstances
  onUpdate: (templateId: number, data: any) => void;
  onDelete: (templateId: number) => void;
}

const TemplateList: React.FC<TemplateListProps> = ({
  templates,
  templateInstances = {},
  onUpdate,
  onDelete,
}) => {
  if (templates.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <div className="text-3xl mb-2">📝</div>
        <p className="text-sm">No templates yet</p>
        <p className="text-xs text-gray-400">Create one to get started</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {templates.map((template) => (
        <TemplateItem
          key={template.id}
          template={template}
          hasInstances={templateInstances[template.id] || false}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default TemplateList;
