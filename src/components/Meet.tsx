// src/components/Meet.tsx
import React from 'react';
import { Entity as EntityType, Workspace, EntityEditFunction, EntityAddFunction, EntityDeleteFunction } from '../types';
import Entity from './shared/Entity';

interface MeetProps {
  meet: EntityType;
  workspaces: Workspace[];
  onEdit: EntityEditFunction;
  onAdd: EntityAddFunction;
  onDelete: EntityDeleteFunction;
}

const Meet: React.FC<MeetProps> = ({ meet, workspaces, onEdit, onAdd, onDelete }) => {
  // Add any meet-specific logic here

  return (
    <Entity
      entity={meet}
      workspaces={workspaces}
      onEdit={onEdit}
      onAdd={onAdd}
      onDelete={onDelete}
    />
  );
};

export default Meet;