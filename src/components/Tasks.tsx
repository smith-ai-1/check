import React from 'react';
import { format } from 'date-fns';
import { Entity, EntityEditFunction, EntityDeleteFunction } from '../types';
import EditableField from './shared/EditableField';
import EntityActions from './shared/EntityActions';
import DeleteButton from './shared/DeleteButton';

interface TaskProps {
  task: Entity;
  onEdit: EntityEditFunction;
  onDelete: EntityDeleteFunction;
}

const Task: React.FC<TaskProps> = ({ task, onEdit, onDelete }) => {
  const handleTitleSave = (newTitle: string) => {
    onEdit(task.uid, newTitle, task.description, task.deadline, task.status, 'task', task.workspaceUid);
  };

  const handleDescriptionSave = (newDescription: string) => {
    onEdit(task.uid, task.title, newDescription, task.deadline, task.status, 'task', task.workspaceUid);
  };

  const handleStatusChange = () => {
    onEdit(
      task.uid,
      task.title,
      task.description,
      task.deadline,
      task.status === 'done' ? 'opened' : 'done',
      'task',
      task.workspaceUid
    );
  };

  const handleDeadlineChange = (date: Date | null) => {
    onEdit(
      task.uid,
      task.title,
      task.description,
      date ? date.toISOString() : null,
      task.status,
      'task',
      task.workspaceUid
    );
  };

  const handleDelete = () => {
    onDelete(task.uid);
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 mb-4">
      <div className="flex items-center mb-2">
        <input
          type="checkbox"
          checked={task.status === 'done'}
          onChange={handleStatusChange}
          className="form-checkbox h-5 w-5 text-blue-600 mr-3"
        />
        <EditableField
          value={task.title}
          onSave={handleTitleSave}
          className="text-xl font-bold flex-grow"
        />
      </div>
      <EditableField
        value={task.description}
        onSave={handleDescriptionSave}
        className="text-gray-600 dark:text-gray-300 mb-4"
      />
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
        {task.deadline
          ? `Due: ${format(new Date(task.deadline), 'MMMM d, yyyy HH:mm')}`
          : 'No due date set'}
      </p>
      <EntityActions
        type="task"
        deadline={task.deadline}
        workspaceUid={task.workspaceUid}
      />
      <DeleteButton onDelete={handleDelete} entityType="task" />
    </div>
  );
};

export default Task;