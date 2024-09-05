// src/components/Task.tsx
import React from 'react';
import { Entity as EntityType, Workspace, EntityEditFunction, EntityAddFunction, EntityDeleteFunction } from '../types';
import Entity from './shared/Entity';

interface TaskProps {
  task: EntityType;
  workspaces: Workspace[];
  onEdit: EntityEditFunction;
  onAdd: EntityAddFunction;
  onDelete: EntityDeleteFunction;
}

const Task: React.FC<TaskProps> = ({ task, workspaces, onEdit, onAdd, onDelete }) => {
  // Add any task-specific logic here

  return (
    <Entity
      entity={task}
      workspaces={workspaces}
      onEdit={onEdit}
      onAdd={onAdd}
      onDelete={onDelete}
    />
  );
};

export default Task;