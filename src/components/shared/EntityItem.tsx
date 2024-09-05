import React, { useState } from 'react';
import { Entity, Workspace, EntityEditFunction, EntityAddFunction, EntityDeleteFunction } from '../../types';
import { useTheme } from '../../ThemeContext';
import EntityEditDialog from './EntityEditDialog';

interface EntityItemProps {
  entity: Entity;
  workspaces: Workspace[];
  onEdit: EntityEditFunction;
  onAdd: EntityAddFunction;
  onDelete: EntityDeleteFunction;
  entityType: 'task' | 'meet';
}

const EntityItem: React.FC<EntityItemProps> = ({ entity, workspaces, onEdit, onAdd, onDelete, entityType }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { theme } = useTheme();

  const formatDate = (date: string | null): string => {
    if (!date) return 'No date';
    return new Date(date).toLocaleString([], {
      weekday: 'short',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <>
      <div
        className={`rounded-lg mb-2 overflow-hidden cursor-pointer ${theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-100 shadow'}`}
        onClick={() => setIsDialogOpen(true)}
      >
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            {entity.type === 'task' && (
              <input
                type="checkbox"
                checked={entity.status === 'done'}
                onChange={(e) => {
                  e.stopPropagation();
                  onEdit(entity.uid, entity.title, entity.description, entity.deadline, entity.status === 'done' ? 'opened' : 'done', entity.type, entity.workspaceUid);
                }}
                className="form-checkbox h-5 w-5 text-blue-600 mr-3"
              />
            )}
            <span className={`flex-grow text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              {entity.title}
            </span>
          </div>
          <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
            {entity.description}
          </div>
          <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
            {formatDate(entity.deadline)}
          </div>
        </div>
      </div>
      {isDialogOpen && (
        <EntityEditDialog
          entity={entity}
          workspaces={workspaces}
          onEdit={onEdit}
          onAdd={onAdd}
          onDelete={onDelete}
          onClose={() => setIsDialogOpen(false)}
          entityType={entityType}
        />
      )}
    </>
  );
};

export default EntityItem;