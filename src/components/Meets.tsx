import React, { useState, useEffect } from 'react';
import { useEntities } from '../hooks/useEntities';
import EntityList from './shared/EntityList';
import { useTelegram } from '../hooks/useTelegram';
import { Entity } from '../types';
import { format, isWithinInterval, startOfDay, endOfDay, addDays } from 'date-fns';

interface MeetsProps {
  userId: string;
  activeTab: 'Personal' | 'Work' | 'Inbox';
}

const Meets: React.FC<MeetsProps> = ({ userId, activeTab }) => {
  const { tg } = useTelegram();
  const {
    entities,
    workspaces,
    loading,
    error,
    handleAddEntity,
    handleEditEntity,
    handleDeleteEntity,
  } = useEntities(userId);

  const [filteredMeets, setFilteredMeets] = useState<Entity[]>([]);

  useEffect(() => {
    const today = new Date();
    const nextWeek = addDays(today, 7);
    const filteredMeets = entities.filter(entity =>
      entity.type === 'meet' &&
      entity.deadline &&
      isWithinInterval(new Date(entity.deadline), {
        start: startOfDay(today),
        end: endOfDay(nextWeek)
      })
    ).sort((a, b) => new Date(a.deadline!).getTime() - new Date(b.deadline!).getTime());
    setFilteredMeets(filteredMeets);
  }, [entities]);

  if (loading) return <div>Loading meetings...</div>;
  if (error) return <div>Error loading meetings: {error}</div>;

  const allMeets = entities.filter(entity => entity.type === 'meet');

  const renderFilteredMeets = () => {
    if (filteredMeets.length === 0) return null;

    return (
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-2">Upcoming Meetings</h2>
        {filteredMeets.map(meet => (
          <div key={meet.uid} className="bg-gray-800 rounded-lg p-3 mb-2">
            <h3 className="font-semibold">{meet.title}</h3>
            <p>{meet.description}</p>
            <p className="text-sm text-gray-400">
              {meet.deadline ? format(new Date(meet.deadline), 'MMM d, yyyy HH:mm') : 'No time set'}
            </p>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      {renderFilteredMeets()}
      <EntityList
        entities={allMeets}
        onAddEntity={handleAddEntity}
        onEditEntity={handleEditEntity}
        onDeleteEntity={handleDeleteEntity}
        workspaces={workspaces}
        activeTab={activeTab}
        entityType="meet"
        userId={userId}
      />
    </div>
  );
};

export default Meets;