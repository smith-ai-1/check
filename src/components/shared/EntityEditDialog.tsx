import React, { useState, useEffect, useCallback } from 'react';
import { Entity, Workspace, EntityEditFunction, EntityAddFunction, EntityDeleteFunction } from '../../types';
import { useTheme } from '../../ThemeContext';
import { Calendar, Bell, UserPlus, Folder, Trash, ArrowLeft } from 'lucide-react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

interface EntityEditDialogProps {
  entity?: Entity;
  workspaces: Workspace[];
  onEdit: EntityEditFunction;
  onAdd: EntityAddFunction;
  onDelete: EntityDeleteFunction;
  onClose: () => void;
  entityType: 'task' | 'meet';
}

const EntityEditDialog: React.FC<EntityEditDialogProps> = ({
  entity,
  workspaces,
  onEdit,
  onAdd,
  onDelete,
  onClose,
  entityType
}) => {
  const [title, setTitle] = useState(entity?.title ?? '');
  const [description, setDescription] = useState(entity?.description ?? '');
  const [deadline, setDeadline] = useState<Date | null>(entity?.deadline ? new Date(entity.deadline) : null);
  const [workspaceUid, setWorkspaceUid] = useState<string | null>(entity?.workspaceUid ?? null);
  const [hasChanges, setHasChanges] = useState(false);
  const { theme } = useTheme();

  const isNewEntity = !entity;

  useEffect(() => {
    const isTitleChanged = title !== entity?.title;
    const isDescriptionChanged = description !== entity?.description;
    const isDeadlineChanged =
      (deadline !== null && entity?.deadline === null) ||
      (deadline === null && entity?.deadline !== null) ||
      (deadline !== null && entity?.deadline !== null && deadline.toISOString() !== entity?.deadline);
    const isWorkspaceChanged = workspaceUid !== entity?.workspaceUid;
    setHasChanges(isTitleChanged || isDescriptionChanged || isDeadlineChanged || isWorkspaceChanged);
  }, [title, description, deadline, workspaceUid, entity]);

  const handleSave = useCallback(() => {
    const entityData = {
      title,
      description,
      deadline: deadline ? deadline.toISOString() : null,
      status: entity?.status ?? 'opened',
      type: entityType,
      workspaceUid,
      doneAt: entity?.doneAt ?? null
    };

    if (isNewEntity) {
      onAdd(entityData);
    } else if (entity && hasChanges) {
      onEdit(
        entity.uid,
        title,
        description,
        deadline ? deadline.toISOString() : null,
        entity.status,
        entity.type,
        workspaceUid
      );
    }
    onClose();
  }, [isNewEntity, onAdd, onEdit, entity, hasChanges, title, description, deadline, workspaceUid, entityType, onClose]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      } else if (event.key === 'Enter' && event.ctrlKey) {
        handleSave();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose, handleSave]);

  const handleDelete = () => {
    if (entity) {
      onDelete(entity.uid);
    }
    onClose();
  };

  const handleBackButton = () => {
    if (hasChanges) {
      handleSave();
    } else {
      onClose();
    }
  };

  const formatDate = (date: Date | null): string => {
    if (!date) return 'No date set';
    return date.toLocaleString([], {
      weekday: 'short',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const DialogRow = ({ icon, label, value, onClick }: { icon: React.ReactNode, label: string, value: React.ReactNode, onClick?: () => void }) => (
    <div className="flex items-center justify-between py-4 border-b border-gray-700">
      <div className="flex items-center">
        {icon}
        <span className="ml-3">{label}</span>
      </div>
      <div onClick={onClick} className="flex items-center cursor-pointer">
        {value}
        <span className="ml-2">›</span>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-gray-900 text-white p-4 rounded-lg shadow-xl max-w-md w-full relative">
        <button
          onClick={handleBackButton}
          className="absolute top-4 left-4 text-gray-400 hover:text-white"
          aria-label="Close dialog"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full bg-transparent text-2xl font-bold mb-2 mt-8 focus:outline-none"
          placeholder={`New ${entityType} title`}
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full bg-transparent text-lg mb-4 focus:outline-none"
          placeholder="Description"
          rows={3}
        />
        <DialogRow
          icon={<Calendar className="w-6 h-6" />}
          label="Deadline"
          value={
            <DatePicker
              selected={deadline}
              onChange={(date: Date | null) => setDeadline(date)}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm aa"
              customInput={
                <button className="text-gray-400 hover:text-white">
                  {formatDate(deadline)}
                </button>
              }
              className="bg-gray-800 text-white rounded p-2"
            />
          }
        />
        <DialogRow
          icon={<Bell className="w-6 h-6" />}
          label="Remind me"
          value="Set specific time"
          onClick={() => {/* Open reminder settings */}}
        />
        <DialogRow
          icon={<UserPlus className="w-6 h-6" />}
          label="Assignee"
          value="Add people"
          onClick={() => {/* Open assignee selection */}}
        />
        <DialogRow
          icon={<Folder className="w-6 h-6" />}
          label="Workspace"
          value={
            <select
              value={workspaceUid || ''}
              onChange={(e) => setWorkspaceUid(e.target.value || null)}
              className="bg-gray-800 text-white rounded p-2"
            >
              <option value="">Personal</option>
              {workspaces.map((workspace) => (
                <option key={workspace.uid} value={workspace.uid}>
                  {workspace.name}
                </option>
              ))}
            </select>
          }
        />
        {!isNewEntity && (
          <button
            onClick={handleDelete}
            className="w-full mt-6 bg-red-600 text-white py-3 rounded-lg flex items-center justify-center"
          >
            <Trash className="w-5 h-5 mr-2" />
            <span>Delete {entityType}</span>
          </button>
        )}
        <button
          onClick={handleSave}
          className="w-full mt-4 bg-blue-600 text-white py-3 rounded-lg flex items-center justify-center"
        >
          <span>Save {entityType}</span>
        </button>
      </div>
    </div>
  );
};

export default EntityEditDialog;