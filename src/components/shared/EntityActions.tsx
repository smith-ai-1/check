import React from 'react';
import { Calendar, Bell, Users, UserPlus, Folder } from 'lucide-react';
import { useTheme } from '../../ThemeContext';

interface EntityActionsProps {
  type: 'task' | 'meet';
  deadline: string | null;
  workspaceUid: string | null;
}

const EntityActions: React.FC<EntityActionsProps> = ({ type, deadline, workspaceUid }) => {
  const { theme } = useTheme();

  const formatDate = (date: string | null): string => {
    if (!date) return 'No date';
    return new Date(date).toLocaleString([], {
      weekday: 'short',
      day: 'numeric',
      month: 'long',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="px-4 pb-4 space-y-4">
      <ActionItem
        icon={<Calendar className="h-5 w-5" />}
        label={type === 'task' ? "Deadline" : "Schedule"}
        value={deadline ? formatDate(deadline) : 'Add date'}
      />
      <ActionItem
        icon={<Bell className="h-5 w-5" />}
        label="Remind me"
        value="Set specific time"
      />
      <ActionItem
        icon={type === 'meet' ? <Users className="h-5 w-5" /> : <UserPlus className="h-5 w-5" />}
        label={type === 'meet' ? "Participants" : "Assignee"}
        value="Add people"
      />
      <ActionItem
        icon={<Folder className="h-5 w-5" />}
        label="Project"
        value={workspaceUid ? 'Work' : 'Personal'}
        isTag
      />
    </div>
  );
};

interface ActionItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  isTag?: boolean;
}

const ActionItem: React.FC<ActionItemProps> = ({ icon, label, value, isTag = false }) => {
  const { theme } = useTheme();

  return (
    <div className={`flex items-center justify-between ${theme === 'dark' ? 'text-white' : 'text-gray-700'}`}>
      <div className="flex items-center space-x-2">
        {icon}
        <span>{label}</span>
      </div>
      {isTag ? (
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${theme === 'dark' ? 'bg-indigo-900 text-indigo-200' : 'bg-indigo-100 text-indigo-800'}`}>
          {value}
        </span>
      ) : (
        <span className="text-blue-400">{value} &gt;</span>
      )}
    </div>
  );
};

export default EntityActions;