// src/components/shared/EntityList.tsx
import React, { useState } from 'react';
import Task from '../Task';
import Meet from '../Meet';
import AddEntityButton from './AddEntityButton';
import Accordion from './Accordion';
import EntityEditDialog from './EntityEditDialog';
import { Entity, Workspace, EntityEditFunction, EntityAddFunction, EntityDeleteFunction } from '../../types';
import { useTheme } from '../../ThemeContext';

interface EntityListProps {
  entities: Entity[];
  onAddEntity: EntityAddFunction;
  onEditEntity: EntityEditFunction;
  onDeleteEntity: EntityDeleteFunction;
  workspaces: Workspace[];
  activeTab: 'Personal' | 'Work' | 'Inbox';
  entityType: 'task' | 'meet';
  userId: string;
}

const EntityList: React.FC<EntityListProps> = ({
  entities,
  onAddEntity,
  onEditEntity,
  onDeleteEntity,
  workspaces,
  activeTab,
  entityType,
  userId
}) => {
  const { theme } = useTheme();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const filteredEntities = entities.filter(entity => {
    if (activeTab === 'Personal') return entity.workspaceUid === null;
    if (activeTab === 'Work') return entity.workspaceUid !== null;
    return true; // 'Inbox' tab shows all entities
  }).filter(entity => entity.type === entityType);

  const handleAddEntity = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const groupEntitiesByWorkspace = (entitiesToGroup: Entity[]) => {
    const grouped: { [key: string]: Entity[] } = {};
    entitiesToGroup.forEach(entity => {
      if (entity.workspaceUid) {
        if (!grouped[entity.workspaceUid]) {
          grouped[entity.workspaceUid] = [];
        }
        grouped[entity.workspaceUid].push(entity);
      }
    });
    return grouped;
  };

  const getWorkspaceName = (workspaceUid: string): string => {
    const workspace = workspaces.find(w => w.uid === workspaceUid);
    return workspace ? workspace.name : 'Unnamed Workspace';
  };

  const renderEntity = (entity: Entity) => {
    const props = {
      key: entity.uid,
      workspaces,
      onEdit: onEditEntity,
      onAdd: onAddEntity,
      onDelete: onDeleteEntity,
    };

    return entity.type === 'task'
      ? <Task task={entity} {...props} />
      : <Meet meet={entity} {...props} />;
  };

  const renderEntities = () => {
    if (activeTab === 'Work') {
      const groupedEntities = groupEntitiesByWorkspace(filteredEntities);
      return Object.entries(groupedEntities).map(([workspaceUid, workspaceEntities]) => {
        const workspaceName = getWorkspaceName(workspaceUid);
        const activeEntities = workspaceEntities.filter(entity => entity.status !== 'done');
        const completedEntities = workspaceEntities.filter(entity => entity.status === 'done');

        return (
          <Accordion key={workspaceUid} title={workspaceName}>
            <div className="space-y-4">
              {activeEntities.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    {entityType === 'task' ? 'Active Tasks' : 'Upcoming Meetings'}
                  </h3>
                  {activeEntities.map(renderEntity)}
                </div>
              )}
              {completedEntities.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    {entityType === 'task' ? 'Completed Tasks' : 'Completed Meetings'}
                  </h3>
                  {completedEntities.map(renderEntity)}
                </div>
              )}
            </div>
          </Accordion>
        );
      });
    } else {
      const activeEntities = filteredEntities.filter(entity => entity.status !== 'done');
      const completedEntities = filteredEntities.filter(entity => entity.status === 'done');

      return (
        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-bold mb-2">
              {entityType === 'task' ? 'Active Tasks' : 'Upcoming Meetings'}
            </h2>
            {activeEntities.map(renderEntity)}
          </div>
          {completedEntities.length > 0 && (
            <div>
              <h2 className="text-xl font-bold mb-2">
                {entityType === 'task' ? 'Completed Tasks' : 'Completed Meetings'}
              </h2>
              {completedEntities.map(renderEntity)}
            </div>
          )}
        </div>
      );
    }
  };

  return (
    <div className={`space-y-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
      <AddEntityButton
        onClick={handleAddEntity}
        entityType={entityType === 'task' ? 'task' : 'meeting'}
      />
      {renderEntities()}
      {isDialogOpen && (
        <EntityEditDialog
          workspaces={workspaces}
          onEdit={onEditEntity}
          onAdd={onAddEntity}
          onDelete={onDeleteEntity}
          onClose={handleCloseDialog}
          entityType={entityType}
        />
      )}
    </div>
  );
};

export default EntityList;